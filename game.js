// game.js — Virtual Claw Machine Engine for "Annante Pava"
// Specifications:
// 1. Real 2D physics settling: plush toys touch the actual machine floor (zero visible gap)
// 2. Ceiling-rail-carriage-cable-claw unified physical attachment (zero detachment)
// 3. Intentionally reversed joystick mapping (LEFT->UP, UP->RIGHT, RIGHT->DOWN, DOWN->LEFT)
// 4. Automated DROP State Machine (Sections 10 & 26):
//    IDLE -> MOVING_TO_TARGET -> LOWERING -> GRABBING -> LIFTING
//    -> MOVING_TO_PRIZE_BOX -> POSITIONING -> RELEASING -> BOX_CLOSING
//    -> TOY_ENTERING_BOX -> SHOWING_FAILURE_MESSAGE -> RESETTING -> IDLE
// 5. Prize chute on LOWER-LEFT corner; motorized trapdoor snaps shut BEFORE toy finishes fall.
// 6. Exact Malayalam & English comedic overlays & audio triggers.

class PlushPhysicsBody {
  constructor(config, def, containerEl) {
    this.id = config.id || `plush-${Math.random().toString(36).substr(2, 6)}`;
    this.type = config.type;
    this.def = def;
    this.scale = config.scale || 1.0;
    this.baseWidth = config.width || def.baseWidth || 78;
    this.baseHeight = config.height || def.baseHeight || 78;
    this.width = this.baseWidth * this.scale;
    this.height = this.baseHeight * this.scale;
    this.radius = (config.radius || def.radius || 36) * this.scale;
    this.rotation = config.rotation || 0;
    this.zIndex = config.zIndex || 10;
    this.collected = false;

    // Position percentages within cabinet container
    this.x = config.x;
    this.y = config.y;

    // State parameters
    this.isCarried = false;
    this.grounded = true;

    // DOM Element
    this.el = document.createElement('div');
    this.el.className = `plush-item plush-${this.type}`;
    this.el.id = this.id;
    this.el.innerHTML = def.svg;
    this.el.style.width = `${this.width}px`;
    this.el.style.height = `${this.height}px`;
    this.el.style.zIndex = this.zIndex;
    containerEl.appendChild(this.el);

    this.updateDOM();
  }

  updateDOM() {
    if (this.isCarried || this.collected) return;
    this.el.style.left = `${this.x}%`;
    this.el.style.top = `${this.y}%`;
    this.el.style.transform = `translate(-50%, -50%) scale(${this.scale}) rotate(${this.rotation}deg)`;
  }
}

class ClawMachineGame {
  constructor() {
    // Claw position percentages inside the glass enclosure
    // x: 14% (left) to 86% (right)
    // y: 15% (back) to 75% (front)
    // z: 0 (top ceiling) to 100 (bottom grab reach)
    this.clawX = 50;
    this.clawY = 35;
    this.clawZ = 0;

    // Section 10 & 26 Complete State Machine:
    // 'IDLE' -> 'MOVING_TO_TARGET' -> 'LOWERING' -> 'GRABBING' -> 'LIFTING'
    // -> 'MOVING_TO_PRIZE_BOX' -> 'POSITIONING' -> 'RELEASING' -> 'BOX_CLOSING'
    // -> 'TOY_ENTERING_BOX' -> 'SHOWING_FAILURE_MESSAGE' -> 'RESETTING' -> 'IDLE'
    this.state = 'IDLE';
    this.isBusy = false; // True during any automated sequence
    this.isClawClosed = false;
    this.carriedPlush = null;

    // Bottom-Left Prize Chute Target Coordinates
    this.chuteX = 20; // Lower-left horizontal coordinate along ceiling rail
    this.chuteY = 70;

    // Floor contact boundary percentage
    this.floorPercent = 89.12;

    // Joystick interaction state
    this.joystickActive = false;
    this.joystickVector = { x: 0, y: 0 };
    this.activeKeys = new Set();
    this.animFrameId = null;

    // Plushies collection
    this.plushies = [];
    this.recentWins = ['dinosaur', 'penguin', 'chick', 'bunny', 'purpleCat'];
    this.winCounts = {
      dinosaur: 1,
      penguin: 1,
      chick: 1,
      bunny: 1,
      purpleCat: 1,
      whiteCat: 0,
      bear: 0,
      panda: 0,
      blueWhale: 0,
      elephant: 0,
      cuteDog: 0,
      frog: 0,
      seal: 0,
      starPlush: 0,
      giftBoxPink: 0,
      giftBoxCyan: 0
    };

    // DOM References
    this.cabinetEl = null;
    this.trolleyTrackEl = null;
    this.trolleyXEl = null;
    this.clawAssemblyEl = null;
    this.cableEl = null;
    this.clawHeadEl = null;
    this.plushContainerEl = null;
    this.btnDropEl = null;
    this.joystickStickEl = null;
    this.joystickBallEl = null;
    this.chuteBoxEl = null;
    this.chuteTrapdoorEl = null;
    this.postDropOverlayEl = null;
    this.blessingOverlayEl = null;
    this.warningOverlayEl = null;
    this.recentWinsListEl = null;
  }

  init() {
    this.cacheDOMElements();
    this.spawnInitialPlushPile();
    this.setupEventListeners();
    this.updateClawTransform();
    this.renderRecentWins();
    this.startGameLoop();

    // Initialize Dance Mode Manager
    if (window.danceModeMgr) {
      window.danceModeMgr.init();
    }
  }

  cacheDOMElements() {
    this.cabinetEl = document.getElementById('clawCabinet');
    this.trolleyTrackEl = document.getElementById('trolleyTrack');
    this.trolleyXEl = document.getElementById('trolleyX');
    this.clawAssemblyEl = document.getElementById('clawAssembly');
    this.cableEl = document.getElementById('clawCable');
    this.clawHeadEl = document.getElementById('clawHead');
    this.plushContainerEl = document.getElementById('plushContainer');
    this.btnDropEl = document.getElementById('btnDrop');
    this.joystickStickEl = document.getElementById('joystickStick');
    this.joystickBallEl = document.getElementById('joystickBall');
    this.chuteBoxEl = document.getElementById('prizeChute');
    this.chuteTrapdoorEl = document.getElementById('chuteTrapdoor');
    this.postDropOverlayEl = document.getElementById('postDropOverlay');
    this.blessingOverlayEl = document.getElementById('blessingOverlay');
    this.warningOverlayEl = document.getElementById('warningOverlay');
    this.recentWinsListEl = document.getElementById('recentWinsList');
  }

  // Populate grounded plushies touching the bottom floor
  spawnInitialPlushPile() {
    if (!this.plushContainerEl || !window.PLUSH_DEFINITIONS) return;

    this.plushContainerEl.innerHTML = '';
    this.plushies = [];

    const configs = window.INITIAL_PLUSH_POCKET || [];
    configs.forEach((cfg, idx) => {
      const def = window.PLUSH_DEFINITIONS[cfg.type] || window.PLUSH_DEFINITIONS.dinosaur;
      const plush = new PlushPhysicsBody(
        { ...cfg, id: `plush-${idx}-${cfg.type}` },
        def,
        this.plushContainerEl
      );
      this.plushies.push(plush);
    });
  }

  setupEventListeners() {
    // ----------------------------------------------------
    // Touch & Mouse Joystick Events
    // ----------------------------------------------------
    const joystickBase = document.getElementById('joystickBase');
    if (joystickBase) {
      const onJoyStart = (e) => {
        if (this.isBusy || this.state !== 'IDLE') return;
        this.joystickActive = true;
        this.handleJoystickMove(e);
      };

      const onJoyMove = (e) => {
        if (!this.joystickActive || this.isBusy || this.state !== 'IDLE') return;
        this.handleJoystickMove(e);
      };

      const onJoyEnd = () => {
        this.joystickActive = false;
        this.joystickVector = { x: 0, y: 0 };
        this.resetJoystickVisual();
      };

      joystickBase.addEventListener('mousedown', onJoyStart);
      window.addEventListener('mousemove', onJoyMove);
      window.addEventListener('mouseup', onJoyEnd);

      joystickBase.addEventListener('touchstart', (e) => {
        onJoyStart(e);
        e.preventDefault();
      }, { passive: false });

      window.addEventListener('touchmove', onJoyMove, { passive: true });
      window.addEventListener('touchend', onJoyEnd);
      window.addEventListener('touchcancel', onJoyEnd);
    }

    // Directional Arrow Buttons around the joystick
    const joyArrows = document.querySelectorAll('.joy-arrow');
    joyArrows.forEach((btn) => {
      const dir = btn.getAttribute('data-dir');
      const setDir = (active) => {
        if (this.isBusy || this.state !== 'IDLE') return;
        if (active) {
          if (dir === 'up') this.joystickVector = { x: 0, y: -1 };
          if (dir === 'down') this.joystickVector = { x: 0, y: 1 };
          if (dir === 'left') this.joystickVector = { x: -1, y: 0 };
          if (dir === 'right') this.joystickVector = { x: 1, y: 0 };
          this.updateJoystickVisualFromVector();
        } else {
          this.joystickVector = { x: 0, y: 0 };
          this.resetJoystickVisual();
        }
      };
      btn.addEventListener('mousedown', () => setDir(true));
      btn.addEventListener('mouseup', () => setDir(false));
      btn.addEventListener('mouseleave', () => setDir(false));
      btn.addEventListener('touchstart', (e) => { setDir(true); e.preventDefault(); }, { passive: false });
      btn.addEventListener('touchend', () => setDir(false));
    });

    // Keyboard controls (Arrow keys and WASD)
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(e.code)) {
        if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
        e.preventDefault();
      }

      if (e.code === 'Space' && !this.isBusy && this.state === 'IDLE') {
        this.triggerDrop();
        return;
      }

      if (this.isBusy || this.state !== 'IDLE') return;

      this.activeKeys.add(e.code);
      this.updateJoystickVectorFromKeys();
    });

    window.addEventListener('keyup', (e) => {
      this.activeKeys.delete(e.code);
      if (!this.isBusy && this.state === 'IDLE') {
        this.updateJoystickVectorFromKeys();
      }
    });

    // DROP Button (Single click triggers Section 10 automated sequence)
    if (this.btnDropEl) {
      this.btnDropEl.addEventListener('click', () => {
        if (!this.isBusy && this.state === 'IDLE') {
          this.triggerDrop();
        }
      });
    }

    // Sound On Toggle Switch
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
      soundToggle.addEventListener('change', (e) => {
        if (window.soundCtrl) {
          window.soundCtrl.setSoundEnabled(e.target.checked);
        }
      });
    }

    // Three Circular Action Buttons
    // Button 1: Music
    const btnMusic = document.getElementById('btnMusic');
    if (btnMusic) {
      btnMusic.addEventListener('click', () => {
        btnMusic.classList.add('btn-pop');
        setTimeout(() => btnMusic.classList.remove('btn-pop'), 250);
        if (window.soundCtrl) {
          const isPlaying = window.soundCtrl.toggleMusic();
          btnMusic.classList.toggle('active-music', isPlaying);
        }
      });
    }

    // Button 2: Blessing ("nanaayi vaa")
    const btnBlessing = document.getElementById('btnBlessing');
    if (btnBlessing) {
      btnBlessing.addEventListener('click', () => {
        btnBlessing.classList.add('btn-pop');
        setTimeout(() => btnBlessing.classList.remove('btn-pop'), 250);
        this.triggerBlessing();
      });
    }

    // Button 3: Do Not Press ("njn paranjelle thodanda yann chammi poyelle")
    const btnDoNotPress = document.getElementById('btnDoNotPress');
    if (btnDoNotPress) {
      btnDoNotPress.addEventListener('click', () => {
        btnDoNotPress.classList.add('btn-pop');
        setTimeout(() => btnDoNotPress.classList.remove('btn-pop'), 250);
        this.triggerDoNotPress();
      });
    }

    // "View all →" button
    const btnViewAll = document.getElementById('btnViewAll');
    if (btnViewAll) {
      btnViewAll.addEventListener('click', () => {
        this.openViewAllModal();
      });
    }

    const btnCloseViewAll = document.getElementById('btnCloseViewAll');
    if (btnCloseViewAll) {
      btnCloseViewAll.addEventListener('click', () => {
        document.getElementById('viewAllModal').classList.remove('active');
      });
    }
  }

  handleJoystickMove(e) {
    const joystickBase = document.getElementById('joystickBase');
    if (!joystickBase) return;

    const rect = joystickBase.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);
    const maxRadius = rect.width * 0.38;

    const angle = Math.atan2(deltaY, deltaX);
    const clampedDist = Math.min(distance, maxRadius);

    const normX = (Math.cos(angle) * clampedDist) / maxRadius;
    const normY = (Math.sin(angle) * clampedDist) / maxRadius;

    this.joystickVector = { x: normX, y: normY };

    // Update physical stick tilt & ball position
    const stickTiltX = normX * 18;
    const stickTiltY = normY * 18;
    if (this.joystickStickEl) {
      this.joystickStickEl.style.transform = `translate(-50%, -100%) rotate(${normX * 22}deg)`;
    }
    if (this.joystickBallEl) {
      this.joystickBallEl.style.transform = `translate(calc(-50% + ${stickTiltX}px), calc(-50% + ${stickTiltY}px))`;
    }
  }

  updateJoystickVectorFromKeys() {
    let vx = 0;
    let vy = 0;
    if (this.activeKeys.has('ArrowLeft') || this.activeKeys.has('KeyA')) vx -= 1;
    if (this.activeKeys.has('ArrowRight') || this.activeKeys.has('KeyD')) vx += 1;
    if (this.activeKeys.has('ArrowUp') || this.activeKeys.has('KeyW')) vy -= 1;
    if (this.activeKeys.has('ArrowDown') || this.activeKeys.has('KeyS')) vy += 1;

    const len = Math.hypot(vx, vy);
    if (len > 0) {
      this.joystickVector = { x: vx / len, y: vy / len };
      this.updateJoystickVisualFromVector();
    } else {
      this.joystickVector = { x: 0, y: 0 };
      this.resetJoystickVisual();
    }
  }

  updateJoystickVisualFromVector() {
    const stickTiltX = this.joystickVector.x * 16;
    const stickTiltY = this.joystickVector.y * 16;
    if (this.joystickStickEl) {
      this.joystickStickEl.style.transform = `translate(-50%, -100%) rotate(${this.joystickVector.x * 20}deg)`;
    }
    if (this.joystickBallEl) {
      this.joystickBallEl.style.transform = `translate(calc(-50% + ${stickTiltX}px), calc(-50% + ${stickTiltY}px))`;
    }
  }

  resetJoystickVisual() {
    if (this.joystickStickEl) {
      this.joystickStickEl.style.transform = 'translate(-50%, -100%) rotate(0deg)';
    }
    if (this.joystickBallEl) {
      this.joystickBallEl.style.transform = 'translate(-50%, -50%)';
    }
  }

  // ==================================================
  // GAME LOOP & INTENTIONALLY REVERSED JOYSTICK MAPPING
  // ==================================================
  // STRICT REQUIREMENT (Section 14):
  // LEFT  → claw moves UP (depth decreases)
  // UP    → claw moves RIGHT (width increases)
  // RIGHT → claw moves DOWN (depth increases)
  // DOWN  → claw moves LEFT (width decreases)
  startGameLoop() {
    const moveSpeed = 0.45;

    const loop = () => {
      // Joystick operates only when machine is IDLE and manual control active
      if (!this.isBusy && this.state === 'IDLE' && (this.joystickVector.x !== 0 || this.joystickVector.y !== 0)) {
        const jx = this.joystickVector.x;
        const jy = this.joystickVector.y;

        // Intentionally reversed mapping:
        // Pushing LEFT (jx < 0) => claw moves UP in depth (clawY decreases)
        // Pushing RIGHT (jx > 0) => claw moves DOWN in depth (clawY increases)
        // Pushing UP (jy < 0) => claw moves RIGHT in width (clawX increases)
        // Pushing DOWN (jy > 0) => claw moves LEFT in width (clawX decreases)
        let dClawX = 0;
        let dClawY = 0;

        dClawY += jx * moveSpeed;
        dClawX -= jy * moveSpeed;

        this.clawX = Math.max(14, Math.min(86, this.clawX + dClawX));
        this.clawY = Math.max(15, Math.min(75, this.clawY + dClawY));

        if (window.soundCtrl && (Math.abs(dClawX) > 0.05 || Math.abs(dClawY) > 0.05)) {
          if (Math.random() < 0.12) {
            window.soundCtrl.playMotorMove();
          }
        }

        this.updateClawTransform();
      }

      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  updateClawTransform() {
    if (!this.clawAssemblyEl) return;

    // 1. Position ceiling carriage runner along overhead rail
    if (this.trolleyXEl) {
      this.trolleyXEl.style.left = `${this.clawX}%`;
    }

    // 2. Perspective depth on the overhead rail
    const perspectiveY = (this.clawY - 40) * 0.15;
    if (this.trolleyTrackEl) {
      this.trolleyTrackEl.style.top = `${14 + perspectiveY}px`;
    }

    // 3. Telescopic Cable Extension:
    // When clawZ is 0 (idle/lifted at ceiling): cable is 75px
    // When clawZ is 100 (lowered to plush height): cable is 285px
    const minCablePx = 75;
    const maxCablePx = 285;
    const cableHeightPx = minCablePx + (this.clawZ / 100) * (maxCablePx - minCablePx);

    if (this.cableEl) {
      this.cableEl.style.height = `${cableHeightPx}px`;
    }

    // 4. Claw fingers articulation
    if (this.clawHeadEl) {
      if (this.isClawClosed) {
        this.clawHeadEl.classList.add('closed');
      } else {
        this.clawHeadEl.classList.remove('closed');
      }
    }

    // 5. Held toy position locked to claw tip coordinates
    if (this.carriedPlush) {
      const trackTop = 14 + perspectiveY;
      const clawTipY = trackTop + 28 + cableHeightPx + 42;
      this.carriedPlush.el.style.left = `${this.clawX}%`;
      this.carriedPlush.el.style.top = `${clawTipY}px`;
      this.carriedPlush.el.style.zIndex = 40;
      this.carriedPlush.el.style.transform = `translate(-50%, -50%) scale(${this.carriedPlush.scale}) rotate(3deg)`;
    }
  }

  // ==================================================
  // AUTOMATED DROP STATE MACHINE (Sections 10 & 26)
  // ==================================================
  // Flow:
  // 1. IDLE
  // 2. MOVING_TO_TARGET
  // 3. LOWERING
  // 4. GRABBING
  // 5. LIFTING
  // 6. MOVING_TO_PRIZE_BOX
  // 7. POSITIONING
  // 8. RELEASING
  // 9. BOX_CLOSING (Trapdoor shuts BEFORE toy completes fall!)
  // 10. TOY_ENTERING_BOX
  // 11. SHOWING_FAILURE_MESSAGE ("sarilla kutta try again fail again hehehe")
  // 12. RESETTING
  // 13. IDLE
  async triggerDrop() {
    if (this.isBusy || this.state !== 'IDLE') return;

    // 1. Disable manual control immediately & animate button press
    this.isBusy = true;
    this.joystickActive = false;
    this.joystickVector = { x: 0, y: 0 };
    this.resetJoystickVisual();
    this.activeKeys.clear();

    if (this.btnDropEl) {
      this.btnDropEl.classList.add('btn-pressed');
      setTimeout(() => this.btnDropEl.classList.remove('btn-pressed'), 250);
    }
    if (window.soundCtrl) {
      window.soundCtrl.playDropButton();
    }

    await this.executeAutomatedDropSequence();
  }

  // Target selection logic (Section 10.2):
  // - If claw is positioned directly above a plush (within grab radius), target that plush.
  // - If claw is NOT directly above a plush, select the nearest reachable plush.
  // - In ALL cases, exactly ONE plush is targeted.
  findTargetPlush() {
    const available = this.plushies.filter(p => !p.collected && !p.isCarried);
    if (available.length === 0) {
      return this.plushies[0];
    }

    let bestPlush = available[0];
    let minDistance = Infinity;

    for (const p of available) {
      const dx = p.x - this.clawX;
      const dy = p.y - (this.clawY + 28);
      const dist = Math.hypot(dx, dy);
      if (dist < minDistance) {
        minDistance = dist;
        bestPlush = p;
      }
    }

    return bestPlush;
  }

  async executeAutomatedDropSequence() {
    // --------------------------------------------------
    // STEP 2: MOVING_TO_TARGET
    // --------------------------------------------------
    this.state = 'MOVING_TO_TARGET';
    const targetPlush = this.findTargetPlush();

    // Smoothly align carriage X with targeted plush along top rail
    if (Math.abs(this.clawX - targetPlush.x) > 1) {
      if (window.soundCtrl) window.soundCtrl.playMotorMove();
      await this.animateClawX(this.clawX, targetPlush.x, 700);
    }

    // --------------------------------------------------
    // STEP 3: LOWERING
    // --------------------------------------------------
    this.state = 'LOWERING';
    this.isClawClosed = false;
    this.updateClawTransform();
    if (window.soundCtrl) window.soundCtrl.playClawLower();
    await this.animateClawZ(0, 100, 1000);

    // --------------------------------------------------
    // STEP 4: GRABBING
    // --------------------------------------------------
    this.state = 'GRABBING';
    this.isClawClosed = true;
    if (window.soundCtrl) window.soundCtrl.playClawGrab();
    this.updateClawTransform();

    // Attach targeted plush to claw
    this.carriedPlush = targetPlush;
    targetPlush.isCarried = true;
    targetPlush.el.classList.add('grabbed');
    await this.sleep(350); // Grip tension pause

    // --------------------------------------------------
    // STEP 5: LIFTING
    // --------------------------------------------------
    this.state = 'LIFTING';
    if (window.soundCtrl) window.soundCtrl.playClawLift();
    await this.animateClawZ(100, 0, 1000);

    // --------------------------------------------------
    // STEP 6: MOVING_TO_PRIZE_BOX (LOWER-LEFT CHUTE)
    // --------------------------------------------------
    this.state = 'MOVING_TO_PRIZE_BOX';
    if (window.soundCtrl) window.soundCtrl.playMotorMove();
    await this.animateClawX(this.clawX, this.chuteX, 900);

    // --------------------------------------------------
    // STEP 7: POSITIONING
    // --------------------------------------------------
    this.state = 'POSITIONING';
    await this.sleep(300); // Dramatic tension pause

    // --------------------------------------------------
    // STEP 8, 9, 10: RELEASING, BOX_CLOSING, TOY_ENTERING_BOX
    // --------------------------------------------------
    this.state = 'RELEASING';
    const releasedPlush = this.carriedPlush;
    this.carriedPlush = null;

    // Claw opens
    this.isClawClosed = false;
    this.updateClawTransform();

    if (releasedPlush) {
      releasedPlush.isCarried = false;
      releasedPlush.el.classList.remove('grabbed');
      releasedPlush.el.classList.add('falling-to-chute');

      // Toy starts falling toward bottom-left prize chute (t = 0.0s)
      releasedPlush.el.style.transition = 'top 0.85s cubic-bezier(0.5, 0, 0.9, 0.7), left 0.85s ease-in, transform 0.85s ease-in, opacity 0.3s ease 0.8s';
      releasedPlush.el.style.left = `${this.chuteX}%`;
      releasedPlush.el.style.top = '82%';
      releasedPlush.el.style.transform = `translate(-50%, -50%) scale(${releasedPlush.scale * 0.65}) rotate(20deg)`;

      // t = 0.25s: Prize chute trapdoor begins rotating shut while toy is still in mid-air
      await this.sleep(250);
      this.state = 'BOX_CLOSING';
      if (window.soundCtrl) window.soundCtrl.playTrapdoorMotor();
      if (this.chuteTrapdoorEl) {
        this.chuteTrapdoorEl.classList.add('trapdoor-closing');
      }

      // t = 0.60s: Trapdoor SLAMS completely shut BEFORE toy completes fall!
      await this.sleep(350);
      if (window.soundCtrl) window.soundCtrl.playTrapdoorSlam();
      if (this.chuteTrapdoorEl) {
        this.chuteTrapdoorEl.classList.add('trapdoor-closed');
      }

      // t = 0.85s: Toy enters collection hopper / hits closed trapdoor
      await this.sleep(250);
      this.state = 'TOY_ENTERING_BOX';
      if (window.soundCtrl) {
        window.soundCtrl.playChuteDrop();
      }
      if (this.chuteBoxEl) {
        this.chuteBoxEl.classList.add('chute-bounce');
        setTimeout(() => this.chuteBoxEl.classList.remove('chute-bounce'), 800);
      }
      if (this.cabinetEl) {
        this.cabinetEl.classList.add('machine-shake');
        setTimeout(() => this.cabinetEl.classList.remove('machine-shake'), 450);
      }

      releasedPlush.collected = true;
      releasedPlush.el.style.opacity = '0';
      this.recordWin(releasedPlush.type);

      // t = 1.1s: SHOWING_FAILURE_MESSAGE
      await this.sleep(250);
      this.state = 'SHOWING_FAILURE_MESSAGE';
      if (window.soundCtrl) window.soundCtrl.playFailSound();
      await this.showPostDropFailureMessage();

      // Respawn plush in pile so chamber remains packed
      this.respawnPlush(releasedPlush);
    }

    // --------------------------------------------------
    // STEP 12: RESETTING
    // --------------------------------------------------
    this.state = 'RESETTING';

    // Trapdoor resets to OPEN state
    if (this.chuteTrapdoorEl) {
      this.chuteTrapdoorEl.classList.remove('trapdoor-closing', 'trapdoor-closed');
    }

    // Claw carriage returns to center idle position along ceiling rail
    await this.animateClawX(this.clawX, 50, 700);

    // --------------------------------------------------
    // STEP 13: IDLE
    // --------------------------------------------------
    this.state = 'IDLE';
    this.isBusy = false;
    this.isClawClosed = false;
    this.updateClawTransform();
  }

  // Animate carriage horizontally along overhead rail
  animateClawX(startX, endX, duration) {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Smooth ease-in-out curve
        const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        this.clawX = startX + (endX - startX) * ease;
        this.updateClawTransform();

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          this.clawX = endX;
          this.updateClawTransform();
          resolve();
        }
      };
      requestAnimationFrame(tick);
    });
  }

  // Animate claw cable extension/retraction
  animateClawZ(startZ, endZ, duration) {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        this.clawZ = startZ + (endZ - startZ) * ease;
        this.updateClawTransform();

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          this.clawZ = endZ;
          this.updateClawTransform();
          resolve();
        }
      };
      requestAnimationFrame(tick);
    });
  }

  // ==================================================
  // POST-DROP FAILURE MESSAGE OVERLAY:
  // "sarilla kutta try again fail again hehehe" (Section 11 & 24)
  // ==================================================
  showPostDropFailureMessage() {
    return new Promise((resolve) => {
      const overlay = this.postDropOverlayEl;
      if (!overlay) {
        resolve();
        return;
      }

      overlay.classList.add('show-fail');
      if (this.cabinetEl) {
        this.cabinetEl.classList.add('screen-alarm-shake');
        setTimeout(() => this.cabinetEl.classList.remove('screen-alarm-shake'), 500);
      }
      this.createSparkleBurst(window.innerWidth / 2, window.innerHeight / 2);

      // Display for approximately 2.5 seconds, then fade out
      setTimeout(() => {
        overlay.classList.remove('show-fail');
        setTimeout(resolve, 350);
      }, 2500);
    });
  }

  respawnPlush(plush) {
    const newX = 26 + Math.random() * 52;
    const newY = 60 + Math.random() * 20;
    plush.x = newX;
    plush.y = newY;
    plush.collected = false;
    plush.isCarried = false;
    plush.el.classList.remove('falling-to-chute');
    plush.el.style.transition = 'opacity 0.4s ease';
    plush.el.style.opacity = '1';
    plush.updateDOM();
  }

  // ==================================================
  // BLESSING BUTTON: "nanaayi vaa" (Section 15)
  // ==================================================
  triggerBlessing() {
    if (window.soundCtrl) {
      window.soundCtrl.playBlessing();
    }
    const overlay = this.blessingOverlayEl;
    if (overlay) {
      overlay.classList.add('show-blessing');
      this.createSparkleBurst(window.innerWidth * 0.72, window.innerHeight * 0.45);
      setTimeout(() => {
        overlay.classList.remove('show-blessing');
      }, 2500);
    }
  }

  // ==================================================
  // DO NOT PRESS BUTTON: "njn paranjelle thodanda yann chammi poyelle" (Section 15)
  // ==================================================
  triggerDoNotPress() {
    if (window.soundCtrl) {
      window.soundCtrl.playDoNotPress();
    }
    if (this.cabinetEl) {
      this.cabinetEl.classList.add('cabinet-alarm-flash');
      setTimeout(() => this.cabinetEl.classList.remove('cabinet-alarm-flash'), 2200);
    }
    const overlay = this.warningOverlayEl;
    if (overlay) {
      overlay.classList.add('show-warning');
      setTimeout(() => {
        overlay.classList.remove('show-warning');
      }, 3000);
    }
  }

  // ==================================================
  // RECENT WINS & GALLERY (Section 15)
  // ==================================================
  recordWin(plushType) {
    if (this.winCounts[plushType] !== undefined) {
      this.winCounts[plushType]++;
    } else {
      this.winCounts[plushType] = 1;
    }

    this.recentWins.unshift(plushType);
    if (this.recentWins.length > 8) {
      this.recentWins.pop();
    }
    this.renderRecentWins();
  }

  renderRecentWins() {
    if (!this.recentWinsListEl || !window.PLUSH_DEFINITIONS) return;
    this.recentWinsListEl.innerHTML = '';

    this.recentWins.slice(0, 5).forEach((type) => {
      const def = window.PLUSH_DEFINITIONS[type] || window.PLUSH_DEFINITIONS.dinosaur;
      const thumb = document.createElement('div');
      thumb.className = 'recent-win-thumb';
      thumb.title = def.name;
      thumb.innerHTML = `
        <div class="thumb-icon-wrap">${def.svg}</div>
        <span class="thumb-badge">★</span>
      `;
      this.recentWinsListEl.appendChild(thumb);
    });
  }

  openViewAllModal() {
    const modal = document.getElementById('viewAllModal');
    const grid = document.getElementById('allWinsGrid');
    if (!modal || !grid || !window.PLUSH_DEFINITIONS) return;

    grid.innerHTML = '';
    Object.keys(window.PLUSH_DEFINITIONS).forEach((key) => {
      const def = window.PLUSH_DEFINITIONS[key];
      const count = this.winCounts[key] || 0;
      const card = document.createElement('div');
      card.className = `gallery-card ${count > 0 ? 'collected' : 'locked'}`;
      card.innerHTML = `
        <div class="card-art">${def.svg}</div>
        <div class="card-name">${def.name}</div>
        <div class="card-count-badge">${count > 0 ? `Won: ${count}` : 'Yet to win'}</div>
      `;
      grid.appendChild(card);
    });

    modal.classList.add('active');
  }

  createSparkleBurst(cx, cy) {
    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'floating-sparkle-burst';
      sparkle.textContent = ['✦', '★', '💖', '✨'][Math.floor(Math.random() * 4)];
      sparkle.style.left = `${cx}px`;
      sparkle.style.top = `${cy}px`;
      const angle = (Math.PI * 2 * i) / 12;
      const dist = 50 + Math.random() * 70;
      sparkle.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      sparkle.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 900);
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.clawGame = new ClawMachineGame();
  window.clawGame.init();
});

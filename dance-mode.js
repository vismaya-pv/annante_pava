// dance-mode.js — Change View & 10-second Kawaii Dance Tracking

class DanceModeManager {
  constructor() {
    this.isActive = false;
    this.videoStream = null;
    this.countdownTimer = null;
    this.motionInterval = null;
    this.remainingSeconds = 10;
    this.previousFrameData = null;
    this.danceEnergy = 0;

    // EXACT values specified in requirements: DO NOT MODIFY
    this.scoreChoices = [-6767, 10000, 0, 5, -3, 99];

    this.modalEl = null;
    this.videoEl = null;
    this.fallbackEl = null;
    this.countdownEl = null;
    this.energyBarEl = null;
    this.resultEl = null;
    this.scoreValueEl = null;
    this.followupMessageEl = null;
  }

  init() {
    this.modalEl = document.getElementById('danceViewModal');
    this.videoEl = document.getElementById('danceVideo');
    this.fallbackEl = document.getElementById('danceFallback');
    this.countdownEl = document.getElementById('danceCountdownNumber');
    this.energyBarEl = document.getElementById('danceEnergyFill');
    this.resultEl = document.getElementById('danceResultScreen');
    this.scoreValueEl = document.getElementById('danceScoreValue');
    this.followupMessageEl = document.getElementById('danceFollowupMessage');

    const changeViewBtn = document.getElementById('btnChangeView');
    if (changeViewBtn) {
      changeViewBtn.addEventListener('click', () => this.start());
    }

    const closeBtn = document.getElementById('btnCloseDance');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.stopAndClose());
    }

    const danceAgainBtn = document.getElementById('btnDanceAgain');
    if (danceAgainBtn) {
      danceAgainBtn.addEventListener('click', () => {
        this.resetUI();
        this.startCountdown();
      });
    }
  }

  async start() {
    if (this.isActive) return;
    this.isActive = true;
    this.resetUI();
    this.modalEl.classList.add('active');

    // ONLY request camera permission at this exact moment after user clicked "Change View"
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false
        });
        this.videoStream = stream;
        this.videoEl.srcObject = stream;
        this.videoEl.style.display = 'block';
        this.fallbackEl.style.display = 'none';
        this.startMotionDetection();
      } else {
        this.showFallback();
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable; continuing with friendly fallback:', err);
      this.showFallback();
    }

    this.startCountdown();
  }

  showFallback() {
    if (this.videoEl) this.videoEl.style.display = 'none';
    if (this.fallbackEl) this.fallbackEl.style.display = 'flex';
  }

  resetUI() {
    this.remainingSeconds = 10;
    if (this.countdownEl) this.countdownEl.textContent = '10';
    if (this.energyBarEl) this.energyBarEl.style.width = '0%';
    if (this.resultEl) this.resultEl.style.display = 'none';
    if (this.followupMessageEl) {
      this.followupMessageEl.classList.remove('show-comment');
    }
    const activeHUD = document.getElementById('danceActiveHUD');
    if (activeHUD) activeHUD.style.display = 'flex';
  }

  startCountdown() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    this.remainingSeconds = 10;
    if (this.countdownEl) this.countdownEl.textContent = '10';

    this.countdownTimer = setInterval(() => {
      this.remainingSeconds--;
      if (this.countdownEl) {
        this.countdownEl.textContent = this.remainingSeconds.toString();
        this.countdownEl.classList.remove('pulse-pop');
        void this.countdownEl.offsetWidth; // trigger reflow
        this.countdownEl.classList.add('pulse-pop');
      }

      // Procedural countdown tick
      if (window.soundCtrl) {
        window.soundCtrl.playTone(600 + (10 - this.remainingSeconds) * 40, 'sine', 0.08, 0.15);
      }

      if (this.remainingSeconds <= 0) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
        this.finishDance();
      }
    }, 1000);
  }

  startMotionDetection() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 48;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    this.motionInterval = setInterval(() => {
      if (!this.isActive || !this.videoStream) return;
      try {
        ctx.drawImage(this.videoEl, 0, 0, canvas.width, canvas.height);
        const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (this.previousFrameData) {
          let diffSum = 0;
          const curr = currentFrame.data;
          const prev = this.previousFrameData.data;
          for (let i = 0; i < curr.length; i += 4) {
            const d = Math.abs(curr[i] - prev[i]) + Math.abs(curr[i+1] - prev[i+1]) + Math.abs(curr[i+2] - prev[i+2]);
            if (d > 35) diffSum++;
          }
          const energy = Math.min(100, Math.floor((diffSum / (canvas.width * canvas.height * 0.35)) * 100));
          this.danceEnergy = Math.max(15, energy);
          if (this.energyBarEl) {
            this.energyBarEl.style.width = `${this.danceEnergy}%`;
          }
        }
        this.previousFrameData = currentFrame;
      } catch (e) {}
    }, 100);
  }

  finishDance() {
    // 1. Stop camera tracking & media streams cleanly
    if (this.motionInterval) {
      clearInterval(this.motionInterval);
      this.motionInterval = null;
    }
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }

    // 2. Randomly select EXACTLY ONE value from [-6767, 10000, 0, 5, -3, 99]
    const chosenValue = this.scoreChoices[Math.floor(Math.random() * this.scoreChoices.length)];

    // 3. Display selected value EXACTLY as VALUE/10
    const formattedScore = `${chosenValue}/10`;

    // 4. Play developer-provided audio file
    if (window.soundCtrl) {
      window.soundCtrl.playRatingAudio();
    }

    // 5. Reveal result overlay
    const activeHUD = document.getElementById('danceActiveHUD');
    if (activeHUD) activeHUD.style.display = 'none';

    if (this.scoreValueEl) {
      this.scoreValueEl.textContent = formattedScore;
    }
    if (this.resultEl) {
      this.resultEl.style.display = 'flex';
      this.resultEl.classList.add('bounce-in');
    }

    // 6. Sequence: SCORE APPEARS -> "ahh polich petta thala polum sahikilla" (comedic animation)
    setTimeout(() => {
      if (this.followupMessageEl) {
        this.followupMessageEl.classList.add('show-comment');
      }
      if (this.resultEl) {
        this.resultEl.classList.add('comic-screen-shake');
        setTimeout(() => this.resultEl.classList.remove('comic-screen-shake'), 600);
      }
    }, 400);
  }

  stopAndClose() {
    this.isActive = false;
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
    if (this.motionInterval) {
      clearInterval(this.motionInterval);
      this.motionInterval = null;
    }
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }
    if (this.videoEl) {
      this.videoEl.srcObject = null;
    }
    if (this.modalEl) {
      this.modalEl.classList.remove('active');
    }
  }
}

window.danceModeMgr = new DanceModeManager();

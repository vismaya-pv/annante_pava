// ==================================================
// AUDIO CONFIGURATION
// ==================================================
// Replace these placeholders with your actual audio file paths or URLs.
// Example: rating: "assets/audio/rating.mp3"
// If left as-is or missing, the game will automatically use procedural
// kawaii arcade sound effects and will NEVER crash!
const AUDIO_CONFIG = {
    rating: "YOUR_RATING_AUDIO_HERE",
    music: "YOUR_MUSIC_AUDIO_HERE",
    blessing: "YOUR_BLESSING_AUDIO_HERE",
    doNotPress: "YOUR_DO_NOT_PRESS_AUDIO_HERE"
};

// Global Sound Management & Web Audio API Procedural Synthesizer
class SoundController {
  constructor() {
    this.audioConfig = AUDIO_CONFIG;
    this.soundEnabled = true;
    this.musicPlaying = false;
    this.musicAudioEl = null;
    this.synthBgmInterval = null;
    this.audioCtx = null;
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
    if (!enabled) {
      this.stopMusic();
    }
  }

  isConfiguredAudio(key) {
    const val = this.audioConfig[key];
    return val && typeof val === 'string' && !val.includes('YOUR_') && val.trim().length > 0;
  }

  playConfiguredOrFallback(key, fallbackFn) {
    if (!this.soundEnabled) return;
    if (this.isConfiguredAudio(key)) {
      try {
        const audio = new Audio(this.audioConfig[key]);
        audio.play().catch(err => {
          console.warn(`Custom audio for "${key}" failed to play, using synth fallback:`, err);
          fallbackFn && fallbackFn();
        });
      } catch (e) {
        fallbackFn && fallbackFn();
      }
    } else {
      fallbackFn && fallbackFn();
    }
  }

  // Procedural Sound Effects via Web Audio API
  playTone(freq, type = 'sine', duration = 0.15, vol = 0.25, startDelay = 0) {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    setTimeout(() => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {}
    }, startDelay * 1000);
  }

  playMotorMove() {
    if (!this.soundEnabled) return;
    this.playTone(180, 'square', 0.04, 0.05);
  }

  playDropButton() {
    if (!this.soundEnabled) return;
    this.playTone(480, 'triangle', 0.08, 0.3);
    this.playTone(320, 'sine', 0.12, 0.3, 0.04);
  }

  playClawLower() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    for (let i = 0; i < 6; i++) {
      this.playTone(380 - i * 35, 'triangle', 0.07, 0.15, i * 0.12);
    }
  }

  playClawGrab() {
    if (!this.soundEnabled) return;
    this.playTone(280, 'sawtooth', 0.1, 0.25);
    this.playTone(550, 'triangle', 0.15, 0.2, 0.05);
  }

  playClawLift() {
    if (!this.soundEnabled) return;
    for (let i = 0; i < 5; i++) {
      this.playTone(240 + i * 40, 'triangle', 0.07, 0.15, i * 0.1);
    }
  }

  playChuteDrop() {
    if (!this.soundEnabled) return;
    this.playTone(140, 'sine', 0.25, 0.4);
    this.playTone(90, 'triangle', 0.35, 0.3, 0.08);
  }

  playWinFanfare() {
    if (!this.soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.22, 0.25, idx * 0.09);
    });
  }

  playTrapdoorMotor() {
    if (!this.soundEnabled) return;
    for (let i = 0; i < 4; i++) {
      this.playTone(210 + i * 15, 'sawtooth', 0.08, 0.12, i * 0.08);
    }
  }

  playTrapdoorSlam() {
    if (!this.soundEnabled) return;
    this.playTone(90, 'square', 0.15, 0.4);
    this.playTone(60, 'sawtooth', 0.25, 0.35, 0.04);
  }

  playFailSound() {
    if (!this.soundEnabled) return;
    // Comedic wah-wah-wah-waaaah
    const notes = [466.16, 440.00, 415.30, 369.99]; // Bb4, A4, Ab4, F#4
    notes.forEach((f, idx) => {
      this.playTone(f, 'sawtooth', idx === 3 ? 0.6 : 0.22, 0.22, idx * 0.22);
    });
  }

  playBlessing() {
    this.playConfiguredOrFallback('blessing', () => {
      // Celestial cute harp arpeggio
      const notes = [587.33, 739.99, 880.00, 1108.73, 1174.66, 1479.98]; // D5, F#5, A5, C#6, D6, F#6
      notes.forEach((freq, idx) => {
        this.playTone(freq, 'sine', 0.4, 0.22, idx * 0.08);
      });
      setTimeout(() => {
        this.playTone(1760.00, 'triangle', 0.6, 0.2); // A6 shimmer
      }, 550);
    });
  }

  playDoNotPress() {
    this.playConfiguredOrFallback('doNotPress', () => {
      // Comic buzz alarm / spring bonk
      const ctx = this.getAudioContext();
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);

        // Second bonk
        setTimeout(() => {
          this.playTone(95, 'sawtooth', 0.3, 0.35);
        }, 180);
      } catch (e) {}
    });
  }

  playRatingAudio() {
    this.playConfiguredOrFallback('rating', () => {
      // Dramatic comedic arcade fanfare
      const notes = [440, 554.37, 659.25, 880, 830.61, 880];
      notes.forEach((f, i) => {
        this.playTone(f, 'square', 0.18, 0.2, i * 0.1);
      });
    });
  }

  // Background Music (Custom track or Procedural Kawaii Chiptune loop)
  toggleMusic() {
    if (this.musicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  startMusic() {
    if (!this.soundEnabled) return;
    this.musicPlaying = true;

    if (this.isConfiguredAudio('music')) {
      try {
        if (!this.musicAudioEl) {
          this.musicAudioEl = new Audio(this.audioConfig.music);
          this.musicAudioEl.loop = true;
        }
        this.musicAudioEl.play().catch(err => {
          console.warn('Custom music failed to play, falling back to synth chiptune:', err);
          this.startSynthChiptune();
        });
      } catch (e) {
        this.startSynthChiptune();
      }
    } else {
      this.startSynthChiptune();
    }
  }

  stopMusic() {
    this.musicPlaying = false;
    if (this.musicAudioEl) {
      try {
        this.musicAudioEl.pause();
        this.musicAudioEl.currentTime = 0;
      } catch (e) {}
    }
    if (this.synthBgmInterval) {
      clearInterval(this.synthBgmInterval);
      this.synthBgmInterval = null;
    }
  }

  startSynthChiptune() {
    if (this.synthBgmInterval) return;
    // Cute, upbeat, gentle pentatonic melody
    const melody = [
      523.25, 659.25, 783.99, 659.25, 880.00, 783.99, 659.25, 587.33,
      523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 0
    ];
    let noteIdx = 0;
    this.synthBgmInterval = setInterval(() => {
      if (!this.musicPlaying || !this.soundEnabled) return;
      const freq = melody[noteIdx];
      if (freq > 0) {
        this.playTone(freq, 'triangle', 0.15, 0.08);
        if (noteIdx % 4 === 0) {
          this.playTone(freq / 2, 'sine', 0.2, 0.06); // bass note
        }
      }
      noteIdx = (noteIdx + 1) % melody.length;
    }, 220);
  }
}

window.AUDIO_CONFIG = AUDIO_CONFIG;
window.soundCtrl = new SoundController();

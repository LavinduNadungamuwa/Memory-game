import { useCallback } from 'react';

export const useSoundEffects = (enabled: boolean = true) => {
  // Create audio context for better browser compatibility
  const createAudioContext = useCallback(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    return new AudioContext();
  }, []);

  // Generate match sound - a pleasant chime
  const playMatchSound = useCallback(() => {
    if (!enabled) return;
    
    try {
      const audioContext = createAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Create a pleasant chord progression
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
      
      frequencies.forEach((freq, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);
        osc.type = 'sine';
        
        // Envelope for smooth sound
        gain.gain.setValueAtTime(0, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        osc.start(audioContext.currentTime + index * 0.1);
        osc.stop(audioContext.currentTime + 0.6);
      });
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  }, [createAudioContext, enabled]);

  // Generate level complete sound - triumphant fanfare
  const playLevelCompleteSound = useCallback(() => {
    if (!enabled) return;
    
    try {
      const audioContext = createAudioContext();
      
      // Victory fanfare sequence
      const melody = [
        { freq: 523.25, time: 0 },    // C5
        { freq: 659.25, time: 0.15 }, // E5
        { freq: 783.99, time: 0.3 },  // G5
        { freq: 1046.5, time: 0.45 }, // C6
        { freq: 783.99, time: 0.6 },  // G5
        { freq: 1046.5, time: 0.75 }, // C6
      ];

      melody.forEach(({ freq, time }) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + time);
        oscillator.type = 'triangle';
        
        // Envelope
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + time);
        gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + time + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 0.2);
        
        oscillator.start(audioContext.currentTime + time);
        oscillator.stop(audioContext.currentTime + time + 0.2);
      });

      // Add some harmonic richness with a bass note
      const bassOsc = audioContext.createOscillator();
      const bassGain = audioContext.createGain();
      
      bassOsc.connect(bassGain);
      bassGain.connect(audioContext.destination);
      
      bassOsc.frequency.setValueAtTime(130.81, audioContext.currentTime); // C3
      bassOsc.type = 'sawtooth';
      
      bassGain.gain.setValueAtTime(0, audioContext.currentTime);
      bassGain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.01);
      bassGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      bassOsc.start(audioContext.currentTime);
      bassOsc.stop(audioContext.currentTime + 1);
      
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  }, [createAudioContext, enabled]);

  return {
    playMatchSound,
    playLevelCompleteSound,
    playTapSound,
    playLevelStartSound
  };
};

  // Generate tap sound - a subtle click
  const playTapSound = useCallback(() => {
    if (!enabled) return;
    
    try {
      const audioContext = createAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Quick percussive sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
      oscillator.type = 'square';
      
      // High-pass filter for crisp sound
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(300, audioContext.currentTime);
      
      // Quick envelope for tap effect
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  }, [createAudioContext, enabled]);

  // Generate level start sound - an uplifting ascending tone
  const playLevelStartSound = useCallback(() => {
    if (!enabled) return;
    
    try {
      const audioContext = createAudioContext();
      
      // Ascending arpeggio to signal start
      const startMelody = [
        { freq: 261.63, time: 0 },    // C4
        { freq: 329.63, time: 0.1 },  // E4
        { freq: 392.00, time: 0.2 },  // G4
        { freq: 523.25, time: 0.3 },  // C5
      ];

      startMelody.forEach(({ freq, time }) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + time);
        oscillator.type = 'sine';
        
        // Smooth envelope
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + time);
        gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + time + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 0.15);
        
        oscillator.start(audioContext.currentTime + time);
        oscillator.stop(audioContext.currentTime + time + 0.15);
      });
      
      // Add a subtle sustain chord
      const chordFreqs = [261.63, 329.63, 392.00]; // C-E-G chord
      chordFreqs.forEach((freq) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(freq, audioContext.currentTime + 0.4);
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(0, audioContext.currentTime + 0.4);
        gain.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 0.42);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);
        
        osc.start(audioContext.currentTime + 0.4);
        osc.stop(audioContext.currentTime + 0.8);
      });
      
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  }, [createAudioContext, enabled]);
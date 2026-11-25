class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private voicesLoaded = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    if (this.voices.length > 0) {
      this.voicesLoaded = true;
    }
  }

  speak(text: string, lang: 'es-ES' | 'en-US' | 'en-GB' = 'es-ES', rate = 0.88): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve();
        return;
      }

      this.synth.cancel(); // cancel any active speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate; // clear and slightly slower for 6-year-olds
      utterance.pitch = 1.05; // warm and friendly

      // Find the best voice for the requested language
      if (this.voices.length > 0) {
        const matchingVoice = this.voices.find(v => v.lang.startsWith(lang.slice(0, 2)) && (v.lang === lang || v.name.includes('Natural') || v.name.includes('Google')));
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      this.synth.speak(utterance);
    });
  }

  speakSpanish(text: string): Promise<void> {
    return this.speak(text, 'es-ES', 0.9);
  }

  speakEnglish(text: string): Promise<void> {
    return this.speak(text, 'en-US', 0.82);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const speechService = new SpeechService();

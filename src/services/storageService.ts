import { IProgressRepository, UserProfile, Exercise, Trophy, Subject, ReviewItem } from '../types/education';

const STORAGE_KEY = 'wiskids_profile_v1';

export const INITIAL_TROPHIES: Trophy[] = [
  {
    id: 'pichichi_numeros',
    title: 'Pichichi de los Números',
    description: 'Acierta 15 operaciones de matemáticas.',
    icon: '⚽',
    category: 'matematicas',
    unlocked: false,
    progress: 0,
    target: 15
  },
  {
    id: 'explorador_mapa',
    title: 'Explorador del Mapa',
    description: 'Encuentra 10 lugares en el mapa interactivo.',
    icon: '🧭',
    category: 'geografia',
    unlocked: false,
    progress: 0,
    target: 10
  },
  {
    id: 'mvp_lectura',
    title: 'MVP de las Letras',
    description: 'Completa 10 retos de lectura o escritura.',
    icon: '📖',
    category: 'lenguaje',
    unlocked: false,
    progress: 0,
    target: 10
  },
  {
    id: 'champion_english',
    title: 'Star Speaker',
    description: 'Domina 10 palabras en inglés.',
    icon: '🇬🇧',
    category: 'ingles',
    unlocked: false,
    progress: 0,
    target: 10
  },
  {
    id: 'racha_3_dias',
    title: 'Racha Imparable',
    description: 'Entrena durante 3 días seguidos.',
    icon: '🔥',
    category: 'general',
    unlocked: false,
    progress: 1,
    target: 3
  },
  {
    id: 'remontada_perfecta',
    title: 'Remontada Perfecta',
    description: 'Vacía por completo el buzón de retos superando tus fallos.',
    icon: '🏆',
    category: 'general',
    unlocked: false,
    progress: 0,
    target: 1
  }
];

export const INITIAL_PROFILE: UserProfile = {
  id: 'wiskids-hero-1',
  name: 'Leo',
  pin: '1234',
  age: 6,
  avatar: '🦁',
  stars: 12,
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  dailyGoalMinutes: 12,
  dailyCompletedToday: false,
  completedSessionsCount: 0,
  subjectStats: {
    lenguaje: { attempted: 0, correct: 0, level: 1, streak: 0 },
    matematicas: { attempted: 0, correct: 0, level: 1, streak: 0 },
    geografia: { attempted: 0, correct: 0, level: 1, streak: 0 },
    ingles: { attempted: 0, correct: 0, level: 1, streak: 0 }
  },
  trophies: INITIAL_TROPHIES,
  reviewQueue: []
};

export class LocalStorageRepository implements IProgressRepository {
  async getProgress(): Promise<UserProfile> {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        await this.saveProgress(INITIAL_PROFILE);
        return INITIAL_PROFILE;
      }
      const profile = JSON.parse(data) as UserProfile;
      this.checkDailyStreak(profile);
      return profile;
    } catch (err) {
      console.error('Error reading user profile from localStorage:', err);
      return INITIAL_PROFILE;
    }
  }

  async saveProgress(profile: UserProfile): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (err) {
      console.error('Error saving user profile to localStorage:', err);
    }
  }

  private checkDailyStreak(profile: UserProfile): boolean {
    const today = new Date().toISOString().split('T')[0];
    if (profile.lastActiveDate === today) {
      return false;
    }

    const last = new Date(profile.lastActiveDate);
    const curr = new Date(today);
    const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 1) {
      profile.streak += 1;
    } else if (diffDays > 1) {
      profile.streak = 1;
    }

    profile.lastActiveDate = today;
    profile.dailyCompletedToday = false;
    this.updateTrophies(profile);
    this.saveProgress(profile);
    return true;
  }

  async recordExerciseResult(exercise: Exercise, isCorrect: boolean): Promise<UserProfile> {
    const profile = await this.getProgress();
    const sub = exercise.subject;
    const stats = profile.subjectStats[sub];

    stats.attempted += 1;
    if (isCorrect) {
      stats.correct += 1;
      stats.streak += 1;
      // Normal star + streak bonus
      profile.stars += stats.streak >= 3 ? 2 : 1;
    } else {
      stats.streak = 0;
    }

    // Review Queue logic (Buzón de Retos)
    // Rule: item exits queue only when consecutiveCorrect >= 2
    const queueIndex = profile.reviewQueue.findIndex(r => r.exerciseId === exercise.id);
    const today = new Date().toISOString();

    if (queueIndex >= 0) {
      const item = profile.reviewQueue[queueIndex];
      item.lastAttemptDate = today;
      item.history.push({ date: today, success: isCorrect });

      if (isCorrect) {
        item.consecutiveCorrect += 1;
        if (item.consecutiveCorrect >= 2) {
          // Cleared from review queue!
          profile.reviewQueue.splice(queueIndex, 1);
          if (profile.reviewQueue.length === 0) {
            // Remontada perfecta achievement!
            const t = profile.trophies.find(t => t.id === 'remontada_perfecta');
            if (t) {
              t.progress = 1;
              t.unlocked = true;
              t.unlockedAt = today;
            }
          }
        }
      } else {
        item.failedCount += 1;
        item.consecutiveCorrect = 0; // reset consecutive streak
      }
    } else if (!isCorrect) {
      // Add to review queue
      profile.reviewQueue.push({
        exerciseId: exercise.id,
        exercise,
        failedCount: 1,
        consecutiveCorrect: 0,
        lastAttemptDate: today,
        history: [{ date: today, success: false }]
      });
    }

    this.updateTrophies(profile);
    await this.saveProgress(profile);
    return profile;
  }

  private updateTrophies(profile: UserProfile): void {
    const now = new Date().toISOString();

    profile.trophies.forEach(t => {
      if (t.unlocked) return;

      if (t.id === 'pichichi_numeros') {
        t.progress = profile.subjectStats.matematicas.correct;
      } else if (t.id === 'explorador_mapa') {
        t.progress = profile.subjectStats.geografia.correct;
      } else if (t.id === 'mvp_lectura') {
        t.progress = profile.subjectStats.lenguaje.correct;
      } else if (t.id === 'champion_english') {
        t.progress = profile.subjectStats.ingles.correct;
      } else if (t.id === 'racha_3_dias') {
        t.progress = profile.streak;
      }

      if (t.progress >= t.target) {
        t.unlocked = true;
        t.unlockedAt = now;
      }
    });
  }

  async exportData(): Promise<string> {
    const profile = await this.getProgress();
    const jsonStr = JSON.stringify(profile);
    // Compact Base64 code with header
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
    return `WISKID-${encoded}`;
  }

  async importData(codeOrJson: string): Promise<UserProfile> {
    try {
      let rawJson = codeOrJson.trim();
      if (rawJson.startsWith('WISKID-')) {
        const base64 = rawJson.replace('WISKID-', '');
        rawJson = decodeURIComponent(escape(atob(base64)));
      } else if (rawJson.startsWith('SKID-')) {
        const base64 = rawJson.replace('SKID-', '');
        rawJson = decodeURIComponent(escape(atob(base64)));
      }
      const parsed = JSON.parse(rawJson) as UserProfile;
      if (!parsed.id || !parsed.subjectStats) {
        throw new Error('Estructura de perfil inválida');
      }
      await this.saveProgress(parsed);
      return parsed;
    } catch (err) {
      console.error('Error importing progress:', err);
      throw new Error('El código o JSON introducido no es válido.');
    }
  }

  async syncWithCloud(_profileId: string, _pin: string): Promise<UserProfile> {
    // Cloud sync implementation ready for Supabase or Firebase
    return this.getProgress();
  }

  async resetProgress(): Promise<UserProfile> {
    const fresh = { ...INITIAL_PROFILE, lastActiveDate: new Date().toISOString().split('T')[0] };
    await this.saveProgress(fresh);
    return fresh;
  }
}

// Ready-to-connect Supabase/Firebase cloud repository
export class CloudSyncRepository implements IProgressRepository {
  private localFallback = new LocalStorageRepository();
  private supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
  private supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

  async getProgress(): Promise<UserProfile> {
    if (!this.supabaseUrl || !this.supabaseKey) {
      return this.localFallback.getProgress();
    }
    // Remote fetch using standard fetch to Supabase REST endpoint
    try {
      const local = await this.localFallback.getProgress();
      const res = await fetch(`${this.supabaseUrl}/rest/v1/profiles?id=eq.${local.id}`, {
        headers: {
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`
        }
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows.length > 0 && rows[0].data) {
          await this.localFallback.saveProgress(rows[0].data);
          return rows[0].data;
        }
      }
    } catch (e) {
      console.warn('Cloud fetch failed, using local storage:', e);
    }
    return this.localFallback.getProgress();
  }

  async saveProgress(profile: UserProfile): Promise<void> {
    await this.localFallback.saveProgress(profile);
    if (!this.supabaseUrl || !this.supabaseKey) return;
    try {
      await fetch(`${this.supabaseUrl}/rest/v1/profiles`, {
        method: 'POST',
        headers: {
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({ id: profile.id, pin: profile.pin, data: profile, updated_at: new Date().toISOString() })
      });
    } catch (e) {
      console.warn('Cloud upload failed:', e);
    }
  }

  async recordExerciseResult(exercise: Exercise, isCorrect: boolean): Promise<UserProfile> {
    const updated = await this.localFallback.recordExerciseResult(exercise, isCorrect);
    this.saveProgress(updated).catch(() => {});
    return updated;
  }

  async exportData(): Promise<string> {
    return this.localFallback.exportData();
  }

  async importData(codeOrJson: string): Promise<UserProfile> {
    const imported = await this.localFallback.importData(codeOrJson);
    this.saveProgress(imported).catch(() => {});
    return imported;
  }

  async syncWithCloud(profileId: string, pin: string): Promise<UserProfile> {
    if (!this.supabaseUrl || !this.supabaseKey) {
      return this.localFallback.getProgress();
    }
    try {
      const res = await fetch(`${this.supabaseUrl}/rest/v1/profiles?id=eq.${profileId}&pin=eq.${pin}`, {
        headers: {
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`
        }
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows.length > 0 && rows[0].data) {
          await this.localFallback.saveProgress(rows[0].data);
          return rows[0].data;
        }
      }
    } catch (e) {
      console.error('Error in syncWithCloud:', e);
    }
    return this.localFallback.getProgress();
  }

  async resetProgress(): Promise<UserProfile> {
    return this.localFallback.resetProgress();
  }
}

export const storageService: IProgressRepository = new LocalStorageRepository();

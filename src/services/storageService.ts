import {
  IProgressRepository,
  UserProfile,
  Exercise,
  Trophy,
  Subject,
  ReviewItem,
  GeographyCategory,
  GeographyPassport
} from '../types/education';

const STORAGE_KEY = 'wiskids_profile_v1';

export function getCurrentWeekId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const firstJan = new Date(year, 0, 1);
  const dayOfYear = Math.floor((now.getTime() - firstJan.getTime()) / (24 * 60 * 60 * 1000));
  const weekNum = Math.ceil((dayOfYear + firstJan.getDay() + 1) / 7);
  return `${year}-W${String(weekNum).padStart(2, '0')}`;
}

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
    id: 'maestro_memoria',
    title: 'Mente Prodigiosa',
    description: 'Supera 10 retos del gimnasio de memoria.',
    icon: '🧠',
    category: 'memoria',
    unlocked: false,
    progress: 0,
    target: 10
  },
  {
    id: 'as_sexta_hora',
    title: 'As de 6ª Hora',
    description: 'Supera 10 retos de razonamiento y refuerzo escolar.',
    icon: '🎒',
    category: 'sexta_hora',
    unlocked: false,
    progress: 0,
    target: 10
  },
  {
    id: 'trotamundos_semanal',
    title: 'Pasaporte Trotamundos',
    description: 'Completa las 8 misiones geográficas en una misma semana.',
    icon: '🗺️',
    category: 'geografia',
    unlocked: false,
    progress: 0,
    target: 8
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
  name: 'Wis',
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
    ingles: { attempted: 0, correct: 0, level: 1, streak: 0 },
    memoria: { attempted: 0, correct: 0, level: 1, streak: 0 },
    sexta_hora: { attempted: 0, correct: 0, level: 1, streak: 0 }
  },
  trophies: INITIAL_TROPHIES,
  reviewQueue: [],
  geographyPassport: {
    weekId: getCurrentWeekId(),
    completedCategories: [],
    lastCompletedDate: {}
  }
};

export class LocalStorageRepository implements IProgressRepository {
  private activeUserId: string | null = null;

  setActiveUserId(userId: string | null) {
    this.activeUserId = userId;
  }

  private getKey(userId?: string): string {
    const id = userId || this.activeUserId;
    return id ? `${STORAGE_KEY}_${id}` : STORAGE_KEY;
  }

  async getProgress(userId?: string): Promise<UserProfile> {
    try {
      const key = this.getKey(userId);
      const data = localStorage.getItem(key);
      if (!data) {
        const initial = { ...INITIAL_PROFILE, id: userId || INITIAL_PROFILE.id };
        await this.saveProgress(initial, userId);
        return initial;
      }
      const profile = JSON.parse(data) as UserProfile;
      if (!profile.subjectStats) {
        profile.subjectStats = { ...INITIAL_PROFILE.subjectStats };
      }
      if (!profile.subjectStats.memoria) {
        profile.subjectStats.memoria = { attempted: 0, correct: 0, level: 1, streak: 0 };
      }
      if (!profile.subjectStats.sexta_hora) {
        profile.subjectStats.sexta_hora = { attempted: 0, correct: 0, level: 1, streak: 0 };
      }
      const currentWeek = getCurrentWeekId();
      if (!profile.geographyPassport) {
        profile.geographyPassport = {
          weekId: currentWeek,
          completedCategories: [],
          lastCompletedDate: {}
        };
      } else if (profile.geographyPassport.weekId !== currentWeek) {
        profile.geographyPassport.weekId = currentWeek;
        profile.geographyPassport.completedCategories = [];
      }
      this.checkDailyStreak(profile);
      return profile;
    } catch (err) {
      console.error('Error reading user profile from localStorage:', err);
      return INITIAL_PROFILE;
    }
  }

  async saveProgress(profile: UserProfile, userId?: string): Promise<void> {
    try {
      const key = this.getKey(userId);
      localStorage.setItem(key, JSON.stringify(profile));
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

  async recordExerciseResult(exercise: Exercise, isCorrect: boolean, userId?: string): Promise<UserProfile> {
    const profile = await this.getProgress(userId);
    const sub = exercise.subject;
    if (!profile.subjectStats[sub]) {
      profile.subjectStats[sub] = { attempted: 0, correct: 0, level: 1, streak: 0 };
    }
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
    await this.saveProgress(profile, userId);
    return profile;
  }

  private updateTrophies(profile: UserProfile): void {
    const now = new Date().toISOString();

    profile.trophies.forEach(t => {
      if (t.unlocked) return;

      if (t.id === 'pichichi_numeros') {
        t.progress = profile.subjectStats.matematicas?.correct || 0;
      } else if (t.id === 'explorador_mapa') {
        t.progress = profile.subjectStats.geografia?.correct || 0;
      } else if (t.id === 'mvp_lectura') {
        t.progress = profile.subjectStats.lenguaje?.correct || 0;
      } else if (t.id === 'champion_english') {
        t.progress = profile.subjectStats.ingles?.correct || 0;
      } else if (t.id === 'maestro_memoria') {
        t.progress = profile.subjectStats.memoria?.correct || 0;
      } else if (t.id === 'as_sexta_hora') {
        t.progress = profile.subjectStats.sexta_hora?.correct || 0;
      } else if (t.id === 'trotamundos_semanal') {
        t.progress = profile.geographyPassport?.completedCategories.length || 0;
      } else if (t.id === 'racha_3_dias') {
        t.progress = profile.streak;
      }

      if (t.progress >= t.target) {
        t.unlocked = true;
        t.unlockedAt = now;
      }
    });
  }

  async recordGeographyCategoryCompletion(category: GeographyCategory, userId?: string): Promise<UserProfile> {
    const profile = await this.getProgress(userId);
    const currentWeek = getCurrentWeekId();
    if (!profile.geographyPassport || profile.geographyPassport.weekId !== currentWeek) {
      profile.geographyPassport = {
        weekId: currentWeek,
        completedCategories: [],
        lastCompletedDate: {}
      };
    }

    if (!profile.geographyPassport.completedCategories.includes(category)) {
      profile.geographyPassport.completedCategories.push(category);
    }
    profile.geographyPassport.lastCompletedDate[category] = new Date().toISOString();

    this.updateTrophies(profile);
    await this.saveProgress(profile, userId);
    return profile;
  }

  async exportData(userId?: string): Promise<string> {
    const profile = await this.getProgress(userId);
    const jsonStr = JSON.stringify(profile);
    // Compact Base64 code with header
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
    return `WISKID-${encoded}`;
  }

  async importData(codeOrJson: string, userId?: string): Promise<UserProfile> {
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
      await this.saveProgress(parsed, userId);
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

  async resetProgress(userId?: string): Promise<UserProfile> {
    const fresh = { ...INITIAL_PROFILE, id: userId || INITIAL_PROFILE.id, lastActiveDate: new Date().toISOString().split('T')[0] };
    await this.saveProgress(fresh, userId);
    return fresh;
  }
}

// Ready-to-connect Supabase/Firebase cloud repository
export class CloudSyncRepository implements IProgressRepository {
  private localFallback = new LocalStorageRepository();
  private supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
  private supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

  async getProgress(userId?: string): Promise<UserProfile> {
    if (!this.supabaseUrl || !this.supabaseKey) {
      return this.localFallback.getProgress(userId);
    }
    // Remote fetch using standard fetch to Supabase REST endpoint
    try {
      const local = await this.localFallback.getProgress(userId);
      const res = await fetch(`${this.supabaseUrl}/rest/v1/profiles?id=eq.${local.id}`, {
        headers: {
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`
        }
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows.length > 0 && rows[0].data) {
          await this.localFallback.saveProgress(rows[0].data, userId);
          return rows[0].data;
        }
      }
    } catch (e) {
      console.warn('Cloud fetch failed, using local storage:', e);
    }
    return this.localFallback.getProgress(userId);
  }

  async saveProgress(profile: UserProfile, userId?: string): Promise<void> {
    await this.localFallback.saveProgress(profile, userId);
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

  async recordExerciseResult(exercise: Exercise, isCorrect: boolean, userId?: string): Promise<UserProfile> {
    const updated = await this.localFallback.recordExerciseResult(exercise, isCorrect, userId);
    this.saveProgress(updated, userId).catch(() => {});
    return updated;
  }

  async recordGeographyCategoryCompletion(category: GeographyCategory, userId?: string): Promise<UserProfile> {
    const updated = await this.localFallback.recordGeographyCategoryCompletion(category, userId);
    this.saveProgress(updated, userId).catch(() => {});
    return updated;
  }

  async exportData(userId?: string): Promise<string> {
    return this.localFallback.exportData(userId);
  }

  async importData(codeOrJson: string, userId?: string): Promise<UserProfile> {
    const imported = await this.localFallback.importData(codeOrJson, userId);
    this.saveProgress(imported, userId).catch(() => {});
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

  async resetProgress(userId?: string): Promise<UserProfile> {
    return this.localFallback.resetProgress(userId);
  }
}

export const storageService: IProgressRepository = new LocalStorageRepository();

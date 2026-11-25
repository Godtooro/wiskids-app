export type Subject = 'lenguaje' | 'matematicas' | 'geografia' | 'ingles';

export type ExerciseType =
  // Lenguaje
  | 'reading'
  | 'ordering'
  | 'completion'
  | 'dictation'
  // Matemáticas
  | 'horizontal_math'
  | 'vertical_math'
  | 'visual_multiplication'
  | 'table_multiplication'
  // Geografía
  | 'map_pin'
  // Inglés
  | 'vocab_listen_choose'
  | 'vocab_match_word';

export interface BaseExercise {
  id: string;
  subject: Subject;
  level: number; // 1 = 6 años (1º Primaria), 2 = 7 años, etc.
  type: ExerciseType;
  title: string;
  instructions: string;
  hint?: string;
  funFact?: string;
}

export interface ReadingExerciseData extends BaseExercise {
  type: 'reading';
  storyTitle: string;
  storyText: string;
  illustration?: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }>;
}

export interface OrderingExerciseData extends BaseExercise {
  type: 'ordering';
  category: 'words' | 'syllables';
  items: string[]; // scrambled order
  correctOrder: string[]; // correct sequence
  targetSentence?: string;
  illustration?: string;
}

export interface CompletionExerciseData extends BaseExercise {
  type: 'completion';
  wordWithBlank: string; // e.g. "a__ión" or "ca__allero"
  options: string[]; // e.g. ["v", "b"]
  correctOption: string;
  illustration?: string;
  ruleExplanation?: string;
}

export interface DictationExerciseData extends BaseExercise {
  type: 'dictation';
  word: string;
  spokenText: string;
  language: 'es-ES' | 'en-US';
  illustration: string;
  optionsLetters?: string[]; // letters pool for touch keyboard
}

export interface MathExerciseData extends BaseExercise {
  type: 'horizontal_math' | 'vertical_math' | 'visual_multiplication' | 'table_multiplication';
  operation: '+' | '-' | 'x';
  operand1: number;
  operand2: number;
  expectedResult: number;
  visualItems?: {
    icon: string;
    groupCount: number;
    itemsPerGroup: number;
  };
  hasCarry?: boolean;
}

export interface GeographyExerciseData extends BaseExercise {
  type: 'map_pin';
  mapType: 'spain' | 'europe' | 'world';
  targetRegionId: string;
  targetRegionName: string;
  flagEmoji: string;
  funFact: string;
}

export interface EnglishExerciseData extends BaseExercise {
  type: 'vocab_listen_choose' | 'vocab_match_word';
  englishWord: string;
  spanishTranslation: string;
  audioText: string;
  category: 'animals' | 'colors' | 'numbers' | 'family' | 'sports' | 'food' | 'objects';
  options: Array<{
    id: string;
    label: string;
    imageOrEmoji: string;
  }>;
  correctOptionId: string;
}

export type Exercise =
  | ReadingExerciseData
  | OrderingExerciseData
  | CompletionExerciseData
  | DictationExerciseData
  | MathExerciseData
  | GeographyExerciseData
  | EnglishExerciseData;

export interface ReviewItem {
  exerciseId: string;
  exercise: Exercise;
  failedCount: number;
  consecutiveCorrect: number; // MUST be >= 2 to be cleared
  lastAttemptDate: string;
  history: Array<{
    date: string;
    success: boolean;
  }>;
}

export interface Trophy {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji or icon name
  category: Subject | 'general';
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  target: number;
}

export interface SubjectStats {
  attempted: number;
  correct: number;
  level: number;
  streak: number;
}

export interface UserProfile {
  id: string;
  name: string;
  pin: string;
  age: number;
  avatar: string;
  stars: number;
  streak: number;
  lastActiveDate: string;
  dailyGoalMinutes: number;
  dailyCompletedToday: boolean;
  completedSessionsCount: number;
  subjectStats: Record<Subject, SubjectStats>;
  trophies: Trophy[];
  reviewQueue: ReviewItem[];
}

export interface IProgressRepository {
  getProgress(userId?: string): Promise<UserProfile>;
  saveProgress(profile: UserProfile, userId?: string): Promise<void>;
  recordExerciseResult(exercise: Exercise, isCorrect: boolean, userId?: string): Promise<UserProfile>;
  exportData(userId?: string): Promise<string>;
  importData(codeOrJson: string, userId?: string): Promise<UserProfile>;
  syncWithCloud(profileId: string, pin: string): Promise<UserProfile>;
  resetProgress(userId?: string): Promise<UserProfile>;
}

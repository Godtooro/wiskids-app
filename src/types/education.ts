export type Subject = 'lenguaje' | 'matematicas' | 'geografia' | 'ingles' | 'memoria' | 'sexta_hora';

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
  | 'vocab_match_word'
  // Memoria
  | 'memory_cards'
  | 'memory_sequence'
  | 'memory_missing_item'
  // Refuerzo 1º Trimestre y 6ª Hora
  | 'math_school_challenge'
  | 'phonics_exercise'
  | 'reasoning_magic_triangle'
  | 'reasoning_secret_code';

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

export type GeographyCategory =
  | 'continentes'
  | 'capitales_europa'
  | 'capitales_asia'
  | 'capitales_africa'
  | 'capitales_america'
  | 'capitales_centroamerica'
  | 'espana_ccaa'
  | 'espana_provincias';

export interface GeographyPassport {
  weekId: string;
  completedCategories: GeographyCategory[];
  lastCompletedDate: Record<string, string>;
}

export interface GeographyExerciseData extends BaseExercise {
  type: 'map_pin';
  mapType:
    | 'spain'
    | 'europe'
    | 'world'
    | 'spain_ccaa'
    | 'spain_provinces'
    | 'europe_countries'
    | 'europe_capitals'
    | 'world_countries'
    | 'world_capitals'
    | 'continentes'
    | 'capitales_europa'
    | 'capitales_asia'
    | 'capitales_africa'
    | 'capitales_america'
    | 'capitales_centroamerica';
  targetType?: 'region' | 'city';
  targetRegionId: string;
  targetRegionName: string;
  flagEmoji: string;
  funFact: string;
  category?: GeographyCategory | 'ccaa' | 'provincial_capitals' | 'countries' | 'country_capitals';
}

export interface EnglishExerciseData extends BaseExercise {
  type: 'vocab_listen_choose' | 'vocab_match_word';
  englishWord: string;
  spanishTranslation: string;
  audioText: string;
  category:
    | 'animals'
    | 'colors'
    | 'numbers'
    | 'family'
    | 'sports'
    | 'food'
    | 'objects'
    | 'school'
    | 'classroom_instructions'
    | 'body'
    | 'days_weather'
    | 'culture';
  options: Array<{
    id: string;
    label: string;
    imageOrEmoji: string;
  }>;
  correctOptionId: string;
}

export interface MemoryCardsExerciseData extends BaseExercise {
  type: 'memory_cards';
  theme: 'animals' | 'fruits' | 'space' | 'sports';
  gridCols?: number;
  pairs: Array<{
    id: string;
    label: string;
    symbol: string;
  }>;
}

export interface MemorySequenceExerciseData extends BaseExercise {
  type: 'memory_sequence';
  sequenceLength: number;
  items: Array<{
    id: string;
    label: string;
    color: string;
    soundFreq: number;
    icon: string;
  }>;
  targetSequence: string[];
}

export interface MemoryMissingItemExerciseData extends BaseExercise {
  type: 'memory_missing_item';
  itemsShown: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  missingItemId: string;
  options: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  memorizeSeconds: number;
}

export interface MathSchoolChallengeData extends BaseExercise {
  type: 'math_school_challenge';
  subType: 'coins' | 'place_value' | 'ordinals' | 'series' | 'word_problem' | 'geometry_measure';
  question: string;
  illustration?: string;
  coinItems?: Array<{ value: 1 | 2; count: number }>;
  placeValueTens?: number;
  placeValueUnits?: number;
  options: Array<{ id: string; label: string; icon?: string }>;
  correctOptionId: string;
  explanation: string;
}

export interface PhonicsExerciseData extends BaseExercise {
  type: 'phonics_exercise';
  targetSound: string; // e.g. 's', 'a', 't', 'i', 'p', 'n', 'oa', 'ie'
  phonicsWord: string;
  audioText: string;
  illustration: string;
  options: Array<{ id: string; word: string; icon: string; startsWithSound: boolean }>;
  correctOptionId: string;
}

export interface MagicTriangleExerciseData extends BaseExercise {
  type: 'reasoning_magic_triangle';
  targetSum: number;
  corners: [number | null, number | null, number | null];
  midpoints: [number | null, number | null, number | null];
  availableNumbers: number[];
  solution: {
    corners: [number, number, number];
    midpoints: [number, number, number];
  };
}

export interface SecretCodeExerciseData extends BaseExercise {
  type: 'reasoning_secret_code';
  secretLength: number;
  colorPool: Array<{ id: string; name: string; colorHex: string; icon: string }>;
  targetCode: string[];
  maxTries: number;
}

export type Exercise =
  | ReadingExerciseData
  | OrderingExerciseData
  | CompletionExerciseData
  | DictationExerciseData
  | MathExerciseData
  | GeographyExerciseData
  | EnglishExerciseData
  | MemoryCardsExerciseData
  | MemorySequenceExerciseData
  | MemoryMissingItemExerciseData
  | MathSchoolChallengeData
  | PhonicsExerciseData
  | MagicTriangleExerciseData
  | SecretCodeExerciseData;

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
  geographyPassport?: GeographyPassport;
}

export interface IProgressRepository {
  getProgress(userId?: string): Promise<UserProfile>;
  saveProgress(profile: UserProfile, userId?: string): Promise<void>;
  recordExerciseResult(exercise: Exercise, isCorrect: boolean, userId?: string): Promise<UserProfile>;
  recordGeographyCategoryCompletion(category: GeographyCategory, userId?: string): Promise<UserProfile>;
  exportData(userId?: string): Promise<string>;
  importData(codeOrJson: string, userId?: string): Promise<UserProfile>;
  syncWithCloud(profileId: string, pin: string): Promise<UserProfile>;
  resetProgress(userId?: string): Promise<UserProfile>;
}

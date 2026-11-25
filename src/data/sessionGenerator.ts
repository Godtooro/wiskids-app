import { Exercise, Subject, UserProfile } from '../types/education';
import { generateMathExercise } from '../utils/mathGenerator';
import {
  READING_EXERCISES,
  ORDERING_EXERCISES,
  COMPLETION_EXERCISES,
  DICTATION_EXERCISES
} from './languageData';
import { GEOGRAPHY_EXERCISES } from './geographyData';
import { ENGLISH_EXERCISES } from './englishData';
import {
  generateMemoryCardsExercise,
  generateMemorySequenceExercise,
  generateMissingItemExercise,
  STATIC_MEMORY_EXERCISES
} from './memoryData';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateDailySession(profile: UserProfile): Exercise[] {
  const mathStreak = profile.subjectStats.matematicas.streak || 0;
  const level = 1;

  // 1. Math exercises (2 dynamic exercises)
  const mathList: Exercise[] = [
    generateMathExercise(mathStreak, level),
    generateMathExercise(mathStreak + 1, level)
  ];

  // 2. Language exercises (2 exercises: 1 reading, 1 ordering/completion)
  const shuffledReading = shuffleArray(READING_EXERCISES);
  const shuffledOtherLang = shuffleArray([
    ...ORDERING_EXERCISES,
    ...COMPLETION_EXERCISES,
    ...DICTATION_EXERCISES
  ]);
  const langList: Exercise[] = [shuffledReading[0], shuffledOtherLang[0]];

  // 3. Geography exercises (2 exercises: 1 CCAA/País surface, 1 capital/city point)
  const ccaaOrCountryExercises = GEOGRAPHY_EXERCISES.filter(
    (e) => e.targetType === 'region' || !e.targetType
  );
  const capitalExercises = GEOGRAPHY_EXERCISES.filter((e) => e.targetType === 'city');
  const shuffledCCAA = shuffleArray(ccaaOrCountryExercises);
  const shuffledCapitals = shuffleArray(capitalExercises);
  const geoList: Exercise[] = [shuffledCCAA[0], shuffledCapitals[0]];

  // 4. English exercises (2 exercises)
  const shuffledEng = shuffleArray(ENGLISH_EXERCISES);
  const engList: Exercise[] = [shuffledEng[0], shuffledEng[1]];

  // 5. Memory exercises (2 exercises: 1 cards, 1 sequence/missing)
  const memList: Exercise[] = [
    generateMemoryCardsExercise(3, 'animals'),
    Math.random() > 0.5 ? generateMemorySequenceExercise(3) : generateMissingItemExercise(3)
  ];

  // Interleave nicely across the 5 subjects for a 10-challenge session
  const interleaved: Exercise[] = [
    mathList[0],
    langList[0],
    geoList[0],
    memList[0],
    engList[0],
    mathList[1],
    langList[1],
    geoList[1],
    memList[1],
    engList[1]
  ];

  return interleaved;
}

export function generateSubjectSession(
  subject: Subject,
  profile: UserProfile,
  count = 6
): Exercise[] {
  if (subject === 'matematicas') {
    const streak = profile.subjectStats.matematicas.streak || 0;
    const list: Exercise[] = [];
    for (let i = 0; i < count; i++) {
      list.push(generateMathExercise(streak + i, 1));
    }
    return list;
  }

  if (subject === 'lenguaje') {
    const all = shuffleArray([
      ...READING_EXERCISES,
      ...ORDERING_EXERCISES,
      ...COMPLETION_EXERCISES,
      ...DICTATION_EXERCISES
    ]);
    return all.slice(0, count);
  }

  if (subject === 'geografia') {
    return shuffleArray(GEOGRAPHY_EXERCISES).slice(0, count);
  }

  if (subject === 'ingles') {
    return shuffleArray(ENGLISH_EXERCISES).slice(0, count);
  }

  if (subject === 'memoria') {
    const dynamicMemory: Exercise[] = [
      generateMemoryCardsExercise(2, 'animals'),
      generateMemorySequenceExercise(3),
      generateMissingItemExercise(3),
      generateMemoryCardsExercise(3, 'fruits'),
      generateMemorySequenceExercise(4),
      generateMissingItemExercise(4),
      generateMemoryCardsExercise(4, 'space')
    ];
    return shuffleArray(dynamicMemory).slice(0, count);
  }

  return [];
}

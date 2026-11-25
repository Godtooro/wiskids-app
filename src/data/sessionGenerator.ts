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
import {
  SCHOOL_MATH_EXERCISES,
  SCHOOL_PHONICS_EXERCISES,
  SEXTA_HORA_ALL_EXERCISES
} from './schoolCurriculumData';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateDailySession(profile: UserProfile): Exercise[] {
  const mathStreak = profile.subjectStats.matematicas?.streak || 0;
  const level = 1;

  // 1. Math exercises (1 dynamic op + 1 school syllabus: coins/tens/ordinals/series)
  const shuffledSchoolMath = shuffleArray(SCHOOL_MATH_EXERCISES);
  const mathList: Exercise[] = [
    generateMathExercise(mathStreak, level),
    shuffledSchoolMath[0] || generateMathExercise(mathStreak + 1, level)
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

  // 4. English exercises (1 general vocab + 1 school phonics: s-a-t-i-p-n)
  const shuffledEng = shuffleArray(ENGLISH_EXERCISES);
  const shuffledPhonics = shuffleArray(SCHOOL_PHONICS_EXERCISES);
  const engList: Exercise[] = [
    shuffledEng[0],
    shuffledPhonics[0] || shuffledEng[1]
  ];

  // 5. Memory exercises (2 exercises: 1 cards, 1 sequence/missing)
  const memList: Exercise[] = [
    generateMemoryCardsExercise(3, 'animals'),
    Math.random() > 0.5 ? generateMemorySequenceExercise(3) : generateMissingItemExercise(3)
  ];

  // 6. 6ª Hora challenge (1 reasoning/magic triangle or secret code)
  const shuffled6a = shuffleArray(SEXTA_HORA_ALL_EXERCISES);
  const sextaHoraItem = shuffled6a[0];

  // Interleave nicely for an engaging daily session
  const interleaved: Exercise[] = [
    mathList[0],
    langList[0],
    geoList[0],
    memList[0],
    engList[0],
    sextaHoraItem,
    mathList[1],
    langList[1],
    geoList[1],
    memList[1],
    engList[1]
  ].filter(Boolean);

  return interleaved;
}

export function generateSubjectSession(
  subject: Subject,
  profile: UserProfile,
  count = 6
): Exercise[] {
  if (subject === 'matematicas') {
    const streak = profile.subjectStats.matematicas?.streak || 0;
    const dynamicMath: Exercise[] = [];
    for (let i = 0; i < 4; i++) {
      dynamicMath.push(generateMathExercise(streak + i, 1));
    }
    const combined = shuffleArray([...dynamicMath, ...SCHOOL_MATH_EXERCISES]);
    return combined.slice(0, count);
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
    const combined = shuffleArray([...ENGLISH_EXERCISES, ...SCHOOL_PHONICS_EXERCISES]);
    return combined.slice(0, count);
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

  if (subject === 'sexta_hora') {
    return shuffleArray(SEXTA_HORA_ALL_EXERCISES).slice(0, count);
  }

  return [];
}

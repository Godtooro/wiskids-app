import { Exercise, Subject, UserProfile } from '../types/education';
import { generateMathExercise } from '../utils/mathGenerator';
import { READING_EXERCISES, ORDERING_EXERCISES, COMPLETION_EXERCISES, DICTATION_EXERCISES } from './languageData';
import { GEOGRAPHY_EXERCISES } from './geographyData';
import { ENGLISH_EXERCISES } from './englishData';

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

  // 1. Math exercises (3 dynamic exercises adapting to streak)
  const mathList: Exercise[] = [
    generateMathExercise(mathStreak, level),
    generateMathExercise(mathStreak + 1, level),
    generateMathExercise(mathStreak + 2, level)
  ];

  // 2. Language exercises (3 exercises: 1 reading, 1 ordering, 1 completion/dictation)
  const shuffledReading = shuffleArray(READING_EXERCISES);
  const shuffledOrdering = shuffleArray(ORDERING_EXERCISES);
  const shuffledCompletion = shuffleArray([...COMPLETION_EXERCISES, ...DICTATION_EXERCISES]);

  const langList: Exercise[] = [
    shuffledReading[0],
    shuffledOrdering[0],
    shuffledCompletion[0]
  ];

  // 3. Geography exercises (2 exercises)
  const shuffledGeo = shuffleArray(GEOGRAPHY_EXERCISES);
  const geoList: Exercise[] = [shuffledGeo[0], shuffledGeo[1]];

  // 4. English exercises (2 exercises)
  const shuffledEng = shuffleArray(ENGLISH_EXERCISES);
  const engList: Exercise[] = [shuffledEng[0], shuffledEng[1]];

  // Combine and interleave nicely so subjects alternate
  const interleaved: Exercise[] = [
    mathList[0],
    langList[0],
    geoList[0],
    engList[0],
    mathList[1],
    langList[1],
    geoList[1],
    engList[1],
    mathList[2],
    langList[2]
  ];

  return interleaved;
}

export function generateSubjectSession(subject: Subject, profile: UserProfile, count = 6): Exercise[] {
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

  return [];
}

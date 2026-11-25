import {
  MemoryCardsExerciseData,
  MemorySequenceExerciseData,
  MemoryMissingItemExerciseData,
  Exercise
} from '../types/education';

// Card Themes
const THEMES = {
  animals: [
    { id: 'lion', label: 'León', symbol: '🦁' },
    { id: 'elephant', label: 'Elefante', symbol: '🐘' },
    { id: 'panda', label: 'Panda', symbol: '🐼' },
    { id: 'dolphin', label: 'Delfín', symbol: '🐬' },
    { id: 'koala', label: 'Koala', symbol: '🐨' },
    { id: 'fox', label: 'Zorro', symbol: '🦊' }
  ],
  fruits: [
    { id: 'strawberry', label: 'Fresa', symbol: '🍓' },
    { id: 'banana', label: 'Plátano', symbol: '🍌' },
    { id: 'watermelon', label: 'Sandía', symbol: '🍉' },
    { id: 'grapes', label: 'Uvas', symbol: '🍇' },
    { id: 'apple', label: 'Manzana', symbol: '🍎' },
    { id: 'orange', label: 'Naranja', symbol: '🍊' }
  ],
  space: [
    { id: 'rocket', label: 'Cohete', symbol: '🚀' },
    { id: 'moon', label: 'Luna', symbol: '🌙' },
    { id: 'saturn', label: 'Planeta', symbol: '🪐' },
    { id: 'star', label: 'Estrella', symbol: '⭐' },
    { id: 'alien', label: 'Marciano', symbol: '👽' },
    { id: 'sun', label: 'Sol', symbol: '☀️' }
  ],
  sports: [
    { id: 'soccer', label: 'Fútbol', symbol: '⚽' },
    { id: 'basket', label: 'Baloncesto', symbol: '🏀' },
    { id: 'tennis', label: 'Tenis', symbol: '🎾' },
    { id: 'skate', label: 'Monopatín', symbol: '🛹' },
    { id: 'trophy', label: 'Trofeo', symbol: '🏆' },
    { id: 'swimming', label: 'Natación', symbol: '🏊' }
  ]
};

// Generate Memory Cards Exercise
export function generateMemoryCardsExercise(
  pairCount: 2 | 3 | 4 = 3,
  themeKey: 'animals' | 'fruits' | 'space' | 'sports' = 'animals'
): MemoryCardsExerciseData {
  const pool = [...THEMES[themeKey]].sort(() => Math.random() - 0.5);
  const selectedPairs = pool.slice(0, pairCount);

  return {
    id: `mem_cards_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    subject: 'memoria',
    level: pairCount === 2 ? 1 : pairCount === 3 ? 2 : 3,
    type: 'memory_cards',
    title: 'Parejas de Memoria',
    instructions: 'Toca las cartas para levantarlas y encuentra todas las parejas.',
    hint: 'Recuerda bien dónde estaba cada dibujo cuando no coincidan.',
    funFact: '¡Buscar parejas en tu mente entrena tu memoria de trabajo visual!',
    theme: themeKey,
    gridCols: pairCount <= 2 ? 2 : pairCount === 3 ? 3 : 4,
    pairs: selectedPairs
  };
}

// Generate Memory Sequence Exercise ("Simón Dice")
export function generateMemorySequenceExercise(
  length: 3 | 4 | 5 = 3
): MemorySequenceExerciseData {
  const pads = [
    { id: 'green', label: 'Verde', color: '#10b981', soundFreq: 261.63, icon: '🌿' }, // C4
    { id: 'red', label: 'Rojo', color: '#ef4444', soundFreq: 329.63, icon: '🍎' }, // E4
    { id: 'yellow', label: 'Amarillo', color: '#f59e0b', soundFreq: 392.0, icon: '⭐' }, // G4
    { id: 'blue', label: 'Azul', color: '#3b82f6', soundFreq: 523.25, icon: '💧' } // C5
  ];

  const targetSequence: string[] = [];
  for (let i = 0; i < length; i++) {
    const randomPad = pads[Math.floor(Math.random() * pads.length)];
    targetSequence.push(randomPad.id);
  }

  return {
    id: `mem_seq_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    subject: 'memoria',
    level: length === 3 ? 1 : length === 4 ? 2 : 3,
    type: 'memory_sequence',
    title: 'Secuencia de Colores y Sonidos',
    instructions: 'Mira con atención la secuencia de luces y repítela en el mismo orden.',
    hint: 'Puedes recordar los colores diciendo sus nombres en tu cabeza.',
    funFact: '¡Recordar secuencias en orden fortalece tu concentración y memoria auditiva!',
    sequenceLength: length,
    items: pads,
    targetSequence
  };
}

// Generate "What's Missing?" Visual Recall Exercise
export function generateMissingItemExercise(itemCount: 3 | 4 = 3): MemoryMissingItemExerciseData {
  const allObjects = [
    { id: 'dog', name: 'Perrito', icon: '🐶' },
    { id: 'car', name: 'Coche', icon: '🚗' },
    { id: 'apple', name: 'Manzana', icon: '🍎' },
    { id: 'ball', name: 'Pelota', icon: '⚽' },
    { id: 'rocket', name: 'Cohete', icon: '🚀' },
    { id: 'cat', name: 'Gatito', icon: '🐱' },
    { id: 'icecream', name: 'Helado', icon: '🍦' },
    { id: 'sun', name: 'Sol', icon: '☀️' }
  ].sort(() => Math.random() - 0.5);

  const shown = allObjects.slice(0, itemCount);
  const missingIndex = Math.floor(Math.random() * shown.length);
  const missingItem = shown[missingIndex];

  // Options pool: correct missing item + 2 distractors from remaining
  const distractors = allObjects.slice(itemCount, itemCount + 2);
  const options = [missingItem, ...distractors].sort(() => Math.random() - 0.5);

  return {
    id: `mem_miss_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    subject: 'memoria',
    level: itemCount === 3 ? 1 : 2,
    type: 'memory_missing_item',
    title: '¿Qué ha desaparecido?',
    instructions: 'Memoriza los objetos antes de que se cierre la caja misteriosa.',
    hint: 'Nombra en voz alta cada objeto mientras los miras.',
    funFact: '¡La memoria fotográfica se entrena guardando imágenes mentales rápidas!',
    itemsShown: shown,
    missingItemId: missingItem.id,
    options,
    memorizeSeconds: 4
  };
}

// Static Pool of Initial Memory Exercises
export const STATIC_MEMORY_EXERCISES: Exercise[] = [
  generateMemoryCardsExercise(2, 'animals'),
  generateMemorySequenceExercise(3),
  generateMissingItemExercise(3),
  generateMemoryCardsExercise(3, 'fruits'),
  generateMemorySequenceExercise(4),
  generateMissingItemExercise(4),
  generateMemoryCardsExercise(4, 'space')
];

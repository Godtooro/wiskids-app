import {
  MathSchoolChallengeData,
  PhonicsExerciseData,
  MagicTriangleExerciseData,
  SecretCodeExerciseData,
  Exercise
} from '../types/education';

// ==========================================
// A) MATEMÁTICAS 1º TRIMESTRE (PROGRAMA COLEGIO)
// ==========================================

export const SCHOOL_MATH_EXERCISES: MathSchoolChallengeData[] = [
  // 1. Recuento de Dinero: Monedas de 1€ y 2€
  {
    id: 'sm_coin_1',
    subject: 'matematicas',
    level: 1,
    type: 'math_school_challenge',
    subType: 'coins',
    title: 'Monedas de 1€ y 2€',
    instructions: 'Cuenta el dinero que hay dentro del monedero.',
    question: '¿Cuántos euros hay en total?',
    illustration: '🪙',
    coinItems: [
      { value: 2, count: 2 }, // 4€
      { value: 1, count: 3 }  // 3€ => 7€
    ],
    options: [
      { id: 'opt_5', label: '5 €' },
      { id: 'opt_7', label: '7 €' },
      { id: 'opt_9', label: '9 €' }
    ],
    correctOptionId: 'opt_7',
    explanation: 'Dos monedas de 2€ son 4€ (2 + 2), más tres monedas de 1€: 4 + 3 = 7€ en total.'
  },
  {
    id: 'sm_coin_2',
    subject: 'matematicas',
    level: 1,
    type: 'math_school_challenge',
    subType: 'coins',
    title: 'La compra en la papelería',
    instructions: 'Lucas compra un cuaderno que cuesta 6 euros.',
    question: '¿Qué combinación de monedas de 2€ necesita exactamente?',
    illustration: '📓',
    options: [
      { id: 'opt_2m', label: '2 monedas de 2€ (4€)' },
      { id: 'opt_3m', label: '3 monedas de 2€ (6€)' },
      { id: 'opt_4m', label: '4 monedas de 2€ (8€)' }
    ],
    correctOptionId: 'opt_3m',
    explanation: 'Tres monedas de 2€ suman: 2 + 2 + 2 = 6 euros.'
  },

  // 2. La Decena y el Valor Posicional (hasta el 40)
  {
    id: 'sm_dec_1',
    subject: 'matematicas',
    level: 1,
    type: 'math_school_challenge',
    subType: 'place_value',
    title: 'Decenas y Unidades',
    instructions: 'Mira las barras rojas de decenas (10) y los cubitos azules de unidades (1).',
    question: '¿Qué número representan 2 decenas y 4 unidades?',
    illustration: '🧱',
    placeValueTens: 2,
    placeValueUnits: 4,
    options: [
      { id: 'opt_42', label: '42' },
      { id: 'opt_24', label: '24' },
      { id: 'opt_20', label: '20' }
    ],
    correctOptionId: 'opt_24',
    explanation: '2 decenas son 20, y 4 unidades son 4. 20 + 4 = 24.'
  },
  {
    id: 'sm_dec_2',
    subject: 'matematicas',
    level: 1,
    type: 'math_school_challenge',
    subType: 'place_value',
    title: 'Descomposición hasta el 40',
    instructions: 'El número 38 tiene...',
    question: '¿Cómo se descompone el número 38?',
    illustration: '🔢',
    options: [
      { id: 'opt_3d8u', label: '3 decenas y 8 unidades (30 + 8)' },
      { id: 'opt_8d3u', label: '8 decenas y 3 unidades (80 + 3)' },
      { id: 'opt_3d0u', label: '3 decenas y 0 unidades (30)' }
    ],
    correctOptionId: 'opt_3d8u',
    explanation: 'La primera cifra son las decenas (3 decenas = 30) y la segunda las unidades (8).'
  },

  // 3. Números Ordinales (de 1º a 10º)
  {
    id: 'sm_ord_1',
    subject: 'matematicas',
    level: 1,
    type: 'math_school_challenge',
    subType: 'ordinals',
    title: 'Carrera de Animales: Ordinales',
    instructions: 'Observa la carrera del colegio: 🐰 Liebre (1º), 🐢 Tortuga (2º), 🦊 Zorro (3º), 🐻 Oso (4º), 🐶 Perro (5º).',
    question: '¿En qué posición ha llegado el Zorro 🦊?',
    illustration: '🏁',
    options: [
      { id: 'opt_1', label: 'Segundo (2º)' },
      { id: 'opt_2', label: 'Tercero (3º)' },
      { id: 'opt_3', label: 'Cuarto (4º)' }
    ],
    correctOptionId: 'opt_2',
    explanation: 'El zorro va en la 3ª posición (tercer lugar).'
  },
  {
    id: 'sm_ord_2',
    subject: 'matematicas',
    level: 1,
    type: 'math_school_challenge',
    subType: 'ordinals',
    title: 'Fila en el comedor del colegio',
    instructions: 'En la fila de clase, Mateo está detrás del cuarto (4º).',
    question: '¿Qué número ordinal le corresponde a Mateo?',
    illustration: '🎒',
    options: [
      { id: 'opt_3', label: 'Tercero (3º)' },
      { id: 'opt_5', label: 'Quinto (5º)' },
      { id: 'opt_6', label: 'Sexto (6º)' }
    ],
    correctOptionId: 'opt_5',
    explanation: 'Detrás del 4º (cuarto) va el 5º (quinto).'
  },

  // 4. Series Numéricas (+1, -1, +2, -2 hasta el 40)
  {
    id: 'sm_ser_1',
    subject: 'matematicas',
    level: 1,
    type: 'math_school_challenge',
    subType: 'series',
    title: 'Serie de 2 en 2 (+2)',
    instructions: 'Completa la serie numérica sumando 2 a cada paso.',
    question: '14, 16, 18, 20, 22, ¿...?',
    illustration: '🐸',
    options: [
      { id: 'opt_23', label: '23' },
      { id: 'opt_24', label: '24' },
      { id: 'opt_25', label: '25' }
    ],
    correctOptionId: 'opt_24',
    explanation: 'Sumando de 2 en 2: 22 + 2 = 24.'
  },
  {
    id: 'sm_ser_2',
    subject: 'matematicas',
    level: 1,
    type: 'math_school_challenge',
    subType: 'series',
    title: 'Serie hacia atrás (-1)',
    instructions: 'La cuenta atrás del despegue del cohete va de uno en uno hacia atrás.',
    question: '35, 34, 33, 32, ¿...?',
    illustration: '🚀',
    options: [
      { id: 'opt_31', label: '31' },
      { id: 'opt_30', label: '30' },
      { id: 'opt_33', label: '33' }
    ],
    correctOptionId: 'opt_31',
    explanation: 'Restando 1 cada vez: 32 - 1 = 31.'
  },

  // 5. Problemas Visuales Cotidianos
  {
    id: 'sm_prob_1',
    subject: 'matematicas',
    level: 1,
    type: 'math_school_challenge',
    subType: 'word_problem',
    title: 'Problema en el recreo',
    instructions: 'Lee el problema con atención.',
    question: 'En la caja de tizas de clase había 18 tizas. Si la profesora usa 5 para escribir, ¿cuántas tizas quedan en la caja?',
    illustration: '🖍️',
    options: [
      { id: 'opt_12', label: '12 tizas' },
      { id: 'opt_13', label: '13 tizas' },
      { id: 'opt_23', label: '23 tizas' }
    ],
    correctOptionId: 'opt_13',
    explanation: 'Es una resta sin llevar: 18 - 5 = 13 tizas.'
  },

  // 6. Geometría y Medida: Líneas, Figuras y Tiempo
  {
    id: 'sm_geom_1',
    subject: 'matematicas',
    level: 1,
    type: 'math_school_challenge',
    subType: 'geometry_measure',
    title: 'Figuras Planas del Aula',
    instructions: 'Observa la pizarra del colegio y la señal del patio.',
    question: '¿Qué figura plana tiene 4 lados rectos iguales?',
    illustration: '📐',
    options: [
      { id: 'opt_circ', label: 'Círculo ⚪' },
      { id: 'opt_cuad', label: 'Cuadrado ⏹️' },
      { id: 'opt_trian', label: 'Triángulo 🔺' }
    ],
    correctOptionId: 'opt_cuad',
    explanation: 'El cuadrado tiene 4 lados rectos e iguales. El triángulo tiene 3 y el círculo es una curva cerrada.'
  },
  {
    id: 'sm_geom_2',
    subject: 'matematicas',
    level: 1,
    type: 'math_school_challenge',
    subType: 'geometry_measure',
    title: 'Franjas del Día',
    instructions: 'Situaciones de la vida diaria en el colegio.',
    question: '¿En qué franja horaria desayunamos antes de ir al colegio?',
    illustration: '🌅',
    options: [
      { id: 'opt_manana', label: 'Por la mañana ☀️' },
      { id: 'opt_tarde', label: 'Por la tarde 🌤️' },
      { id: 'opt_noche', label: 'Por la noche 🌙' }
    ],
    correctOptionId: 'opt_manana',
    explanation: 'El desayuno es la primera comida al levantarnos por la mañana.'
  }
];

// ==========================================
// B) PHONICS 1º TRIMESTRE (COLEGIO & 6ª HORA)
// Phonics: s - a - t - i - p - n  y  [j] [oa] [ie]
// ==========================================

export const SCHOOL_PHONICS_EXERCISES: PhonicsExerciseData[] = [
  {
    id: 'ph_s',
    subject: 'ingles',
    level: 1,
    type: 'phonics_exercise',
    title: 'Phonics: Sound /s/',
    instructions: 'Listen to the sound /s/ (like a snake: sssss). Which word starts with /s/?',
    targetSound: 's',
    phonicsWord: 'Sun',
    audioText: 'ssss... sun, apple, tiger',
    illustration: '🐍',
    options: [
      { id: 'opt_sun', word: 'SUN ☀️', icon: '☀️', startsWithSound: true },
      { id: 'opt_apple', word: 'APPLE 🍎', icon: '🍎', startsWithSound: false },
      { id: 'opt_tiger', word: 'TIGER 🐯', icon: '🐯', startsWithSound: false }
    ],
    correctOptionId: 'opt_sun'
  },
  {
    id: 'ph_a',
    subject: 'ingles',
    level: 1,
    type: 'phonics_exercise',
    title: 'Phonics: Sound /a/',
    instructions: 'Listen to the short /a/ sound. Which word starts with /a/?',
    targetSound: 'a',
    phonicsWord: 'Apple',
    audioText: 'aaaa... apple, cat, pencil',
    illustration: '🐜',
    options: [
      { id: 'opt_pencil', word: 'PENCIL ✏️', icon: '✏️', startsWithSound: false },
      { id: 'opt_apple', word: 'APPLE 🍎', icon: '🍎', startsWithSound: true },
      { id: 'opt_dog', word: 'DOG 🐶', icon: '🐶', startsWithSound: false }
    ],
    correctOptionId: 'opt_apple'
  },
  {
    id: 'ph_t',
    subject: 'ingles',
    level: 1,
    type: 'phonics_exercise',
    title: 'Phonics: Sound /t/',
    instructions: 'Listen to the ticking sound /t/ (like tennis: t-t-t). Which word starts with /t/?',
    targetSound: 't',
    phonicsWord: 'Table',
    audioText: 'tttt... table, nose, umbrella',
    illustration: '🎾',
    options: [
      { id: 'opt_nose', word: 'NOSE 👃', icon: '👃', startsWithSound: false },
      { id: 'opt_table', word: 'TABLE 🪑', icon: '🪑', startsWithSound: true },
      { id: 'opt_snake', word: 'SNAKE 🐍', icon: '🐍', startsWithSound: false }
    ],
    correctOptionId: 'opt_table'
  },
  {
    id: 'ph_p',
    subject: 'ingles',
    level: 1,
    type: 'phonics_exercise',
    title: 'Phonics: Sound /p/',
    instructions: 'Listen to the popping sound /p/ (puff puff). Which word begins with /p/?',
    targetSound: 'p',
    phonicsWord: 'Pencil',
    audioText: 'pppp... pencil, sun, book',
    illustration: '✏️',
    options: [
      { id: 'opt_pencil', word: 'PENCIL ✏️', icon: '✏️', startsWithSound: true },
      { id: 'opt_book', word: 'BOOK 📖', icon: '📖', startsWithSound: false },
      { id: 'opt_water', word: 'WATER 💧', icon: '💧', startsWithSound: false }
    ],
    correctOptionId: 'opt_pencil'
  },
  {
    id: 'ph_n',
    subject: 'ingles',
    level: 1,
    type: 'phonics_exercise',
    title: 'Phonics: Sound /n/',
    instructions: 'Listen to the aeroplane sound /n/ (nnnn). Which word begins with /n/?',
    targetSound: 'n',
    phonicsWord: 'Nose',
    audioText: 'nnnn... nose, hand, mouth',
    illustration: '✈️',
    options: [
      { id: 'opt_hand', word: 'HAND ✋', icon: '✋', startsWithSound: false },
      { id: 'opt_nose', word: 'NOSE 👃', icon: '👃', startsWithSound: true },
      { id: 'opt_foot', word: 'FOOT 🦶', icon: '🦶', startsWithSound: false }
    ],
    correctOptionId: 'opt_nose'
  },
  {
    id: 'ph_oa',
    subject: 'ingles',
    level: 1,
    type: 'phonics_exercise',
    title: 'Phonics: Sound /oa/',
    instructions: 'Listen to the /oa/ sound (like boat or goat). Which word has /oa/?',
    targetSound: 'oa',
    phonicsWord: 'Boat',
    audioText: 'oh... boat, pin, sit',
    illustration: '⛵',
    options: [
      { id: 'opt_boat', word: 'BOAT ⛵', icon: '⛵', startsWithSound: true },
      { id: 'opt_cat', word: 'CAT 🐱', icon: '🐱', startsWithSound: false },
      { id: 'opt_pen', word: 'PEN 🖊️', icon: '🖊️', startsWithSound: false }
    ],
    correctOptionId: 'opt_boat'
  },
  {
    id: 'ph_j',
    subject: 'ingles',
    level: 1,
    type: 'phonics_exercise',
    title: 'Phonics: Sound /j/',
    instructions: 'Listen to the /j/ sound (like jelly or jump). Which word begins with /j/?',
    targetSound: 'j',
    phonicsWord: 'Jelly',
    audioText: 'jjjj... jelly, book, tiger',
    illustration: '🍮',
    options: [
      { id: 'opt_book', word: 'BOOK 📖', icon: '📖', startsWithSound: false },
      { id: 'opt_jelly', word: 'JELLY 🍮', icon: '🍮', startsWithSound: true },
      { id: 'opt_car', word: 'CAR 🚗', icon: '🚗', startsWithSound: false }
    ],
    correctOptionId: 'opt_jelly'
  },
  {
    id: 'ph_ie',
    subject: 'ingles',
    level: 1,
    type: 'phonics_exercise',
    title: 'Phonics: Sound /ie/',
    instructions: 'Listen to the /ie/ sound (like pie or tie). Which word has /ie/?',
    targetSound: 'ie',
    phonicsWord: 'Pie',
    audioText: 'eye... pie, dog, sun',
    illustration: '🥧',
    options: [
      { id: 'opt_dog', word: 'DOG 🐶', icon: '🐶', startsWithSound: false },
      { id: 'opt_pie', word: 'PIE 🥧', icon: '🥧', startsWithSound: true },
      { id: 'opt_hat', word: 'HAT 🧢', icon: '🧢', startsWithSound: false }
    ],
    correctOptionId: 'opt_pie'
  }
];

// ==========================================
// C) RAZONAMIENTO 6ª HORA (SM & LÓGICA)
// Triángulos Mágicos y Códigos Ocultos
// ==========================================

export const REASONING_MAGIC_TRIANGLES: MagicTriangleExerciseData[] = [
  {
    id: 'tri_magic_6',
    subject: 'sexta_hora',
    level: 1,
    type: 'reasoning_magic_triangle',
    title: 'Triángulo Mágico de Suma 6',
    instructions: 'Coloca los números del 1 al 3 en los vértices del triángulo para que cada lado sume 6.',
    targetSum: 6,
    corners: [1, 2, 3],
    midpoints: [3, 1, 2],
    availableNumbers: [1, 2, 3],
    solution: {
      corners: [1, 2, 3],
      midpoints: [3, 1, 2]
    },
    hint: 'Suma los dos números de cada esquina más el del centro del lado.'
  },
  {
    id: 'tri_magic_9',
    subject: 'sexta_hora',
    level: 1,
    type: 'reasoning_magic_triangle',
    title: 'Pirámide y Triángulo de Suma 9',
    instructions: 'Organiza las cifras en los círculos de forma que la suma de los lados sea 9.',
    targetSum: 9,
    corners: [2, 3, 4],
    midpoints: [4, 2, 3],
    availableNumbers: [2, 3, 4],
    solution: {
      corners: [2, 3, 4],
      midpoints: [4, 2, 3]
    },
    hint: 'Empieza por la esquina superior y comprueba las sumas con los dedos.'
  }
];

export const REASONING_SECRET_CODES: SecretCodeExerciseData[] = [
  {
    id: 'code_colors_1',
    subject: 'sexta_hora',
    level: 1,
    type: 'reasoning_secret_code',
    title: 'Código Oculto de Colores',
    instructions: 'Descifra el código secreto de 3 colores siguiendo las pistas.',
    secretLength: 3,
    colorPool: [
      { id: 'red', name: 'Rojo', colorHex: '#ef4444', icon: '🔴' },
      { id: 'blue', name: 'Azul', colorHex: '#3b82f6', icon: '🔵' },
      { id: 'green', name: 'Verde', colorHex: '#10b981', icon: '🟢' },
      { id: 'yellow', name: 'Amarillo', colorHex: '#f59e0b', icon: '🟡' }
    ],
    targetCode: ['red', 'blue', 'green'],
    maxTries: 4,
    hint: 'La primera ficha es roja como una fresa, la segunda azul como el cielo y la tercera verde.'
  }
];

// Combined pool for 6ª Hora session generator
export const SEXTA_HORA_ALL_EXERCISES: Exercise[] = [
  ...REASONING_MAGIC_TRIANGLES,
  ...REASONING_SECRET_CODES,
  ...SCHOOL_PHONICS_EXERCISES,
  ...SCHOOL_MATH_EXERCISES
];

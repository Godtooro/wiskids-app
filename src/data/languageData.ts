import { ReadingExerciseData, OrderingExerciseData, CompletionExerciseData, DictationExerciseData } from '../types/education';

export const READING_EXERCISES: ReadingExerciseData[] = [
  {
    id: 'read_1',
    subject: 'lenguaje',
    level: 1,
    type: 'reading',
    title: 'El perro Tito',
    instructions: 'Lee con atención la pequeña historia y responde a las preguntas.',
    storyTitle: 'El perro Tito y su pelota',
    illustration: '🐶⚽',
    storyText: 'Tito es un perro pequeño y marrón. A Tito le encanta jugar en el jardín con su pelota roja. Cuando su amigo Lucas lanza la pelota, Tito corre muy rápido para traerla. ¡Tito siempre mueve la cola de alegría!',
    questions: [
      {
        id: 'q1',
        question: '¿De qué color es Tito?',
        options: ['Negro y blanco', 'Marrón', 'Gris'],
        correctIndex: 1,
        explanation: 'En el texto dice: "Tito es un perro pequeño y marrón".'
      },
      {
        id: 'q2',
        question: '¿A qué juega Tito en el jardín?',
        options: ['Con una pelota roja', 'Con un hueso azul', 'Con un coche de juguete'],
        correctIndex: 0,
        explanation: 'A Tito le encanta jugar con su pelota roja.'
      },
      {
        id: 'q3',
        question: '¿Qué hace Tito cuando está alegre?',
        options: ['Duerme en su cama', 'Ladra a los gatos', 'Mueve la cola'],
        correctIndex: 2,
        explanation: 'Al final dice: "¡Tito siempre mueve la cola de alegría!".'
      }
    ],
    hint: 'Vuelve a leer la primera y la última frase del cuento.'
  },
  {
    id: 'read_2',
    subject: 'lenguaje',
    level: 1,
    type: 'reading',
    title: 'El gato con botas mágicas',
    instructions: 'Lee el cuento y demuestra lo bien que comprendes lo leído.',
    storyTitle: 'Misu busca estrellas',
    illustration: '🐱✨',
    storyText: 'Misu es una gata blanca que duerme de día y mira la luna de noche. Una noche vio una estrella fugaz brillar sobre el gran árbol del patio. Misu dio un gran salto suave y pidió un deseo: tener siempre leche fresca y muchos mimos.',
    questions: [
      {
        id: 'q1',
        question: '¿Cuándo duerme la gata Misu?',
        options: ['De noche', 'De día', 'Nunca duerme'],
        correctIndex: 1,
        explanation: 'Misu duerme durante el día y vigila la luna de noche.'
      },
      {
        id: 'q2',
        question: '¿Qué vio brillar sobre el gran árbol?',
        options: ['Una estrella fugaz', 'Un avión', 'Una linterna'],
        correctIndex: 0,
        explanation: 'Vio una estrella fugaz brillar con fuerza.'
      },
      {
        id: 'q3',
        question: '¿Qué deseo pidió Misu?',
        options: ['Viajar a la luna', 'Leche fresca y muchos mimos', 'Un collar dorado'],
        correctIndex: 1,
        explanation: 'Pidió tener siempre leche fresca y muchos mimos.'
      }
    ],
    hint: 'Fíjate en las últimas dos frases del cuento.'
  },
  {
    id: 'read_3',
    subject: 'lenguaje',
    level: 1,
    type: 'reading',
    title: 'El cohete de Mateo',
    instructions: 'Lee la aventura de Mateo y elige la respuesta correcta.',
    storyTitle: 'Viaje a las estrellas',
    illustration: '🚀🪐',
    storyText: 'Mateo construyó un cohete con una caja de cartón gigante y pintura plateada. Se puso su casco de astronauta y contó: ¡tres, dos, uno, despegue! En su imaginación visitó Marte y saludó a tres marcianos verdes muy simpáticos.',
    questions: [
      {
        id: 'q1',
        question: '¿Con qué construyó Mateo su cohete?',
        options: ['Con madera y clavos', 'Con una caja de cartón', 'Con piezas de plástico'],
        correctIndex: 1,
        explanation: 'Utilizó una caja de cartón gigante.'
      },
      {
        id: 'q2',
        question: '¿Qué planeta visitó en su viaje imaginario?',
        options: ['Marte', 'Júpiter', 'Saturno'],
        correctIndex: 0,
        explanation: 'Mateo viajó con su imaginación hasta Marte.'
      }
    ],
    hint: 'Busca la palabra "cohete" y "planeta" en el texto.'
  }
];

export const ORDERING_EXERCISES: OrderingExerciseData[] = [
  {
    id: 'order_1',
    subject: 'lenguaje',
    level: 1,
    type: 'ordering',
    title: 'Ordena la frase',
    instructions: 'Toca las palabras en orden para construir la frase correcta.',
    category: 'words',
    items: ['pelota.', 'la', 'El', 'perro', 'busca'],
    correctOrder: ['El', 'perro', 'busca', 'la', 'pelota.'],
    targetSentence: 'El perro busca la pelota.',
    illustration: '🐕⚽'
  },
  {
    id: 'order_2',
    subject: 'lenguaje',
    level: 1,
    type: 'ordering',
    title: 'Ordena la frase',
    instructions: 'Toca las palabras en orden para formar la oración.',
    category: 'words',
    items: ['muy', 'sol', 'El', 'brilla', 'fuerte.'],
    correctOrder: ['El', 'sol', 'brilla', 'muy', 'fuerte.'],
    targetSentence: 'El sol brilla muy fuerte.',
    illustration: '☀️😎'
  },
  {
    id: 'order_3',
    subject: 'lenguaje',
    level: 1,
    type: 'ordering',
    title: 'Ordena las sílabas',
    instructions: 'Toca las sílabas en orden para formar el nombre del animal.',
    category: 'syllables',
    items: ['FA', 'LE', 'E', 'TE'],
    correctOrder: ['E', 'LE', 'FA', 'TE'],
    targetSentence: 'ELEFANTE',
    illustration: '🐘'
  },
  {
    id: 'order_4',
    subject: 'lenguaje',
    level: 1,
    type: 'ordering',
    title: 'Ordena las sílabas',
    instructions: 'Ordena las sílabas para escribir el medio de transporte.',
    category: 'syllables',
    items: ['CI', 'BI', 'TA', 'CLE'],
    correctOrder: ['BI', 'CI', 'CLE', 'TA'],
    targetSentence: 'BICICLETA',
    illustration: '🚲'
  }
];

export const COMPLETION_EXERCISES: CompletionExerciseData[] = [
  {
    id: 'comp_1',
    subject: 'lenguaje',
    level: 1,
    type: 'completion',
    title: 'Ortografía: B o V',
    instructions: 'Elige la letra correcta para completar la palabra.',
    wordWithBlank: 'A__ión',
    options: ['V', 'B'],
    correctOption: 'V',
    illustration: '✈️',
    ruleExplanation: '¡Avión se escribe con V!'
  },
  {
    id: 'comp_2',
    subject: 'lenguaje',
    level: 1,
    type: 'completion',
    title: 'Ortografía: B o V',
    instructions: '¿Con qué letra se escribe este medio de transporte?',
    wordWithBlank: '__arco',
    options: ['B', 'V'],
    correctOption: 'B',
    illustration: '⛵',
    ruleExplanation: '¡Barco se escribe con B!'
  },
  {
    id: 'comp_3',
    subject: 'lenguaje',
    level: 1,
    type: 'completion',
    title: 'Ortografía: R o RR',
    instructions: 'Suena fuerte en medio de la palabra. ¿R o RR?',
    wordWithBlank: 'Pe__o',
    options: ['RR', 'R'],
    correctOption: 'RR',
    illustration: '🐕',
    ruleExplanation: 'Entre vocales, el sonido fuerte se escribe con doble RR: Perro.'
  },
  {
    id: 'comp_4',
    subject: 'lenguaje',
    level: 1,
    type: 'completion',
    title: 'Ortografía: C o QU',
    instructions: 'Completa la palabra con el sonido K correcto.',
    wordWithBlank: '__eso',
    options: ['QU', 'C'],
    correctOption: 'QU',
    illustration: '🧀',
    ruleExplanation: 'Delante de E y de I escribimos QU: Queso.'
  },
  {
    id: 'comp_5',
    subject: 'lenguaje',
    level: 1,
    type: 'completion',
    title: 'Ortografía: C o QU',
    instructions: 'Elige cómo empieza la palabra del dibujo.',
    wordWithBlank: '__asa',
    options: ['C', 'QU'],
    correctOption: 'C',
    illustration: '🏠',
    ruleExplanation: 'Delante de A, O, U escribimos C: Casa.'
  }
];

export const DICTATION_EXERCISES: DictationExerciseData[] = [
  {
    id: 'dict_1',
    subject: 'lenguaje',
    level: 1,
    type: 'dictation',
    title: 'Dictado visual y auditivo',
    instructions: 'Mira el dibujo, escucha la palabra y escríbela con el teclado táctil.',
    word: 'LUNA',
    spokenText: 'Luna',
    language: 'es-ES',
    illustration: '🌙',
    optionsLetters: ['L', 'U', 'N', 'A', 'M', 'O', 'S', 'P']
  },
  {
    id: 'dict_2',
    subject: 'lenguaje',
    level: 1,
    type: 'dictation',
    title: 'Dictado visual y auditivo',
    instructions: 'Escucha la palabra y pulsa las letras para escribirla.',
    word: 'SOL',
    spokenText: 'Sol',
    language: 'es-ES',
    illustration: '☀️',
    optionsLetters: ['S', 'O', 'L', 'A', 'R', 'T', 'N', 'M']
  },
  {
    id: 'dict_3',
    subject: 'lenguaje',
    level: 1,
    type: 'dictation',
    title: 'Dictado visual y auditivo',
    instructions: '¿Qué fruta es? Escucha y escribe su nombre.',
    word: 'MANZANA',
    spokenText: 'Manzana',
    language: 'es-ES',
    illustration: '🍎',
    optionsLetters: ['M', 'A', 'N', 'Z', 'N', 'A', 'P', 'R', 'S']
  }
];

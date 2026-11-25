import { EnglishExerciseData } from '../types/education';

export const ENGLISH_EXERCISES: EnglishExerciseData[] = [
  // Animals
  {
    id: 'eng_anim_1',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'DOG',
    spanishTranslation: 'Perro',
    audioText: 'Dog',
    category: 'animals',
    title: 'Animals in English',
    instructions: 'Listen to the word and tap the correct animal.',
    hint: 'It is a friendly pet that barks: woof woof!',
    correctOptionId: 'opt_dog',
    options: [
      { id: 'opt_cat', label: 'Cat', imageOrEmoji: '🐱' },
      { id: 'opt_dog', label: 'Dog', imageOrEmoji: '🐶' },
      { id: 'opt_lion', label: 'Lion', imageOrEmoji: '🦁' },
      { id: 'opt_frog', label: 'Frog', imageOrEmoji: '🐸' }
    ]
  },
  {
    id: 'eng_anim_2',
    subject: 'ingles',
    level: 1,
    type: 'vocab_match_word',
    englishWord: 'CAT',
    spanishTranslation: 'Gato',
    audioText: 'Cat',
    category: 'animals',
    title: 'How do you say it?',
    instructions: 'What is the English word for this animal?',
    hint: 'It meows: meow meow!',
    correctOptionId: 'opt_cat',
    options: [
      { id: 'opt_rabbit', label: 'Rabbit', imageOrEmoji: '🐰' },
      { id: 'opt_cat', label: 'Cat', imageOrEmoji: '🐱' },
      { id: 'opt_duck', label: 'Duck', imageOrEmoji: '🦆' },
      { id: 'opt_fish', label: 'Fish', imageOrEmoji: '🐟' }
    ]
  },
  // Colors
  {
    id: 'eng_col_1',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'BLUE',
    spanishTranslation: 'Azul',
    audioText: 'Blue',
    category: 'colors',
    title: 'Colors in English',
    instructions: 'Listen and choose the matching color.',
    hint: 'Like the sea and the sky!',
    correctOptionId: 'opt_blue',
    options: [
      { id: 'opt_red', label: 'Red', imageOrEmoji: '🔴' },
      { id: 'opt_yellow', label: 'Yellow', imageOrEmoji: '🟡' },
      { id: 'opt_blue', label: 'Blue', imageOrEmoji: '🔵' },
      { id: 'opt_green', label: 'Green', imageOrEmoji: '🟢' }
    ]
  },
  {
    id: 'eng_col_2',
    subject: 'ingles',
    level: 1,
    type: 'vocab_match_word',
    englishWord: 'RED',
    spanishTranslation: 'Rojo',
    audioText: 'Red',
    category: 'colors',
    title: 'Colors in English',
    instructions: 'Which word means this color? Tap to hear.',
    hint: 'Like a fresh strawberry or a heart!',
    correctOptionId: 'opt_red',
    options: [
      { id: 'opt_red', label: 'Red', imageOrEmoji: '🍎' },
      { id: 'opt_purple', label: 'Purple', imageOrEmoji: '🍇' },
      { id: 'opt_orange', label: 'Orange', imageOrEmoji: '🍊' },
      { id: 'opt_black', label: 'Black', imageOrEmoji: '🎱' }
    ]
  },
  // Numbers
  {
    id: 'eng_num_1',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'FIVE',
    spanishTranslation: 'Cinco',
    audioText: 'Five',
    category: 'numbers',
    title: 'Numbers',
    instructions: 'Listen carefully and select the number.',
    hint: 'Count the fingers on one hand: one, two, three, four... five!',
    correctOptionId: 'opt_5',
    options: [
      { id: 'opt_2', label: 'Two (2)', imageOrEmoji: '2️⃣' },
      { id: 'opt_3', label: 'Three (3)', imageOrEmoji: '3️⃣' },
      { id: 'opt_5', label: 'Five (5)', imageOrEmoji: '5️⃣' },
      { id: 'opt_8', label: 'Eight (8)', imageOrEmoji: '8️⃣' }
    ]
  },
  {
    id: 'eng_num_2',
    subject: 'ingles',
    level: 1,
    type: 'vocab_match_word',
    englishWord: 'TEN',
    spanishTranslation: 'Diez',
    audioText: 'Ten',
    category: 'numbers',
    title: 'Numbers',
    instructions: 'How do you write this number in English?',
    hint: 'All ten fingers together!',
    correctOptionId: 'opt_10',
    options: [
      { id: 'opt_1', label: 'One', imageOrEmoji: '1️⃣' },
      { id: 'opt_7', label: 'Seven', imageOrEmoji: '7️⃣' },
      { id: 'opt_10', label: 'Ten', imageOrEmoji: '🔟' },
      { id: 'opt_4', label: 'Four', imageOrEmoji: '4️⃣' }
    ]
  },
  // Sports & Everyday Objects
  {
    id: 'eng_obj_1',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'BALL',
    spanishTranslation: 'Balón / Pelota',
    audioText: 'Ball',
    category: 'sports',
    title: 'Toys & Sports',
    instructions: 'Listen and choose what you use to play football.',
    hint: 'It is round and bounces on the ground!',
    correctOptionId: 'opt_ball',
    options: [
      { id: 'opt_car', label: 'Car', imageOrEmoji: '🚗' },
      { id: 'opt_ball', label: 'Ball', imageOrEmoji: '⚽' },
      { id: 'opt_book', label: 'Book', imageOrEmoji: '📖' },
      { id: 'opt_house', label: 'House', imageOrEmoji: '🏠' }
    ]
  },
  {
    id: 'eng_food_1',
    subject: 'ingles',
    level: 1,
    type: 'vocab_match_word',
    englishWord: 'APPLE',
    spanishTranslation: 'Manzana',
    audioText: 'Apple',
    category: 'food',
    title: 'Yummy Food',
    instructions: 'What is the English word for this red fruit?',
    hint: 'Starts with A: A is for Apple!',
    correctOptionId: 'opt_apple',
    options: [
      { id: 'opt_banana', label: 'Banana', imageOrEmoji: '🍌' },
      { id: 'opt_apple', label: 'Apple', imageOrEmoji: '🍎' },
      { id: 'opt_pizza', label: 'Pizza', imageOrEmoji: '🍕' },
      { id: 'opt_milk', label: 'Milk', imageOrEmoji: '🥛' }
    ]
  },

  // ==========================================
  // CURRÍCULO 1º TRIMESTRE: COLEGIO
  // ==========================================

  // 1. Instrucciones de clase y cortesía
  {
    id: 'eng_inst_listen',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'LISTEN',
    spanishTranslation: 'Escucha',
    audioText: 'Listen',
    category: 'classroom_instructions',
    title: 'Classroom Instructions',
    instructions: 'Listen to the teacher and tap the correct action.',
    hint: 'Use your ears to listen carefully!',
    correctOptionId: 'opt_listen',
    options: [
      { id: 'opt_listen', label: 'Listen 👂', imageOrEmoji: '👂' },
      { id: 'opt_sleep', label: 'Sleep 😴', imageOrEmoji: '😴' },
      { id: 'opt_run', label: 'Run 🏃', imageOrEmoji: '🏃' },
      { id: 'opt_sing', label: 'Sing 🎤', imageOrEmoji: '🎤' }
    ]
  },
  {
    id: 'eng_inst_sitdown',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'SIT DOWN',
    spanishTranslation: 'Siéntate',
    audioText: 'Sit down',
    category: 'classroom_instructions',
    title: 'Classroom Instructions',
    instructions: 'What does the teacher say when you should take a chair?',
    hint: 'Sit down in your chair!',
    correctOptionId: 'opt_sit',
    options: [
      { id: 'opt_sit', label: 'Sit down 🪑', imageOrEmoji: '🪑' },
      { id: 'opt_stand', label: 'Stand up 🧍', imageOrEmoji: '🧍' },
      { id: 'opt_jump', label: 'Jump 🦘', imageOrEmoji: '🦘' },
      { id: 'opt_clap', label: 'Clap 👏', imageOrEmoji: '👏' }
    ]
  },
  {
    id: 'eng_inst_openbook',
    subject: 'ingles',
    level: 1,
    type: 'vocab_match_word',
    englishWord: 'OPEN YOUR BOOK',
    spanishTranslation: 'Abre tu libro',
    audioText: 'Open your book',
    category: 'classroom_instructions',
    title: 'Classroom Instructions',
    instructions: 'Choose the picture that means "Open your book".',
    hint: 'Open your reading book to start the class!',
    correctOptionId: 'opt_open_book',
    options: [
      { id: 'opt_open_book', label: 'Open your book 📖', imageOrEmoji: '📖' },
      { id: 'opt_backpack', label: 'School bag 🎒', imageOrEmoji: '🎒' },
      { id: 'opt_pencil', label: 'Pencil ✏️', imageOrEmoji: '✏️' },
      { id: 'opt_bell', label: 'School bell 🔔', imageOrEmoji: '🔔' }
    ]
  },
  {
    id: 'eng_inst_raisehand',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'RAISE YOUR HAND',
    spanishTranslation: 'Levanta la mano',
    audioText: 'Raise your hand',
    category: 'classroom_instructions',
    title: 'Classroom Instructions',
    instructions: 'Before speaking in class, you must...',
    hint: 'Raise your hand to ask a question!',
    correctOptionId: 'opt_hand_up',
    options: [
      { id: 'opt_hand_up', label: 'Raise your hand 🙋', imageOrEmoji: '🙋' },
      { id: 'opt_dance', label: 'Dance 💃', imageOrEmoji: '💃' },
      { id: 'opt_whistle', label: 'Whistle 🎵', imageOrEmoji: '🎵' },
      { id: 'opt_look', label: 'Look 👀', imageOrEmoji: '👀' }
    ]
  },
  {
    id: 'eng_courtesy_please',
    subject: 'ingles',
    level: 1,
    type: 'vocab_match_word',
    englishWord: 'PLEASE & THANK YOU',
    spanishTranslation: 'Por favor y Gracias',
    audioText: 'Please and thank you',
    category: 'classroom_instructions',
    title: 'Magic Words (Courtesy)',
    instructions: 'How do you say "Por favor" and "Gracias" in English?',
    hint: 'Polite words we always say with a smile!',
    correctOptionId: 'opt_please_thankyou',
    options: [
      { id: 'opt_please_thankyou', label: 'Please & Thank you 🙏', imageOrEmoji: '🤝' },
      { id: 'opt_bye', label: 'Goodbye 👋', imageOrEmoji: '👋' },
      { id: 'opt_hello', label: 'Hello & Hi 😄', imageOrEmoji: '👋' },
      { id: 'opt_yes', label: 'Yes & No 👍', imageOrEmoji: '👍' }
    ]
  },

  // 2. Frases sobre uno mismo
  {
    id: 'eng_self_myname',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'MY NAME IS...',
    spanishTranslation: 'Mi nombre es...',
    audioText: 'My name is',
    category: 'classroom_instructions',
    title: 'About Myself',
    instructions: 'Listen to the phrase used to tell your name.',
    hint: 'My name is... (followed by your name)!',
    correctOptionId: 'opt_name',
    options: [
      { id: 'opt_name', label: 'My name is... 📛', imageOrEmoji: '📛' },
      { id: 'opt_color', label: 'My favorite color 🎨', imageOrEmoji: '🎨' },
      { id: 'opt_pet', label: 'My pet 🐶', imageOrEmoji: '🐶' },
      { id: 'opt_school', label: 'My school 🏫', imageOrEmoji: '🏫' }
    ]
  },

  // 3. Estancias del colegio
  {
    id: 'eng_sch_classroom',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'CLASSROOM',
    spanishTranslation: 'El aula / La clase',
    audioText: 'Classroom',
    category: 'school',
    title: 'School Places',
    instructions: 'Where do we learn with the teacher and desks?',
    hint: 'It is the classroom!',
    correctOptionId: 'opt_classroom',
    options: [
      { id: 'opt_classroom', label: 'Classroom 🏫', imageOrEmoji: '🏫' },
      { id: 'opt_pool', label: 'Swimming pool 🏊', imageOrEmoji: '🏊' },
      { id: 'opt_kitchen', label: 'Kitchen 🍳', imageOrEmoji: '🍳' },
      { id: 'opt_park', label: 'Park 🌳', imageOrEmoji: '🌳' }
    ]
  },
  {
    id: 'eng_sch_playground',
    subject: 'ingles',
    level: 1,
    type: 'vocab_match_word',
    englishWord: 'PLAYGROUND',
    spanishTranslation: 'El patio de recreo',
    audioText: 'Playground',
    category: 'school',
    title: 'School Places',
    instructions: 'Where do children play during break time / recreo?',
    hint: 'The playground outside!',
    correctOptionId: 'opt_playground',
    options: [
      { id: 'opt_playground', label: 'Playground 🛝', imageOrEmoji: '🛝' },
      { id: 'opt_office', label: 'Office 💼', imageOrEmoji: '💼' },
      { id: 'opt_bus', label: 'School bus 🚌', imageOrEmoji: '🚌' },
      { id: 'opt_cinema', label: 'Cinema 🍿', imageOrEmoji: '🍿' }
    ]
  },

  // 4. Material escolar
  {
    id: 'eng_mat_pencil',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'PENCIL',
    spanishTranslation: 'Lápiz',
    audioText: 'Pencil',
    category: 'school',
    title: 'School Supplies',
    instructions: 'Listen and choose what you use to write and draw.',
    hint: 'Starts with P: Pencil!',
    correctOptionId: 'opt_pencil',
    options: [
      { id: 'opt_pencil', label: 'Pencil ✏️', imageOrEmoji: '✏️' },
      { id: 'opt_scissors', label: 'Scissors ✂️', imageOrEmoji: '✂️' },
      { id: 'opt_ruler', label: 'Ruler 📏', imageOrEmoji: '📏' },
      { id: 'opt_glue', label: 'Glue 🧴', imageOrEmoji: '🧴' }
    ]
  },
  {
    id: 'eng_mat_rubber',
    subject: 'ingles',
    level: 1,
    type: 'vocab_match_word',
    englishWord: 'RUBBER / ERASER',
    spanishTranslation: 'Goma de borrar',
    audioText: 'Rubber',
    category: 'school',
    title: 'School Supplies',
    instructions: 'What do you use to erase pencil mistakes?',
    hint: 'A rubber or eraser cleans the page!',
    correctOptionId: 'opt_rubber',
    options: [
      { id: 'opt_rubber', label: 'Rubber 🧼', imageOrEmoji: '🧼' },
      { id: 'opt_backpack', label: 'Backpack 🎒', imageOrEmoji: '🎒' },
      { id: 'opt_book', label: 'Book 📖', imageOrEmoji: '📖' },
      { id: 'opt_desk', label: 'Desk 🪑', imageOrEmoji: '🪑' }
    ]
  },
  {
    id: 'eng_mat_backpack',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'SCHOOL BAG',
    spanishTranslation: 'Mochila escolar',
    audioText: 'School bag',
    category: 'school',
    title: 'School Supplies',
    instructions: 'What do you carry on your back with your books inside?',
    hint: 'Your school bag or backpack!',
    correctOptionId: 'opt_bag',
    options: [
      { id: 'opt_bag', label: 'School bag 🎒', imageOrEmoji: '🎒' },
      { id: 'opt_pencil', label: 'Pencil ✏️', imageOrEmoji: '✏️' },
      { id: 'opt_clock', label: 'Clock ⏰', imageOrEmoji: '⏰' },
      { id: 'opt_ruler', label: 'Ruler 📏', imageOrEmoji: '📏' }
    ]
  },

  // 5. Números hasta el 20 (currículo colegio)
  {
    id: 'eng_num_12',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'TWELVE',
    spanishTranslation: 'Doce (12)',
    audioText: 'Twelve',
    category: 'numbers',
    title: 'Numbers to 20',
    instructions: 'Listen to the number: Twelve (12).',
    hint: 'After eleven (11) comes twelve (12)!',
    correctOptionId: 'opt_12',
    options: [
      { id: 'opt_11', label: 'Eleven (11)', imageOrEmoji: '1️⃣1️⃣' },
      { id: 'opt_12', label: 'Twelve (12)', imageOrEmoji: '1️⃣2️⃣' },
      { id: 'opt_13', label: 'Thirteen (13)', imageOrEmoji: '1️⃣3️⃣' },
      { id: 'opt_20', label: 'Twenty (20)', imageOrEmoji: '2️⃣0️⃣' }
    ]
  },
  {
    id: 'eng_num_20',
    subject: 'ingles',
    level: 1,
    type: 'vocab_match_word',
    englishWord: 'TWENTY',
    spanishTranslation: 'Veinte (20)',
    audioText: 'Twenty',
    category: 'numbers',
    title: 'Numbers to 20',
    instructions: 'How do you say 20 in English?',
    hint: 'Two tens: Twenty (20)!',
    correctOptionId: 'opt_20',
    options: [
      { id: 'opt_10', label: 'Ten (10)', imageOrEmoji: '🔟' },
      { id: 'opt_15', label: 'Fifteen (15)', imageOrEmoji: '1️⃣5️⃣' },
      { id: 'opt_20', label: 'Twenty (20)', imageOrEmoji: '2️⃣0️⃣' },
      { id: 'opt_18', label: 'Eighteen (18)', imageOrEmoji: '1️⃣8️⃣' }
    ]
  },

  // 6. Partes del cuerpo
  {
    id: 'eng_body_head',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'HEAD',
    spanishTranslation: 'Cabeza',
    audioText: 'Head',
    category: 'body',
    title: 'Parts of the Body',
    instructions: 'Head, shoulders, knees and toes! Which one is "Head"?',
    hint: 'On top of your body with your hair and smile!',
    correctOptionId: 'opt_head',
    options: [
      { id: 'opt_head', label: 'Head 🗣️', imageOrEmoji: '🗣️' },
      { id: 'opt_foot', label: 'Foot 🦶', imageOrEmoji: '🦶' },
      { id: 'opt_hand', label: 'Hand ✋', imageOrEmoji: '✋' },
      { id: 'opt_leg', label: 'Leg 🦵', imageOrEmoji: '🦵' }
    ]
  },
  {
    id: 'eng_body_eyes',
    subject: 'ingles',
    level: 1,
    type: 'vocab_match_word',
    englishWord: 'EYES',
    spanishTranslation: 'Ojos',
    audioText: 'Eyes',
    category: 'body',
    title: 'Parts of the Body',
    instructions: 'What do you use to see all the colors?',
    hint: 'Two blue or brown eyes!',
    correctOptionId: 'opt_eyes',
    options: [
      { id: 'opt_eyes', label: 'Eyes 👀', imageOrEmoji: '👀' },
      { id: 'opt_ears', label: 'Ears 👂', imageOrEmoji: '👂' },
      { id: 'opt_mouth', label: 'Mouth 👄', imageOrEmoji: '👄' },
      { id: 'opt_nose', label: 'Nose 👃', imageOrEmoji: '👃' }
    ]
  },

  // 7. Días de la semana y el tiempo atmosférico
  {
    id: 'eng_weath_sunny',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'SUNNY',
    spanishTranslation: 'Soleado',
    audioText: 'Sunny',
    category: 'days_weather',
    title: 'The Weather',
    instructions: 'What is the weather like when the sun shines bright?',
    hint: 'It is a sunny day!',
    correctOptionId: 'opt_sunny',
    options: [
      { id: 'opt_sunny', label: 'Sunny ☀️', imageOrEmoji: '☀️' },
      { id: 'opt_rainy', label: 'Rainy 🌧️', imageOrEmoji: '🌧️' },
      { id: 'opt_snowy', label: 'Snowy ❄️', imageOrEmoji: '❄️' },
      { id: 'opt_windy', label: 'Windy 💨', imageOrEmoji: '💨' }
    ]
  },
  {
    id: 'eng_weath_rainy',
    subject: 'ingles',
    level: 1,
    type: 'vocab_match_word',
    englishWord: 'RAINY',
    spanishTranslation: 'Lluvioso',
    audioText: 'Rainy',
    category: 'days_weather',
    title: 'The Weather',
    instructions: 'When water falls from clouds, you need an umbrella because it is...',
    hint: 'It is rainy!',
    correctOptionId: 'opt_rainy',
    options: [
      { id: 'opt_rainy', label: 'Rainy 🌧️', imageOrEmoji: '🌧️' },
      { id: 'opt_sunny', label: 'Sunny ☀️', imageOrEmoji: '☀️' },
      { id: 'opt_cloudy', label: 'Cloudy ☁️', imageOrEmoji: '☁️' },
      { id: 'opt_hot', label: 'Hot 🔥', imageOrEmoji: '🔥' }
    ]
  },
  {
    id: 'eng_days_monday',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'MONDAY',
    spanishTranslation: 'Lunes',
    audioText: 'Monday',
    category: 'days_weather',
    title: 'Days of the Week',
    instructions: 'The first day we go to school after the weekend is...',
    hint: 'Monday is the first day of class!',
    correctOptionId: 'opt_monday',
    options: [
      { id: 'opt_monday', label: 'Monday (Lunes) 📅', imageOrEmoji: '📅' },
      { id: 'opt_sunday', label: 'Sunday (Domingo) 🏖️', imageOrEmoji: '🏖️' },
      { id: 'opt_friday', label: 'Friday (Viernes) 🎉', imageOrEmoji: '🎉' },
      { id: 'opt_saturday', label: 'Saturday (Sábado) ⚽', imageOrEmoji: '⚽' }
    ]
  },

  // 8. Aspectos socioculturales: Halloween y Christmas
  {
    id: 'eng_cult_halloween',
    subject: 'ingles',
    level: 1,
    type: 'vocab_listen_choose',
    englishWord: 'PUMPKIN (HALLOWEEN)',
    spanishTranslation: 'Calabaza de Halloween',
    audioText: 'Pumpkin, happy Halloween!',
    category: 'culture',
    title: 'Halloween & Celebrations',
    instructions: 'Which orange vegetable do we carve with a funny face for Halloween?',
    hint: 'A round orange pumpkin! Trick or treat!',
    correctOptionId: 'opt_pumpkin',
    options: [
      { id: 'opt_pumpkin', label: 'Pumpkin 🎃', imageOrEmoji: '🎃' },
      { id: 'opt_ghost', label: 'Ghost 👻', imageOrEmoji: '👻' },
      { id: 'opt_candy', label: 'Candy 🍬', imageOrEmoji: '🍬' },
      { id: 'opt_bat', label: 'Bat 🦇', imageOrEmoji: '🦇' }
    ]
  },
  {
    id: 'eng_cult_christmas',
    subject: 'ingles',
    level: 1,
    type: 'vocab_match_word',
    englishWord: 'CHRISTMAS TREE',
    spanishTranslation: 'Árbol de Navidad',
    audioText: 'Christmas tree',
    category: 'culture',
    title: 'Christmas & Celebrations',
    instructions: 'What do we decorate with lights and stars in December for Christmas?',
    hint: 'A green Christmas tree with a shining star on top!',
    correctOptionId: 'opt_tree',
    options: [
      { id: 'opt_tree', label: 'Christmas tree 🎄', imageOrEmoji: '🎄' },
      { id: 'opt_santa', label: 'Santa Claus 🎅', imageOrEmoji: '🎅' },
      { id: 'opt_present', label: 'Present 🎁', imageOrEmoji: '🎁' },
      { id: 'opt_snowman', label: 'Snowman ☃️', imageOrEmoji: '☃️' }
    ]
  }
];

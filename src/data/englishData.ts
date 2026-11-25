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
  }
];

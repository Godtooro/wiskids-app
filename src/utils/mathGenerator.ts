import { MathExerciseData } from '../types/education';

const VISUAL_ICONS = ['⚽', '🍎', '⭐', '🎈', '🚗', '🐱', '🍪'];

export function generateMathExercise(currentStreak = 0, level = 1): MathExerciseData {
  const id = `math_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  // Determine difficulty tier based on streak and level
  // Level 1: 6 years old (1º Primaria)
  if (currentStreak < 3) {
    // Stage 1: Single digit basic addition/subtraction (0 to 10)
    const isAddition = Math.random() > 0.35;
    if (isAddition) {
      const a = Math.floor(Math.random() * 6) + 1; // 1 to 6
      const b = Math.floor(Math.random() * (10 - a)) + 1;
      const icon = VISUAL_ICONS[Math.floor(Math.random() * VISUAL_ICONS.length)];

      return {
        id,
        subject: 'matematicas',
        level,
        type: 'horizontal_math',
        title: 'Suma con dibujos',
        instructions: 'Cuenta los objetos y calcula la suma total.',
        operation: '+',
        operand1: a,
        operand2: b,
        expectedResult: a + b,
        visualItems: {
          icon,
          groupCount: 2,
          itemsPerGroup: Math.max(a, b)
        },
        hint: `Usa tus dedos o cuenta los ${icon}: primero ${a} y luego añade ${b}.`
      };
    } else {
      const a = Math.floor(Math.random() * 6) + 4; // 4 to 9
      const b = Math.floor(Math.random() * (a - 1)) + 1; // 1 to a-1
      const icon = VISUAL_ICONS[Math.floor(Math.random() * VISUAL_ICONS.length)];

      return {
        id,
        subject: 'matematicas',
        level,
        type: 'horizontal_math',
        title: 'Resta divertida',
        instructions: '¿Cuántos objetos quedan si quitamos los indicados?',
        operation: '-',
        operand1: a,
        operand2: b,
        expectedResult: a - b,
        visualItems: {
          icon,
          groupCount: 1,
          itemsPerGroup: a
        },
        hint: `Tenías ${a} ${icon} y le quitas ${b}. Cuenta hacia atrás desde el ${a}.`
      };
    }
  }

  if (currentStreak < 6) {
    // Stage 2: Up to 20 without carry, or vertical representation
    const isVertical = Math.random() > 0.5;
    const isAddition = Math.random() > 0.4;

    if (isAddition) {
      const a = Math.floor(Math.random() * 9) + 10; // 10 to 18
      const b = Math.floor(Math.random() * (19 - a)) + 1; // ensures result <= 20 and no carry
      return {
        id,
        subject: 'matematicas',
        level,
        type: isVertical ? 'vertical_math' : 'horizontal_math',
        title: isVertical ? 'Suma en vertical' : 'Suma de números',
        instructions: isVertical ? 'Suma las unidades y luego las decenas.' : 'Calcula el resultado.',
        operation: '+',
        operand1: a,
        operand2: b,
        expectedResult: a + b,
        hasCarry: false,
        hint: `Descompón: ${a} es 10 + ${a - 10}. Luego añade ${b}.`
      };
    } else {
      const a = Math.floor(Math.random() * 8) + 12; // 12 to 19
      const b = Math.floor(Math.random() * (a - 10)) + 1; // ensures no carry (units a >= b)
      return {
        id,
        subject: 'matematicas',
        level,
        type: isVertical ? 'vertical_math' : 'horizontal_math',
        title: isVertical ? 'Resta en vertical' : 'Resta rápida',
        instructions: 'Calcula cuánto queda.',
        operation: '-',
        operand1: a,
        operand2: b,
        expectedResult: a - b,
        hasCarry: false,
        hint: `Resta las unidades primero: ${a % 10} menos ${b}.`
      };
    }
  }

  if (currentStreak < 9) {
    // Stage 3: Progressive addition/subtraction with carry or numbers up to 30
    const isVertical = true;
    const isAddition = Math.random() > 0.4;

    if (isAddition) {
      const a = Math.floor(Math.random() * 10) + 15; // 15 to 24
      const b = Math.floor(Math.random() * 8) + 6; // 6 to 13 (introduces carry)
      return {
        id,
        subject: 'matematicas',
        level,
        type: 'vertical_math',
        title: 'Suma con llevada',
        instructions: 'Coloca el número y no te olvides de la que te llevas.',
        operation: '+',
        operand1: a,
        operand2: b,
        expectedResult: a + b,
        hasCarry: true,
        hint: `Suma las unidades: ${(a % 10)} + ${(b % 10)} = ${(a % 10) + (b % 10)}. Te llevas 1 a las decenas.`
      };
    } else {
      const a = Math.floor(Math.random() * 10) + 21; // 21 to 30
      const b = Math.floor(Math.random() * 8) + 4; // 4 to 11
      return {
        id,
        subject: 'matematicas',
        level,
        type: 'vertical_math',
        title: 'Resta con dos cifras',
        instructions: 'Resta con cuidado columna por columna.',
        operation: '-',
        operand1: a,
        operand2: b,
        expectedResult: a - b,
        hasCarry: (a % 10) < (b % 10),
        hint: `Cuenta desde el número ${b} hasta llegar a ${a}.`
      };
    }
  }

  // Stage 4: Introduction to Multiplication (Visual groups & basic tables: 1, 2, 3, 5, 10)
  const isVisualGroup = Math.random() > 0.4;
  const validTables = [1, 2, 3, 5, 10];
  const table = validTables[Math.floor(Math.random() * validTables.length)];
  const factor = Math.floor(Math.random() * 5) + 1; // 1 to 5
  const icon = VISUAL_ICONS[Math.floor(Math.random() * VISUAL_ICONS.length)];

  if (isVisualGroup) {
    return {
      id,
      subject: 'matematicas',
      level,
      type: 'visual_multiplication',
      title: 'Iniciación a la multiplicación',
      instructions: `Hay ${factor} grupos con ${table} ${icon} cada uno. ¿Cuántos hay en total?`,
      operation: 'x',
      operand1: factor,
      operand2: table,
      expectedResult: factor * table,
      visualItems: {
        icon,
        groupCount: factor,
        itemsPerGroup: table
      },
      hint: `Multiplicar es sumar varias veces lo mismo: suma ${table} unas ${factor} veces.`
    };
  } else {
    return {
      id,
      subject: 'matematicas',
      level,
      type: 'table_multiplication',
      title: `Tabla del ${table}`,
      instructions: `Resuelve esta multiplicación de la tabla del ${table}.`,
      operation: 'x',
      operand1: factor,
      operand2: table,
      expectedResult: factor * table,
      hint: `Piensa: ${factor} veces el número ${table}.`
    };
  }
}

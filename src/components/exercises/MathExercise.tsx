import React, { useState } from 'react';
import { Sparkles, Calculator, Check } from 'lucide-react';
import { MathExerciseData } from '../../types/education';
import { TouchKeypad } from '../common/TouchKeypad';
import { soundService } from '../../services/soundService';

interface MathExerciseProps {
  exercise: MathExerciseData;
  onComplete: (isCorrect: boolean) => void;
}

export const MathExercise: React.FC<MathExerciseProps> = ({ exercise, onComplete }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleKeyPress = (char: string) => {
    if (isSubmitted) return;
    if (userAnswer.length < 4) {
      setUserAnswer((prev) => prev + char);
    }
  };

  const handleBackspace = () => {
    if (isSubmitted) return;
    setUserAnswer((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (userAnswer.trim().length === 0 || isSubmitted) return;

    setIsSubmitted(true);
    const parsed = parseInt(userAnswer, 10);
    const correct = parsed === exercise.expectedResult;
    setIsCorrect(correct);

    if (correct) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-blue-50 border border-blue-200/80 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="font-black text-blue-950 text-lg sm:text-xl">{exercise.title}</h3>
            <p className="text-xs sm:text-sm font-bold text-blue-800">{exercise.instructions}</p>
          </div>
        </div>
        {exercise.hasCarry && (
          <span className="text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full">
            ¡Ojo con la llevada!
          </span>
        )}
      </div>

      {/* Main Content: Chromebook landscape split (Visual representation left, Keypad right) */}
      <div className="my-auto py-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side: Equation / Visual Counting Support */}
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border-2 border-slate-200 shadow-sm min-h-[260px]">
          {/* Visual groups / counters if available */}
          {exercise.visualItems && (
            <div className="mb-6 w-full flex flex-wrap items-center justify-center gap-4">
              {exercise.type === 'visual_multiplication' ? (
                // Grouped representation for multiplication
                Array.from({ length: exercise.visualItems.groupCount }).map((_, groupIdx) => (
                  <div
                    key={groupIdx}
                    className="p-3 bg-blue-50 border-2 border-dashed border-blue-300 rounded-2xl flex items-center gap-1.5 shadow-sm"
                  >
                    {Array.from({ length: exercise.visualItems?.itemsPerGroup || 0 }).map((_, itemIdx) => (
                      <span key={itemIdx} className="text-2xl sm:text-3xl select-none" role="img" aria-hidden="true">
                        {exercise.visualItems?.icon}
                      </span>
                    ))}
                  </div>
                ))
              ) : (
                // Counters for addition/subtraction
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
                  {Array.from({ length: exercise.operand1 }).map((_, i) => (
                    <span key={`op1-${i}`} className="text-2xl sm:text-3xl select-none">
                      {exercise.visualItems?.icon}
                    </span>
                  ))}
                  <span className="font-black text-2xl text-blue-600 mx-2">{exercise.operation}</span>
                  {Array.from({ length: exercise.operand2 }).map((_, i) => (
                    <span key={`op2-${i}`} className="text-2xl sm:text-3xl select-none">
                      {exercise.visualItems?.icon}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Vertical vs Horizontal Equation */}
          {exercise.type === 'vertical_math' ? (
            <div className="font-rounded font-black text-4xl sm:text-5xl text-slate-800 flex flex-col items-end pr-8 select-none">
              <div className="tracking-widest">{exercise.operand1}</div>
              <div className="flex items-center gap-4 tracking-widest">
                <span className="text-blue-600 text-3xl">{exercise.operation}</span>
                <span>{exercise.operand2}</span>
              </div>
              <div className="w-36 sm:w-44 h-1.5 bg-slate-800 my-2 rounded-full"></div>
              {/* Answer slot */}
              <div
                className={`min-w-[100px] h-16 rounded-2xl border-2 flex items-center justify-center font-black text-3xl sm:text-4xl transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                      : 'bg-rose-50 border-rose-400 text-rose-700'
                    : 'bg-sky-50 border-sky-400 text-sky-900 shadow-inner'
                }`}
              >
                {userAnswer || '?'}
              </div>
            </div>
          ) : (
            <div className="font-rounded font-black text-4xl sm:text-6xl text-slate-800 flex items-center gap-3 sm:gap-4 select-none">
              <span>{exercise.operand1}</span>
              <span className="text-blue-600">{exercise.operation}</span>
              <span>{exercise.operand2}</span>
              <span className="text-slate-400">=</span>
              <div
                className={`min-w-[80px] sm:min-w-[110px] h-16 sm:h-20 px-3 rounded-2xl border-2 flex items-center justify-center font-black text-3xl sm:text-5xl transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                      : 'bg-rose-50 border-rose-400 text-rose-700'
                    : 'bg-sky-50 border-sky-400 text-sky-900 shadow-inner'
                }`}
              >
                {userAnswer || '?'}
              </div>
            </div>
          )}

          {/* Feedback message */}
          {isSubmitted && (
            <div
              className={`mt-4 w-full p-3 rounded-2xl text-center font-black text-base sm:text-lg animate-pop ${
                isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
              }`}
            >
              {isCorrect ? (
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>¡Matemático/a estrella! Resultado correcto: {exercise.expectedResult}</span>
                </div>
              ) : (
                <span>El resultado era {exercise.expectedResult}. ¡{exercise.hint || 'Sigue practicando'}!</span>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Keypad & Submit */}
        <div className="flex flex-col items-center justify-center">
          {!isSubmitted ? (
            <TouchKeypad
              mode="numeric"
              onKeyPress={handleKeyPress}
              onBackspace={handleBackspace}
              onSubmit={handleSubmit}
              submitDisabled={userAnswer.trim().length === 0}
            />
          ) : (
            <div className="w-full max-w-sm flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => onComplete(isCorrect === true)}
                className="touch-target w-full h-16 rounded-2xl font-black text-xl bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-200 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-7 h-7 stroke-[3]" />
                <span>¡Siguiente ejercicio!</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

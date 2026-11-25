import React, { useState } from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';
import { CompletionExerciseData } from '../../types/education';
import { AudioButton } from '../common/AudioButton';
import { soundService } from '../../services/soundService';

interface LetterCompletionExerciseProps {
  exercise: CompletionExerciseData;
  onComplete: (isCorrect: boolean) => void;
}

export const LetterCompletionExercise: React.FC<LetterCompletionExerciseProps> = ({
  exercise,
  onComplete
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fullWord = exercise.wordWithBlank.replace('__', exercise.correctOption);

  const handleSelect = (option: string) => {
    if (isSubmitted) return;
    soundService.playTap();
    setSelectedOption(option);
    setIsSubmitted(true);

    const isCorrect = option === exercise.correctOption;
    if (isCorrect) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
  };

  const isCorrect = selectedOption === exercise.correctOption;

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-3xl mx-auto">
      {/* Top Banner */}
      <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-black text-emerald-950 text-lg sm:text-xl">{exercise.title}</h3>
          <p className="text-xs sm:text-sm font-bold text-emerald-800">{exercise.instructions}</p>
        </div>
        <AudioButton textToSpeak={fullWord} lang="es-ES" label="Oír palabra" size="sm" />
      </div>

      {/* Main Visual Display */}
      <div className="my-auto py-8 flex flex-col items-center">
        {exercise.illustration && (
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-emerald-100/60 border-2 border-emerald-200 flex items-center justify-center text-6xl sm:text-7xl shadow-inner mb-6 animate-pop">
            {exercise.illustration}
          </div>
        )}

        {/* Word Display with the Blank */}
        <div className="font-rounded text-4xl sm:text-6xl font-black tracking-widest text-slate-800 bg-white px-8 py-5 rounded-3xl border-2 border-slate-200 shadow-sm mb-8 flex items-center gap-1">
          {exercise.wordWithBlank.split('__').map((part, index, array) => (
            <React.Fragment key={index}>
              <span>{part}</span>
              {index < array.length - 1 && (
                <span
                  className={`inline-block min-w-[50px] sm:min-w-[70px] text-center border-b-4 mx-1 transition-all ${
                    selectedOption
                      ? isCorrect
                        ? 'text-emerald-600 border-emerald-500 animate-bounce-short'
                        : 'text-rose-500 border-rose-400'
                      : 'border-sky-400 text-sky-400'
                  }`}
                >
                  {selectedOption || '?'}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Options to Choose */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-md">
          {exercise.options.map((option) => {
            const isChosen = selectedOption === option;
            let btnStyle = 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 hover:border-sky-400 shadow-sm';

            if (isSubmitted) {
              if (option === exercise.correctOption) {
                btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-200 ring-4 ring-emerald-200';
              } else if (isChosen) {
                btnStyle = 'bg-rose-500 border-rose-600 text-white ring-4 ring-rose-200';
              } else {
                btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-50';
              }
            }

            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                disabled={isSubmitted}
                className={`touch-target flex-1 min-w-[120px] h-20 rounded-2xl border-4 font-black text-3xl sm:text-4xl shadow-md active:scale-95 transition-all flex items-center justify-center ${btnStyle}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Rule explanation feedback */}
        {isSubmitted && (
          <div
            className={`mt-6 w-full max-w-md p-4 rounded-2xl text-center font-bold text-base sm:text-lg animate-pop ${
              isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}
          >
            {isCorrect ? (
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>{exercise.ruleExplanation || '¡Muy bien completado!'}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5 text-rose-600" />
                <span>{exercise.ruleExplanation || '¡Ánimo! Aprenderemos a recordarlo.'}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Continue Action */}
      <div className="pt-4 border-t border-slate-200">
        {isSubmitted && (
          <button
            type="button"
            onClick={() => onComplete(isCorrect)}
            className="touch-target w-full h-14 rounded-2xl font-black text-lg sm:text-xl bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-200 transition-all active:scale-95 flex items-center justify-center"
          >
            <span>{isCorrect ? '¡Siguiente reto!' : 'Continuar'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

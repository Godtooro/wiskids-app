import React, { useState } from 'react';
import { Volume2, Sparkles, Check } from 'lucide-react';
import { DictationExerciseData } from '../../types/education';
import { TouchKeypad } from '../common/TouchKeypad';
import { AudioButton } from '../common/AudioButton';
import { soundService } from '../../services/soundService';

interface VisualDictationExerciseProps {
  exercise: DictationExerciseData;
  onComplete: (isCorrect: boolean) => void;
}

export const VisualDictationExercise: React.FC<VisualDictationExerciseProps> = ({
  exercise,
  onComplete
}) => {
  const [typedText, setTypedText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const target = exercise.word.toUpperCase();
  const maxLen = target.length;

  const handleKeyPress = (char: string) => {
    if (isSubmitted) return;
    if (typedText.length < maxLen) {
      setTypedText((prev) => prev + char);
    }
  };

  const handleBackspace = () => {
    if (isSubmitted) return;
    setTypedText((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (typedText.length === 0 || isSubmitted) return;

    setIsSubmitted(true);
    const correct = typedText.trim().toUpperCase() === target;
    setIsCorrect(correct);

    if (correct) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-2xl mx-auto">
      {/* Top Banner */}
      <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-black text-emerald-950 text-lg sm:text-xl">{exercise.title}</h3>
          <p className="text-xs sm:text-sm font-bold text-emerald-800">{exercise.instructions}</p>
        </div>
        <AudioButton
          textToSpeak={exercise.spokenText}
          lang={exercise.language}
          label="Repetir voz"
          size="sm"
        />
      </div>

      {/* Center Image + Letter Slots */}
      <div className="my-auto py-4 flex flex-col items-center">
        {/* Illustration */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white border-2 border-slate-200 flex items-center justify-center text-5xl sm:text-6xl shadow-sm mb-4">
          {exercise.illustration}
        </div>

        {/* Input Slots */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6">
          {Array.from({ length: maxLen }).map((_, idx) => {
            const letter = typedText[idx] || '';
            const isActive = idx === typedText.length && !isSubmitted;

            return (
              <div
                key={idx}
                className={`w-12 h-14 sm:w-16 sm:h-18 rounded-2xl border-2 flex items-center justify-center font-black text-2xl sm:text-3xl transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                      : 'bg-rose-50 border-rose-400 text-rose-800'
                    : isActive
                    ? 'border-sky-500 bg-sky-50/50 shadow-md ring-2 ring-sky-200'
                    : letter
                    ? 'border-slate-300 bg-white text-slate-800'
                    : 'border-slate-200 bg-slate-50 text-slate-400'
                }`}
              >
                {letter}
              </div>
            );
          })}
        </div>

        {/* Result Message */}
        {isSubmitted && (
          <div
            className={`w-full p-3 rounded-2xl text-center font-bold text-base mb-4 animate-pop ${
              isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
            }`}
          >
            {isCorrect ? (
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>¡Escribiste "{target}" a la perfección!</span>
              </div>
            ) : (
              <span>Era "{target}". ¡No te preocupes, lo practicaremos!</span>
            )}
          </div>
        )}

        {/* Touch Keypad */}
        {!isSubmitted ? (
          <TouchKeypad
            mode="letters"
            letterPool={exercise.optionsLetters}
            onKeyPress={handleKeyPress}
            onBackspace={handleBackspace}
            onSubmit={handleSubmit}
            submitDisabled={typedText.length !== maxLen}
          />
        ) : (
          <button
            type="button"
            onClick={() => onComplete(isCorrect === true)}
            className="touch-target w-full h-14 rounded-2xl font-black text-lg bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-6 h-6 stroke-[3]" />
            <span>Continuar</span>
          </button>
        )}
      </div>
    </div>
  );
};

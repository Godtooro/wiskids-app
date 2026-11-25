import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { EnglishExerciseData } from '../../types/education';
import { AudioButton } from '../common/AudioButton';
import { soundService } from '../../services/soundService';

interface EnglishExerciseProps {
  exercise: EnglishExerciseData;
  onComplete: (isCorrect: boolean) => void;
}

export const EnglishExercise: React.FC<EnglishExerciseProps> = ({ exercise, onComplete }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (optionId: string) => {
    if (isSubmitted) return;
    soundService.playTap();
    setSelectedOptionId(optionId);
    setIsSubmitted(true);

    const isCorrect = optionId === exercise.correctOptionId;
    if (isCorrect) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
  };

  const isCorrect = selectedOptionId === exercise.correctOptionId;

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-purple-50 border border-purple-200/80 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-hidden="true">🇬🇧</span>
          <div>
            <h3 className="font-black text-purple-950 text-lg sm:text-xl">{exercise.title}</h3>
            <p className="text-xs sm:text-sm font-bold text-purple-800">{exercise.instructions}</p>
          </div>
        </div>
        <AudioButton
          textToSpeak={exercise.audioText}
          lang="en-US"
          label="Listen in English"
          size="sm"
        />
      </div>

      {/* Main Card Area */}
      <div className="my-auto py-4 flex flex-col items-center">
        {/* Prompt Header */}
        <div className="text-center mb-6">
          <div className="font-rounded font-black text-3xl sm:text-4xl text-purple-900 tracking-wide flex items-center justify-center gap-3">
            <span>"{exercise.englishWord}"</span>
          </div>
          <p className="text-sm font-bold text-slate-500 mt-1">
            En español significa: <strong className="text-slate-800">{exercise.spanishTranslation}</strong>
          </p>
        </div>

        {/* 4 Visual Cards Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
          {exercise.options.map((option) => {
            const isChosen = selectedOptionId === option.id;
            const isThisTarget = option.id === exercise.correctOptionId;

            let cardStyle = 'bg-white hover:bg-purple-50/50 border-slate-200 hover:border-purple-300 text-slate-800 shadow-sm';

            if (isSubmitted) {
              if (isThisTarget) {
                cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-4 ring-emerald-200 shadow-md';
              } else if (isChosen) {
                cardStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-4 ring-rose-200';
              } else {
                cardStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
              }
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                disabled={isSubmitted}
                className={`touch-target min-h-[110px] sm:min-h-[140px] p-4 rounded-3xl border-3 flex flex-col items-center justify-center gap-2 font-black text-xl sm:text-2xl transition-all active:scale-95 select-none ${cardStyle}`}
              >
                <span className="text-4xl sm:text-5xl" role="img" aria-hidden="true">
                  {option.imageOrEmoji}
                </span>
                <span className="leading-tight text-center">{option.label}</span>
                {isSubmitted && isThisTarget && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 animate-bounce" />
                )}
                {isSubmitted && isChosen && !isThisTarget && (
                  <XCircle className="w-6 h-6 text-rose-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback message */}
        {isSubmitted && (
          <div
            className={`mt-6 w-full max-w-lg p-3.5 rounded-2xl text-center font-bold text-base animate-pop ${
              isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
            }`}
          >
            {isCorrect ? (
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Great job! "{exercise.englishWord}" is {exercise.spanishTranslation}.</span>
              </div>
            ) : (
              <span>"{exercise.englishWord}" means {exercise.spanishTranslation}. Practice makes perfect!</span>
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
            className="touch-target w-full h-14 rounded-2xl font-black text-lg bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Continuar</span>
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </button>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { RotateCcw, Check, Sparkles } from 'lucide-react';
import { OrderingExerciseData } from '../../types/education';
import { AudioButton } from '../common/AudioButton';
import { soundService } from '../../services/soundService';

interface OrderingExerciseProps {
  exercise: OrderingExerciseData;
  onComplete: (isCorrect: boolean) => void;
}

export const OrderingExercise: React.FC<OrderingExerciseProps> = ({ exercise, onComplete }) => {
  // Pool of available items: each item tagged with original unique index to handle duplicate words
  const [availableItems, setAvailableItems] = useState<Array<{ id: number; text: string }>>(
    exercise.items.map((text, id) => ({ id, text }))
  );
  const [selectedItems, setSelectedItems] = useState<Array<{ id: number; text: string }>>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleSelectBlock = (item: { id: number; text: string }) => {
    if (isSubmitted) return;
    soundService.playTap();
    setAvailableItems((prev) => prev.filter((i) => i.id !== item.id));
    setSelectedItems((prev) => [...prev, item]);
  };

  const handleUnselectBlock = (item: { id: number; text: string }) => {
    if (isSubmitted) return;
    soundService.playTap();
    setSelectedItems((prev) => prev.filter((i) => i.id !== item.id));
    setAvailableItems((prev) => [...prev, item]);
  };

  const handleReset = () => {
    soundService.playTap();
    setAvailableItems(exercise.items.map((text, id) => ({ id, text })));
    setSelectedItems([]);
    setIsSubmitted(false);
    setIsSuccess(null);
  };

  const handleCheck = () => {
    if (selectedItems.length !== exercise.correctOrder.length || isSubmitted) return;

    setIsSubmitted(true);
    const formedSequence = selectedItems.map((i) => i.text);
    const correct = formedSequence.every((val, idx) => val === exercise.correctOrder[idx]);

    setIsSuccess(correct);
    if (correct) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {exercise.illustration && (
            <span className="text-3xl" role="img" aria-hidden="true">
              {exercise.illustration}
            </span>
          )}
          <div>
            <h3 className="font-black text-emerald-950 text-lg sm:text-xl">{exercise.title}</h3>
            <p className="text-xs sm:text-sm font-bold text-emerald-800">{exercise.instructions}</p>
          </div>
        </div>
        {exercise.targetSentence && (
          <AudioButton
            textToSpeak={exercise.targetSentence}
            lang="es-ES"
            label="Pista de voz"
            size="sm"
          />
        )}
      </div>

      {/* Center Interactive Playground */}
      <div className="my-auto py-6 flex flex-col items-center">
        {/* Destination: The Constructed Sentence / Word Bar */}
        <div className="w-full mb-8">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2 text-center">
            {exercise.category === 'syllables' ? 'Palabra armada:' : 'Tu frase ordenada:'}
          </div>

          <div className="min-h-[76px] w-full bg-slate-100/90 border-2 border-dashed border-slate-300 rounded-3xl p-3 flex flex-wrap items-center justify-center gap-2.5 transition-colors">
            {selectedItems.length === 0 ? (
              <span className="text-slate-400 font-bold text-sm sm:text-base italic select-none">
                Toca los bloques de abajo en el orden correcto
              </span>
            ) : (
              selectedItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleUnselectBlock(item)}
                  disabled={isSubmitted && isSuccess === true}
                  className="touch-target px-4 sm:px-6 h-14 bg-sky-500 hover:bg-sky-600 text-white font-black text-xl sm:text-2xl rounded-2xl shadow-md shadow-sky-200 active:scale-95 transition-all select-none animate-pop flex items-center justify-center"
                >
                  {item.text}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Source: Available Blocks to Tap */}
        <div className="w-full">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2 text-center">
            Bloques disponibles:
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 min-h-[64px]">
            {availableItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectBlock(item)}
                disabled={isSubmitted}
                className="touch-target px-5 sm:px-7 h-14 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-sky-400 text-slate-800 font-black text-xl sm:text-2xl rounded-2xl shadow-sm active:scale-95 transition-all select-none flex items-center justify-center"
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>

        {/* Result Feedback Banner */}
        {isSubmitted && (
          <div
            className={`mt-6 w-full p-4 rounded-2xl text-center font-black text-base sm:text-lg animate-pop ${
              isSuccess
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}
          >
            {isSuccess ? (
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-600" />
                <span>¡Perfecto! Has ordenado la frase correctamente.</span>
              </div>
            ) : (
              <span>¡Vaya! El orden no es correcto todavía. Pulsa "Reiniciar" y prueba de nuevo.</span>
            )}
          </div>
        )}
      </div>

      {/* Bottom Actions Bar */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleReset}
          disabled={selectedItems.length === 0 && !isSubmitted}
          className="touch-target px-5 h-14 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold active:scale-95 transition-all flex items-center gap-2 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reiniciar</span>
        </button>

        {!isSubmitted ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={selectedItems.length !== exercise.correctOrder.length}
            className={`touch-target flex-1 h-14 rounded-2xl font-black text-lg sm:text-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${
              selectedItems.length !== exercise.correctOrder.length
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200'
            }`}
          >
            <Check className="w-6 h-6 stroke-[3]" />
            <span>Comprobar</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onComplete(isSuccess === true)}
            className="touch-target flex-1 h-14 rounded-2xl font-black text-lg sm:text-xl bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>{isSuccess ? '¡Continuar!' : 'Reintentar'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

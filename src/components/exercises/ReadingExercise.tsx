import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, BookOpen } from 'lucide-react';
import { ReadingExerciseData } from '../../types/education';
import { AudioButton } from '../common/AudioButton';
import { soundService } from '../../services/soundService';

interface ReadingExerciseProps {
  exercise: ReadingExerciseData;
  onComplete: (isCorrect: boolean) => void;
}

export const ReadingExercise: React.FC<ReadingExerciseProps> = ({ exercise, onComplete }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasMistakeInAnyQuestion, setHasMistakeInAnyQuestion] = useState(false);

  const currentQ = exercise.questions[currentQuestionIdx];
  const isLastQuestion = currentQuestionIdx === exercise.questions.length - 1;

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    soundService.playTap();
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isSubmitted) return;

    setIsSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctIndex;

    if (isCorrect) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
      setHasMistakeInAnyQuestion(true);
    }
  };

  const handleNext = () => {
    soundService.playTap();
    if (!isLastQuestion) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Completed all questions in the reading
      onComplete(!hasMistakeInAnyQuestion && selectedOption === currentQ.correctIndex);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-7xl mx-auto">
      {/* Exercise title & instructions banner */}
      <div className="flex items-center justify-between mb-3 bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-2.5">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-base sm:text-lg">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          <span>{exercise.title}</span>
        </div>
        <div className="text-xs font-bold text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200">
          Pregunta {currentQuestionIdx + 1} de {exercise.questions.length}
        </div>
      </div>

      {/* Main split-screen container:
          - Mobile: column
          - Chromebook / Tablet Horizontal (md/lg): 50% left (story) / 50% right (question)
      */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 min-h-0 overflow-y-auto lg:overflow-visible">
        {/* Left Column: Story Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-100 shadow-sm flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                {exercise.illustration && (
                  <span className="text-4xl" role="img" aria-hidden="true">
                    {exercise.illustration}
                  </span>
                )}
                <h3 className="font-black text-xl sm:text-2xl text-slate-800">
                  {exercise.storyTitle}
                </h3>
              </div>
              <AudioButton
                textToSpeak={exercise.storyText}
                lang="es-ES"
                label="Leer cuento"
                size="sm"
              />
            </div>

            <p className="font-rounded text-lg sm:text-xl md:text-2xl leading-relaxed text-slate-700 bg-emerald-50/40 p-4 sm:p-5 rounded-2xl border border-emerald-100/60 font-semibold">
              {exercise.storyText}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-400 font-bold flex items-center justify-between">
            <span>💡 Consejo: Lee despacio o pulsa "Leer cuento".</span>
          </div>
        </div>

        {/* Right Column: Question & Options */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl">
                Comprensión Lectora
              </span>
              <AudioButton
                textToSpeak={currentQ.question}
                lang="es-ES"
                label="Oír pregunta"
                size="sm"
              />
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
              {currentQ.question}
            </h4>

            {/* Options list */}
            <div className="flex flex-col gap-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let stateClasses = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                if (isSelected && !isSubmitted) {
                  stateClasses = 'bg-sky-50 border-sky-400 text-sky-900 ring-2 ring-sky-300';
                }

                if (isSubmitted) {
                  if (isCorrect) {
                    stateClasses = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400';
                  } else if (isSelected) {
                    stateClasses = 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-300';
                  } else {
                    stateClasses = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={isSubmitted}
                    className={`touch-target w-full text-left p-4 sm:p-5 rounded-2xl border-2 font-black text-lg sm:text-xl transition-all flex items-center justify-between select-none ${stateClasses}`}
                  >
                    <span className="flex-1">{option}</span>
                    {isSubmitted && isCorrect && (
                      <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 ml-2" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-7 h-7 text-rose-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Actions */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            {isSubmitted && (
              <div
                className={`p-3.5 rounded-2xl mb-4 font-bold text-sm sm:text-base ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-rose-100 text-rose-900'
                }`}
              >
                {selectedOption === currentQ.correctIndex ? (
                  <span>🎉 ¡Excelente comprensión! {currentQ.explanation}</span>
                ) : (
                  <span>💪 ¡Casi! {currentQ.explanation || 'Revisa el cuento a la izquierda.'}</span>
                )}
              </div>
            )}

            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
                className={`touch-target w-full h-14 rounded-2xl font-black text-lg sm:text-xl shadow-md transition-all active:scale-95 ${
                  selectedOption === null
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200'
                }`}
              >
                Comprobar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="touch-target w-full h-14 rounded-2xl font-black text-lg sm:text-xl bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{isLastQuestion ? '¡Finalizar Reto!' : 'Siguiente Pregunta'}</span>
                <ArrowRight className="w-6 h-6 stroke-[3]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

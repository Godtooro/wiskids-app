import React, { useState } from 'react';
import { X, Sparkles, Trophy, Home } from 'lucide-react';
import { Exercise, UserProfile } from '../../types/education';
import { storageService } from '../../services/storageService';
import { soundService } from '../../services/soundService';

// Exercises
import { ReadingExercise } from '../exercises/ReadingExercise';
import { OrderingExercise } from '../exercises/OrderingExercise';
import { LetterCompletionExercise } from '../exercises/LetterCompletionExercise';
import { VisualDictationExercise } from '../exercises/VisualDictationExercise';
import { MathExercise } from '../exercises/MathExercise';
import { GeographyMapExercise } from '../exercises/GeographyMapExercise';
import { EnglishExercise } from '../exercises/EnglishExercise';
import { MemoryExercise } from '../exercises/MemoryExercise';

interface SessionRunnerViewProps {
  exercises: Exercise[];
  sessionTitle: string;
  onFinishSession: (updatedProfile: UserProfile) => void;
  onExit: () => void;
}

export const SessionRunnerView: React.FC<SessionRunnerViewProps> = ({
  exercises,
  sessionTitle,
  onFinishSession,
  onExit
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const currentExercise = exercises[currentIndex];
  const progressPercent = Math.round(((currentIndex) / exercises.length) * 100);

  const handleExerciseComplete = async (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    // Persist result into repository
    const updated = await storageService.recordExerciseResult(currentExercise, isCorrect);

    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed the session!
      setIsCompleted(true);
      soundService.playFanfare();
      onFinishSession(updated);
    }
  };

  const renderCurrentExercise = () => {
    if (!currentExercise) return null;

    switch (currentExercise.type) {
      case 'reading':
        return (
          <ReadingExercise
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        );
      case 'ordering':
        return (
          <OrderingExercise
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        );
      case 'completion':
        return (
          <LetterCompletionExercise
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        );
      case 'dictation':
        return (
          <VisualDictationExercise
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        );
      case 'horizontal_math':
      case 'vertical_math':
      case 'visual_multiplication':
      case 'table_multiplication':
        return (
          <MathExercise
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        );
      case 'map_pin':
        return (
          <GeographyMapExercise
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        );
      case 'vocab_listen_choose':
      case 'vocab_match_word':
        return (
          <EnglishExercise
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        );
      case 'memory_cards':
      case 'memory_sequence':
      case 'memory_missing_item':
        return (
          <MemoryExercise
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        );
      default:
        return <div>Tipo de ejercicio desconocido</div>;
    }
  };

  // Celebration Final Screen
  if (isCompleted) {
    const totalExercises = exercises.length;
    const starsEarned = correctCount * 1;

    return (
      <div className="w-full flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-lg w-full border-2 border-slate-200 shadow-2xl text-center animate-pop flex flex-col items-center">
          <div className="w-24 h-24 rounded-3xl bg-amber-100 text-amber-500 flex items-center justify-center text-5xl mb-4 animate-bounce-short">
            🏆
          </div>

          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            ¡Entrenamiento Completado!
          </h2>
          <p className="text-slate-500 font-bold mt-1">
            Has demostrado tu constancia y esfuerzo de hoy.
          </p>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-4 w-full my-6">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-1">
                <Sparkles className="w-5 h-5 fill-current" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-700">Estrellas</span>
              </div>
              <div className="text-3xl font-black text-amber-900">+{starsEarned}</div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 mb-1">
                <Trophy className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700">Aciertos</span>
              </div>
              <div className="text-3xl font-black text-emerald-900">
                {correctCount} / {totalExercises}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              onExit();
            }}
            className="touch-target w-full h-16 rounded-2xl font-black text-xl bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-6 h-6" />
            <span>Volver al Menú Principal</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col justify-between">
      {/* Top Header Bar with Progress Tracker */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Close button with confirmation */}
          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              setShowExitConfirm(true);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Salir de la sesión"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Progress Bar & Indicators */}
          <div className="flex-1 max-w-xl">
            <div className="flex items-center justify-between text-xs font-black text-slate-500 mb-1.5">
              <span>{sessionTitle}</span>
              <span>
                Reto {currentIndex + 1} de {exercises.length}
              </span>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.max(progressPercent, 5)}%` }}
              />
            </div>
          </div>

          {/* Correct Counter */}
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl text-sm font-black border border-emerald-200">
            <span>⭐</span>
            <span>{correctCount}</span>
          </div>
        </div>
      </div>

      {/* Main Exercise Area */}
      <div className="flex-1 flex flex-col justify-center min-h-0 overflow-y-auto">
        {renderCurrentExercise()}
      </div>

      {/* Confirmation Modal to Exit Session */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-2 border-slate-200 shadow-xl text-center animate-pop">
            <div className="text-4xl mb-3">🤔</div>
            <h3 className="text-xl font-black text-slate-800">¿Quieres salir?</h3>
            <p className="text-sm font-bold text-slate-500 mt-1 mb-6">
              ¡Te quedan muy pocos retos para terminar tu sesión de hoy!
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="touch-target flex-1 h-12 rounded-xl font-bold bg-sky-500 text-white active:scale-95 transition-all"
              >
                Seguir jugando
              </button>
              <button
                type="button"
                onClick={onExit}
                className="touch-target flex-1 h-12 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

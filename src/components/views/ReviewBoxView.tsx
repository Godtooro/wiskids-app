import React from 'react';
import { Target, Sparkles, Play, CheckCircle2, RotateCcw } from 'lucide-react';
import { UserProfile, Exercise } from '../../types/education';
import { soundService } from '../../services/soundService';

interface ReviewBoxViewProps {
  profile: UserProfile;
  onStartReviewSession: (exercises: Exercise[]) => void;
  onBack: () => void;
}

export const ReviewBoxView: React.FC<ReviewBoxViewProps> = ({
  profile,
  onStartReviewSession,
  onBack
}) => {
  const queue = profile.reviewQueue;

  const handleStartReview = () => {
    if (queue.length === 0) return;
    soundService.playTap();
    const exercisesToReview = queue.map((item) => item.exercise);
    onStartReviewSession(exercisesToReview);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-rose-500/20 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-4xl sm:text-5xl shrink-0">
              🎯
            </div>
            <div>
              <span className="bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider">
                Sistema de Repaso Inteligente
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-1">
                Buzón de Retos ("Mis Fallos")
              </h1>
              <p className="text-rose-100 font-bold text-sm sm:text-base mt-0.5">
                Regla de oro: Para que un reto salga del buzón, ¡debes acertarlo 2 veces seguidas!
              </p>
            </div>
          </div>

          {queue.length > 0 && (
            <button
              type="button"
              onClick={handleStartReview}
              className="touch-target px-6 py-4 bg-white text-rose-600 hover:bg-rose-50 font-black text-lg sm:text-xl rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-2 shrink-0"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>Repasar ({queue.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content: Empty State vs Cards List */}
      {queue.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 text-center flex flex-col items-center">
          <div className="w-24 h-24 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-5xl mb-4">
            🌟
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            ¡Tu buzón de retos está totalmente vacío!
          </h2>
          <p className="text-slate-500 font-bold max-w-md mt-2 mb-6">
            No tienes ningún fallo pendiente por repasar. ¡Has superado todos tus retos anteriores!
          </p>
          <button
            type="button"
            onClick={onBack}
            className="touch-target px-8 h-14 rounded-2xl font-black text-lg bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-200 active:scale-95 transition-all"
          >
            Volver al Menú
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm font-black text-slate-500 px-1">
            <span>Retos pendientes de superar ({queue.length}):</span>
            <span>Objetivo: 2 aciertos seguidos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {queue.map((item) => {
              const ex = item.exercise;
              return (
                <div
                  key={item.exerciseId}
                  className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xl shrink-0">
                      {ex.subject === 'lenguaje'
                        ? '📖'
                        : ex.subject === 'matematicas'
                        ? '🔢'
                        : ex.subject === 'geografia'
                        ? '🧭'
                        : '🇬🇧'}
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-slate-800">{ex.title}</h4>
                      <p className="text-xs font-bold text-slate-500 line-clamp-1">{ex.instructions}</p>
                    </div>
                  </div>

                  {/* Progress Indicator (0/2 or 1/2) */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex gap-1.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                          item.consecutiveCorrect >= 1
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {item.consecutiveCorrect >= 1 ? '✓' : '1'}
                      </div>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                          item.consecutiveCorrect >= 2
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {item.consecutiveCorrect >= 2 ? '✓' : '2'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleStartReview}
              className="touch-target w-full sm:w-auto px-10 h-16 bg-rose-500 hover:bg-rose-600 text-white font-black text-xl rounded-2xl shadow-lg shadow-rose-200 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <RotateCcw className="w-6 h-6" />
              <span>Empezar Repaso de Fallos</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Award, Lock, Sparkles, Check } from 'lucide-react';
import { Trophy } from '../../types/education';
import { soundService } from '../../services/soundService';

interface TrophiesViewProps {
  trophies: Trophy[];
  onBack: () => void;
}

export const TrophiesView: React.FC<TrophiesViewProps> = ({ trophies, onBack }) => {
  const unlockedCount = trophies.filter((t) => t.unlocked).length;

  const handleTrophyTap = (trophy: Trophy) => {
    soundService.playTap();
    if (trophy.unlocked) {
      soundService.playCorrect();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-xl shadow-amber-400/20 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-3xl bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-5xl shrink-0 shadow-inner">
              🏆
            </div>
            <div>
              <span className="bg-amber-950/20 backdrop-blur-md px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider text-amber-950">
                Logros y Reconocimientos
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-1">
                Vitrina de Trofeos
              </h1>
              <p className="font-bold text-amber-900 text-sm sm:text-base mt-0.5">
                ¡Cada copa demuestra lo mucho que aprendes día a día!
              </p>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/60 text-center shrink-0">
            <div className="text-3xl font-black text-amber-950">
              {unlockedCount} / {trophies.length}
            </div>
            <div className="text-xs font-black uppercase tracking-wide text-amber-900">
              Desbloqueados
            </div>
          </div>
        </div>
      </div>

      {/* Trophies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trophies.map((trophy) => {
          const progressPercent = Math.min(
            100,
            Math.round((trophy.progress / trophy.target) * 100)
          );

          return (
            <div
              key={trophy.id}
              onClick={() => handleTrophyTap(trophy)}
              className={`rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                trophy.unlocked
                  ? 'bg-gradient-to-b from-amber-50 to-white border-amber-300 shadow-md hover:shadow-xl hover:scale-102 ring-2 ring-amber-200'
                  : 'bg-white border-slate-200 shadow-sm opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-sm ${
                    trophy.unlocked
                      ? 'bg-amber-100 text-amber-600 animate-pop'
                      : 'bg-slate-100 grayscale opacity-60'
                  }`}
                >
                  {trophy.icon}
                </div>

                {trophy.unlocked ? (
                  <span className="flex items-center gap-1 text-xs font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    Conseguido
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-black bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full border border-slate-200">
                    <Lock className="w-3.5 h-3.5" />
                    En progreso
                  </span>
                )}
              </div>

              <div className="my-4">
                <h3 className="font-black text-xl text-slate-800">{trophy.title}</h3>
                <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1">
                  {trophy.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-black text-slate-500 mb-1.5">
                  <span>Progreso:</span>
                  <span>
                    {Math.min(trophy.progress, trophy.target)} / {trophy.target}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      trophy.unlocked ? 'bg-amber-400' : 'bg-sky-400'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

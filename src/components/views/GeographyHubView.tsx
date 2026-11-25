import React from 'react';
import { ArrowLeft, CheckCircle2, Compass, Sparkles, Award, Globe, MapPin, Target, Play, RotateCcw } from 'lucide-react';
import { UserProfile, GeographyCategory } from '../../types/education';
import { GEOGRAPHY_CATEGORIES_INFO, GeographyCategoryCardInfo } from '../../data/geographyData';
import { soundService } from '../../services/soundService';

interface GeographyHubViewProps {
  profile: UserProfile;
  onSelectCategory: (category: GeographyCategory) => void;
  onBack: () => void;
}

export const GeographyHubView: React.FC<GeographyHubViewProps> = ({
  profile,
  onSelectCategory,
  onBack
}) => {
  const completedList = profile.geographyPassport?.completedCategories || [];
  const completedCount = completedList.length;
  const isAllCompleted = completedCount >= 8;
  const progressPercent = Math.round((completedCount / 8) * 100);

  // Group categories
  const espanaCategories = GEOGRAPHY_CATEGORIES_INFO.filter((c) => c.group === 'espana');
  const mundoCategories = GEOGRAPHY_CATEGORIES_INFO.filter((c) => c.group === 'mundo');
  const capitalesCategories = GEOGRAPHY_CATEGORIES_INFO.filter((c) => c.group === 'capitales');

  const renderCard = (info: GeographyCategoryCardInfo) => {
    const isCompleted = completedList.includes(info.id);

    return (
      <div
        key={info.id}
        className={`rounded-3xl p-5 sm:p-6 border-2 transition-all flex flex-col justify-between shadow-sm hover:shadow-md relative overflow-hidden ${
          isCompleted
            ? 'bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 border-emerald-300 ring-2 ring-emerald-200/60'
            : 'bg-white border-slate-200 hover:border-sky-300'
        }`}
      >
        {/* Subtle background seal when completed */}
        {isCompleted && (
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-emerald-100/50 rounded-full flex items-center justify-center text-5xl pointer-events-none select-none opacity-40">
            ✓
          </div>
        )}

        <div>
          {/* Header Row: Emoji, Title and Badge */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl shadow-inner shrink-0">
              {info.emoji}
            </div>

            {isCompleted ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm animate-pop">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                Completado
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300 shadow-sm">
                <Target className="w-4 h-4 text-amber-600" />
                Pendiente
              </span>
            )}
          </div>

          <h3 className="font-black text-xl text-slate-800 tracking-tight leading-snug">
            {info.title}
          </h3>
          <p className="text-xs font-bold text-sky-700 mt-0.5">
            {info.subtitle}
          </p>
          <p className="text-xs font-medium text-slate-500 mt-2 line-clamp-2">
            {info.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-400">
            {info.itemCountText}
          </span>

          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              onSelectCategory(info.id);
            }}
            className={`touch-target px-4 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all active:scale-95 shadow-sm ${
              isCompleted
                ? 'bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 border border-slate-200'
                : 'bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-amber-400/30 hover:scale-105'
            }`}
          >
            {isCompleted ? (
              <>
                <RotateCcw className="w-4 h-4 text-slate-600" />
                <span>Repetir</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>¡Jugar Reto!</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            soundService.playTap();
            onBack();
          }}
          className="touch-target px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-black text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al Menú</span>
        </button>

        <span className="text-xs font-black bg-sky-100 text-sky-800 px-3 py-1.5 rounded-full uppercase tracking-wider">
          🌍 Misiones Semanales
        </span>
      </div>

      {/* Passport Hero Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-sky-500/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-5xl sm:text-6xl shadow-inner shrink-0 animate-bounce-short">
              🗺️
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider text-sky-100">
                  Pasaporte Semanal del Explorador
                </span>
                {isAllCompleted && (
                  <span className="bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full text-xs font-black flex items-center gap-1 shadow-sm">
                    <Award className="w-3.5 h-3.5" />
                    ¡Sello de Oro!
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                Elige tu Misión Geográfica
              </h1>
              <p className="text-sky-100 font-bold text-sm sm:text-base mt-1">
                Completa las 8 misiones a lo largo de la semana para sellar tu pasaporte mundial.
              </p>
            </div>
          </div>

          {/* Progress Tracker Widget */}
          <div className="bg-white/15 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/30 text-center w-full md:w-64 shrink-0 shadow-lg">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider mb-2 text-sky-100">
              <span>Misiones esta semana</span>
              <span className="text-white text-sm font-black">{completedCount} / 8</span>
            </div>
            <div className="w-full h-3.5 bg-black/25 rounded-full overflow-hidden p-0.5 border border-white/30">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[11px] font-bold text-sky-100 mt-2">
              {isAllCompleted
                ? '🌟 ¡Completaste las 8 zonas esta semana! Puedes repetir libremente.'
                : `Te faltan ${8 - completedCount} zonas para sellar el pasaporte.`}
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 1: ESPAÑA */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="text-2xl">🇪🇸</span>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            España: Comunidades y Capitales de Provincia
          </h2>
          <span className="text-xs font-bold text-slate-400 ml-auto hidden sm:inline">
            Superficies mudas y puntos de ciudades
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {espanaCategories.map(renderCard)}
        </div>
      </section>

      {/* SECCIÓN 2: PLANISFERIO / CONTINENTES */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="text-2xl">🌍</span>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            El Globo Terráqueo: Continentes
          </h2>
          <span className="text-xs font-bold text-slate-400 ml-auto hidden sm:inline">
            Los 7 continentes en el planisferio
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mundoCategories.map(renderCard)}
        </div>
      </section>

      {/* SECCIÓN 3: CAPITALES POR CONTINENTE */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="text-2xl">📍</span>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            Capitales del Mundo por Continentes
          </h2>
          <span className="text-xs font-bold text-slate-400 ml-auto hidden sm:inline">
            Puntos táctiles en Europa, Asia, África y América
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capitalesCategories.map(renderCard)}
        </div>
      </section>
    </div>
  );
};

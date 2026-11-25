import React from 'react';
import { Play, Sparkles, BookOpen, Calculator, Compass, Award, Target, Flame, ArrowRight, Brain } from 'lucide-react';
import { UserProfile, Subject } from '../../types/education';
import { soundService } from '../../services/soundService';

interface DashboardViewProps {
  profile: UserProfile;
  onStartDailySession: () => void;
  onStartSubjectSession: (subject: Subject) => void;
  onNavigate: (view: 'dashboard' | 'review' | 'trophies' | 'parents') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  onStartDailySession,
  onStartSubjectSession,
  onNavigate
}) => {
  const reviewCount = profile.reviewQueue.length;
  const unlockedTrophiesCount = profile.trophies.filter((t) => t.unlocked).length;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      {/* Hero Welcome & Daily Training CTA */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-sky-500/20 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-5xl sm:text-6xl shadow-inner shrink-0 animate-bounce-short">
              {profile.avatar || '🦁'}
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-xs font-black tracking-wide uppercase">
                  1º de Primaria (6 años)
                </span>
                <span className="flex items-center gap-1 text-xs font-black bg-orange-400 text-orange-950 px-2.5 py-0.5 rounded-full">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  Racha: {profile.streak} días
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                ¡Hola, {profile.name}! ¿Listo para jugar?
              </h1>
              <p className="text-sky-100 font-bold text-sm sm:text-base mt-1">
                Tu sesión diaria inteligente de 10-15 minutos está lista.
              </p>
            </div>
          </div>

          {/* Big Daily Training Button */}
          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              onStartDailySession();
            }}
            className="touch-target w-full md:w-auto px-8 py-5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xl sm:text-2xl rounded-2xl shadow-lg shadow-amber-400/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shrink-0"
          >
            <Play className="w-7 h-7 fill-current" />
            <span>Entrenamiento Diario</span>
            <Sparkles className="w-6 h-6 text-amber-700 animate-spin" />
          </button>
        </div>
      </div>

      {/* 4 Subjects Grid (Panorámica en Chromebook, adaptativa) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Práctica Libre por Materia
          </h2>
          <span className="text-xs font-bold text-slate-400">Elige lo que más te apetezca entrenar</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Lenguaje */}
          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              onStartSubjectSession('lenguaje');
            }}
            className="group touch-target min-h-[140px] p-5 rounded-3xl bg-white hover:bg-emerald-50/50 border-2 border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all active:scale-95 text-left flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-100/70 px-2 py-1 rounded-lg">
                {profile.subjectStats?.lenguaje?.correct || 0} aciertos
              </span>
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-800 group-hover:text-emerald-700 transition-colors">
                Lenguaje
              </h3>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                Cuentos, ordenar sílabas y ortografía
              </p>
            </div>
          </button>

          {/* Matemáticas */}
          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              onStartSubjectSession('matematicas');
            }}
            className="group touch-target min-h-[140px] p-5 rounded-3xl bg-white hover:bg-blue-50/50 border-2 border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all active:scale-95 text-left flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-blue-700 bg-blue-100/70 px-2 py-1 rounded-lg">
                {profile.subjectStats?.matematicas?.correct || 0} aciertos
              </span>
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-800 group-hover:text-blue-700 transition-colors">
                Matemáticas
              </h3>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                Sumas, restas y multiplicación visual
              </p>
            </div>
          </button>

          {/* Geografía */}
          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              onStartSubjectSession('geografia');
            }}
            className="group touch-target min-h-[140px] p-5 rounded-3xl bg-white hover:bg-amber-50/50 border-2 border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all active:scale-95 text-left flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-amber-700 bg-amber-100/70 px-2 py-1 rounded-lg">
                {profile.subjectStats?.geografia?.correct || 0} lugares
              </span>
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-800 group-hover:text-amber-700 transition-colors">
                Geografía
              </h3>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                Mapas mudos, CC.AA., capitales y países
              </p>
            </div>
          </button>

          {/* Inglés */}
          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              onStartSubjectSession('ingles');
            }}
            className="group touch-target min-h-[140px] p-5 rounded-3xl bg-white hover:bg-purple-50/50 border-2 border-slate-200 hover:border-purple-400 shadow-sm hover:shadow-md transition-all active:scale-95 text-left flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <span className="text-2xl" role="img" aria-hidden="true">🇬🇧</span>
              </div>
              <span className="text-xs font-black text-purple-700 bg-purple-100/70 px-2 py-1 rounded-lg">
                {profile.subjectStats?.ingles?.correct || 0} palabras
              </span>
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-800 group-hover:text-purple-700 transition-colors">
                Inglés
              </h3>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                Vocabulario visual y pronunciación
              </p>
            </div>
          </button>

          {/* Memoria (Nuevo Módulo) */}
          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              onStartSubjectSession('memoria');
            }}
            className="group touch-target min-h-[140px] p-5 rounded-3xl bg-white hover:bg-rose-50/50 border-2 border-slate-200 hover:border-rose-400 shadow-sm hover:shadow-md transition-all active:scale-95 text-left flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-rose-700 bg-rose-100/70 px-2 py-1 rounded-lg">
                {profile.subjectStats?.memoria?.correct || 0} retos
              </span>
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-800 group-hover:text-rose-700 transition-colors">
                Memoria
              </h3>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                Parejas, secuencias sonoras y atención
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Gamification Hub: "Mis Retos" (Buzón de Repaso) + "Vitrina de Trofeos" */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Review Box Card */}
        <div
          onClick={() => {
            soundService.playTap();
            onNavigate('review');
          }}
          className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-rose-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-4 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-3xl shrink-0 group-hover:rotate-6 transition-transform">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-800">Buzón de Retos</h3>
                {reviewCount > 0 ? (
                  <span className="bg-rose-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                    {reviewCount} pendientes
                  </span>
                ) : (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2 py-0.5 rounded-full">
                    ¡Al día!
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1">
                {reviewCount > 0
                  ? 'Practica los ejercicios fallados para eliminarlos con 2 aciertos seguidos.'
                  : '¡Genial! No tienes retos pendientes en tu buzón.'}
              </p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all shrink-0" />
        </div>

        {/* Trophies Card */}
        <div
          onClick={() => {
            soundService.playTap();
            onNavigate('trophies');
          }}
          className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-amber-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-4 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl shrink-0 group-hover:rotate-6 transition-transform">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-800">Vitrina de Trofeos</h3>
                <span className="bg-amber-100 text-amber-900 text-xs font-black px-2 py-0.5 rounded-full">
                  {unlockedTrophiesCount} / {profile.trophies.length}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1">
                Copas, balones y medallas ganadas con tu esfuerzo diario.
              </p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all shrink-0" />
        </div>
      </div>
    </div>
  );
};

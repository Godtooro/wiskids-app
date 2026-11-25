import React from 'react';
import { Sparkles, Flame, ShieldAlert, Award, Home, Users, LogOut } from 'lucide-react';
import { UserProfile } from '../../types/education';
import { UserAccount } from '../../types/auth';
import { soundService } from '../../services/soundService';

interface HeaderProps {
  profile: UserProfile;
  currentUser: UserAccount;
  currentView: string;
  onNavigate: (view: 'dashboard' | 'review' | 'trophies' | 'parents' | 'admin_users') => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  currentUser,
  currentView,
  onNavigate,
  onLogout
}) => {
  const reviewCount = profile.reviewQueue.length;
  const isAdmin = currentUser.role === 'admin';

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-30 px-3 sm:px-6 py-2.5 safe-top select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Brand & Home */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              onNavigate('dashboard');
            }}
            className="flex items-center gap-2 group active:scale-95 transition-transform"
            aria-label="Ir al inicio"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center shadow-md shadow-sky-200 group-hover:rotate-6 transition-transform">
              <span className="text-2xl" role="img" aria-label="WisKids.app">{currentUser.avatar || profile.avatar || '🦁'}</span>
            </div>
            <div className="text-left hidden xs:block">
              <div className="font-black text-xl text-sky-600 tracking-tight leading-none flex items-center gap-1">
                WisKids<span className="text-amber-500">.app</span>
                <span className="text-xs bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded-full font-bold">1º Primaria</span>
              </div>
              <div className="text-xs font-bold text-slate-400 leading-tight flex items-center gap-1.5">
                <span>¡Hola, {currentUser.name}!</span>
                {isAdmin && (
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 font-black px-1.5 py-0.2 rounded-md">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Center: Stars & Daily Streak */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Stars */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-2xl shadow-sm">
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400 animate-pulse" />
            <span className="font-black text-amber-900 text-base sm:text-lg">{profile.stars}</span>
            <span className="text-xs font-bold text-amber-700 hidden sm:inline">estrellas</span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200/80 px-3 py-1.5 rounded-2xl shadow-sm">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-400" />
            <span className="font-black text-orange-900 text-base sm:text-lg">{profile.streak}</span>
            <span className="text-xs font-bold text-orange-700 hidden sm:inline">días</span>
          </div>
        </div>

        {/* Right: Quick Navigation Badges & Parent Access & Logout */}
        <div className="flex items-center gap-2">
          {/* Home shortcut if not in dashboard */}
          {currentView !== 'dashboard' && (
            <button
              type="button"
              onClick={() => {
                soundService.playTap();
                onNavigate('dashboard');
              }}
              title="Volver al menú"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 transition-colors active:scale-95"
            >
              <Home className="w-5 h-5" />
              <span className="hidden md:inline text-sm">Inicio</span>
            </button>
          )}

          {/* Admin User Management Button (Only for Admin) */}
          {isAdmin && (
            <button
              type="button"
              onClick={() => {
                soundService.playTap();
                onNavigate('admin_users');
              }}
              title="Gestión de Usuarios"
              className={`p-2 sm:px-3 sm:py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                currentView === 'admin_users'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="hidden lg:inline text-sm">Usuarios</span>
            </button>
          )}

          {/* Trophies */}
          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              onNavigate('trophies');
            }}
            title="Vitrina de Trofeos"
            className={`p-2 sm:px-3 sm:py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
              currentView === 'trophies'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
                : 'bg-amber-100/70 hover:bg-amber-200/70 text-amber-800'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="hidden md:inline text-sm">Trofeos</span>
          </button>

          {/* Review Box with badge */}
          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              onNavigate('review');
            }}
            title="Mis Retos (Buzón de Repaso)"
            className={`relative p-2 sm:px-3 sm:py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
              currentView === 'review'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                : 'bg-rose-100/70 hover:bg-rose-200/70 text-rose-800'
            }`}
          >
            <span className="text-lg">🎯</span>
            <span className="hidden md:inline text-sm">Mis Retos</span>
            {reviewCount > 0 && (
              <span className="inline-flex items-center justify-center bg-rose-600 text-white text-xs font-black px-1.5 py-0.5 rounded-full min-w-[20px] shadow-sm animate-bounce">
                {reviewCount}
              </span>
            )}
          </button>

          {/* Parents Panel */}
          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              onNavigate('parents');
            }}
            title="Zona de Padres"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors active:scale-95"
            aria-label="Panel para padres"
          >
            <ShieldAlert className="w-5 h-5" />
          </button>

          {/* Logout button */}
          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              onLogout();
            }}
            title="Cerrar Sesión"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors active:scale-95"
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

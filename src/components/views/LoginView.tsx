import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, Sparkles, LogIn, ShieldCheck } from 'lucide-react';
import { authService, DEFAULT_USERS } from '../../services/authService';
import { UserAccount } from '../../types/auth';
import { soundService } from '../../services/soundService';

interface LoginViewProps {
  onLoginSuccess: (user: UserAccount) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      soundService.playWrong();
      setErrorMsg('Por favor introduce tu usuario y contraseña.');
      return;
    }

    setIsLoading(true);
    const user = authService.login(username, password);

    if (user) {
      soundService.playCorrect();
      onLoginSuccess(user);
    } else {
      soundService.playWrong();
      setErrorMsg('Usuario o contraseña incorrectos.');
      setIsLoading(false);
    }
  };

  const handleQuickFill = (u: string, p: string) => {
    soundService.playTap();
    setUsername(u);
    setPassword(p);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-100 flex flex-col justify-center items-center p-4 select-none">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl shadow-sky-500/10 animate-pop flex flex-col items-center">
        {/* Brand Icon & Title */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-4xl shadow-lg shadow-sky-300/50 mb-3 animate-bounce-short">
          🦁
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight text-center">
          WisKids<span className="text-amber-500">.app</span>
        </h1>
        <p className="text-slate-500 font-bold text-xs sm:text-sm text-center mt-0.5 mb-6">
          Plataforma educativa para aprender jugando
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-1">
              Usuario
            </label>
            <div className="relative flex items-center">
              <User className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ej. godtooro o wis"
                className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-slate-200 focus:border-sky-500 font-bold text-slate-800 focus:outline-none transition-colors"
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-1">
              Contraseña
            </label>
            <div className="relative flex items-center">
              <Lock className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                className="w-full h-14 pl-12 pr-12 rounded-2xl border-2 border-slate-200 focus:border-sky-500 font-bold text-slate-800 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-bold p-3 rounded-xl text-center animate-shake">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="touch-target w-full h-14 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-lg sm:text-xl shadow-lg shadow-sky-300/40 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <LogIn className="w-6 h-6 stroke-[3]" />
            <span>Iniciar Sesión</span>
          </button>
        </form>

        {/* Quick Access Badges for Father and Son */}
        <div className="mt-6 pt-5 border-t border-slate-100 w-full">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider text-center mb-3">
            Acceso Rápido Directo:
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickFill('wis', '09052020')}
              className="p-3 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:bg-amber-100/70 text-left transition-all active:scale-95 group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🦁</span>
                <span className="text-xs font-black uppercase text-amber-800">Alumno</span>
              </div>
              <div className="font-black text-slate-800 text-sm">Wis</div>
              <div className="text-[10px] text-amber-700 font-bold truncate">09052020</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('godtooro', '@b7pHUml')}
              className="p-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50 hover:bg-indigo-100/70 text-left transition-all active:scale-95 group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">👑</span>
                <span className="text-xs font-black uppercase text-indigo-800">Admin</span>
              </div>
              <div className="font-black text-slate-800 text-sm">godtooro</div>
              <div className="text-[10px] text-indigo-700 font-bold truncate">@b7pHUml</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

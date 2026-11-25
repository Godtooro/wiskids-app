import React, { useEffect } from 'react';
import { Delete, Check } from 'lucide-react';
import { soundService } from '../../services/soundService';

interface TouchKeypadProps {
  mode: 'numeric' | 'letters';
  letterPool?: string[]; // optional custom pool of letters
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
  className?: string;
}

export const TouchKeypad: React.FC<TouchKeypadProps> = ({
  mode,
  letterPool,
  onKeyPress,
  onBackspace,
  onSubmit,
  submitDisabled = false,
  className = ''
}) => {
  // Listen to physical keyboard events (great for Chromebooks!)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        soundService.playTap();
        onBackspace();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (!submitDisabled) {
          soundService.playTap();
          onSubmit();
        }
      } else if (mode === 'numeric' && /^[0-9]$/.test(e.key)) {
        e.preventDefault();
        soundService.playTap();
        onKeyPress(e.key);
      } else if (mode === 'letters' && /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]$/.test(e.key)) {
        e.preventDefault();
        soundService.playTap();
        onKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, onKeyPress, onBackspace, onSubmit, submitDisabled]);

  const handleKeyClick = (char: string) => {
    soundService.playTap();
    onKeyPress(char);
  };

  const handleBackspaceClick = () => {
    soundService.playTap();
    onBackspace();
  };

  const handleSubmitClick = () => {
    if (!submitDisabled) {
      soundService.playTap();
      onSubmit();
    }
  };

  if (mode === 'numeric') {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    return (
      <div className={`w-full max-w-sm mx-auto select-none ${className}`}>
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {numbers.slice(0, 9).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeyClick(num)}
              className="touch-target h-14 sm:h-16 text-2xl font-black rounded-2xl bg-white border-2 border-slate-200 text-slate-800 shadow-sm active:scale-95 active:bg-sky-50 transition-transform"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={handleBackspaceClick}
            aria-label="Borrar"
            className="touch-target h-14 sm:h-16 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-600 shadow-sm active:scale-95 transition-transform flex items-center justify-center"
          >
            <Delete className="w-7 h-7" />
          </button>
          <button
            type="button"
            onClick={() => handleKeyClick('0')}
            className="touch-target h-14 sm:h-16 text-2xl font-black rounded-2xl bg-white border-2 border-slate-200 text-slate-800 shadow-sm active:scale-95 active:bg-sky-50 transition-transform"
          >
            0
          </button>
          <button
            type="button"
            disabled={submitDisabled}
            onClick={handleSubmitClick}
            aria-label="Confirmar"
            className={`touch-target h-14 sm:h-16 rounded-2xl border-2 font-bold shadow-sm active:scale-95 transition-transform flex items-center justify-center ${
              submitDisabled
                ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                : 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-200'
            }`}
          >
            <Check className="w-8 h-8 stroke-[3]" />
          </button>
        </div>
      </div>
    );
  }

  // Letters mode
  const letters = letterPool && letterPool.length > 0
    ? letterPool
    : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V'];

  return (
    <div className={`w-full max-w-lg mx-auto select-none ${className}`}>
      <div className="flex flex-wrap justify-center gap-2 mb-3">
        {letters.map((char, idx) => (
          <button
            key={`${char}-${idx}`}
            type="button"
            onClick={() => handleKeyClick(char)}
            className="touch-target min-w-[52px] h-14 text-xl font-black rounded-2xl bg-white border-2 border-slate-200 text-slate-800 shadow-sm active:scale-95 active:bg-sky-50 transition-transform"
          >
            {char}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={handleBackspaceClick}
          aria-label="Borrar letra"
          className="touch-target px-6 h-14 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-600 font-bold active:scale-95 transition-transform flex items-center gap-2"
        >
          <Delete className="w-6 h-6" />
          <span>Borrar</span>
        </button>
        <button
          type="button"
          disabled={submitDisabled}
          onClick={handleSubmitClick}
          aria-label="Comprobar respuesta"
          className={`touch-target px-8 h-14 rounded-2xl border-2 font-black text-lg active:scale-95 transition-transform flex items-center gap-2 ${
            submitDisabled
              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
              : 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-200'
          }`}
        >
          <Check className="w-7 h-7 stroke-[3]" />
          <span>¡Listo!</span>
        </button>
      </div>
    </div>
  );
};

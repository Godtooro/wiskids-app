import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speechService } from '../../services/speechService';
import { soundService } from '../../services/soundService';

interface AudioButtonProps {
  textToSpeak: string;
  lang?: 'es-ES' | 'en-US' | 'en-GB';
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  textToSpeak,
  lang = 'es-ES',
  label = 'Escuchar',
  className = '',
  size = 'md'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playTap();
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    try {
      await speechService.speak(textToSpeak, lang);
    } finally {
      setIsPlaying(false);
    }
  };

  const sizeClasses = {
    sm: 'h-12 px-3 text-sm rounded-xl',
    md: 'min-h-[56px] px-5 text-base rounded-2xl',
    lg: 'min-h-[64px] px-6 text-lg rounded-2xl'
  }[size];

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Escuchar: ${textToSpeak}`}
      className={`touch-target inline-flex items-center justify-center gap-2 font-bold transition-all shadow-md active:scale-95 select-none ${
        isPlaying
          ? 'bg-amber-400 text-amber-950 ring-4 ring-amber-200 animate-pulse'
          : 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-200'
      } ${sizeClasses} ${className}`}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-6 h-6 animate-spin" />
          <span>{label}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-6 h-6" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

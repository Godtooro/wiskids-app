import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  Volume2,
  Coins,
  Shapes,
  Blocks
} from 'lucide-react';
import {
  MathSchoolChallengeData,
  PhonicsExerciseData,
  MagicTriangleExerciseData,
  SecretCodeExerciseData
} from '../../types/education';
import { AudioButton } from '../common/AudioButton';
import { soundService } from '../../services/soundService';

interface SchoolRefuerzoExerciseProps {
  exercise:
    | MathSchoolChallengeData
    | PhonicsExerciseData
    | MagicTriangleExerciseData
    | SecretCodeExerciseData;
  onComplete: (isCorrect: boolean) => void;
}

export const SchoolRefuerzoExercise: React.FC<SchoolRefuerzoExerciseProps> = ({
  exercise,
  onComplete
}) => {
  if (exercise.type === 'math_school_challenge') {
    return <MathSchoolView exercise={exercise} onComplete={onComplete} />;
  }

  if (exercise.type === 'phonics_exercise') {
    return <PhonicsView exercise={exercise} onComplete={onComplete} />;
  }

  if (exercise.type === 'reasoning_magic_triangle') {
    return <MagicTriangleView exercise={exercise} onComplete={onComplete} />;
  }

  if (exercise.type === 'reasoning_secret_code') {
    return <SecretCodeView exercise={exercise} onComplete={onComplete} />;
  }

  return <div>Tipo de ejercicio escolar no reconocido</div>;
};

// ==========================================
// 1. MATEMÁTICAS 1º COLEGIO (Monedas, Decenas, Ordinales, Series)
// ==========================================
const MathSchoolView: React.FC<{
  exercise: MathSchoolChallengeData;
  onComplete: (isCorrect: boolean) => void;
}> = ({ exercise, onComplete }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (optId: string) => {
    if (isSubmitted) return;
    soundService.playTap();
    setSelectedOptionId(optId);
    setIsSubmitted(true);

    const isCorrect = optId === exercise.correctOptionId;
    if (isCorrect) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
  };

  const isCorrect = selectedOptionId === exercise.correctOptionId;

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-indigo-50 border-2 border-indigo-200/90 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-black text-indigo-700 uppercase tracking-wider">
              1º Primaria • {exercise.title}
            </div>
            <h3 className="font-black text-slate-900 text-base sm:text-lg">
              {exercise.instructions}
            </h3>
          </div>
        </div>
        <AudioButton textToSpeak={`${exercise.instructions} ${exercise.question}`} lang="es-ES" size="sm" />
      </div>

      {/* Main Educational Visual Card */}
      <div className="my-auto py-2 flex flex-col items-center">
        {/* Dynamic visual representation according to subType */}
        <div className="w-full max-w-xl bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md text-center mb-6">
          <div className="text-5xl sm:text-6xl mb-3 filter drop-shadow">
            {exercise.illustration || '📐'}
          </div>

          <h4 className="font-black text-xl sm:text-2xl text-slate-900 mb-4">
            {exercise.question}
          </h4>

          {/* Visual coins container */}
          {exercise.subType === 'coins' && exercise.coinItems && (
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 flex flex-wrap items-center justify-center gap-3 my-2">
              {exercise.coinItems.map((cGroup, gIdx) => (
                <div key={gIdx} className="flex gap-2">
                  {Array.from({ length: cGroup.count }).map((_, cIdx) => (
                    <div
                      key={cIdx}
                      className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-black text-lg border-2 shadow-md animate-pop ${
                        cGroup.value === 2
                          ? 'bg-gradient-to-br from-amber-300 via-amber-200 to-amber-400 text-amber-950 border-amber-500 ring-2 ring-slate-300'
                          : 'bg-gradient-to-br from-amber-400 to-amber-500 text-amber-950 border-amber-600'
                      }`}
                    >
                      <span className="text-base leading-none font-black">{cGroup.value}€</span>
                      <span className="text-[10px] uppercase font-bold opacity-75">euro</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Visual place value (Decenas y Unidades) */}
          {exercise.subType === 'place_value' &&
            exercise.placeValueTens !== undefined &&
            exercise.placeValueUnits !== undefined && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-center gap-6 my-2">
                {/* Decenas (Red bars) */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-rose-700 uppercase mb-1">
                    {exercise.placeValueTens} Decenas (D)
                  </span>
                  <div className="flex gap-2">
                    {Array.from({ length: exercise.placeValueTens }).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-20 rounded-md bg-rose-500 border border-rose-600 flex flex-col justify-between py-1 items-center shadow-xs text-[10px] text-white font-black"
                      >
                        <span>10</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Unidades (Blue cubes) */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-blue-700 uppercase mb-1">
                    {exercise.placeValueUnits} Unidades (U)
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-w-[120px] justify-center">
                    {Array.from({ length: exercise.placeValueUnits }).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-5 h-5 rounded-md bg-sky-500 border border-sky-600 shadow-xs flex items-center justify-center text-[10px] text-white font-black"
                      >
                        1
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">
          {exercise.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isTarget = opt.id === exercise.correctOptionId;

            let btnStyle =
              'bg-white hover:bg-indigo-50/50 border-2 border-slate-300 hover:border-indigo-400 text-slate-800';

            if (isSubmitted) {
              if (isTarget) {
                btnStyle = 'bg-emerald-50 border-3 border-emerald-500 text-emerald-950 font-black shadow-md';
              } else if (isSelected) {
                btnStyle = 'bg-rose-50 border-2 border-rose-400 text-rose-950';
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                disabled={isSubmitted}
                className={`touch-target h-16 rounded-2xl p-3 font-black text-base sm:text-lg shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all ${btnStyle}`}
              >
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback & Continue */}
      <div className="mt-4">
        {isSubmitted ? (
          <div
            className={`p-4 rounded-3xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pop shadow-md ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-rose-600 shrink-0" />
              )}
              <div>
                <h4 className="font-black text-base sm:text-lg">
                  {isCorrect ? '¡Excelente trabajo matemático!' : '¡Ánimo! Vamos a fijarnos:'}
                </h4>
                <p className="text-xs sm:text-sm font-semibold opacity-90">
                  {exercise.explanation}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onComplete(isCorrect)}
              className="touch-target px-8 h-12 rounded-2xl font-black bg-sky-500 hover:bg-sky-600 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>¡Continuar!</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        ) : (
          <div className="bg-indigo-50/70 p-3.5 rounded-2xl border border-indigo-200/80 flex items-center gap-2 text-xs font-bold text-indigo-950">
            <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Pista del colegio: Fíjate en los grupos y realiza la operación paso a paso.</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. PHONICS EN INGLÉS (s, a, t, i, p, n, oa, ie)
// ==========================================
const PhonicsView: React.FC<{
  exercise: PhonicsExerciseData;
  onComplete: (isCorrect: boolean) => void;
}> = ({ exercise, onComplete }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (optId: string) => {
    if (isSubmitted) return;
    soundService.playTap();
    setSelectedOptionId(optId);
    setIsSubmitted(true);

    const isCorrect = optId === exercise.correctOptionId;
    if (isCorrect) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
  };

  const isCorrect = selectedOptionId === exercise.correctOptionId;

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-purple-50 border-2 border-purple-200/90 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-mono font-black text-xl shrink-0">
            /{exercise.targetSound}/
          </div>
          <div>
            <div className="text-xs font-black text-purple-700 uppercase tracking-wider">
              Jolly Phonics • 1º Primaria
            </div>
            <h3 className="font-black text-slate-900 text-base sm:text-lg">
              {exercise.instructions}
            </h3>
          </div>
        </div>
        <AudioButton textToSpeak={exercise.audioText} lang="en-US" label="Listen Sound" size="sm" />
      </div>

      {/* Main Phonics Visual Card */}
      <div className="my-auto py-4 flex flex-col items-center">
        <div className="w-full max-w-md bg-gradient-to-br from-purple-500 via-indigo-600 to-sky-600 text-white rounded-3xl p-6 sm:p-8 text-center shadow-xl mb-6 relative overflow-hidden">
          <div className="absolute top-2 right-2 text-white/10 text-8xl font-black font-mono select-none">
            {exercise.targetSound}
          </div>

          <span className="text-6xl mb-2 inline-block filter drop-shadow">
            {exercise.illustration}
          </span>
          <div className="font-mono font-black text-4xl sm:text-5xl tracking-widest mt-2 uppercase">
            /{exercise.targetSound}/
          </div>
          <p className="text-purple-100 font-bold text-sm mt-1">
            Tap the word that starts with this sound:
          </p>
        </div>

        {/* Options Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
          {exercise.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isTarget = opt.id === exercise.correctOptionId;

            let cardStyle =
              'bg-white hover:bg-purple-50/50 border-2 border-slate-300 hover:border-purple-400 text-slate-900';

            if (isSubmitted) {
              if (isTarget) {
                cardStyle = 'bg-emerald-50 border-3 border-emerald-500 text-emerald-950 font-black shadow-md';
              } else if (isSelected) {
                cardStyle = 'bg-rose-50 border-2 border-rose-400 text-rose-950';
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                disabled={isSubmitted}
                className={`touch-target h-24 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all ${cardStyle}`}
              >
                <span className="text-3xl">{opt.icon}</span>
                <span className="font-black text-base">{opt.word}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback & Continue */}
      <div className="mt-4">
        {isSubmitted && (
          <div
            className={`p-4 rounded-3xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pop shadow-md ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-rose-600 shrink-0" />
              )}
              <div>
                <h4 className="font-black text-base sm:text-lg">
                  {isCorrect ? 'Well done! ¡Sonido identificado!' : 'Let’s try to remember the sound!'}
                </h4>
                <p className="text-xs sm:text-sm font-semibold opacity-90">
                  {isCorrect
                    ? `Great! "${exercise.phonicsWord}" starts with the sound /${exercise.targetSound}/.`
                    : `Remember: /${exercise.targetSound}/ is in "${exercise.phonicsWord}".`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onComplete(isCorrect)}
              className="touch-target px-8 h-12 rounded-2xl font-black bg-sky-500 hover:bg-sky-600 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>¡Continuar!</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 3. TRIÁNGULO MÁGICO (6ª HORA RAZONAMIENTO SM)
// ==========================================
const MagicTriangleView: React.FC<{
  exercise: MagicTriangleExerciseData;
  onComplete: (isCorrect: boolean) => void;
}> = ({ exercise, onComplete }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userChoice, setUserChoice] = useState<number | null>(null);

  // For 1st grade level: they choose the missing corner number so each side equals targetSum
  const missingValue = exercise.solution.corners[0]; // e.g. top corner

  const handleChoose = (num: number) => {
    if (isSubmitted) return;
    soundService.playTap();
    setUserChoice(num);
    setIsSubmitted(true);

    const correct = num === missingValue;
    if (correct) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
  };

  const isCorrect = userChoice === missingValue;

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-amber-50 border-2 border-amber-200/90 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Shapes className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-black text-amber-700 uppercase tracking-wider">
              6ª Hora • Razonamiento y Lógica SM
            </div>
            <h3 className="font-black text-slate-900 text-base sm:text-lg">
              {exercise.instructions}
            </h3>
          </div>
        </div>
        <span className="text-xs font-black bg-amber-400 text-amber-950 px-3 py-1 rounded-full">
          Suma = {exercise.targetSum}
        </span>
      </div>

      {/* SVG Interactive Magic Triangle */}
      <div className="my-auto py-2 flex flex-col items-center">
        <div className="w-full max-w-sm aspect-square relative flex items-center justify-center">
          <svg viewBox="0 0 300 280" className="w-full h-full">
            {/* Triangle connecting lines */}
            <line x1="150" y1="50" x2="60" y2="220" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
            <line x1="150" y1="50" x2="240" y2="220" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
            <line x1="60" y1="220" x2="240" y2="220" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />

            {/* Target sum center badge */}
            <circle cx="150" cy="160" r="28" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />
            <text x="150" y="157" textAnchor="middle" className="font-black text-xs fill-amber-900">
              SUMA
            </text>
            <text x="150" y="174" textAnchor="middle" className="font-black text-lg fill-amber-950">
              {exercise.targetSum}
            </text>

            {/* Top Corner Node (Question mark or filled) */}
            <circle
              cx="150"
              cy="50"
              r="24"
              fill={userChoice !== null ? (isCorrect ? '#34d399' : '#f87171') : '#ffffff'}
              stroke="#d97706"
              strokeWidth="4"
              className="drop-shadow-md"
            />
            <text x="150" y="58" textAnchor="middle" className="font-black text-2xl fill-slate-900">
              {userChoice !== null ? userChoice : '❓'}
            </text>

            {/* Bottom Left Corner Node */}
            <circle cx="60" cy="220" r="22" fill="#ffffff" stroke="#d97706" strokeWidth="3" className="drop-shadow-md" />
            <text x="60" y="228" textAnchor="middle" className="font-black text-xl fill-slate-800">
              {exercise.solution.corners[1]}
            </text>

            {/* Bottom Right Corner Node */}
            <circle cx="240" cy="220" r="22" fill="#ffffff" stroke="#d97706" strokeWidth="3" className="drop-shadow-md" />
            <text x="240" y="228" textAnchor="middle" className="font-black text-xl fill-slate-800">
              {exercise.solution.corners[2]}
            </text>

            {/* Midpoints */}
            <circle cx="105" cy="135" r="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="105" y="142" textAnchor="middle" className="font-bold text-sm fill-sky-900">
              {exercise.solution.midpoints[0]}
            </text>

            <circle cx="195" cy="135" r="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="195" y="142" textAnchor="middle" className="font-bold text-sm fill-sky-900">
              {exercise.solution.midpoints[1]}
            </text>

            <circle cx="150" cy="220" r="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="150" y="227" textAnchor="middle" className="font-bold text-sm fill-sky-900">
              {exercise.solution.midpoints[2]}
            </text>
          </svg>
        </div>

        {/* Number buttons for choice */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="text-xs font-black text-slate-500 uppercase mr-1">Elige el número para ❓:</span>
          {exercise.availableNumbers.map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleChoose(num)}
              disabled={isSubmitted}
              className={`touch-target w-14 h-14 rounded-2xl font-black text-2xl shadow-md border-2 active:scale-95 transition-all ${
                userChoice === num
                  ? isCorrect
                    ? 'bg-emerald-500 text-white border-emerald-600'
                    : 'bg-rose-500 text-white border-rose-600'
                  : 'bg-white hover:bg-amber-100 text-amber-950 border-amber-300'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback & Continue */}
      <div className="mt-4">
        {isSubmitted ? (
          <div
            className={`p-4 rounded-3xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pop shadow-md ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-rose-600 shrink-0" />
              )}
              <div>
                <h4 className="font-black text-base sm:text-lg">
                  {isCorrect ? '¡Triángulo resuelto a la perfección!' : '¡Buen intento de razonamiento!'}
                </h4>
                <p className="text-xs sm:text-sm font-semibold opacity-90">
                  {exercise.hint}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onComplete(isCorrect)}
              className="touch-target px-8 h-12 rounded-2xl font-black bg-sky-500 hover:bg-sky-600 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>¡Continuar!</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        ) : (
          <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/80 flex items-center gap-2 text-xs font-bold text-amber-950">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Pista: Comprueba que los tres números de cada lado sumen exactamente {exercise.targetSum}.</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 4. CÓDIGO OCULTO (6ª HORA RAZONAMIENTO SM)
// ==========================================
const SecretCodeView: React.FC<{
  exercise: SecretCodeExerciseData;
  onComplete: (isCorrect: boolean) => void;
}> = ({ exercise, onComplete }) => {
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePickColor = (colorId: string) => {
    if (isSubmitted || currentGuess.length >= exercise.secretLength) return;
    soundService.playTap();
    const updated = [...currentGuess, colorId];
    setCurrentGuess(updated);

    if (updated.length === exercise.secretLength) {
      setIsSubmitted(true);
      const isCorrect = updated.every((c, idx) => c === exercise.targetCode[idx]);
      if (isCorrect) {
        soundService.playCorrect();
      } else {
        soundService.playWrong();
      }
    }
  };

  const handleReset = () => {
    soundService.playTap();
    setCurrentGuess([]);
    setIsSubmitted(false);
  };

  const isCorrect =
    currentGuess.length === exercise.secretLength &&
    currentGuess.every((c, idx) => c === exercise.targetCode[idx]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-emerald-50 border-2 border-emerald-200/90 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Blocks className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-black text-emerald-700 uppercase tracking-wider">
              6ª Hora • Códigos Ocultos y Estrategia
            </div>
            <h3 className="font-black text-slate-900 text-base sm:text-lg">
              {exercise.instructions}
            </h3>
          </div>
        </div>
      </div>

      {/* Secret Slots Container */}
      <div className="my-auto py-4 flex flex-col items-center">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md flex flex-col items-center max-w-md w-full">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
            Combinación Secreta ({currentGuess.length}/{exercise.secretLength})
          </span>

          <div className="flex items-center justify-center gap-4 my-2">
            {Array.from({ length: exercise.secretLength }).map((_, idx) => {
              const colorId = currentGuess[idx];
              const colorObj = exercise.colorPool.find((c) => c.id === colorId);

              return (
                <div
                  key={idx}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-3 border-dashed border-slate-300 flex items-center justify-center text-4xl shadow-inner transition-all bg-slate-50"
                  style={colorObj ? { backgroundColor: colorObj.colorHex, borderStyle: 'solid', borderColor: '#ffffff' } : {}}
                >
                  {colorObj ? <span className="animate-pop">{colorObj.icon}</span> : <span className="text-slate-300">❓</span>}
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold text-center">
            💡 Pista: {exercise.hint}
          </div>
        </div>

        {/* Color Palette Choices */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 max-w-md">
          {exercise.colorPool.map((col) => (
            <button
              key={col.id}
              type="button"
              onClick={() => handlePickColor(col.id)}
              disabled={isSubmitted || currentGuess.length >= exercise.secretLength}
              className="touch-target px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-400 shadow-sm flex items-center gap-2 active:scale-95 transition-all"
            >
              <span className="text-2xl">{col.icon}</span>
              <span className="font-black text-xs uppercase">{col.name}</span>
            </button>
          ))}
          {currentGuess.length > 0 && !isSubmitted && (
            <button
              type="button"
              onClick={handleReset}
              className="touch-target px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
            >
              Borrar
            </button>
          )}
        </div>
      </div>

      {/* Feedback & Continue */}
      <div className="mt-4">
        {isSubmitted && (
          <div
            className={`p-4 rounded-3xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pop shadow-md ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-rose-600 shrink-0" />
              )}
              <div>
                <h4 className="font-black text-base sm:text-lg">
                  {isCorrect ? '¡Código secreto descifrado!' : '¡Casi lo tienes!'}
                </h4>
                <p className="text-xs sm:text-sm font-semibold opacity-90">
                  {isCorrect
                    ? 'Has aplicado la deducción y la lógica como un auténtico detective.'
                    : 'Vuelve a revisar las pistas de colores.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onComplete(isCorrect)}
              className="touch-target px-8 h-12 rounded-2xl font-black bg-sky-500 hover:bg-sky-600 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>¡Continuar!</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import {
  Brain,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Volume2,
  Timer,
  HelpCircle
} from 'lucide-react';
import {
  MemoryCardsExerciseData,
  MemorySequenceExerciseData,
  MemoryMissingItemExerciseData
} from '../../types/education';
import { soundService } from '../../services/soundService';
import { AudioButton } from '../common/AudioButton';

interface MemoryExerciseProps {
  exercise:
    | MemoryCardsExerciseData
    | MemorySequenceExerciseData
    | MemoryMissingItemExerciseData;
  onComplete: (isCorrect: boolean) => void;
}

export const MemoryExercise: React.FC<MemoryExerciseProps> = ({
  exercise,
  onComplete
}) => {
  if (exercise.type === 'memory_cards') {
    return <MemoryCardsGame exercise={exercise} onComplete={onComplete} />;
  }

  if (exercise.type === 'memory_sequence') {
    return <MemorySequenceGame exercise={exercise} onComplete={onComplete} />;
  }

  if (exercise.type === 'memory_missing_item') {
    return <MemoryMissingItemGame exercise={exercise} onComplete={onComplete} />;
  }

  return <div>Tipo de ejercicio de memoria desconocido</div>;
};

// ==========================================
// 1. MINI-GAME: PAREJAS DE CARTAS (Memory Match)
// ==========================================
interface CardItem {
  uid: string;
  pairId: string;
  symbol: string;
  label: string;
}

const MemoryCardsGame: React.FC<{
  exercise: MemoryCardsExerciseData;
  onComplete: (isCorrect: boolean) => void;
}> = ({ exercise, onComplete }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Initialize and shuffle cards
  useEffect(() => {
    const list: CardItem[] = [];
    exercise.pairs.forEach((p, idx) => {
      list.push({ uid: `${p.id}_1_${idx}`, pairId: p.id, symbol: p.symbol, label: p.label });
      list.push({ uid: `${p.id}_2_${idx}`, pairId: p.id, symbol: p.symbol, label: p.label });
    });
    setCards(list.sort(() => Math.random() - 0.5));
    setFlippedUids([]);
    setMatchedPairIds([]);
    setIsFinished(false);
    setMoves(0);
  }, [exercise]);

  const handleCardClick = (card: CardItem) => {
    if (isEvaluating || isFinished) return;
    if (flippedUids.includes(card.uid) || matchedPairIds.includes(card.pairId)) return;

    soundService.playTap();

    if (flippedUids.length === 0) {
      setFlippedUids([card.uid]);
      return;
    }

    if (flippedUids.length === 1) {
      const firstCardUid = flippedUids[0];
      const firstCard = cards.find((c) => c.uid === firstCardUid);
      if (!firstCard) return;

      setFlippedUids([firstCardUid, card.uid]);
      setMoves((m) => m + 1);
      setIsEvaluating(true);

      if (firstCard.pairId === card.pairId) {
        // Matched!
        setTimeout(() => {
          soundService.playCorrect();
          const newMatched = [...matchedPairIds, card.pairId];
          setMatchedPairIds(newMatched);
          setFlippedUids([]);
          setIsEvaluating(false);

          if (newMatched.length === exercise.pairs.length) {
            setIsFinished(true);
            soundService.playFanfare();
          }
        }, 500);
      } else {
        // Mismatch - wait 1.2s then flip back
        setTimeout(() => {
          soundService.playWrong();
          setFlippedUids([]);
          setIsEvaluating(false);
        }, 1100);
      }
    }
  };

  const gridColsClass =
    exercise.gridCols === 2
      ? 'grid-cols-2 max-w-sm'
      : exercise.gridCols === 4
      ? 'grid-cols-2 sm:grid-cols-4 max-w-2xl'
      : 'grid-cols-2 sm:grid-cols-3 max-w-xl';

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-purple-50 border-2 border-purple-200/80 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-black text-purple-700 uppercase tracking-wider">
              Módulo de Memoria • Nivel {exercise.level}
            </div>
            <h3 className="font-black text-slate-900 text-base sm:text-lg">
              {exercise.instructions}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black bg-purple-100 text-purple-800 px-3 py-1 rounded-xl">
            Parejas: {matchedPairIds.length} / {exercise.pairs.length}
          </span>
          <AudioButton textToSpeak={exercise.instructions} lang="es-ES" size="sm" />
        </div>
      </div>

      {/* Cards Board */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[320px] p-2">
        <div className={`grid ${gridColsClass} gap-3 sm:gap-4 w-full mx-auto`}>
          {cards.map((card) => {
            const isFlipped =
              flippedUids.includes(card.uid) || matchedPairIds.includes(card.pairId);
            const isMatched = matchedPairIds.includes(card.pairId);

            return (
              <button
                key={card.uid}
                type="button"
                onClick={() => handleCardClick(card)}
                disabled={isFlipped || isEvaluating}
                className={`touch-target aspect-square rounded-3xl p-3 flex flex-col items-center justify-center transition-all duration-300 transform select-none shadow-md ${
                  isFlipped
                    ? isMatched
                      ? 'bg-emerald-50 border-4 border-emerald-400 scale-[1.02] shadow-emerald-200'
                      : 'bg-white border-4 border-sky-400 scale-[1.03] shadow-sky-200'
                    : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-500 hover:brightness-110 active:scale-95 border-2 border-white/40 cursor-pointer shadow-purple-300/40'
                }`}
              >
                {isFlipped ? (
                  <div className="flex flex-col items-center justify-center animate-pop">
                    <span className="text-4xl sm:text-6xl filter drop-shadow-sm">
                      {card.symbol}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-800 mt-1">
                      {card.label}
                    </span>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/90">
                    <Brain className="w-7 h-7" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion & Hint Footer */}
      <div className="mt-4">
        {isFinished ? (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pop shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shrink-0">
                ⭐
              </div>
              <div>
                <h4 className="font-black text-lg text-emerald-950">
                  ¡Excelente memoria! Has encontrado todas las parejas
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 font-bold">
                  Completado en {moves} intentos. {exercise.funFact}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onComplete(true)}
              className="touch-target px-8 h-12 rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>¡Continuar!</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        ) : (
          <div className="bg-purple-50/60 p-3.5 rounded-2xl border border-purple-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
              <HelpCircle className="w-4 h-4 text-purple-600 shrink-0" />
              <span>{exercise.hint}</span>
            </div>
            <span className="text-xs font-black text-purple-600 shrink-0 ml-2">
              Intentos: {moves}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. MINI-GAME: SECUENCIA DE COLORES (Simón Dice)
// ==========================================
const MemorySequenceGame: React.FC<{
  exercise: MemorySequenceExerciseData;
  onComplete: (isCorrect: boolean) => void;
}> = ({ exercise, onComplete }) => {
  const [activePadId, setActivePadId] = useState<string | null>(null);
  const [isPlayingDemo, setIsPlayingDemo] = useState(true);
  const [playerStep, setPlayerStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [statusMessage, setStatusMessage] = useState('¡Mira con atención!');

  // Play demo sequence when component mounts or resets
  const playDemo = async () => {
    setIsPlayingDemo(true);
    setPlayerStep(0);
    setIsSuccess(null);
    setStatusMessage('¡Observa el orden de las luces!');

    await new Promise((r) => setTimeout(r, 600));

    for (let i = 0; i < exercise.targetSequence.length; i++) {
      const padId = exercise.targetSequence[i];
      const pad = exercise.items.find((p) => p.id === padId);
      if (pad) {
        setActivePadId(pad.id);
        soundService.playTone(pad.soundFreq, 0.35);
        await new Promise((r) => setTimeout(r, 450));
        setActivePadId(null);
        await new Promise((r) => setTimeout(r, 150));
      }
    }

    setIsPlayingDemo(false);
    setStatusMessage('¡Tu turno! Toca los colores en el mismo orden.');
  };

  useEffect(() => {
    playDemo();
  }, [exercise]);

  const handlePadClick = (pad: (typeof exercise.items)[0]) => {
    if (isPlayingDemo || isSuccess !== null) return;

    // Flash pad and play sound
    setActivePadId(pad.id);
    soundService.playTone(pad.soundFreq, 0.25);
    setTimeout(() => setActivePadId(null), 200);

    const expectedPadId = exercise.targetSequence[playerStep];

    if (pad.id === expectedPadId) {
      const nextStep = playerStep + 1;
      setPlayerStep(nextStep);

      if (nextStep === exercise.targetSequence.length) {
        // Complete!
        setIsSuccess(true);
        setStatusMessage('¡Genial! ¡Has memorizado toda la secuencia!');
        soundService.playFanfare();
      }
    } else {
      // Mistake
      setIsSuccess(false);
      setStatusMessage('¡Oh, casi! Ese no era el color que tocaba.');
      soundService.playWrong();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-amber-50 border-2 border-amber-200/80 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-black text-amber-700 uppercase tracking-wider">
              Memoria de Secuencia • {exercise.sequenceLength} Pasos
            </div>
            <h3 className="font-black text-slate-900 text-base sm:text-lg">
              {exercise.instructions}
            </h3>
          </div>
        </div>
        <button
          type="button"
          onClick={playDemo}
          disabled={isPlayingDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-white hover:bg-amber-100 text-xs font-bold text-amber-900 transition-colors shadow-xs disabled:opacity-50"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Repetir Muestra</span>
        </button>
      </div>

      {/* Status Bar */}
      <div className="text-center my-2">
        <span
          className={`inline-block font-black text-sm sm:text-base px-4 py-1.5 rounded-full transition-all ${
            isPlayingDemo
              ? 'bg-sky-100 text-sky-900 border border-sky-300 animate-pulse'
              : isSuccess === true
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : isSuccess === false
              ? 'bg-rose-100 text-rose-900 border border-rose-300'
              : 'bg-amber-100 text-amber-900 border border-amber-300'
          }`}
        >
          {statusMessage}
        </span>
      </div>

      {/* 4 Colored Pads */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-md aspect-square">
          {exercise.items.map((pad) => {
            const isActive = activePadId === pad.id;

            return (
              <button
                key={pad.id}
                type="button"
                onClick={() => handlePadClick(pad)}
                disabled={isPlayingDemo || isSuccess !== null}
                style={{ backgroundColor: pad.color }}
                className={`touch-target rounded-3xl flex flex-col items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg transition-all duration-150 select-none ${
                  isActive
                    ? 'scale-95 brightness-150 ring-8 ring-white/80 shadow-2xl'
                    : 'hover:brightness-105 active:scale-95 shadow-md opacity-90'
                } ${isPlayingDemo ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span className="text-4xl sm:text-5xl mb-1 filter drop-shadow">
                  {pad.icon}
                </span>
                <span className="tracking-wide uppercase text-sm sm:text-base drop-shadow">
                  {pad.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-4">
        {isSuccess !== null && (
          <div
            className={`p-4 rounded-3xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pop shadow-md ${
              isSuccess
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-3">
              {isSuccess ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-rose-600 shrink-0" />
              )}
              <div>
                <h4 className="font-black text-base sm:text-lg">
                  {isSuccess ? '¡Secuencia superada!' : '¡Buen intento!'}
                </h4>
                <p className="text-xs sm:text-sm font-semibold opacity-90">
                  {exercise.funFact}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onComplete(isSuccess === true)}
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
// 3. MINI-GAME: ¿QUÉ HA DESAPARECIDO? (Visual Recall)
// ==========================================
const MemoryMissingItemGame: React.FC<{
  exercise: MemoryMissingItemExerciseData;
  onComplete: (isCorrect: boolean) => void;
}> = ({ exercise, onComplete }) => {
  const [phase, setPhase] = useState<'memorize' | 'curtain' | 'guess'>('memorize');
  const [secondsLeft, setSecondsLeft] = useState(exercise.memorizeSeconds || 4);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Memorize countdown timer
  useEffect(() => {
    if (phase !== 'memorize') return;

    if (secondsLeft <= 0) {
      // Trigger magic curtain transition
      setPhase('curtain');
      setTimeout(() => {
        setPhase('guess');
      }, 700);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, phase]);

  const handleSkipTimer = () => {
    if (phase === 'memorize') {
      soundService.playTap();
      setPhase('curtain');
      setTimeout(() => {
        setPhase('guess');
      }, 600);
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (phase !== 'guess' || selectedOptionId !== null) return;
    soundService.playTap();
    setSelectedOptionId(optionId);

    const correct = optionId === exercise.missingItemId;
    setIsCorrect(correct);

    if (correct) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-rose-50 border-2 border-rose-200/80 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-black text-rose-700 uppercase tracking-wider">
              Memoria Visual • Atención
            </div>
            <h3 className="font-black text-slate-900 text-base sm:text-lg">
              {phase === 'memorize'
                ? '¡Memoriza todos los objetos de la bandeja!'
                : '¿Qué objeto ha desaparecido?'}
            </h3>
          </div>
        </div>

        {phase === 'memorize' && (
          <button
            type="button"
            onClick={handleSkipTimer}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shadow-sm transition-all active:scale-95"
          >
            <Timer className="w-4 h-4" />
            <span>¡Listo! ({secondsLeft}s)</span>
          </button>
        )}
      </div>

      {/* Magic Tray / Box */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[280px]">
        <div className="w-full max-w-xl bg-gradient-to-b from-amber-100 to-amber-200/90 rounded-3xl p-6 sm:p-8 border-4 border-amber-300/80 shadow-xl relative overflow-hidden flex flex-col items-center justify-center">
          {/* Subtle wood shelf effect */}
          <div className="absolute inset-x-0 bottom-0 h-4 bg-amber-400/40 rounded-b-2xl pointer-events-none" />

          {phase === 'curtain' ? (
            <div className="flex flex-col items-center justify-center py-10 animate-pulse text-amber-900">
              <span className="text-6xl mb-2">✨</span>
              <span className="font-black text-2xl tracking-wide">¡Abracadabra...!</span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-4">
              {exercise.itemsShown.map((item) => {
                const isTheMissingOne = item.id === exercise.missingItemId;
                const isReplaced = phase === 'guess' && isTheMissingOne;

                return (
                  <div
                    key={item.id}
                    className={`w-24 h-28 sm:w-28 sm:h-32 rounded-2xl flex flex-col items-center justify-center p-2 shadow-md transition-all duration-300 ${
                      isReplaced
                        ? 'bg-amber-300/80 border-4 border-dashed border-amber-600 scale-105 animate-bounce-short'
                        : 'bg-white border-2 border-slate-200 scale-100'
                    }`}
                  >
                    {isReplaced ? (
                      <div className="flex flex-col items-center">
                        <span className="text-4xl sm:text-5xl font-black text-amber-800">
                          ❓
                        </span>
                        <span className="text-xs font-black text-amber-900 mt-1 uppercase">
                          ¿Falta...?
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center animate-pop">
                        <span className="text-4xl sm:text-5xl mb-1">{item.icon}</span>
                        <span className="text-xs font-black text-slate-800 text-center">
                          {item.name}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Guess Options (shown only in 'guess' phase) */}
      <div className="mt-4">
        {phase === 'guess' && selectedOptionId === null && (
          <div className="flex flex-col items-center">
            <h4 className="font-black text-slate-700 text-sm mb-3 uppercase tracking-wider">
              Elige el objeto que estaba y ahora no está:
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-lg">
              {exercise.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className="touch-target flex-1 min-w-[120px] h-16 rounded-2xl bg-white hover:bg-sky-50 border-2 border-slate-300 hover:border-sky-400 p-3 shadow-md flex items-center justify-center gap-3 active:scale-95 transition-all text-left"
                >
                  <span className="text-3xl">{opt.icon}</span>
                  <span className="font-black text-slate-900 text-base">{opt.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Card */}
        {selectedOptionId !== null && (
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
                  {isCorrect
                    ? '¡Correcto! Te acordaste perfectamente'
                    : '¡Vaya! El objeto que faltaba era otro'}
                </h4>
                <p className="text-xs sm:text-sm font-semibold opacity-90">
                  {exercise.funFact}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onComplete(isCorrect === true)}
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

import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Compass, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { GeographyExerciseData } from '../../types/education';
import { MAPS_DATA } from '../../data/geographyData';
import { AudioButton } from '../common/AudioButton';
import { soundService } from '../../services/soundService';

interface GeographyMapExerciseProps {
  exercise: GeographyExerciseData;
  onComplete: (isCorrect: boolean) => void;
}

export const GeographyMapExercise: React.FC<GeographyMapExerciseProps> = ({
  exercise,
  onComplete
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const mapDef = MAPS_DATA[exercise.mapType] || MAPS_DATA.spain;

  const handleRegionClick = (regionId: string) => {
    if (isSubmitted) return;
    soundService.playTap();
    setSelectedRegionId(regionId);
    setIsSubmitted(true);

    const correct = regionId === exercise.targetRegionId;
    setIsCorrect(correct);

    if (correct) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
  };

  const handleZoom = (delta: number) => {
    soundService.playTap();
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.8), 2.5));
  };

  const handleResetZoom = () => {
    soundService.playTap();
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const clickedRegion = mapDef.regions.find((r) => r.id === selectedRegionId);

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl px-4 py-2.5 flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-6 h-6 text-amber-600" />
          <h3 className="font-black text-amber-950 text-base sm:text-lg">
            {mapDef.title}: <span className="text-amber-800">{exercise.instructions}</span>
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <AudioButton
            textToSpeak={`${exercise.instructions} ${exercise.targetRegionName}`}
            lang="es-ES"
            label="Oír reto"
            size="sm"
          />
        </div>
      </div>

      {/* Split-screen Layout:
          - Chromebook Landscape / Desktop: 70-75% Map (Left) / 25-30% Info (Right)
          - Mobile Portrait: stacked
      */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
        {/* Map Container (takes 3 cols = 75% on large screens) */}
        <div className="lg:col-span-3 bg-sky-50 rounded-3xl border-2 border-slate-200 shadow-sm relative overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4 min-h-[300px]">
          {/* Zoom & Pan Controls for Touch / Pinch Ease */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-2xl shadow-md border border-slate-200">
            <button
              type="button"
              onClick={() => handleZoom(0.3)}
              aria-label="Acercar mapa"
              className="touch-target w-11 h-11 rounded-xl bg-slate-100 hover:bg-sky-100 text-slate-700 font-bold active:scale-95 flex items-center justify-center transition-transform"
            >
              <ZoomIn className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(-0.3)}
              aria-label="Alejar mapa"
              className="touch-target w-11 h-11 rounded-xl bg-slate-100 hover:bg-sky-100 text-slate-700 font-bold active:scale-95 flex items-center justify-center transition-transform"
            >
              <ZoomOut className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              aria-label="Centrar mapa"
              className="touch-target w-11 h-11 rounded-xl bg-slate-100 hover:bg-sky-100 text-slate-700 font-bold active:scale-95 flex items-center justify-center transition-transform"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* SVG Map */}
          <div className="w-full h-full flex items-center justify-center select-none overflow-hidden cursor-pointer">
            <svg
              viewBox={mapDef.viewBox}
              className="w-full h-full max-h-[500px] transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${zoomLevel}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: 'center center'
              }}
            >
              {mapDef.regions.map((region) => {
                const isSelected = selectedRegionId === region.id;
                const isTarget = region.id === exercise.targetRegionId;

                let fillColor = '#cbd5e1'; // default slate-300
                let strokeColor = '#94a3b8'; // slate-400

                if (isSubmitted) {
                  if (isTarget) {
                    fillColor = '#34d399'; // bright green
                    strokeColor = '#059669';
                  } else if (isSelected) {
                    fillColor = '#f87171'; // soft red
                    strokeColor = '#dc2626';
                  }
                } else if (isSelected) {
                  fillColor = '#38bdf8';
                  strokeColor = '#0284c7';
                }

                return (
                  <g
                    key={region.id}
                    onClick={() => handleRegionClick(region.id)}
                    className="cursor-pointer group transition-all"
                  >
                    <path
                      d={region.pathD}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth="3"
                      strokeLinejoin="round"
                      className="transition-colors hover:brightness-105 active:scale-[0.98]"
                    />
                    <text
                      x={region.labelX}
                      y={region.labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-slate-800 font-black text-xs sm:text-sm pointer-events-none select-none tracking-wide"
                    >
                      {region.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Info & Feedback Card (takes 1 col = 25% on large screens) */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-center mb-4">
              <span className="text-5xl" role="img" aria-hidden="true">
                {exercise.flagEmoji}
              </span>
              <h4 className="font-black text-2xl text-slate-900 mt-2">
                {exercise.targetRegionName}
              </h4>
              <p className="text-sm font-bold text-slate-500 mt-1">
                {isSubmitted ? 'Resultado:' : 'Tócalo en el mapa de la izquierda'}
              </p>
            </div>

            {/* Hint or Feedback Card */}
            {isSubmitted ? (
              <div
                className={`p-4 rounded-2xl font-bold text-sm sm:text-base mb-4 animate-pop ${
                  isCorrect
                    ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                    : 'bg-rose-100 text-rose-950 border border-rose-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 font-black text-base">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      <span>¡Correcto! {exercise.flagEmoji}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-rose-600" />
                      <span>Has tocado {clickedRegion ? clickedRegion.name : 'otro lugar'}</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                  {exercise.funFact}
                </p>
              </div>
            ) : (
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 mb-4">
                <div className="text-xs font-black text-amber-900 uppercase tracking-wider mb-1">
                  💡 Pista
                </div>
                <p className="text-sm text-amber-800 font-semibold">{exercise.hint}</p>
              </div>
            )}
          </div>

          {/* Continue button */}
          {isSubmitted && (
            <button
              type="button"
              onClick={() => onComplete(isCorrect === true)}
              className="touch-target w-full h-14 rounded-2xl font-black text-lg bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-200 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>¡Continuar!</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

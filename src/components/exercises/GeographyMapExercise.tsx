import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Eye,
  EyeOff,
  HelpCircle,
  MapPin
} from 'lucide-react';
import { GeographyExerciseData } from '../../types/education';
import { MAPS_DATA, MapRegion, MapCity } from '../../data/geographyData';
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showLabels, setShowLabels] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const mapDef = MAPS_DATA[exercise.mapType] || MAPS_DATA.spain_ccaa;
  const isCityMode = mapDef.targetType === 'city' || exercise.targetType === 'city';

  const handleSelect = (id: string) => {
    if (isSubmitted) return;
    soundService.playTap();
    setSelectedId(id);
    setIsSubmitted(true);

    const correct = id === exercise.targetRegionId;
    setIsCorrect(correct);

    if (correct) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
  };

  const handleZoom = (delta: number) => {
    soundService.playTap();
    setZoomLevel((prev) => Math.min(Math.max(Number((prev + delta).toFixed(1)), 0.8), 2.5));
  };

  const handleResetZoom = () => {
    soundService.playTap();
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  // Find clicked item
  let clickedName: string | null = null;
  if (isCityMode) {
    const city = mapDef.cities?.find((c) => c.id === selectedId);
    if (city) clickedName = city.name;
  } else {
    const region = mapDef.regions.find((r) => r.id === selectedId);
    if (region) clickedName = region.name;
  }

  // Find target item
  const targetCity = mapDef.cities?.find((c) => c.id === exercise.targetRegionId);
  const targetRegion = mapDef.regions.find((r) => r.id === exercise.targetRegionId);

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 max-w-7xl mx-auto">
      {/* Top Banner with Challenge & Audio */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200/90 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 mb-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
            {isCityMode ? <MapPin className="w-6 h-6 text-amber-600" /> : <Compass className="w-6 h-6 text-amber-600" />}
          </div>
          <div>
            <div className="text-xs font-black text-amber-700 uppercase tracking-wider">
              {mapDef.title} {isCityMode ? '• Capitales' : '• Mapa Mudo'}
            </div>
            <h3 className="font-black text-slate-900 text-base sm:text-xl leading-tight">
              {exercise.instructions}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundService.playTap();
              setShowLabels(!showLabels);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-white/80 hover:bg-white text-xs font-bold text-amber-900 shadow-xs transition-colors"
            title={showLabels ? 'Ocultar nombres del mapa' : 'Mostrar nombres del mapa'}
          >
            {showLabels ? <EyeOff className="w-4 h-4 text-amber-700" /> : <Eye className="w-4 h-4 text-amber-700" />}
            <span>{showLabels ? 'Ocultar Nombres' : 'Mostrar Nombres'}</span>
          </button>

          <AudioButton
            textToSpeak={`${exercise.instructions} ${exercise.targetRegionName}`}
            lang="es-ES"
            label="Escuchar"
            size="sm"
          />
        </div>
      </div>

      {/* Main Map View & Side Panel */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
        {/* Map Container */}
        <div className="lg:col-span-3 bg-gradient-to-b from-sky-50/70 to-blue-50/40 rounded-3xl border-2 border-slate-200 shadow-inner relative overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4 min-h-[360px]">
          {/* Zoom & Helper Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-200">
            <button
              type="button"
              onClick={() => handleZoom(0.3)}
              aria-label="Acercar mapa"
              className="touch-target w-10 h-10 rounded-xl bg-slate-50 hover:bg-sky-100 text-slate-700 font-bold active:scale-95 flex items-center justify-center transition-all"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(-0.3)}
              aria-label="Alejar mapa"
              className="touch-target w-10 h-10 rounded-xl bg-slate-50 hover:bg-sky-100 text-slate-700 font-bold active:scale-95 flex items-center justify-center transition-all"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              aria-label="Centrar mapa"
              className="touch-target w-10 h-10 rounded-xl bg-slate-50 hover:bg-sky-100 text-slate-700 font-bold active:scale-95 flex items-center justify-center transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Blank SVG Map */}
          <div className="w-full h-full flex items-center justify-center select-none overflow-hidden">
            <svg
              viewBox={mapDef.viewBox}
              className="w-full h-full max-h-[540px] transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${zoomLevel}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: 'center center'
              }}
            >
              {/* Optional Canary Islands Inset Frame for Spain Maps */}
              {mapDef.canaryInsetBox && (
                <g className="pointer-events-none">
                  <rect
                    x={mapDef.canaryInsetBox.x}
                    y={mapDef.canaryInsetBox.y}
                    width={mapDef.canaryInsetBox.width}
                    height={mapDef.canaryInsetBox.height}
                    fill="rgba(240, 249, 255, 0.6)"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    rx="12"
                  />
                  <text
                    x={mapDef.canaryInsetBox.x + 12}
                    y={mapDef.canaryInsetBox.y + 22}
                    className="fill-slate-500 font-black text-xs select-none"
                  >
                    🇮🇨 Islas Canarias
                  </text>
                </g>
              )}

              {/* Background Borders (used when in City Mode or for European/Spanish provinces) */}
              {mapDef.backgroundBorders?.map((b) => (
                <path
                  key={b.id}
                  d={b.pathD}
                  fill="#e2e8f0"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  className="transition-colors pointer-events-none"
                />
              ))}

              {/* 1. REGION MODE: Surface polygons for Autonomous Communities or Countries */}
              {!isCityMode &&
                mapDef.regions.map((region) => {
                  const isSelected = selectedId === region.id;
                  const isTarget = region.id === exercise.targetRegionId;

                  let fillColor = '#cbd5e1'; // neutral slate
                  let strokeColor = '#94a3b8';
                  let strokeWidth = '2';

                  if (isSubmitted) {
                    if (isTarget) {
                      fillColor = '#34d399'; // Emerald success
                      strokeColor = '#059669';
                      strokeWidth = '3.5';
                    } else if (isSelected) {
                      fillColor = '#f87171'; // Red fail
                      strokeColor = '#dc2626';
                      strokeWidth = '3';
                    }
                  } else if (isSelected) {
                    fillColor = '#38bdf8'; // Sky blue on click
                    strokeColor = '#0284c7';
                    strokeWidth = '3';
                  }

                  const shouldShowLabel =
                    showLabels ||
                    (isSubmitted && (isTarget || isSelected));

                  return (
                    <g
                      key={region.id}
                      onClick={() => handleSelect(region.id)}
                      className="cursor-pointer group"
                    >
                      <path
                        d={region.pathD}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                        className="transition-colors hover:fill-amber-200/80 hover:stroke-amber-500 active:scale-[0.99] duration-150"
                      />

                      {/* Name label appears only after answering or on request (mapa mudo sin nombres) */}
                      {shouldShowLabel && (
                        <g className="pointer-events-none animate-pop select-none">
                          <rect
                            x={region.labelX - (region.name.length * 4.2 + 8)}
                            y={region.labelY - 12}
                            width={region.name.length * 8.4 + 16}
                            height={24}
                            rx={12}
                            fill={isTarget && isSubmitted ? '#059669' : '#ffffff'}
                            fillOpacity="0.95"
                            stroke={isTarget && isSubmitted ? '#047857' : '#94a3b8'}
                            strokeWidth="1"
                            className="shadow-sm"
                          />
                          <text
                            x={region.labelX}
                            y={region.labelY + 4}
                            textAnchor="middle"
                            className={`font-black text-xs sm:text-sm select-none ${
                              isTarget && isSubmitted ? 'fill-white' : 'fill-slate-800'
                            }`}
                          >
                            {region.flagEmoji} {region.name}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

              {/* 2. CITY MODE: City points/pins for Provincial Capitals or National Capitals */}
              {isCityMode &&
                mapDef.cities?.map((city) => {
                  const isSelected = selectedId === city.id;
                  const isTarget = city.id === exercise.targetRegionId;

                  let pinColor = '#3b82f6'; // default blue
                  let ringColor = 'rgba(59, 130, 246, 0.25)';

                  if (isSubmitted) {
                    if (isTarget) {
                      pinColor = '#10b981'; // Emerald
                      ringColor = 'rgba(16, 185, 129, 0.4)';
                    } else if (isSelected) {
                      pinColor = '#ef4444'; // Red
                      ringColor = 'rgba(239, 68, 68, 0.3)';
                    }
                  }

                  const shouldShowLabel =
                    showLabels ||
                    (isSubmitted && (isTarget || isSelected));

                  return (
                    <g
                      key={city.id}
                      onClick={() => handleSelect(city.id)}
                      className="cursor-pointer group"
                    >
                      {/* Generous invisible touch hitbox for effortless fingers / touchscreens */}
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r="24"
                        fill="transparent"
                        className="cursor-pointer"
                      />

                      {/* Outer pulse / hover ring */}
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={isSelected || isTarget ? '16' : '12'}
                        fill={ringColor}
                        className="transition-all group-hover:scale-125"
                      />

                      {/* City Pin Marker */}
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r="6.5"
                        fill={pinColor}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        className="transition-transform group-hover:scale-110 drop-shadow-md"
                      />

                      {/* City Name Label (Shown only when revealed or submitted) */}
                      {shouldShowLabel && (
                        <g className="pointer-events-none animate-pop select-none">
                          <rect
                            x={city.x - (city.name.length * 4.2 + 8)}
                            y={city.y - 30}
                            width={city.name.length * 8.4 + 16}
                            height={22}
                            rx={11}
                            fill={isTarget && isSubmitted ? '#059669' : '#ffffff'}
                            fillOpacity="0.95"
                            stroke={isTarget && isSubmitted ? '#047857' : '#94a3b8'}
                            strokeWidth="1"
                            className="shadow-md"
                          />
                          <text
                            x={city.x}
                            y={city.y - 15}
                            textAnchor="middle"
                            className={`font-black text-xs select-none ${
                              isTarget && isSubmitted ? 'fill-white' : 'fill-slate-900'
                            }`}
                          >
                            {city.name}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
            </svg>
          </div>
        </div>

        {/* Right Info & Feedback Panel */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            {/* Target Card Header */}
            <div className="text-center mb-5 pb-4 border-b border-slate-100">
              <span className="text-5xl" role="img" aria-hidden="true">
                {exercise.flagEmoji}
              </span>
              <h4 className="font-black text-2xl text-slate-900 mt-2">
                {exercise.targetRegionName}
              </h4>
              <p className="text-xs font-bold text-slate-500 mt-1">
                {isCityMode
                  ? 'Toca el punto de la ciudad en el mapa'
                  : 'Toca en la superficie de la zona en el mapa'}
              </p>
            </div>

            {/* Hint or Feedback Result Card */}
            {isSubmitted ? (
              <div
                className={`p-4 rounded-2xl font-bold text-sm sm:text-base mb-4 animate-pop ${
                  isCorrect
                    ? 'bg-emerald-50 text-emerald-950 border-2 border-emerald-300'
                    : 'bg-rose-50 text-rose-950 border-2 border-rose-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 font-black text-base">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                      <span>¡Correcto! {exercise.flagEmoji}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                      <span>Has tocado: {clickedName || 'otro lugar'}</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                  {exercise.funFact}
                </p>
              </div>
            ) : (
              <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 uppercase tracking-wider mb-1">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>Pista Geográfica</span>
                </div>
                <p className="text-sm text-amber-900/90 font-medium leading-relaxed">
                  {exercise.hint || 'Observa la forma y la ubicación en el mapa.'}
                </p>
              </div>
            )}
          </div>

          {/* Action Button: Next or Continue */}
          {isSubmitted && (
            <button
              type="button"
              onClick={() => onComplete(isCorrect === true)}
              className="touch-target w-full h-14 rounded-2xl font-black text-lg bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
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

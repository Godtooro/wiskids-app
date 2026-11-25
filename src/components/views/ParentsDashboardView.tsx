import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Copy, Download, Upload, Cloud, RefreshCw, Check, AlertCircle, BarChart3, User } from 'lucide-react';
import { UserProfile, IProgressRepository, Subject } from '../../types/education';
import { storageService } from '../../services/storageService';
import { soundService } from '../../services/soundService';

interface ParentsDashboardViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onBack: () => void;
}

export const ParentsDashboardView: React.FC<ParentsDashboardViewProps> = ({
  profile,
  onUpdateProfile,
  onBack
}) => {
  // Parental gate question: multiplication challenge
  const [num1, setNum1] = useState(7);
  const [num2, setNum2] = useState(6);
  const [parentAnswer, setParentAnswer] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Sync state
  const [exportCode, setExportCode] = useState('');
  const [importInput, setImportInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Profile edit state
  const [studentName, setStudentName] = useState(profile.name);
  const [studentPin, setStudentPin] = useState(profile.pin);
  const [studentAvatar, setStudentAvatar] = useState(profile.avatar);

  useEffect(() => {
    // Generate simple multiplication gate for parents
    const a = Math.floor(Math.random() * 5) + 5; // 5 to 9
    const b = Math.floor(Math.random() * 5) + 3; // 3 to 7
    setNum1(a);
    setNum2(b);
  }, []);

  const handleVerifyGate = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(parentAnswer, 10) === num1 * num2) {
      soundService.playCorrect();
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      soundService.playWrong();
      setAuthError(true);
    }
  };

  const handleGenerateExport = async () => {
    soundService.playTap();
    const code = await storageService.exportData();
    setExportCode(code);
  };

  const handleCopyExport = () => {
    soundService.playTap();
    navigator.clipboard.writeText(exportCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleImport = async () => {
    if (!importInput.trim()) return;
    try {
      soundService.playTap();
      const updated = await storageService.importData(importInput);
      onUpdateProfile(updated);
      setImportStatus('¡Progreso importado con éxito!');
      soundService.playCorrect();
    } catch {
      soundService.playWrong();
      setImportStatus('Error: El código no es válido.');
    }
  };

  const handleSaveProfileSettings = async () => {
    soundService.playTap();
    const updated = {
      ...profile,
      name: studentName.trim() || profile.name,
      pin: studentPin.trim() || profile.pin,
      avatar: studentAvatar
    };
    await storageService.saveProgress(updated);
    onUpdateProfile(updated);
    soundService.playCorrect();
  };

  const handleReset = async () => {
    if (window.confirm('¿Seguro que deseas reiniciar todas las estadísticas a cero?')) {
      const fresh = await storageService.resetProgress();
      onUpdateProfile(fresh);
      soundService.playTap();
    }
  };

  // Parental Gate View (Protection)
  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-md mx-auto p-4 sm:p-6 my-auto flex flex-col items-center">
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl w-full text-center animate-pop">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center text-3xl mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800">Zona de Padres</h2>
          <p className="text-sm font-bold text-slate-500 mt-1 mb-6">
            Para acceder, resuelve esta operación matemática:
          </p>

          <form onSubmit={handleVerifyGate} className="flex flex-col gap-4">
            <div className="text-3xl font-black text-sky-600 font-rounded bg-sky-50 py-3 rounded-2xl border border-sky-100">
              {num1} × {num2} = ?
            </div>

            <input
              type="number"
              value={parentAnswer}
              onChange={(e) => setParentAnswer(e.target.value)}
              placeholder="Escribe el resultado"
              className="w-full h-14 text-center text-2xl font-black rounded-2xl border-2 border-slate-300 focus:border-sky-500 focus:outline-none"
              autoFocus
            />

            {authError && (
              <div className="text-sm font-bold text-rose-600 bg-rose-50 p-2 rounded-xl">
                Resultado incorrecto. Inténtalo de nuevo.
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={onBack}
                className="touch-target flex-1 h-14 rounded-2xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all"
              >
                Volver
              </button>
              <button
                type="submit"
                className="touch-target flex-1 h-14 rounded-2xl font-black text-lg bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-200 active:scale-95 transition-all"
              >
                Acceder
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Parents Dashboard
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
            <BarChart3 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">Panel de Control para Padres</h1>
            <p className="text-xs sm:text-sm font-bold text-slate-500">
              Progreso educativo, sincronización entre dispositivos y ajustes
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="touch-target px-5 h-12 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all"
        >
          Volver a la App
        </button>
      </div>

      {/* Progress Analytics by Subject */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm">
        <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
          <span>📊 Rendimiento Pedagógico por Materia</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {(Object.keys(profile.subjectStats) as Array<keyof typeof profile.subjectStats>).map(
            (sub) => {
              const stat = profile.subjectStats[sub];
              if (!stat) return null;
              const pct = stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : 0;
              const nameMap: Record<Subject, string> = {
                lenguaje: 'Lenguaje',
                matematicas: 'Matemáticas',
                geografia: 'Geografía',
                ingles: 'Inglés',
                memoria: 'Memoria',
                sexta_hora: '6ª Hora (Colegio)'
              };

              return (
                <div key={sub} className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-base text-slate-800 capitalize">
                      {nameMap[sub]}
                    </span>
                    <span className="text-xs font-black bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                      Nivel {stat.level}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-800 mb-1">
                    {stat.correct} / {stat.attempted}
                  </div>
                  <div className="text-xs font-bold text-slate-500 mb-2">
                    {pct}% de precisión ({stat.attempted} ejercicios)
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Cross-Device Sync (Móvil <-> Chromebook) */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Cloud className="w-6 h-6 text-sky-600" />
          <h2 className="text-xl font-black text-slate-800">
            Sincronización Multi-Dispositivo (iPhone/Android ↔ Chromebook)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export */}
          <div className="bg-sky-50/50 rounded-2xl p-5 border border-sky-100 flex flex-col justify-between">
            <div>
              <h3 className="font-black text-lg text-sky-950 flex items-center gap-2">
                <Download className="w-5 h-5 text-sky-600" />
                <span>1. Exportar Progreso</span>
              </h3>
              <p className="text-xs font-bold text-sky-800 mt-1 mb-4">
                Genera un código corto seguro para transferir estrellas, trofeos y el buzón de fallos a otro dispositivo.
              </p>

              {exportCode ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    readOnly
                    value={exportCode}
                    className="w-full h-24 p-3 bg-white font-mono text-xs rounded-xl border border-sky-200 select-all"
                  />
                  <button
                    type="button"
                    onClick={handleCopyExport}
                    className="touch-target h-12 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>¡Copiado al Portapapeles!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copiar Código Corto</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleGenerateExport}
                  className="touch-target w-full h-12 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl active:scale-95 transition-all"
                >
                  Generar Código de Transferencia
                </button>
              )}
            </div>
          </div>

          {/* Import */}
          <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 flex flex-col justify-between">
            <div>
              <h3 className="font-black text-lg text-emerald-950 flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-600" />
                <span>2. Importar Progreso</span>
              </h3>
              <p className="text-xs font-bold text-emerald-800 mt-1 mb-4">
                Pega el código corto copiado de tu otro dispositivo para sincronizar al instante.
              </p>

              <textarea
                value={importInput}
                onChange={(e) => setImportInput(e.target.value)}
                placeholder="Pega aquí el código que empieza por SKID-..."
                className="w-full h-24 p-3 bg-white font-mono text-xs rounded-xl border border-emerald-200 mb-2 focus:outline-none"
              />

              {importStatus && (
                <div
                  className={`text-xs font-bold p-2 rounded-lg mb-2 ${
                    importStatus.includes('éxito')
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {importStatus}
                </div>
              )}

              <button
                type="button"
                onClick={handleImport}
                disabled={!importInput.trim()}
                className="touch-target w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl active:scale-95 transition-all disabled:opacity-50"
              >
                Aplicar y Sincronizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile & Danger Zone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-sky-600" />
            <span>Perfil del Estudiante</span>
          </h3>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-black text-slate-500 uppercase">Nombre</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-300 font-bold text-slate-800 focus:outline-none focus:border-sky-500 mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-black text-slate-500 uppercase">PIN de Sincronización</label>
              <input
                type="text"
                maxLength={4}
                value={studentPin}
                onChange={(e) => setStudentPin(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-300 font-mono font-bold text-slate-800 focus:outline-none focus:border-sky-500 mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-black text-slate-500 uppercase">Avatar</label>
              <div className="flex gap-2 mt-1">
                {['🦁', '🚀', '🦊', '🦉', '⭐', '🦖'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setStudentAvatar(emoji)}
                    className={`w-12 h-12 rounded-xl text-2xl border-2 flex items-center justify-center transition-transform active:scale-90 ${
                      studentAvatar === emoji
                        ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-200'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveProfileSettings}
              className="touch-target h-12 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl mt-3 active:scale-95 transition-all"
            >
              Guardar Cambios
            </button>
          </div>
        </div>

        {/* Danger zone / Reset */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-800 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              <span>Zona de Mantenimiento</span>
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-500 mb-4">
              Si deseas comenzar un nuevo curso escolar o reiniciar las estadísticas del perfil para otro alumno:
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="touch-target h-12 border-2 border-rose-300 text-rose-600 hover:bg-rose-50 font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Reiniciar Estadísticas a Cero</span>
          </button>
        </div>
      </div>
    </div>
  );
};

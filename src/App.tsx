import React, { useState, useEffect } from 'react';
import { UserProfile, Exercise, Subject } from './types/education';
import { storageService, INITIAL_PROFILE } from './services/storageService';
import { generateDailySession, generateSubjectSession } from './data/sessionGenerator';

// Common Components
import { Header } from './components/common/Header';

// Views
import { DashboardView } from './components/views/DashboardView';
import { SessionRunnerView } from './components/views/SessionRunnerView';
import { ReviewBoxView } from './components/views/ReviewBoxView';
import { TrophiesView } from './components/views/TrophiesView';
import { ParentsDashboardView } from './components/views/ParentsDashboardView';

type ViewMode = 'dashboard' | 'session' | 'review' | 'trophies' | 'parents';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [activeExercises, setActiveExercises] = useState<Exercise[]>([]);
  const [sessionTitle, setSessionTitle] = useState('Entrenamiento Diario');
  const [isLoading, setIsLoading] = useState(true);

  // Load progress on initial mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const loaded = await storageService.getProgress();
        setProfile(loaded);
      } catch (e) {
        console.error('Failed to load initial progress:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleStartDailySession = () => {
    const session = generateDailySession(profile);
    setActiveExercises(session);
    setSessionTitle('Entrenamiento Diario (10 Retos Mixtos)');
    setCurrentView('session');
  };

  const handleStartSubjectSession = (subject: Subject) => {
    const titles = {
      lenguaje: 'Práctica de Lenguaje',
      matematicas: 'Práctica de Matemáticas',
      geografia: 'Exploración de Geografía',
      ingles: 'Vocabulario en Inglés'
    };
    const session = generateSubjectSession(subject, profile, 6);
    setActiveExercises(session);
    setSessionTitle(titles[subject]);
    setCurrentView('session');
  };

  const handleStartReviewSession = (exercises: Exercise[]) => {
    setActiveExercises(exercises);
    setSessionTitle('Buzón de Retos (Repaso de Fallos)');
    setCurrentView('session');
  };

  const handleFinishSession = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  const handleExitSession = async () => {
    const fresh = await storageService.getProgress();
    setProfile(fresh);
    setCurrentView('dashboard');
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-sky-500 text-white flex items-center justify-center text-3xl animate-bounce">
            🦁
          </div>
          <span className="font-black text-xl text-sky-700">Cargando WisKids.app...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Show header on non-session views */}
      {currentView !== 'session' && (
        <Header
          profile={profile}
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'dashboard' && (
          <DashboardView
            profile={profile}
            onStartDailySession={handleStartDailySession}
            onStartSubjectSession={handleStartSubjectSession}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'session' && (
          <SessionRunnerView
            exercises={activeExercises}
            sessionTitle={sessionTitle}
            onFinishSession={handleFinishSession}
            onExit={handleExitSession}
          />
        )}

        {currentView === 'review' && (
          <ReviewBoxView
            profile={profile}
            onStartReviewSession={handleStartReviewSession}
            onBack={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'trophies' && (
          <TrophiesView
            trophies={profile.trophies}
            onBack={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'parents' && (
          <ParentsDashboardView
            profile={profile}
            onUpdateProfile={(updated) => setProfile(updated)}
            onBack={() => setCurrentView('dashboard')}
          />
        )}
      </main>
    </div>
  );
};
export default App;

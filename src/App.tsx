import React, { useState, useEffect } from 'react';
import { UserProfile, Exercise, Subject } from './types/education';
import { UserAccount } from './types/auth';
import { storageService, INITIAL_PROFILE } from './services/storageService';
import { authService } from './services/authService';
import { generateDailySession, generateSubjectSession } from './data/sessionGenerator';

// Common Components
import { Header } from './components/common/Header';

// Views
import { LoginView } from './components/views/LoginView';
import { DashboardView } from './components/views/DashboardView';
import { SessionRunnerView } from './components/views/SessionRunnerView';
import { ReviewBoxView } from './components/views/ReviewBoxView';
import { TrophiesView } from './components/views/TrophiesView';
import { ParentsDashboardView } from './components/views/ParentsDashboardView';
import { AdminUsersView } from './components/views/AdminUsersView';

type ViewMode = 'dashboard' | 'session' | 'review' | 'trophies' | 'parents' | 'admin_users';

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [activeExercises, setActiveExercises] = useState<Exercise[]>([]);
  const [sessionTitle, setSessionTitle] = useState('Entrenamiento Diario');
  const [isLoading, setIsLoading] = useState(true);

  // Check saved session & load progress on initial mount
  useEffect(() => {
    const initAuthAndProgress = async () => {
      try {
        const session = authService.getCurrentSession();
        if (session && session.user) {
          setCurrentUser(session.user);
          const loaded = await storageService.getProgress(session.user.id);
          // Sync name and avatar if newly created
          if (loaded.name !== session.user.name) {
            loaded.name = session.user.name;
          }
          if (session.user.avatar && loaded.avatar !== session.user.avatar) {
            loaded.avatar = session.user.avatar;
          }
          setProfile(loaded);
        }
      } catch (e) {
        console.error('Failed to load initial session or progress:', e);
      } finally {
        setIsLoading(false);
      }
    };
    initAuthAndProgress();
  }, []);

  const handleLoginSuccess = async (user: UserAccount) => {
    setIsLoading(true);
    setCurrentUser(user);
    try {
      const loaded = await storageService.getProgress(user.id);
      loaded.name = user.name;
      if (user.avatar) {
        loaded.avatar = user.avatar;
      }
      await storageService.saveProgress(loaded, user.id);
      setProfile(loaded);
      setCurrentView('dashboard');
    } catch (e) {
      console.error('Failed to load user progress on login:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const handleStartDailySession = () => {
    const session = generateDailySession(profile);
    setActiveExercises(session);
    setSessionTitle('Entrenamiento Diario (10 Retos Mixtos)');
    setCurrentView('session');
  };

  const handleStartSubjectSession = (subject: Subject) => {
    const titles: Record<Subject, string> = {
      lenguaje: 'Práctica de Lenguaje',
      matematicas: 'Práctica de Matemáticas (Currículo Escolar)',
      geografia: 'Exploración de Geografía',
      ingles: 'Inglés & Phonics',
      memoria: 'Gimnasio de Memoria',
      sexta_hora: '6ª Hora (Razonamiento & Refuerzo Colegio)'
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
    if (currentUser) {
      storageService.saveProgress(updatedProfile, currentUser.id);
    }
  };

  const handleExitSession = async () => {
    const fresh = await storageService.getProgress(currentUser?.id);
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

  // Not logged in -> Show Login View
  if (!currentUser) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Show header on non-session views */}
      {currentView !== 'session' && (
        <Header
          profile={profile}
          currentUser={currentUser}
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          onLogout={handleLogout}
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
            onUpdateProfile={(updated) => {
              setProfile(updated);
              if (currentUser) {
                storageService.saveProgress(updated, currentUser.id);
              }
            }}
            onBack={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'admin_users' && currentUser.role === 'admin' && (
          <AdminUsersView
            currentUser={currentUser}
            onBack={() => setCurrentView('dashboard')}
          />
        )}
      </main>
    </div>
  );
};

export default App;

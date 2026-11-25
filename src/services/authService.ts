import { UserAccount, AuthSession } from '../types/auth';

const USERS_STORAGE_KEY = 'wiskids_users_v1';
const SESSION_STORAGE_KEY = 'wiskids_session_v1';

export const DEFAULT_USERS: UserAccount[] = [
  {
    id: 'user_admin_godtooro',
    username: 'godtooro',
    password: '@b7pHUml',
    role: 'admin',
    name: 'Luis (Admin)',
    avatar: '👑',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user_student_wis',
    username: 'wis',
    password: '09052020',
    role: 'student',
    name: 'Wis',
    avatar: '🦁',
    createdAt: new Date().toISOString()
  }
];

class AuthService {
  getUsers(): UserAccount[] {
    try {
      const data = localStorage.getItem(USERS_STORAGE_KEY);
      if (!data) {
        this.saveUsers(DEFAULT_USERS);
        return DEFAULT_USERS;
      }
      return JSON.parse(data) as UserAccount[];
    } catch {
      return DEFAULT_USERS;
    }
  }

  saveUsers(users: UserAccount[]): void {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users:', e);
    }
  }

  getCurrentSession(): AuthSession | null {
    try {
      const data = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data) as AuthSession;
    } catch {
      return null;
    }
  }

  login(usernameInput: string, passwordInput: string): UserAccount | null {
    const username = usernameInput.trim().toLowerCase();
    const password = passwordInput.trim();
    const users = this.getUsers();

    const user = users.find(
      (u) => u.username.toLowerCase() === username && u.password === password
    );

    if (!user) {
      return null;
    }

    user.lastLogin = new Date().toISOString();
    this.saveUsers(users);

    const session: AuthSession = {
      user,
      loginAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.error('Error saving session:', e);
    }

    return user;
  }

  logout(): void {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.error('Error removing session:', e);
    }
  }

  createUser(
    accountData: Omit<UserAccount, 'id' | 'createdAt' | 'lastLogin'>
  ): { success: boolean; user?: UserAccount; error?: string } {
    const users = this.getUsers();
    const username = accountData.username.trim().toLowerCase();

    if (!username || !accountData.password.trim()) {
      return { success: false, error: 'Usuario y contraseña son requeridos' };
    }

    if (users.some((u) => u.username.toLowerCase() === username)) {
      return { success: false, error: 'El nombre de usuario ya existe' };
    }

    const newUser: UserAccount = {
      ...accountData,
      id: `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      username,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    return { success: true, user: newUser };
  }

  updateUser(
    id: string,
    updates: Partial<Omit<UserAccount, 'id' | 'createdAt'>>
  ): { success: boolean; user?: UserAccount; error?: string } {
    const users = this.getUsers();
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return { success: false, error: 'Usuario no encontrado' };
    }

    if (updates.username) {
      const newUsername = updates.username.trim().toLowerCase();
      const duplicate = users.find(
        (u) => u.id !== id && u.username.toLowerCase() === newUsername
      );
      if (duplicate) {
        return { success: false, error: 'Ese nombre de usuario ya está en uso' };
      }
      updates.username = newUsername;
    }

    const updatedUser: UserAccount = {
      ...users[userIndex],
      ...updates
    };

    users[userIndex] = updatedUser;
    this.saveUsers(users);

    // If current session belongs to this user, update session as well
    const session = this.getCurrentSession();
    if (session && session.user.id === id) {
      session.user = updatedUser;
      try {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      } catch (e) {
        console.error('Error updating session user:', e);
      }
    }

    return { success: true, user: updatedUser };
  }

  deleteUser(id: string): { success: boolean; error?: string } {
    const users = this.getUsers();
    const target = users.find((u) => u.id === id);

    if (!target) {
      return { success: false, error: 'Usuario no encontrado' };
    }

    // Protect primary admin from deletion
    if (target.username.toLowerCase() === 'godtooro') {
      return { success: false, error: 'No se puede eliminar la cuenta principal de administrador (godtooro)' };
    }

    const filtered = users.filter((u) => u.id !== id);
    this.saveUsers(filtered);

    // Also remove their profile data if desired
    try {
      localStorage.removeItem(`wiskids_profile_${id}`);
    } catch {}

    return { success: true };
  }
}

export const authService = new AuthService();

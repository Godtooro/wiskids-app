export type UserRole = 'admin' | 'student';

export interface UserAccount {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  name: string;
  avatar: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthSession {
  user: UserAccount;
  loginAt: string;
}

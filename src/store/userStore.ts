import { create } from 'zustand';
import { User, AuthState } from '../types/user';
import { authStorage } from '../services/storage/authStorage';

interface UserState {
  user: User;
  auth: AuthState;

  login: (email: string, password?: string) => boolean;
  register: (name: string, username: string, email: string, password?: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<Omit<User, 'id' | 'createdAt'>>) => void;
  refreshUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: authStorage.getUser(),
  auth: authStorage.getAuth(),

  login: (email: string, _password?: string) => {
    const user = authStorage.getUser();
    // In demo mode, check email or allow demo login
    const auth: AuthState = {
      isAuthenticated: true,
      userId: user.id,
    };
    authStorage.setAuth(auth);
    set({ auth });
    return true;
  },

  register: (name: string, username: string, email: string, password?: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      username: username.replace('@', ''),
      email,
      password: password || 'secret123',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      bio: 'Pencinta musik & petualang melodi.',
      createdAt: new Date().toISOString(),
    };

    authStorage.setUser(newUser);
    const auth: AuthState = {
      isAuthenticated: true,
      userId: newUser.id,
    };
    authStorage.setAuth(auth);

    set({ user: newUser, auth });
    return true;
  },

  logout: () => {
    authStorage.clearAuth();
    set({
      auth: { isAuthenticated: false, userId: null },
    });
  },

  updateProfile: (updates) => {
    const current = get().user;
    const updated: User = { ...current, ...updates };
    authStorage.setUser(updated);
    set({ user: updated });
  },

  refreshUser: () => {
    set({
      user: authStorage.getUser(),
      auth: authStorage.getAuth(),
    });
  },
}));

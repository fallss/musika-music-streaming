import { User, AuthState } from '../../types/user';
import { getStorage, setStorage, STORAGE_KEYS } from '../storageService';
import { INITIAL_USER, INITIAL_AUTH } from '../../data/mockData';

export const authStorage = {
  getUser(): User {
    return getStorage<User>(STORAGE_KEYS.USER, INITIAL_USER);
  },

  setUser(user: User): void {
    setStorage(STORAGE_KEYS.USER, user);
  },

  getAuth(): AuthState {
    return getStorage<AuthState>(STORAGE_KEYS.AUTH, INITIAL_AUTH);
  },

  setAuth(auth: AuthState): void {
    setStorage(STORAGE_KEYS.AUTH, auth);
  },

  clearAuth(): void {
    setStorage(STORAGE_KEYS.AUTH, { isAuthenticated: false, userId: null });
  }
};

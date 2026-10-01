export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  avatar: string;
  bio: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
}

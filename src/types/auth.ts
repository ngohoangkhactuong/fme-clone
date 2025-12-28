export interface User {
  id: string;
  name: string;
  email: string;
  studentId?: string;
  avatar?: string;
  role: "student" | "admin";
  password: string;
}

export interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

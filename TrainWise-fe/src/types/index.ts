export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  duration: number; // v minutách
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  restTime: number; // v sekundách
  videoUrl?: string;
  imageUrl?: string;
}

export interface Progress {
  id: string;
  userId: string;
  exerciseId: string;
  weight: number;
  reps: number;
  sets: number;
  date: string;
  notes?: string;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
} 
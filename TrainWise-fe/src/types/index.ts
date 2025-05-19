export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
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
  rest: string; // pro zobrazení v UI
  notes?: string;
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

export interface UserProfile {
  id: string;
  userId: string;
  weight: number; // kg
  height: number; // cm
  goal: string; // např. "zhubnout", "nabrat svaly", "zlepšit kondici"
  level: 'beginner' | 'intermediate' | 'advanced';
  healthLimitations: string; // volný text
  workoutLocation: 'gym' | 'home' | 'outdoor';
  workoutType: 'strength' | 'cardio' | 'mixed';
  description: string; // volný popis pro AI asistenta
  createdAt: string;
  updatedAt: string;
}

export interface TrainingPlanDto {
  name: string;
  description: string;
  duration: string;
  items: TrainingDay[];
}

export interface TrainingDay {
  day: string;
  exercises: Exercise[];
} 
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE}/Auth/login`,
  REGISTER: `${API_BASE}/Auth/register`,
  TRAINING_PLANS: `${API_BASE}/training-plans`,
  PROGRESS: `${API_BASE}/progress`,
  // ...další endpointy
}; 
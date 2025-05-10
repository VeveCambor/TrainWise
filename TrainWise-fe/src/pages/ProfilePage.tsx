import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { setProfile } from '../store/slices/profileSlice';
import type { UserProfile } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const initialProfile: Omit<UserProfile, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
  weight: 70,
  height: 170,
  goal: '',
  level: 'beginner',
  healthLimitations: '',
  workoutLocation: 'gym',
  workoutType: 'strength',
  description: '',
};

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [form, setForm] = useState({ ...initialProfile, ...profile });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const now = new Date().toISOString();
    dispatch(setProfile({
      ...form,
      id: profile?.id || crypto.randomUUID(),
      userId: user.id,
      createdAt: profile?.createdAt || now,
      updatedAt: now,
    }));
    alert('Profil uložen!');
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-trainwise-coral mb-6 text-center">Můj profil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Váha (kg)</label>
            <Input type="number" name="weight" value={form.weight} onChange={handleChange} min={30} max={300} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Výška (cm)</label>
            <Input type="number" name="height" value={form.height} onChange={handleChange} min={100} max={250} required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Cíl</label>
            <Input type="text" name="goal" value={form.goal} onChange={handleChange} required placeholder="např. zhubnout, nabrat svaly..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Úroveň</label>
            <Select name="level" value={form.level} onChange={handleChange}>
              <option value="beginner">Začátečník</option>
              <option value="intermediate">Středně pokročilý</option>
              <option value="advanced">Pokročilý</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kde budu cvičit</label>
            <Select name="workoutLocation" value={form.workoutLocation} onChange={handleChange}>
              <option value="gym">Fitko</option>
              <option value="home">Doma</option>
              <option value="outdoor">Venku</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Druh cvičení</label>
            <Select name="workoutType" value={form.workoutType} onChange={handleChange}>
              <option value="strength">Silový trénink</option>
              <option value="cardio">Kardio</option>
              <option value="mixed">Kombinace</option>
            </Select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Zdravotní omezení</label>
            <Input type="text" name="healthLimitations" value={form.healthLimitations} onChange={handleChange} placeholder="např. koleno, záda..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Krátký popis pro asistenta</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="např. cvičím doma, mám málo času, chci silový trénink..." className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-trainwise-coral focus:outline-none focus:ring-1 focus:ring-trainwise-coral" />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button type="submit">Uložit profil</Button>
        </div>
      </form>
    </div>
  );
} 
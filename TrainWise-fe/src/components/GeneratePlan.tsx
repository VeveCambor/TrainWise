import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import axios from 'axios';
import { API_ENDPOINTS } from '../api/config';
import type { TrainingPlanDto } from '../types';

export default function GeneratePlan() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<TrainingPlanDto | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedPlan(null);

    try {
      const response = await axios.post(
        API_ENDPOINTS.AI_GENERATE_PLAN,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setGeneratedPlan(response.data);
    } catch (error) {
      console.error('Chyba při generování plánu:', error);
      setError('Nepodařilo se vygenerovat tréninkový plán. Zkuste to prosím později.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <button
        className="w-full py-3 bg-trainwise-coral text-white rounded-lg hover:bg-trainwise-coral-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleGeneratePlan}
        disabled={isLoading}
      >
        {isLoading ? 'Generuji plán...' : 'Vygenerovat nový plán'}
      </button>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {generatedPlan && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{generatedPlan.name}</h3>
          <p className="text-gray-600 mb-6">{generatedPlan.description}</p>
          
          <div className="space-y-6">
            {generatedPlan.items.map((item, index) => (
              <div key={index} className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-medium text-gray-900 mb-3">{item.day}</h4>
                <div className="space-y-4">
                  {item.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900">{exercise.name}</h5>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Série:</span> {exercise.sets}
                        </div>
                        <div>
                          <span className="font-medium">Opakování:</span> {exercise.reps}
                        </div>
                        <div>
                          <span className="font-medium">Odpočinek:</span> {exercise.rest}
                        </div>
                      </div>
                      {exercise.notes && (
                        <p className="mt-2 text-sm text-gray-500">{exercise.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
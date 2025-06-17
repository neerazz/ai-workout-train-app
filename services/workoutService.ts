import { WorkoutPreferences } from '@/components/ai/PreferenceForm';
import { WorkoutPlanSchema, WorkoutPlan } from './workoutTypes';

export type WorkoutPreferencesWithProvider = WorkoutPreferences & { provider?: string };

export const generateWorkoutPlanAPI = async (
  prefs: WorkoutPreferencesWithProvider
): Promise<WorkoutPlan> => {
  const response = await fetch('/api/generate-workout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prefs),
  });

  if (!response.ok) {
    throw new Error('Could not generate a workout plan. Please try again.');
  }

  const data = await response.json();
  const result = WorkoutPlanSchema.safeParse(data);

  if (!result.success) {
    throw new Error('The generated workout plan was invalid.');
  }

  return result.data;
};

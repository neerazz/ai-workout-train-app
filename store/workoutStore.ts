import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WorkoutPlan } from '@/services/workoutTypes';

interface WorkoutState {
  generatedPlan: WorkoutPlan | null;
  setGeneratedPlan: (plan: WorkoutPlan | null) => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set) => ({
      generatedPlan: null,
      setGeneratedPlan: (plan) => set({ generatedPlan: plan }),
    }),
    {
      name: 'workout-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

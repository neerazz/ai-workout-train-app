import { z } from 'zod';

export const ExerciseSchema = z.object({
  name: z.string(),
  sets: z.number().optional(),
  reps: z.number().optional(),
  duration: z.string().optional(),
  rest: z.string().optional(),
  notes: z.string().optional(),
});

export const WorkoutPlanSchema = z.object({
  warmUp: z.array(ExerciseSchema),
  mainWorkout: z.array(ExerciseSchema),
  coolDown: z.array(ExerciseSchema),
});

export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>;

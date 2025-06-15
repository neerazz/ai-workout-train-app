export type WorkoutPreferences = {
  fitnessLevel: string;
  goals: string[];
  workoutLocation?: string;
  daysPerWeek?: string;
  duration?: number;
};

export const buildWorkoutPrompt = (prefs: WorkoutPreferences): string => {
  return `You are a certified personal trainer. Based on the following user profile, create a short workout plan in JSON format only. Do not include any explanations or markdown.
User Profile:\nFitness Level: ${prefs.fitnessLevel}\nGoals: ${prefs.goals.join(', ')}\nLocation: ${prefs.workoutLocation}\nDays Per Week: ${prefs.daysPerWeek}\nDuration: ${prefs.duration} minutes
The JSON schema:\n{ "warmUp": [], "mainWorkout": [], "coolDown": [] }`;
};

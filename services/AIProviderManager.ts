export class AIProviderManager {
  static async generateWorkoutPlan(userContext: any, preferences: any) {
    // Dummy implementation for demo purposes
    return {
      context: userContext,
      preferences,
      workout: [
        { name: 'Push Ups', sets: 3, reps: 12 },
        { name: 'Squats', sets: 3, reps: 15 },
      ],
    };
  }
}

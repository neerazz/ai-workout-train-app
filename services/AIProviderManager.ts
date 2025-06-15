import 'dotenv/config';
import { WorkoutPreferences } from './promptBuilder';
import { OpenAIProvider } from './providers/OpenAIProvider';
import { GeminiProvider } from './providers/GeminiProvider';
import { PerplexityProvider } from './providers/PerplexityProvider';

export interface AIProvider {
  generateWorkoutPlan(prefs: WorkoutPreferences): Promise<string>;
}

// Fallback mock provider if no API keys are configured
class MockAIProvider implements AIProvider {
  async generateWorkoutPlan(): Promise<string> {
    const mockPlan = {
      warmUp: [
        { name: 'Jumping Jacks', duration: '2 minutes' },
        { name: 'Arm Circles', reps: '15 each way' },
      ],
      mainWorkout: [
        { name: 'Push-ups', sets: 3, reps: 10, notes: 'Keep your core tight.' },
        { name: 'Squats', sets: 3, reps: 12, notes: 'Go as low as you can comfortably.' },
        { name: 'Plank', sets: 3, duration: '45 seconds', notes: 'Maintain a straight line from head to heels.' },
      ],
      coolDown: [
        { name: 'Quad Stretch', duration: '30 seconds each leg' },
        { name: 'Hamstring Stretch', duration: '30 seconds each leg' },
      ],
    };
    return JSON.stringify(mockPlan);
  }
}

export class AIProviderManager {
  private providers: Record<string, AIProvider>;

  constructor() {
    this.providers = {
      openai: new OpenAIProvider(),
      gemini: new GeminiProvider(),
      perplexity: new PerplexityProvider(),
    };
  }

  async generateWorkoutPlan(
    userContext: any,
    preferences: WorkoutPreferences,
    provider: 'openai' | 'gemini' | 'perplexity' = 'openai'
  ) {
    const providerInstance = this.providers[provider] ?? new MockAIProvider();
    const merged = { ...preferences };
    const promptPrefs = {
      fitnessLevel: merged.fitnessLevel,
      goals: Array.isArray(merged.goals) ? merged.goals : [merged.goals],
      workoutLocation: merged.workoutLocation,
      daysPerWeek: merged.daysPerWeek,
      duration: merged.duration,
    } as WorkoutPreferences;

    const response = await providerInstance.generateWorkoutPlan(promptPrefs);

    try {
      return JSON.parse(response);
    } catch {
      console.error('Failed to parse AI response');
      return null;
    }
  }
}

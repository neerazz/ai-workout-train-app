export interface AIProvider {
  generateResponse(prompt: string): Promise<string>;
}

// MOCK IMPLEMENTATION of providers until real APIs are integrated
class MockAIProvider implements AIProvider {
  async generateResponse(prompt: string): Promise<string> {
    console.log('Generating MOCK AI Response for prompt:', prompt);
    await new Promise(resolve => setTimeout(resolve, 1500));

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

class OpenAIProvider extends MockAIProvider {}
class GeminiProvider extends MockAIProvider {}
class PerplexityProvider extends MockAIProvider {}

export class AIProviderManager {
  private providers: Record<string, AIProvider>;

  constructor() {
    this.providers = {
      openai: new OpenAIProvider(),
      gemini: new GeminiProvider(),
      perplexity: new PerplexityProvider(),
    };
  }

  private buildPrompt(userContext: any, preferences: any) {
    return `Generate a workout plan for ${JSON.stringify({ userContext, preferences })}`;
  }

  async generateWorkoutPlan(
    userContext: any,
    preferences: any,
    provider: 'openai' | 'gemini' | 'perplexity' = 'openai'
  ) {
    const prompt = this.buildPrompt(userContext, preferences);
    const response = await this.providers[provider].generateResponse(prompt);
    if (response) {
      try {
        return JSON.parse(response);
      } catch (e) {
        console.error('Failed to parse AI response', e);
      }
    }
    return null;
  }
}

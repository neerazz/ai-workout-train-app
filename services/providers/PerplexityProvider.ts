import { perplexity } from '@ai-sdk/perplexity';
import { generateText } from 'ai';
import { buildWorkoutPrompt, WorkoutPreferences } from '../promptBuilder';
import { cleanJsonString } from '../jsonUtils';
import { AIProvider } from '../AIProviderManager';

export class PerplexityProvider implements AIProvider {
  async generateWorkoutPlan(prefs: WorkoutPreferences): Promise<string> {
    const prompt = buildWorkoutPrompt(prefs);
    const { text } = await generateText({ model: perplexity('sonar-pro'), prompt });
    return cleanJsonString(text);
  }
}

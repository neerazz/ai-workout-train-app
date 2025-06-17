import { GoogleGenAI } from '@google/genai';
import { buildWorkoutPrompt, WorkoutPreferences } from '../promptBuilder';
import { cleanJsonString } from '../jsonUtils';
import { AIProvider } from '../AIProviderManager';

export class GeminiProvider implements AIProvider {
  private readonly genAI;

  constructor() {
    this.genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? '' });
  }

  async generateWorkoutPlan(prefs: WorkoutPreferences): Promise<string> {
    const prompt = buildWorkoutPrompt(prefs);
    const result = await this.genAI.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });
    return cleanJsonString(result.text ?? '');
  }
}

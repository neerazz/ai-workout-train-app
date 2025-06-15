import { GoogleGenerativeAI } from '@google/genai';
import { buildWorkoutPrompt, WorkoutPreferences } from '../promptBuilder';
import { cleanJsonString } from '../jsonUtils';
import { AIProvider } from '../AIProviderManager';

export class GeminiProvider implements AIProvider {
  private model;

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async generateWorkoutPlan(prefs: WorkoutPreferences): Promise<string> {
    const prompt = buildWorkoutPrompt(prefs);
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return cleanJsonString(response.text());
  }
}

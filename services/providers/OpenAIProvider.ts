import OpenAI from 'openai';
import { buildWorkoutPrompt, WorkoutPreferences } from '../promptBuilder';
import { AIProvider } from '../AIProviderManager';

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? '' });
  }

  async generateWorkoutPlan(prefs: WorkoutPreferences): Promise<string> {
    const prompt = buildWorkoutPrompt(prefs);
    const res = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'system', content: prompt }],
      response_format: { type: 'json_object' },
    });
    return res.choices[0].message?.content ?? '{}';
  }
}

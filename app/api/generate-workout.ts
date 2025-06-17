import { AIProviderManager } from '@/services/AIProviderManager';

export async function POST(req: Request) {
  const body = await req.json();
  const { provider = 'openai', ...preferences } = body;
  const aiManager = new AIProviderManager();
  const plan = await aiManager.generateWorkoutPlan({}, preferences, provider);
  return new Response(JSON.stringify(plan), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

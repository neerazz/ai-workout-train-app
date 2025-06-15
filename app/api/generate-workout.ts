import { AIProviderManager } from '@/services/AIProviderManager';

export async function POST(req: Request) {
  const body = await req.json();
  const aiManager = new AIProviderManager();
  const plan = await aiManager.generateWorkoutPlan({}, body, 'openai');
  return new Response(JSON.stringify(plan), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

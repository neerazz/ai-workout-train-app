import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';

export type ExerciseUpdateCallback = (data: any) => void;

export class ExerciseRealtimeManager {
  private eventSource: AbortController | null = null;
  private subscriptions = new Map<string, ExerciseUpdateCallback>();

  subscribe(workoutId: string, callback: ExerciseUpdateCallback) {
    this.subscriptions.set(workoutId, callback);
    if (!this.eventSource) {
      this.startEventSource(workoutId);
    }
  }

  private async startEventSource(workoutId: string) {
    this.eventSource = new AbortController();
    await fetchEventSource(`${process.env.API_BASE_URL}/workouts/${workoutId}/stream`, {
      signal: this.eventSource.signal,
      onmessage: (msg: EventSourceMessage) => {
        const data = JSON.parse(msg.data);
        const cb = this.subscriptions.get(workoutId);
        if (cb) cb(data);
      },
      onclose: () => {
        this.eventSource = null;
      },
    });
  }

  async updateExercise(workoutId: string, exerciseId: string, updates: any) {
    // Optimistic update could happen here via state management
    await fetch(`${process.env.API_BASE_URL}/workouts/${workoutId}/exercises/${exerciseId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
  }
}

import RNCalendarEvents from 'react-native-calendar-events';

export type WorkoutEvent = {
  name: string;
  scheduledAt: Date;
  duration: number; // minutes
  location?: string;
  description?: string;
  targetCalories?: number;
};

export const WorkoutScheduler = {
  async schedule(workout: WorkoutEvent) {
    const perm = await RNCalendarEvents.checkPermissions();
    if (perm !== 'authorized') {
      await RNCalendarEvents.requestPermissions();
    }

    return RNCalendarEvents.saveEvent(workout.name, {
      startDate: workout.scheduledAt.toISOString(),
      endDate: new Date(workout.scheduledAt.getTime() + workout.duration * 60000).toISOString(),
      location: workout.location ?? 'Gym',
      notes: `${workout.description ?? ''}\nCalories target: ${workout.targetCalories ?? ''}`,
      alarms: [{ date: -15 }],
    });
  },
};

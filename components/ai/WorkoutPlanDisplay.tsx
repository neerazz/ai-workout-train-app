import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ExerciseCard, Exercise } from './ExerciseCard';

export type WorkoutPlan = {
  warmUp: Exercise[];
  mainWorkout: Exercise[];
  coolDown: Exercise[];
};

export type WorkoutPlanDisplayProps = {
  plan: WorkoutPlan;
};

export default function WorkoutPlanDisplay({ plan }: WorkoutPlanDisplayProps) {
  return (
    <ScrollView style={styles.container}>
      <ThemedText type="subtitle" style={styles.section}>Warm Up</ThemedText>
      {plan.warmUp.map((ex, i) => (
        <ExerciseCard key={`warm-${i}`} exercise={ex} index={i} />
      ))}
      <ThemedText type="subtitle" style={styles.section}>Main Workout</ThemedText>
      {plan.mainWorkout.map((ex, i) => (
        <ExerciseCard key={`main-${i}`} exercise={ex} index={i} />
      ))}
      <ThemedText type="subtitle" style={styles.section}>Cool Down</ThemedText>
      {plan.coolDown.map((ex, i) => (
        <ExerciseCard key={`cool-${i}`} exercise={ex} index={i} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 20,
    marginBottom: 8,
  },
});

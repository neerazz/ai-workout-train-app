import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export type WorkoutPlanDisplayProps = {
  plan: any;
};

export default function WorkoutPlanDisplay({ plan }: WorkoutPlanDisplayProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>Your Plan</ThemedText>
      <ThemedText>{JSON.stringify(plan, null, 2)}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});

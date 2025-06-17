import { Alert, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { PreferenceForm, WorkoutPreferences } from '@/components/ai/PreferenceForm';
import WorkoutPlanDisplay from '@/components/ai/WorkoutPlanDisplay';
import { generateWorkoutPlanAPI, WorkoutPreferencesWithProvider } from '@/services/workoutService';
import { useWorkoutStore } from '@/store/workoutStore';

export default function AICoachScreen() {
  const { mutate: generatePlan, data: workoutPlan, isPending, isError, error } =
    useMutation({
      mutationFn: generateWorkoutPlanAPI,
    });
  const { setGeneratedPlan, generatedPlan } = useWorkoutStore();

  const handleGenerate = (preferences: WorkoutPreferences) => {
    const prefs: WorkoutPreferencesWithProvider = { ...preferences };
    generatePlan(prefs, {
      onSuccess: (data) => {
        setGeneratedPlan(data);
      },
    });
  };

  if (isError) {
    Alert.alert('Error', error instanceof Error ? error.message : 'Unknown error');
  }

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">AI Powered Coach</ThemedText>
      </ThemedView>
      <PreferenceForm onSubmit={handleGenerate} isLoading={isPending} />
      {isPending && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      {(workoutPlan || generatedPlan) && (
        <WorkoutPlanDisplay plan={workoutPlan ?? generatedPlan!} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
});

import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { PreferenceForm, WorkoutPreferences } from '@/components/ai/PreferenceForm';
import WorkoutPlanDisplay from '@/components/ai/WorkoutPlanDisplay';
import { AIProviderManager } from '@/services/AIProviderManager';

export default function AICoachScreen() {
  const [loading, setLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<any>(null);

  const handleGenerate = async (preferences: WorkoutPreferences) => {
    setLoading(true);
    setWorkoutPlan(null);
    try {
      const aiManager = new AIProviderManager();
      const userContext = {
        userId: '123',
        fitnessLevel: preferences.fitnessLevel,
        goals: [preferences.goals],
        limitations: 'None',
      };
      const plan = await aiManager.generateWorkoutPlan(userContext, {
        duration: parseInt(preferences.duration, 10),
        equipment: ['dumbbells', 'bench'],
      });
      setWorkoutPlan(plan);
    } catch (error) {
      console.error('Failed to generate workout plan:', error);
      Alert.alert('Error', 'Could not generate a workout plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">AI Powered Coach</ThemedText>
      </ThemedView>
      <PreferenceForm onSubmit={handleGenerate} isLoading={loading} />
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      {workoutPlan && <WorkoutPlanDisplay plan={workoutPlan} />}
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

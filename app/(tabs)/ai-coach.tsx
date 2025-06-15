import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import PreferenceForm from '@/components/ai/PreferenceForm';
import WorkoutPlanDisplay from '@/components/ai/WorkoutPlanDisplay';
import { AIProviderManager } from '@/services/AIProviderManager';

export default function AICoachScreen() {
  const [plan, setPlan] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (prefs: any) => {
    setLoading(true);
    const generated = await AIProviderManager.generateWorkoutPlan(
      { userId: 'demo', fitnessLevel: 'intermediate', goals: ['Strength'] },
      prefs
    );
    setPlan(generated);
    setLoading(false);
  };

  return (
    <ThemedView style={styles.container}>
      <PreferenceForm onSubmit={handleGenerate} loading={loading} />
      {plan && <WorkoutPlanDisplay plan={plan} />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

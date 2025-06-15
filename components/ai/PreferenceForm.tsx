import { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export type PreferenceFormProps = {
  onSubmit: (prefs: any) => void;
  loading?: boolean;
};

export default function PreferenceForm({ onSubmit, loading }: PreferenceFormProps) {
  const [duration] = useState(30);

  const handlePress = () => {
    onSubmit({ duration, equipment: ['Bodyweight'], intensity: 'medium' });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>AI Workout Generator</ThemedText>
      {/* Simplified form for demo purposes */}
      <Button title={loading ? 'Generating...' : 'Generate Workout'} onPress={handlePress} disabled={loading} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});

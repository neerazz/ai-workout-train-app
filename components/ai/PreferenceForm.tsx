import React, { useState } from 'react';
import { TextInput, Button, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export type WorkoutPreferences = {
  duration: string;
  fitnessLevel: string;
  goals: string;
};

export type PreferenceFormProps = {
  onSubmit: (preferences: WorkoutPreferences) => void;
  isLoading: boolean;
};

export function PreferenceForm({ onSubmit, isLoading }: PreferenceFormProps) {
  const [preferences, setPreferences] = useState<WorkoutPreferences>({
    duration: '30',
    fitnessLevel: 'Intermediate',
    goals: 'Build Muscle',
  });

  const handleInputChange = (field: keyof WorkoutPreferences, value: string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Customize Your Workout</ThemedText>

      <ThemedText style={styles.label}>Fitness Level</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="e.g., Beginner, Intermediate"
        value={preferences.fitnessLevel}
        onChangeText={(val) => handleInputChange('fitnessLevel', val)}
      />

      <ThemedText style={styles.label}>Primary Goal</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="e.g., Lose Weight, Build Muscle"
        value={preferences.goals}
        onChangeText={(val) => handleInputChange('goals', val)}
      />

      <ThemedText style={styles.label}>Available Time (minutes)</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="e.g., 30, 45, 60"
        value={preferences.duration}
        onChangeText={(val) => handleInputChange('duration', val)}
        keyboardType="numeric"
      />

      <Button
        title={isLoading ? 'Generating...' : 'Generate Workout'}
        onPress={() => onSubmit(preferences)}
        disabled={isLoading}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
  },
});

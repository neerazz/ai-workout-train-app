import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useThemeColor } from '@/hooks/useThemeColor';

export type Exercise = {
  name: string;
  sets?: number;
  reps?: number;
  duration?: string;
  rest?: string;
  description?: string;
};

export const ExerciseCard = ({ exercise, index }: { exercise: Exercise; index: number }) => {
  const cardBackgroundColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  return (
    <Animated.View entering={FadeInUp.delay(index * 100).duration(400)}>
      <ThemedView style={[styles.exerciseCard, { backgroundColor: cardBackgroundColor, borderColor }]}>
        <ThemedText type="defaultSemiBold">{exercise.name}</ThemedText>
        <ThemedText style={styles.details}>
          {exercise.sets && `${exercise.sets} sets`}
          {exercise.reps && ` of ${exercise.reps} reps`}
          {exercise.duration && ` ${exercise.duration}`}
          {exercise.rest && `, ${exercise.rest} rest`}
        </ThemedText>
        {exercise.description && <ThemedText style={styles.description}>{exercise.description}</ThemedText>}
      </ThemedView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  exerciseCard: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  details: {
    marginTop: 6,
    fontStyle: 'italic',
  },
  description: {
    marginTop: 12,
    lineHeight: 22,
  },
});

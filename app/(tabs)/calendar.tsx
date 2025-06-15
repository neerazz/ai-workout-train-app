import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import FitnessCalendar from '@/components/calendar/FitnessCalendar';

export default function CalendarScreen() {
  const [markedDates, setMarkedDates] = useState<{[date: string]: any}>({});

  const handleDayPress = (day: any) => {
    const dateStr = day.dateString;
    setMarkedDates((prev) => ({
      ...prev,
      [dateStr]: {
        selected: true,
        marked: true,
        selectedColor: '#007AFF',
      },
    }));
  };

  return (
    <ThemedView style={styles.container}>
      <FitnessCalendar markedDates={markedDates} onDayPress={handleDayPress} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { Calendar } from 'react-native-calendars';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';

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
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#007AFF',
          todayTextColor: '#007AFF',
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
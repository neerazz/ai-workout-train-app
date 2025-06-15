import { Calendar } from 'react-native-calendars';
import { StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';

export default function CalendarScreen() {
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});

  const handleDayPress = (day: any) => {
    Alert.alert(
      'Schedule Workout',
      `Do you want to schedule a new workout on ${day.dateString}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Schedule',
          onPress: () => {
            setMarkedDates((prev) => ({
              ...prev,
              [day.dateString]: {
                periods: [
                  { startingDay: true, endingDay: true, color: '#007AFF' },
                ],
              },
            }));
            console.log(`Workout "scheduled" for ${day.dateString}`);
          },
        },
      ]
    );
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
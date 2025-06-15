import { Calendar, DateObject } from 'react-native-calendars';
import { StyleSheet } from 'react-native';

export type FitnessCalendarProps = {
  markedDates: { [date: string]: any };
  onDayPress: (day: DateObject) => void;
};

export default function FitnessCalendar({ markedDates, onDayPress }: FitnessCalendarProps) {
  return (
    <Calendar
      markingType="multi-period"
      markedDates={markedDates}
      onDayPress={onDayPress}
      style={styles.calendar}
      theme={{
        selectedDayBackgroundColor: '#007AFF',
        todayTextColor: '#007AFF',
        dayTextColor: '#2d2d2d',
        textDisabledColor: '#d9e1e8',
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    flex: 1,
  },
});

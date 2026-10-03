import { Text, View } from 'react-native';
import Screen from '../components/Screen';
import EmptyState from '../components/EmptyState';
import { schedule, weekdays } from '../data/timetableData';
import { colors, styles } from '../theme';
export default function TimetableView({ courses, student, onBack, onRegister }) {
  const sessions = schedule.filter(session => courses.some(course => course.id === session.offeringId));
  return <Screen title="Your week, laid out." subtitle={`Fall 2026 · Semester ${student.semester} · All times in 24-hour format`} onBack={onBack}>
    {!courses.length && <EmptyState title="No registered courses yet" message="Your weekly classes will appear when you register." action="Register Courses" onAction={onRegister} />}
    {weekdays.map((day, index) => <View key={day} style={styles.card}>
      <View style={styles.row}><Text style={styles.badge}>0{index + 1}</Text><Text style={styles.heading}>{day}</Text></View>
      {sessions.filter(session => session.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime)).map(session => {
        const course = courses.find(course => course.id === session.offeringId);
        return <View key={session.id} style={{ borderLeftWidth: 3, borderLeftColor: colors.selected, paddingLeft: 14, gap: 5, marginTop: 8 }}><Text style={[styles.label, { color: colors.primary }]}>{session.startTime} – {session.endTime}</Text><Text style={styles.heading}>{course.code} · {course.name}</Text><Text style={styles.muted}>Section {course.section} · {session.room}</Text><Text style={styles.muted}>{course.teacher}</Text></View>;
      })}
      {!sessions.some(session => session.day === day) && <Text style={styles.muted}>No classes</Text>}
    </View>)}
  </Screen>;
}

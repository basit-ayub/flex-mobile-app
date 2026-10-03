import { Text, View } from 'react-native';
import Screen from '../components/Screen';
import { colors, styles } from '../theme';
import { getAttendanceSummary } from '../utils/attendance';

export default function AttendanceDetailView({ course, record, threshold, onBack }) {
  if (!course) return <Screen title="Course unavailable" onBack={onBack} backLabel="Back to Attendance"><Text style={styles.muted}>This course is no longer registered.</Text></Screen>;
  const sessions = [...(record?.sessions || [])].sort((a, b) => a.date.localeCompare(b.date));
  const { percentage, attended, total, remaining, needed, canMeet } = getAttendanceSummary(record, course.plannedLectures, threshold);
  return <Screen title={course.name} subtitle={`${course.code} · Section ${course.section}`} onBack={onBack} backLabel="Back to Attendance">
    <View style={styles.card}>
      <Text style={styles.heading}>Attendance by date</Text>
      {sessions.length ? sessions.map(session => <View key={session.date} style={[styles.between, { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        <Text style={styles.text}>{session.date}</Text>
        <Text style={[styles.badge, session.status === 'absent' && { backgroundColor: colors.error, color: colors.errorText }]}>{session.status === 'present' ? 'Present' : 'Absent'}</Text>
      </View>) : <Text style={styles.muted}>No sessions yet</Text>}
    </View>
    <View style={styles.card}>
      <Text style={styles.heading}>Attendance summary</Text>
      <Text style={styles.text}>Current attendance: {percentage === null ? 'No sessions yet' : `${Math.round(percentage)}% (${attended}/${total})`}</Text>
      <Text style={styles.text}>Lectures left: {remaining}</Text>
      {!canMeet ? <Text style={styles.error}>Debarred — contact teacher. Even attending all remaining lectures cannot bring your attendance to {threshold}%.</Text>
        : remaining === 0 ? <Text style={styles.feedback}>You meet the minimum {threshold}% attendance requirement.</Text>
        : <Text style={styles.feedback}>You need to attend {needed}/{remaining} remaining lectures to {percentage !== null && percentage >= threshold ? 'maintain' : 'reach'} the minimum {threshold}% attendance requirement.</Text>}
    </View>
  </Screen>;
}

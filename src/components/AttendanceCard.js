import { Pressable, View, Text } from 'react-native';
import { colors, styles } from '../theme';
import { getAttendanceSummary } from '../utils/attendance';
export default function AttendanceCard({ course, record, threshold, onPress }) {
  const { attended, total, percentage } = getAttendanceSummary(record, course.plannedLectures, threshold);
  const low = percentage !== null && percentage < threshold;
  return <Pressable accessibilityRole="button" accessibilityLabel={`View attendance for ${course.code}, section ${course.section}`} onPress={() => onPress(course.id)} style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}>
    <View style={styles.row}><Text style={styles.badge}>{course.code}</Text><Text style={styles.muted}>Section {course.section}</Text></View>
    <Text style={styles.heading}>{course.name}</Text>
    <View style={styles.between}><Text style={styles.muted}>{attended} attended / {total} sessions</Text><Text style={styles.heading}>{percentage === null ? '—' : `${Math.round(percentage)}%`}</Text></View>
    <View accessibilityLabel={percentage === null ? 'No sessions yet' : `${Math.round(percentage)} percent attendance`} style={{ height: 8, borderRadius: 4, backgroundColor: colors.pale, overflow: 'hidden' }}><View style={{ width: `${percentage || 0}%`, height: 8, backgroundColor: low ? colors.warningText : colors.primary }} /></View>
    {percentage === null && <Text style={styles.muted}>No sessions yet</Text>}
    {low && <Text style={[styles.feedback, { backgroundColor: colors.warning, color: colors.warningText }]}>Below the {threshold}% minimum</Text>}
    <Text style={[styles.label, { color: colors.primary }]}>View attendance by date →</Text>
  </Pressable>;
}

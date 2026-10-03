import { Text, View, Pressable } from 'react-native';
import DashboardCharts from '../components/DashboardCharts';
import EmptyState from '../components/EmptyState';
import { getDashboardAttendance } from '../utils/dashboard';
import Screen from '../components/Screen';
import PrimaryButton from '../components/PrimaryButton';
import { colors, styles } from '../theme';
const features = [
  { view: 'attendance', title: 'Attendance', detail: 'A little check-in on your progress.', symbol: '✓' },
  { view: 'registration', title: 'Register Courses', detail: 'Build your semester, one course at a time.', symbol: '+' },
  { view: 'timetable', title: 'Weekly Timetable', detail: 'Know where you need to be next.', symbol: '▦' },
  { view: 'lostFound', title: 'Lost & Found', detail: 'Help something find its way home.', symbol: '◇' },
];
export default function DashboardView({ student, courses, attendance, onView, onSignOut }) {
  const summary = getDashboardAttendance(courses, attendance);
  return <Screen title={`Hello, ${student.name.split(' ')[0]}.`} subtitle={`${student.roll.toUpperCase()} · Semester ${student.semester} · Fall 2026`}>
    <View style={[styles.row, { alignItems: 'stretch' }]}>
      <View style={[styles.card, { flex: 1, minWidth: 120, backgroundColor: colors.pale }]}><Text style={styles.muted}>Registered Courses</Text><Text style={styles.title}>{courses.length}</Text></View>
      <View style={[styles.card, { flex: 1, minWidth: 120, backgroundColor: colors.pale }]}><Text style={styles.muted}>Overall Attendance</Text><Text style={summary.overall === null ? styles.label : styles.title}>{summary.invalid.length ? 'Unavailable' : summary.overall === null ? 'No sessions yet' : `${summary.overall}%`}</Text></View>
    </View>
    {!courses.length ? <EmptyState title="Register a course to see your attendance" message="Your attendance charts will appear here." action="Register Courses" onAction={() => onView('registration')} />
      : summary.invalid.length ? <View style={styles.card}><Text accessibilityRole="alert" style={styles.error}>Attendance records need checking for {summary.invalid.join(', ')}. Contact your teacher to correct the records before viewing the charts.</Text></View>
      : !summary.sessionTotal ? <EmptyState title="No attendance sessions recorded yet" message="Charts will appear when attendance is recorded for your courses." />
      : <DashboardCharts summary={summary} />}
    <Text style={styles.heading}>Where would you like to go?</Text>
    {features.map(feature => <Pressable key={feature.view} accessibilityRole="button" accessibilityLabel={feature.title} onPress={() => onView(feature.view)} style={({ pressed }) => [styles.card, { flexDirection: 'row', alignItems: 'center', opacity: pressed ? 0.7 : 1 }]}>
      <View style={{ width: 44, height: 44, borderRadius: 13, backgroundColor: colors.pale, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: colors.primary, fontSize: 26 }}>{feature.symbol}</Text></View>
      <View style={{ flex: 1, gap: 3 }}><Text style={[styles.heading, { fontSize: 17 }]}>{feature.title}</Text><Text style={styles.muted}>{feature.detail}</Text></View><Text style={{ color: colors.primary, fontSize: 22 }}>›</Text>
    </Pressable>)}
    <PrimaryButton title="Sign Out" secondary onPress={onSignOut} />
  </Screen>;
}

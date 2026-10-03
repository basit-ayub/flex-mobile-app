import { Text, View, Pressable } from 'react-native';
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
  // Academic props are available here for the deferred chart milestone.
  return <Screen title={`Hello, ${student.name.split(' ')[0]}.`} subtitle="">
    <View style={[styles.card, { backgroundColor: colors.pale, borderColor: colors.pale }]}><Text style={styles.eyebrow}>YOUR SEMESTER AT A GLANCE</Text><Text style={styles.heading}>Make this semester yours.</Text><Text style={styles.text}>{student.roll.toUpperCase()} · Semester {student.semester}</Text><Text style={styles.muted}>{courses.length} registered courses · Fall 2026</Text></View>
    <Text style={styles.heading}>Where would you like to go?</Text>
    {features.map(feature => <Pressable key={feature.view} accessibilityRole="button" accessibilityLabel={feature.title} onPress={() => onView(feature.view)} style={({ pressed }) => [styles.card, { flexDirection: 'row', alignItems: 'center', opacity: pressed ? 0.7 : 1 }]}>
      <View style={{ width: 44, height: 44, borderRadius: 13, backgroundColor: colors.pale, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: colors.primary, fontSize: 26 }}>{feature.symbol}</Text></View>
      <View style={{ flex: 1, gap: 3 }}><Text style={[styles.heading, { fontSize: 17 }]}>{feature.title}</Text><Text style={styles.muted}>{feature.detail}</Text></View><Text style={{ color: colors.primary, fontSize: 22 }}>›</Text>
    </Pressable>)}
    <PrimaryButton title="Sign Out" secondary onPress={onSignOut} />
  </Screen>;
}

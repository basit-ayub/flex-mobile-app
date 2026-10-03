import { View, Text } from 'react-native';
import { styles } from '../theme';
import PrimaryButton from './PrimaryButton';
export default function CourseCard({ course, registered, onAction }) {
  return <View style={styles.card}><View style={styles.row}><Text style={styles.badge}>{course.code}</Text><Text style={styles.badge}>Section {course.section}</Text><Text style={styles.muted}>{course.credits} credits</Text></View><Text style={styles.heading}>{course.name}</Text><Text style={styles.muted}>{course.teacher}</Text><PrimaryButton title={registered ? `Drop ${course.code} · ${course.section}` : `Register ${course.code} · ${course.section}`} secondary={registered} onPress={() => onAction(course.id)} /></View>;
}

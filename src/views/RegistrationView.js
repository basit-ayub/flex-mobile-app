import { Text } from 'react-native';
import Screen from '../components/Screen';
import CourseCard from '../components/CourseCard';
import EmptyState from '../components/EmptyState';
import { styles } from '../theme';
export default function RegistrationView({ offerings, courses, onRegister, onDrop, onBack, feedback }) {
  const available = offerings.filter(offering => !courses.some(course => course.id === offering.id));
  return <Screen title="Your courses" subtitle="A semester that fits your goals." onBack={onBack}>
    {feedback ? <Text accessibilityLiveRegion="polite" style={styles.feedback}>{feedback}</Text> : null}
    <Text style={styles.heading}>Registered Courses · {courses.length}</Text>
    {courses.length ? courses.map(course => <CourseCard key={course.id} course={course} registered onAction={onDrop} />) : <EmptyState title="No registered courses yet" message="Choose an offering from the available courses below." />}
    <Text style={styles.heading}>Available Courses · {available.length}</Text>
    {available.map(course => <CourseCard key={course.id} course={course} onAction={onRegister} />)}
    {!available.length && <Text style={styles.muted}>No more offerings available.</Text>}
  </Screen>;
}

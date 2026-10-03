import Screen from '../components/Screen';
import EmptyState from '../components/EmptyState';
import AttendanceCard from '../components/AttendanceCard';
export default function AttendanceView({ courses, attendance, threshold, onCoursePress, onBack, onRegister }) {
  return <Screen title="Attendance" subtitle={`${courses.length} registered courses · Select a course to view attendance by date`} onBack={onBack}>
    {courses.length ? courses.map(course => <AttendanceCard key={course.id} course={course} record={attendance[course.id]} threshold={threshold} onPress={onCoursePress} />) : <EmptyState title="No registered courses yet" message="Register a course to start viewing your attendance." action="Register Courses" onAction={onRegister} />}
  </Screen>;
}

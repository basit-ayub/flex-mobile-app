import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/theme';
import { courseOfferings, initialRegistrations, initialAttendance, initialPosts, ATTENDANCE_THRESHOLD } from './src/data/demoData';
import LoginView from './src/views/LoginView';
import DashboardView from './src/views/DashboardView';
import AttendanceView from './src/views/AttendanceView';
import AttendanceDetailView from './src/views/AttendanceDetailView';
import RegistrationView from './src/views/RegistrationView';
import TimetableView from './src/views/TimetableView';
import LostFoundView from './src/views/LostFoundView';
import CreatePostView from './src/views/CreatePostView';

export default function App() {
  const [student, setStudent] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedOfferingId, setSelectedOfferingId] = useState(null);
  // Shared state lives above the views, keyed by roll number for account isolation.
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [posts, setPosts] = useState(initialPosts);
  const [registrationFeedback, setRegistrationFeedback] = useState('');
  const [postFeedback, setPostFeedback] = useState('');
  const [filter, setFilter] = useState('found');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const registeredIds = student ? registrations[student.roll] || [] : [];
  const courses = courseOfferings.filter(course => registeredIds.includes(course.id));
  const studentAttendance = student ? attendance[student.roll] || {} : {};
  function openView(view) { setCurrentView(view); setRegistrationFeedback(''); setPostFeedback(''); }
  function register(id) {
    const offering = courseOfferings.find(course => course.id === id);
    if (!offering) return;
    if (courses.some(course => course.code === offering.code)) {
      setRegistrationFeedback(`You are already registered for ${offering.code}. Drop its current section before choosing another.`); return;
    }
    setRegistrations(previous => {
      const ids = previous[student.roll] || [];
      if (ids.some(existingId => courseOfferings.find(course => course.id === existingId)?.code === offering.code)) return previous;
      return { ...previous, [student.roll]: [...ids, id] };
    });
    // A re-registered course keeps its old attendance; a new one starts at zero.
    setAttendance(previous => ({ ...previous, [student.roll]: { ...previous[student.roll], [id]: previous[student.roll]?.[id] || { sessions: [] } } }));
    setRegistrationFeedback(`${offering.code} · ${offering.section} registered. Attendance and timetable are updated.`);
  }
  function drop(id) {
    setRegistrations(previous => ({ ...previous, [student.roll]: previous[student.roll].filter(existingId => existingId !== id) }));
    setRegistrationFeedback('Course dropped. Attendance and timetable are updated.');
  }
  function openAttendance(id) {
    if (!registeredIds.includes(id)) return;
    setSelectedOfferingId(id);
    openView('attendanceDetail');
  }
  function createPost(values) {
    const post = { ...values, id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`, authorRoll: student.roll };
    setPosts(previous => [...previous, post]);
    setSearch(''); setFilter(post.type); setSort('newest');
    setPostFeedback('Your post was added. Items are ordered by incident date.'); setCurrentView('lostFound');
  }
  function signOut() { setStudent(null); setSelectedOfferingId(null); setCurrentView('dashboard'); setRegistrationFeedback(''); setPostFeedback(''); setSearch(''); setFilter('found'); setSort('newest'); }
  const back = () => openView('dashboard');
  let view;
  if (!student) view = <LoginView onLogin={activeStudent => { setStudent(activeStudent); setCurrentView('dashboard'); }} />;
  else if (currentView === 'attendance') view = <AttendanceView courses={courses} attendance={studentAttendance} threshold={ATTENDANCE_THRESHOLD} onCoursePress={openAttendance} onBack={back} onRegister={() => openView('registration')} />;
  else if (currentView === 'attendanceDetail') view = <AttendanceDetailView course={courses.find(course => course.id === selectedOfferingId)} record={studentAttendance[selectedOfferingId]} threshold={ATTENDANCE_THRESHOLD} onBack={() => openView('attendance')} />;
  else if (currentView === 'registration') view = <RegistrationView offerings={courseOfferings} courses={courses} onRegister={register} onDrop={drop} feedback={registrationFeedback} onBack={back} />;
  else if (currentView === 'timetable') view = <TimetableView courses={courses} student={student} onBack={back} onRegister={() => openView('registration')} />;
  else if (currentView === 'lostFound') view = <LostFoundView posts={posts} filter={filter} onFilter={setFilter} search={search} onSearch={setSearch} sort={sort} onSort={setSort} feedback={postFeedback} onCreate={() => openView('createPost')} onBack={back} />;
  else if (currentView === 'createPost') view = <CreatePostView onBack={() => openView('lostFound')} onSubmit={createPost} />;
  else view = <DashboardView student={student} courses={courses} attendance={studentAttendance} onView={openView} onSignOut={signOut} />;
  return <SafeAreaProvider><SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}><StatusBar style="dark" />{view}</SafeAreaView></SafeAreaProvider>;
}

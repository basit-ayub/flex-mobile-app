export const ATTENDANCE_THRESHOLD = 80; // Minimum attendance required by the portal.
export const accounts = {
  i233018: { password: 'demo123', name: 'Abdul Basit', semester: 7 },
  i230101: { password: 'student123', name: 'Sara Ahmed', semester: 7 },
};
export const courseOfferings = [
  { id: 'smd-b', code: 'SMD', name: 'Software for Mobile Devices', section: 'B', teacher: 'Amina Khan', credits: 3, plannedLectures: 20 },
  { id: 'smd-a', code: 'SMD', name: 'Software for Mobile Devices', section: 'A', teacher: 'Bilal Hassan', credits: 3, plannedLectures: 20 },
  { id: 'ai-a', code: 'AI', name: 'Artificial Intelligence', section: 'A', teacher: 'Hira Malik', credits: 3, plannedLectures: 20 },
  { id: 'db-b', code: 'DB', name: 'Database Systems', section: 'B', teacher: 'Omar Siddiq', credits: 3, plannedLectures: 20 },
  { id: 'cn-a', code: 'CN', name: 'Computer Networks', section: 'A', teacher: 'Zara Ali', credits: 3, plannedLectures: 20 },
  { id: 'tw-a', code: 'TW', name: 'Technical Writing', section: 'A', teacher: 'Hamza Noor', credits: 2, plannedLectures: 10 },
];
export const initialRegistrations = { i233018: ['smd-b', 'ai-a', 'db-b'], i230101: ['cn-a', 'tw-a'] };
// Each stored session is a dated mark; totals are derived from these records.
// Dates match the course weekdays. Absent positions are zero-based.
/** @param {string[]} dates @param {number[]} absentPositions */
function attendanceRecord(dates, absentPositions) {
  return { sessions: dates.map((date, index) => ({ date, status: absentPositions.includes(index) ? 'absent' : 'present' })) };
}
export const initialAttendance = {
  i233018: {
    'smd-b': attendanceRecord(['2026-08-31', '2026-09-02', '2026-09-07', '2026-09-09', '2026-09-14', '2026-09-16', '2026-09-21', '2026-09-23', '2026-09-28', '2026-09-30'], [3, 7]),
    'ai-a': attendanceRecord(['2026-08-31', '2026-09-03', '2026-09-07', '2026-09-10', '2026-09-14', '2026-09-17', '2026-09-21', '2026-09-24', '2026-09-28', '2026-10-01'], [2, 5, 8]),
    'db-b': attendanceRecord(['2026-09-01', '2026-09-03', '2026-09-08', '2026-09-10', '2026-09-15', '2026-09-17', '2026-09-22', '2026-09-24', '2026-09-29', '2026-10-01'], [4]),
  },
  i230101: {
    'cn-a': attendanceRecord(['2026-09-15', '2026-09-18', '2026-09-22', '2026-09-25', '2026-09-29', '2026-10-02'], [2]),
    'tw-a': attendanceRecord(['2026-08-26', '2026-09-02', '2026-09-09', '2026-09-16', '2026-09-23', '2026-09-30'], [1, 4]),
  },
};
export const initialPosts = [
  { id: 'post-1', type: 'found', title: 'A notebook full of ideas', description: 'Blue spiral notebook with database notes. Tell me the name on the first page to collect it.', location: 'Library · second floor', incidentDate: '2026-09-15', priority: 'Normal', contact: 'sara@university.example', imageUri: null, authorRoll: 'i230101' },
  { id: 'post-2', type: 'lost', title: 'Black wallet', description: 'Small black wallet with a student card inside. Please get in touch if you spot it.', location: 'Main cafeteria', incidentDate: '2026-09-16', priority: 'High', contact: 'basit@university.example', imageUri: null, authorRoll: 'i233018' },
  { id: 'post-3', type: 'found', title: 'Silver water bottle', description: 'A stainless steel bottle left on the courtyard bench. Kept at the reception desk.', location: 'Central courtyard', incidentDate: '2026-09-17', priority: 'Low', contact: 'reception@university.example', imageUri: null, authorRoll: 'i230101' },
];

/**
 * Derive both charts from the active student's dated records on every render.
 * @param {{id: string, code: string}[]} courses
 * @param {Record<string, {sessions: {status: string}[]}>} attendance
 */
export function getDashboardAttendance(courses, attendance) {
  const measured = [];
  const unmeasured = [];
  const invalid = [];
  let attendedTotal = 0;
  let sessionTotal = 0;
  for (const course of courses) {
    const record = attendance[course.id];
    if (record === undefined) { unmeasured.push(course.code); continue; }
    if (!record || !Array.isArray(record.sessions) || record.sessions.some(session => !session || !['present', 'absent'].includes(session.status))) {
      invalid.push(course.code); continue;
    }
    const total = record.sessions.length;
    if (!total) { unmeasured.push(course.code); continue; }
    const attended = record.sessions.filter(session => session.status === 'present').length;
    measured.push({ code: course.code, percentage: Math.round(attended / total * 100) });
    attendedTotal += attended;
    sessionTotal += total;
  }
  // Weight by session counts, never by the average of course percentages.
  return { measured, unmeasured, invalid, attendedTotal, sessionTotal, missedTotal: sessionTotal - attendedTotal,
    overall: invalid.length || !sessionTotal ? null : Math.round(attendedTotal / sessionTotal * 100) };
}

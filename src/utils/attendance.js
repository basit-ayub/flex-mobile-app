/**
 * @param {{ sessions: { date?: string, status: string }[] } | undefined} record
 * @param {number} plannedLectures
 * @param {number} threshold
 */
export function getAttendanceSummary(record, plannedLectures, threshold = 80) {
  const sessions = record?.sessions || [];
  const total = sessions.length;
  const attended = sessions.filter(session => session.status === 'present').length;
  const remaining = Math.max(0, plannedLectures - total);
  // Include all remaining lectures in the final denominator, then round up
  // the number of present marks needed to reach the minimum percentage.
  const needed = Math.max(0, Math.ceil((threshold * (total + remaining) - attended * 100) / 100));
  return { total, attended, remaining, needed, percentage: total ? attended / total * 100 : null, canMeet: needed <= remaining };
}

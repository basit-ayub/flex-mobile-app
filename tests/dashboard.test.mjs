import test from 'node:test';
import assert from 'node:assert/strict';
import { getDashboardAttendance } from '../src/utils/dashboard.js';
const courses = [{ id: 'a', code: 'A' }, { id: 'b', code: 'B' }];
const record = (present, total) => ({ sessions: Array.from({ length: total }, (_, i) => ({ status: i < present ? 'present' : 'absent' })) });
test('weighted totals, dropping a course, and changed attendance', () => {
  const attendance = { a: record(8, 10), b: record(18, 30) };
  const summary = getDashboardAttendance(courses, attendance);
  assert.deepEqual(summary.measured.map(course => course.percentage), [80, 60]);
  assert.deepEqual([summary.attendedTotal, summary.missedTotal, summary.overall], [26, 14, 65]);
  const dropped = getDashboardAttendance(courses.slice(0, 1), attendance);
  assert.deepEqual([dropped.attendedTotal, dropped.missedTotal, dropped.overall], [8, 2, 80]);
  const updated = getDashboardAttendance(courses.slice(0, 1), { a: record(8, 11) });
  assert.deepEqual([updated.attendedTotal, updated.missedTotal, updated.overall], [8, 3, 73]);
});
test('empty and mixed records do not become zero-percent bars', () => {
  assert.equal(getDashboardAttendance([], {}).overall, null);
  const empty = getDashboardAttendance(courses, { a: record(0, 0) });
  assert.deepEqual(empty.unmeasured, ['A', 'B']);
  assert.equal(empty.measured.length, 0);
  assert.equal(empty.overall, null);
  const mixed = getDashboardAttendance(courses, { a: record(8, 10) });
  assert.equal(mixed.overall, 80);
  assert.deepEqual(mixed.unmeasured, ['B']);
});
test('all-attended and all-missed retain true zero categories', () => {
  const present = getDashboardAttendance(courses, { a: record(10, 10) });
  assert.equal(present.overall, 100); assert.equal(present.missedTotal, 0);
  const absent = getDashboardAttendance(courses, { a: record(0, 10) });
  assert.equal(absent.overall, 0); assert.equal(absent.attendedTotal, 0);
  assert.equal(absent.measured[0].percentage, 0);
});
test('invalid imported records suppress the overall figure', () => {
  for (const invalid of [null, {}, { attended: -1, total: 2 }, { sessions: null }, { sessions: [null] }, { sessions: [{ status: 'unknown' }] }]) {
    const summary = getDashboardAttendance(courses, { a: invalid, b: record(1, 1) });
    assert.deepEqual(summary.invalid, ['A']);
    assert.equal(summary.overall, null);
  }
});

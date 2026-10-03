import test from 'node:test';
import assert from 'node:assert/strict';
import { getAttendanceSummary } from '../src/utils/attendance.js';
import { initialAttendance, courseOfferings } from '../src/data/demoData.js';
const record = (attended, total) => ({ sessions: Array.from({ length: total }, (_, i) => ({ status: i < attended ? 'present' : 'absent' })) });

test('60% after ten lectures requires all ten remaining lectures to finish at 80%', () => {
  const summary = getAttendanceSummary(record(6, 10), 20);
  assert.equal(summary.percentage, 60);
  assert.equal(summary.remaining, 10);
  assert.equal(summary.needed, 10);
  assert.equal(summary.canMeet, true);
});
test('unreachable target, exact target, and completed course', () => {
  assert.equal(getAttendanceSummary(record(5, 10), 20).canMeet, false);
  assert.equal(getAttendanceSummary(record(8, 10), 10).canMeet, true);
  assert.equal(getAttendanceSummary(record(7, 10), 10).canMeet, false);
  assert.equal(getAttendanceSummary(record(16, 16), 20).needed, 0);
});
test('unrecorded attendance has no percentage and uses all planned lectures', () => {
  assert.deepEqual(getAttendanceSummary(undefined, 20), { total: 0, attended: 0, remaining: 20, needed: 16, percentage: null, canMeet: true });
});
test('required count is the minimum that meets the final percentage', () => {
  for (let total = 0; total <= 30; total++) {
    for (let attended = 0; attended <= total; attended++) {
      for (let left = 0; left <= 30; left++) {
        if (total + left === 0) continue;
        const result = getAttendanceSummary(record(attended, total), total + left);
        assert.equal(result.canMeet, (attended + left) * 100 >= 80 * (total + left));
        if (result.canMeet) {
          assert.ok((attended + result.needed) * 100 >= 80 * (total + left));
          if (result.needed > 0) assert.ok((attended + result.needed - 1) * 100 < 80 * (total + left));
        }
      }
    }
  }
});
test('seeded dated records retain the original attendance totals', () => {
  const expected = { i233018: { 'smd-b': [8,10], 'ai-a': [7,10], 'db-b': [9,10] }, i230101: { 'cn-a': [5,6], 'tw-a': [4,6] } };
  for (const [roll, records] of Object.entries(initialAttendance)) {
    for (const [id, value] of Object.entries(records)) {
      const course = courseOfferings.find(course => course.id === id);
      const result = getAttendanceSummary(value, course.plannedLectures);
      assert.deepEqual([result.attended, result.total], expected[roll][id]);
      assert.equal(new Set(value.sessions.map(session => session.date)).size, value.sessions.length);
    }
  }
});

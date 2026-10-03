# Verification record

Checked 3 October 2026. Browser checks used local Chromium through temporary Playwright tooling, at 390 × 844 and 320 × 640. No test framework was added to application dependencies.

## Executed successfully

- `npx expo-doctor`: 21/21 checks passed.
- `npx expo export --platform all`: Android and iOS Hermes bundles and web bundle exported successfully.
- Browser load and interaction: no JavaScript page errors recorded.
- Login: password absent for empty/whitespace roll; appears for nonempty roll; missing password and invalid credentials give feedback; changing roll clears password and error. Uppercase/space-padded roll normalizes; a trailing password space remains significant.
- Valid login reaches dashboard. Feature buttons and content back buttons open every requested view.
- Register updates attendance and timetable. Registering a second section of SMD is refused. Drop removes timetable rows. Re-registering restores previous attendance.
- Dropping all courses gives registration, attendance, and timetable empty states. Empty timetable still shows all five weekdays and five “No classes” messages.
- Attendance demo controls changed 8/10 to 9/11 (82%), then 9/12 (75%); warning shown below 80%. A newly registered course showed “No sessions yet”.
- Timetable includes Monday–Friday, registered sessions, and ordered start times; empty days show “No classes”.
- Sign out clears login state. Second account retains its distinct seeded courses; signing back into the first preserves its changed course list.
- Lost & Found defaults to Found; All and Lost show appropriate items; ascending/descending incident-date sort works; case-insensitive location search combines with type filter; no matches and Clear Search/Filters work.
- Post form rejects blanks, malformed date, impossible 2026-02-30, and future 2099-01-01; typed fields survive validation failures.
- Web photo chooser selected a local PNG, showed the preview/remove action, and removal cleared the selection.
- Valid Found and Lost posts both appeared after submission under their selected type, with cleared search and success feedback. An older incident was not forced ahead of more recent incidents.
- Cancel does not publish and reopening starts a fresh form.
- At 320 px width, tested feed/form had no horizontal overflow; bottom form controls were reachable by scrolling. Dashboard and small-form screenshots were visually inspected.

## Source inspection, not runtime simulation

- Shared updates use functional setters, immutable spread/filter, and a duplicate-course guard.
- Attendance uses the unrounded percentage for threshold comparison and guards division by zero.
- Feed sorting operates on a copied/derived array and has an ID tie-breaker.
- Empty shared feed has a distinct “No posts yet” state (seeded feed is nonempty and has no delete action).
- Picker cancellation preserves the form; exceptions show an inline message and release the picker busy state.
- SafeAreaView, KeyboardAvoidingView, scrolling, image containment, and Android resize configuration are present.

## Still needs a real device or simulator

- Native Android/iOS runtime and Expo Go compatibility on the user's installed client.
- Native system picker selection, cancellation, denied/unavailable permission, and photo-error behavior.
- Keyboard opening/closing and obscured-input behavior on native phones.
- Safe insets, large accessibility font sizes, screen reader behavior, and long real-world text/images on native devices.
- Native screenshots/video for final submission if required. Bundling is not a native-device test.

## Captured artifacts

`screenshots/01-login.png` through `screenshots/08-small-phone-form.png` are local browser-rendered phone-size captures. Interaction screenshots include demo state changes from verification. They are not native-device captures.

The final two-chart dashboard, supplied logo, actual AI-report template, student review, and final submission remain pending. No publication was performed.

## Attendance and login revision — 3 October 2026

This revision supersedes earlier checks describing attendance-editing controls or a login logo placeholder. The supplied portal logo is now used, app screens have no demo/assignment notices, and attendance is read-only.

- Five built-in Node tests passed (`node --test tests/attendance.test.mjs`): exact 80% boundary, unreachable target, completed courses, no recorded sessions, original seeded counts, and exhaustive minimal-needed checks over completed/remaining counts from 0 to 30.
- Browser checks passed: supplied logo loaded; removed wording absent across views; no attendance-editing buttons; tapping a course opens its dated Present/Absent history and summary; new registrations show no sessions; drop/re-registration retains dated records; account-specific attendance stays isolated; 320 px layout has no horizontal overflow. No JavaScript page errors.
- Updated login/dashboard/attendance screenshots and added `09-attendance-detail.png` and `10-attendance-summary.png`. Login and 320 px summary were visually inspected. Older screenshots of other views describe the original version.
- `npx expo lint` passed after fixing the existing login apostrophe. Expo created the ESLint development configuration on first run.
- JavaScript type checking of `src/utils/attendance.js` and `src/data/demoData.js` passed using TypeScript's `--allowJs --checkJs --noEmit` flags with JSDoc types. No TypeScript application files were added; this was a focused check, not full-app type coverage.
- Android, iOS, and web export passed with the new detail view and bundled portal asset.
- Native device checks remain pending. The debarred branch was verified through calculation tests; the seeded accounts currently have reachable targets.

## Dashboard charts — 3 October 2026

The earlier deferred-chart milestone is now complete. Both real library components (`BarChart` and `PieChart`, root API, react-native-chart-kit 7.0.4) are implemented. react-native-svg is 15.15.4.

Executed successfully:

- Nine Node tests total: attendance guide tests plus dashboard weighted totals, empty/mixed records, all-attended/all-missed, invalid records, and recomputation after changed records.
- Browser: both charts render with the seeded shared data; dropping AI changes overall from 80% to 85%; adding a zero-session CN course lists its code without changing totals.
- Browser fixtures injected temporarily into App's attendance state: 8/10 plus 18/30 gives bars 80%/60%, counts 26/14, and 65% overall. All-attended and all-missed render single-category pies, retain both legend counts, and produce no NaN/Infinity SVG geometry. Zero-percent bars render without fake data. No attendance-editing controls were added to the application.
- Browser: no sessions, invalid records, and no registrations suppress charts and show the appropriate feedback/action. Invalid fixtures exercise the dated-session data contract, not an unused aggregate-count model.
- 390 px and 320 px browser viewport checks; no page horizontal overflow, nested chart scrolling preserved, actual screenshots captured and visually inspected. No JavaScript page errors recorded.
- `npm run lint` passed. Focused JS type checking of attendance/dashboard helpers and seed data passed using `--allowJs --checkJs --noEmit` (not full-app type coverage).
- Expo Doctor: 21/21 passed. Android, iOS, and web export passed.

New screenshots: `11-dashboard-charts.png`, `12-dashboard-pie.png`, `13-dashboard-small-phone.png`. The last shows an all-missed test fixture; the first two show initial account data. Browser fixture updates existed only in the automated check's running app state and reset on reload.

Native-device execution, accessibility on a device, student review, actual AI-report template, and submission remain pending. No deployment, repository publication, or submission occurred.

# Student Portal

A beginner-friendly Expo / React Native assignment prototype. Students can see their own attendance and weekly classes, manage course registration, and find lost-and-found posts without searching a large timetable or busy group chat.

The dashboard now includes the requested bar and pie attendance charts. Native-device verification and final submission preparation remain outstanding.

## Run locally

```bash
cd /home/abdulbasit/SMD/student-portal
npm install
npm start
```

Open with an Expo Go version compatible with SDK 57, or use a compatible development build. Android emulator: `npm run android`. iOS simulator: `npm run ios` on macOS. Optional browser preview: `npm run web`. If the default port is occupied: `npx expo start --port 8082`.

`npm install` is already completed in this local workspace. The lockfile pins dependencies. Use a Node version supported by the installed Expo SDK.

Packages: Expo 57, React 19, React Native 0.86, expo-status-bar; react-native-safe-area-context for screen insets; expo-image-picker for optional photos. React DOM and React Native Web enable local browser checks. No router, navigation library, backend, or state-management framework.

## Demo accounts

| Roll number | Password | Display name |
| --- | --- | --- |
| i233018 | demo123 | Abdul Basit |
| i230101 | student123 | Sara Ahmed |

These hardcoded credentials are only for the assignment demo and provide no real authentication security. Roll numbers are trimmed and lowercased. Passwords are case-sensitive and are not trimmed.

## Features

- Login conditionally reveals the password field. Changing the roll number clears the old password and error.
- Dashboard with registered-course and weighted-attendance summaries, Attendance by Course bar chart, Attended vs Missed Sessions pie chart, feature-entry buttons, and Sign Out.
- Register/drop offerings; prevent duplicates and simultaneous sections of the same course.
- Read-only attendance cards and course detail pages with dated Present/Absent records, plus a summary of the remaining lectures needed to meet the 80% minimum.
- Monday–Friday agenda containing only registered offerings, sorted by start time.
- Found/Lost/All feed, combined text search and incident-date sorting, useful empty states.
- Reusable Lost/Found form with required fields, real-date/future-date validation, priority, contact text, and optional image-library selection/removal.

## Code and data model

`App.js` owns the session, `currentView`, registrations, attendance, posts, and feed controls. Views receive data and callbacks as props. Conditional rendering switches views directly; no routes, navigation history, bottom bar, or sidebar.

- `src/theme.js`: palette and shared styles using `StyleSheet.create`.
- `src/data/demoData.js`: account dictionary, six fictional offerings, initial per-student registrations/attendance, seeded posts, and `ATTENDANCE_THRESHOLD` (80%). Each offering has an editable `plannedLectures` count for the summary.
- `src/data/timetableData.js`: static schedule entries and weekdays. Replace this array with verified real data later; no live Google Sheets connection.
- `src/components/`: reusable buttons, screen wrapper, empty states, course/attendance/post cards.
- `src/views/`: one readable functional component per view.

An offering ID identifies one course section and joins registrations, attendance, and timetable entries. Registrations are `{ rollNumber: [offeringId] }`; attendance is `{ rollNumber: { offeringId: { sessions: [{ date, status }] } } }`. Present counts and total sessions are derived from that dated record. Registered course objects and timetable rows are derived, never copied into independent state. Drop preserves the attendance record so re-registration restores it. A new offering starts with an empty session list. Course details share the same records as the attendance overview. Students cannot edit attendance. Posts have a unique ID, author roll number, type, incident date, details, priority, contact, and optional local image URI.

Signing out unmounts the login/session flow and clears feedback. Account-specific academic data remains separated by roll number for the running session. The community feed is shared by demo accounts within that same app instance.

## Dashboard charts

Installed chart dependencies: **react-native-chart-kit 7.0.4** and **react-native-svg 15.15.4** (Expo SDK 57 compatible). Versions are pinned by `package-lock.json`. Run using `npm start` or `npm run web`. Installation for a fresh setup is `npm install`; the packages were added with `npx expo install react-native-chart-kit react-native-svg`.

`DashboardCharts.js` imports `BarChart` and `PieChart` from the package root, using its supported legacy props consistently (not `/v2`). The [official library README](https://github.com/chart-kit/react-native-chart-kit) documents the root API's continued availability; installed types/source were checked for the props used.

`getDashboardAttendance` derives counts directly from the same dated Present/Absent records used by the attendance views. There is no independent dashboard dataset or synchronizing effect. Register/drop or any parent attendance update triggers fresh calculations. Student attendance editing remains removed, as requested.

- Bars: rounded `present / recorded sessions * 100` by course. The axis starts at zero, shows % units, and automatically scales its upper bound. Zero-session courses are omitted and listed in a note; actual 0% courses still have labeled zero bars.
- Pie: summed attended and missed counts across registered courses. Overall percentage is `sum(present) / sum(sessions) * 100`, rounded only for display. For 8/10 and 18/30, this gives 26 attended, 14 missed, and 65% overall, not 70%.
- No courses and no sessions have separate empty states. Invalid session arrays/statuses suppress charts and show feedback. Dated records inherently derive nonnegative integer counts with present no greater than total. Imported count-only records are rejected rather than silently interpreted as dated records.
- Each chart card measures its inner width. Many course bars scroll horizontally; the pie stays centered within the available width. A textual legend retains both counts even when one is zero.




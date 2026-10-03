# AI Usage Report — provisional

The assignment's actual report template was not supplied. This provisional report should be transferred into that template when it is provided.

## Assistance used

OpenAI Codex assisted with reading the supplied build brief, creating a new blank Expo JavaScript project, implementing the requested local prototype, writing dummy data and documentation, and checking the implementation. Tools used: terminal/npm/create-expo-app, Expo CLI, Expo Doctor, official Expo documentation, and temporary Playwright browser automation with Chromium. No other AI agents were delegated work.

Generated/assisted areas: reusable visual components, state-driven view switching, login validation, course state and attendance calculations, timetable filtering, Lost & Found filtering/sorting, validated post form with image selection, and README/check documentation.

## Scope and decisions

The user explicitly requested a new local Expo project in the current folder, so a separate `student-portal` directory was created next to the existing app. The attached brief was used as the product specification. The dashboard chart requirement has now been implemented from the later dashboard README. No publishing or submission occurred.

## Student review and adaptation

Not yet confirmed. Do not claim the student independently wrote, reviewed, understood, or adapted the generated code. The student should review all source files, and practice the viva examples in the README. Record actual changes and learning here after that review.

## Testing

Expo export and Expo Doctor were run. Browser interaction checks and phone-width screenshots were produced using temporary Playwright tooling outside project dependencies. See CHECKS.md for the exact results and the native-device checks still pending. Do not treat browser checks or native bundle compilation as proof of a physical-device test.

## Outstanding items

Actual assignment AI-report template; student review/adaptation record; native-device verification; final submission assets and applicable deadline confirmation.

## Requested revision

Used the supplied `assets/portal.png` on login, removed prototype/demo wording from app screens, removed student attendance-editing actions, and added per-course dated attendance with a minimum-80% summary. Historical counts were preserved when converting records into dated sessions. Seeded course totals determine lectures remaining; the student has not supplied verified semester totals. Five Node tests cover the attendance calculation and seeded data, with browser checks recorded in CHECKS.md.

## Dashboard implementation

Codex used the supplied dashboard README as the implementation specification, adapting its aggregate-count examples to the existing dated attendance records. Added the required root-API BarChart and PieChart from react-native-chart-kit 7.0.4 and react-native-svg 15.15.4; implemented weighted totals, measured-width cards, zero/missing/invalid record handling, and retained the previously requested read-only attendance UI. No sub-agents, publishing, or submission were used.

Verification includes nine Node tests across attendance/dashboard calculations, lint, focused JavaScript type checking, Expo Doctor, platform exports, and Chromium interaction/render checks. Browser-only test fixtures temporarily changed App state to exercise weighted data and edge cases; no fixture controls were added to the app. Actual checks and limitations are listed in CHECKS.md. Student review and adaptation are still not confirmed.

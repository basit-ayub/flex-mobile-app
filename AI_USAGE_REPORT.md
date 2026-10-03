# AI Usage Report — provisional

The assignment's actual report template was not supplied. This provisional report should be transferred into that template when it is provided.

## Assistance used

OpenAI Codex assisted with reading the supplied build brief, creating a new blank Expo JavaScript project, implementing the requested local prototype, writing dummy data and documentation, and checking the implementation. Tools used: terminal/npm/create-expo-app, Expo CLI, Expo Doctor, official Expo documentation, and temporary Playwright browser automation with Chromium. No other AI agents were delegated work.

Generated/assisted areas: reusable visual components, state-driven view switching, login validation, course state and attendance calculations, timetable filtering, Lost & Found filtering/sorting, validated post form with image selection, and README/check documentation.

## Scope and decisions

The user explicitly requested a new local Expo project in the current folder, so a separate `student-portal` directory was created next to the existing app. The attached brief was used as the product specification. The dashboard chart requirement remains deferred as described in that brief. No publishing or submission occurred.

## Student review and adaptation

Not yet confirmed. Do not claim the student independently wrote, reviewed, understood, or adapted the generated code. The student should review all source files, choose the chart requirements, and practice the viva examples in the README. Record actual changes and learning here after that review.

## Testing

Expo export and Expo Doctor were run. Browser interaction checks and phone-width screenshots were produced using temporary Playwright tooling outside project dependencies. See CHECKS.md for the exact results and the native-device checks still pending. Do not treat browser checks or native bundle compilation as proof of a physical-device test.

## Outstanding items

Actual assignment AI-report template; student review/adaptation record; two meaningful dashboard chart types using react-native-chart-kit; native-device verification; final submission assets and applicable deadline confirmation.

## Requested revision

Used the supplied `assets/portal.png` on login, removed prototype/demo wording from app screens, removed student attendance-editing actions, and added per-course dated attendance with a minimum-80% summary. Historical counts were preserved when converting records into dated sessions. Seeded course totals determine lectures remaining; the student has not supplied verified semester totals. Five Node tests cover the attendance calculation and seeded data, with browser checks recorded in CHECKS.md.

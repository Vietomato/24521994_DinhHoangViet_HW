# TASK DECOMPOSITION: Resilient Event Hub

> HW3 — Resilient Landing Page (3 Slices)
> Pure HTML, CSS, JavaScript. No frameworks, no external libraries.
> Minimum 5 atomic commits corresponding to slices.

---

## Slice 1: Drift-Free Countdown Engine (UTC ISO 8601)

### Step 1.1 — HTML countdown scaffold
- **Task**: Create semantic HTML structure with `<time>` element and separate containers for days, hours, minutes, seconds.
- **Acceptance Criteria**:
  - Target date is stored as a `data-target` attribute in ISO 8601 UTC format (e.g. `2026-12-31T23:59:59Z`).
  - Each unit (D / H / M / S) has its own element with a test-friendly `id` or `data-*` attribute.
- **How to verify**: Inspect Elements tab — confirm `data-target` contains a valid ISO 8601 string and all unit containers exist.
- **Commit**: `feat(countdown): add countdown html scaffold`

### Step 1.2 — Drift-free timer logic
- **Task**: Implement countdown in a separate JS file using `Date.now()` delta against the UTC target on every tick — NOT by decrementing a local counter.
- **Acceptance Criteria**:
  - Timer recalculates remaining milliseconds as `targetDate - Date.now()` each tick.
  - Uses `setInterval` with a 1-second interval but the displayed value never drifts because it re-derives from the wall clock every tick.
  - When remaining ≤ 0, display "00:00:00:00" and clear the interval.
- **How to verify**:
  - Open DevTools Console → run `Date.now()` and compare against the displayed countdown.
  - Change system clock forward by 1 minute → reload → countdown reflects the jump (proves no local accumulation drift).
  - Set `data-target` to a past date → page shows zeros immediately.
- **Commit**: `feat(countdown): drift-free utc timer logic`

### Step 1.3 — Countdown styling & responsiveness
- **Task**: Style the countdown in external CSS. Responsive on mobile and desktop.
- **Acceptance Criteria**:
  - No inline styles. All CSS in a separate file.
  - Readable on screens ≥ 320px wide.
- **How to verify**: Resize browser or use DevTools device toolbar to confirm layout doesn't break.
- **Commit**: `style(countdown): responsive countdown ui`

---

## Slice 2: State-Machine Registration Form (Idle → Submitting → Success / Error)

### Step 2.1 — Form HTML with semantic inputs
- **Task**: Create a registration form with fields: Name, Email, optional Phone. Use proper `<label>`, `type`, `required`, `autocomplete` attributes.
- **Acceptance Criteria**:
  - Every `<input>` has a linked `<label>`.
  - Required fields have `required` and `aria-required="true"`.
  - Form has `novalidate` attribute (validation handled in JS).
- **How to verify**: Tab through form — all fields are reachable and labelled. Screen reader announces field names.
- **Commit**: `feat(form): registration form markup`

### Step 2.2 — State machine controller (Idle → Submitting → Success / Error)
- **Task**: Implement a state machine in a separate JS file with exactly 3 states: `idle`, `submitting`, `success`/`error`. Transitions are explicit and logged.
- **Acceptance Criteria**:
  - State is stored in a single variable (`let state = "idle"`).
  - `idle → submitting`: triggered on valid form submit.
  - `submitting → success`: after simulated async delay (~1.5s `setTimeout`).
  - `submitting → error`: if simulation fails (e.g. toggle a flag).
  - No other transitions are allowed (e.g. `success → submitting` is blocked).
  - UI reflects each state: button text changes, spinner shows during `submitting`, success/error message appears.
- **How to verify**:
  - Fill form → submit → button shows "Submitting..." and is disabled → after delay, success message appears.
  - Open Console → confirm state transition logs: `idle → submitting → success`.
  - Try clicking submit again in `success` state → nothing happens (blocked).
- **Commit**: `feat(form): state machine idle-submitting-success`

### Step 2.3 — Error state and reset
- **Task**: Handle the `error` state and allow user to retry (transition back to `idle`).
- **Acceptance Criteria**:
  - Error message is displayed with a "Try Again" button.
  - "Try Again" resets state to `idle`, re-enables the form.
  - Error simulation is toggleable (e.g. checkbox or counter-based).
- **How to verify**:
  - Trigger error path → error message and retry button appear.
  - Click "Try Again" → form is editable again, state is `idle`.
- **Commit**: `feat(form): error state and retry`

---

## Slice 3: Double-Submit Prevention & Input Sanitization (Zero XSS)

### Step 3.1 — Double-submit guard
- **Task**: Prevent the form from being submitted more than once while in `submitting` state.
- **Acceptance Criteria**:
  - Submit button is `disabled` during `submitting`.
  - Rapid clicks or Enter key presses during `submitting` do not trigger additional submissions.
  - Guard is based on state machine check (`if (state !== "idle") return`), not just `disabled` attribute alone.
- **How to verify**:
  - Add `console.log` in submit handler → rapidly click submit 5 times → only 1 log appears.
  - Remove `disabled` attribute via DevTools during `submitting` → click again → still blocked by JS guard.
- **Commit**: `fix(form): prevent double submit`

### Step 3.2 — Input sanitization & XSS prevention
- **Task**: Sanitize all user inputs before rendering. Never use `innerHTML` with user data.
- **Acceptance Criteria**:
  - All user-provided values are set via `textContent` or `value`, never `innerHTML`.
  - Name field rejects or escapes HTML tags: typing `<script>alert(1)</script>` as a name displays it as plain text, does not execute.
  - Email is validated with a pattern check before submission.
  - No `eval()`, no `document.write()`, no `innerHTML` with user content anywhere in the codebase.
- **How to verify**:
  - Enter `<img src=x onerror=alert(1)>` in the Name field → submit → confirm the string appears as literal text in the success message, no alert fires.
  - Search codebase (`Ctrl+F` in editor) for `innerHTML` — should return 0 results with user-supplied data.
  - Open Console → no errors, no XSS warnings.
- **Commit**: `fix(security): sanitize inputs prevent xss`

### Step 3.3 — Final integration & cleanup
- **Task**: Ensure all 3 slices work together on a single page. Verify no inline event handlers, no inline styles, all JS in external files.
- **Acceptance Criteria**:
  - Page loads with countdown running, form functional, all states reachable.
  - Zero Console errors.
  - All JavaScript uses `addEventListener` — no `onclick` in HTML.
  - Clean, readable code with comments.
- **How to verify**:
  - Full walkthrough: observe countdown → fill form → submit → see success → reload → countdown still accurate.
  - DevTools Elements search for `onclick=`, `innerHTML` → 0 results.
- **Commit**: `refactor: final integration and cleanup`


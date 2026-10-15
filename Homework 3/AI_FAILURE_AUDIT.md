# AI Failure Audit

This audit records only defects that were reproduced or directly verified in the
reviewed code. Two defects are confirmed so far; a third has not been included
because no additional issue met that evidence threshold.

## Defect 1 — Empty registration accepted as successful
- **Defect:** The form has required fields but also uses `novalidate`. The submit
  handler does not check validity, so an empty form can reach the simulated
  success state.
- **Diagnosis:** In the browser, `registration-form.checkValidity()` returned
  `false` for the empty form, but submitting it still changed the live status
  from `Submitting` to `Success`.
- **Refactored solution:** Remove `novalidate` to restore the existing native
  required-field and email-type checks, or explicitly check `checkValidity()`
  before entering `Submitting`. No fix was applied as part of this
  documentation-only commit.
- **Verification:** Reproduced on `Homework 3/index.html`: empty form reported
  invalid via `checkValidity()` and nevertheless displayed
  `Trạng thái: Success — Đăng ký thành công!`.
- **Commit:** Introduced in `9c8efab` (`feat(form): add registration state machine`);
  no fix commit yet.

## Defect 2 — Queue getter exposes mutable event objects
- **Defect:** `BeatRecorder.getQueue()` returns a shallow copy of the queue.
  Callers can mutate an event object in that copy and thereby alter the
  recorder's internal event and its later playback timing.
- **Diagnosis:** Recorded one beat, changed the returned event's `timestamp`
  through `getQueue()`, and confirmed a subsequent `getQueue()` returned the
  changed timestamp.
- **Refactored solution:** Return copies of the event objects as well as the
  array, for example `eventQueue.map((event) => ({ ...event }))`. No fix was
  applied as part of this documentation-only commit.
- **Verification:** In the browser, changed the returned timestamp to
  `987654321`; a fresh getter call returned `987654321`, confirming mutation of
  the internal queue.
- **Commit:** Introduced in `ddc5e99` (`feat(recorder): record and replay beats`);
  no fix commit yet.

## Audit coverage

- Repeated form submission schedules multiple timers, but this is not counted:
  double-submit prevention was explicitly deferred to a later slice.
- No countdown implementation exists in the reviewed Homework 3 page to verify
  timer drift, timezone handling, or timer cleanup.
- No `innerHTML` use was found in the reviewed Homework 3 HTML or JavaScript.
- Homework 1 and Homework 2 were also inspected for additional reproducible
  defects; no third confirmed issue was found.

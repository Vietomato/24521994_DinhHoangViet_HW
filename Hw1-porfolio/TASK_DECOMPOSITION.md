# TASK DECOMPOSITION: Production Portfolio

## M1: WCAG 2.2 AA Audit (Contrast & Landmarks)
- **Subtasks**:
  - Use semantic HTML5 landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
  - Ensure minimum color contrast ratio of 4.5:1 for regular text and 3:1 for large text / UI components.
  - Implement essential accessibility attributes (`lang` attribute on `<html>`, meaningful `alt` text for images, `aria-label` for icon-only buttons).
- **Completion Criteria**:
  - Zero landmark or color contrast issues flagged by automated accessibility linters/tools.
  - Full WCAG 2.2 AA color contrast compliance across both dark and light UI elements.
- **Browser Verification**:
  - Open Chrome DevTools -> **Lighthouse** tab -> select **Accessibility** category -> run **Analyze page load** (verify 100/100 score).
  - Inspect elements using Chrome DevTools Color Picker to verify the contrast ratio passes AA requirements.
- **Commit Message**:
  `fix(a11y): contrast & landmarks`

---

## M2: Focus & Keyboard Navigation (Keyboard Trap Prevention)
- **Subtasks**:
  - Add a visible-on-focus "Skip to main content" link as the first focusable element.
  - Ensure all interactive elements (`<a>`, `<button>`, form controls) are reachable in a logical tab order.
  - Provide distinct, accessible `:focus-visible` styling (never use `outline: none` without a clear accessible replacement).
  - Prevent keyboard traps in modal dialogs or mobile navigation drawers (allow cyclic focus inside active modals and dismiss with the `Escape` key).
- **Completion Criteria**:
  - Entire page can be navigated and operated using only `Tab`, `Shift + Tab`, `Enter`, and `Space`.
  - Focus indicator is clearly visible at all times during keyboard navigation.
  - No focus traps: focus is never permanently stuck in any container.
- **Browser Verification**:
  - Tab through the whole page using only the keyboard from top to bottom and verify continuous visible focus rings.
  - Check with Chrome DevTools -> **Rendering** drawer -> enable **Emulate a focused page** to test active focus behaviors.
- **Commit Message**:
  `fix(nav): keyboard trap prevention`

---

## M3: Strict CSP & Zero Inline Handlers
- **Subtasks**:
  - Define a strict Content Security Policy using a `<meta http-equiv="Content-Security-Policy" content="...">` tag (e.g., disallowing `unsafe-inline` scripts).
  - Remove all inline event handlers (`onclick`, `onsubmit`, `onload`, etc.) from HTML.
  - Disallow inline `<script>` blocks; move all JavaScript logic to separate `.js` files using `addEventListener()`.
  - Move all inline styles (`style="..."`) to external `.css` stylesheets.
- **Completion Criteria**:
  - Zero `on*` attributes and zero inline `<script>` tags across the HTML code.
  - Zero CSP violation warnings or errors reported in the browser console.
- **Browser Verification**:
  - Open Chrome DevTools -> **Console** tab, reload the page, and verify there are no CSP violation errors (e.g., `Refused to execute inline script...`).
  - Search elements in Chrome DevTools (**Elements** tab -> `Ctrl + F`) for `onclick=` and inline `<script>` to confirm none exist.
- **Commit Message**:
  `refactor(security): enforce strict csp and zero inline handlers`

---

## M4: Lighthouse 100 Audit (Asset Optimization)
- **Subtasks**:
  - Compress and convert images to modern formats (WebP/AVIF) and specify explicit `width` and `height` to prevent Cumulative Layout Shift (CLS).
  - Add `loading="lazy"` to below-the-fold images.
  - Eliminate render-blocking resources by deferring non-critical scripts (`defer` attribute) and minifying CSS/JS assets.
  - Include all necessary SEO and performance meta tags (`viewport`, `description`, proper heading hierarchy).
- **Completion Criteria**:
  - Score 100 (or near-perfect) across all categories: Performance, Accessibility, Best Practices, and SEO.
  - No critical asset-loading bottlenecks or large layout shifts.
- **Browser Verification**:
  - Open Chrome in an **Incognito Window** (to disable extensions).
  - Open Chrome DevTools -> **Lighthouse** tab -> choose **Mobile** / **Desktop** -> run **Analyze page load** and verify green (100) scores.
- **Commit Message**:
  `perf: optimize assets`

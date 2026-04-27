# Motion

Motion in Oralstack is **subtle, meaningful, and respectful**. It exists to clarify what changed (entrance, hover, transition), not to decorate. Every animation respects `prefers-reduced-motion` via the global rule in [`app/globals.css`](../../app/globals.css).

## Principles

1. **Motion explains change, not state.** A button doesn't pulse for attention; it shifts colour on hover to confirm interactivity. A section fades in when scrolled into view, not because it's pretty.
2. **Subtle over dramatic.** 14 px translate, 0.5 s duration, ease-out cubic. No 1 s slides, no parallax-as-hero, no spring-bounce-for-fun.
3. **Once, not forever.** Scroll-into-view animations use `viewport={{ once: true }}` so revisiting a section doesn't re-animate.
4. **Reduced motion is honoured.** `globals.css` collapses all transition-duration and animation-duration to ~0 ms when `prefers-reduced-motion: reduce` is set. Motion components don't need their own check.
5. **Cross-document view transitions** are enabled site-wide via `@view-transition { navigation: auto; }` — Chrome 126+ smoothly cross-fades between routes; older browsers fall back to instant nav with no behavioural change.

## Animation tokens (de facto)

These values are repeated across motion components — treat them as the system:

| Token | Value | Use |
|---|---|---|
| Distance | 14 px translate | Fade-up entrance |
| Smaller distance | 5 px translate | Brand-mark sub-element fade-up |
| Duration default | 0.5 s | Standard scroll-in fade |
| Duration emphasis | 0.55 s | Hero entrance, brand-mark assembly |
| Easing | `[0.16, 1, 0.3, 1]` (cubic-bezier ease-out) | All Oralstack motion |
| Stagger | 80 ms between siblings | Hero stack, list reveals |
| Spring (magnetic) | `stiffness: 220, damping: 22` | Button cursor magnetism |
| Scroll spring | `stiffness: 100, damping: 30` | Top progress bar |
| View-transition | 0.25 s | Cross-document route transitions |

## Components

### Motion components (interactive)

| Component | File | Trigger | Use |
|---|---|---|---|
| **AnimateInView** | [`components/sections/AnimateInView.tsx`](../../components/sections/AnimateInView.tsx) | scroll into view (`viewport`, `once: true`) | Generic fade-up wrapper for any section. Default amount=0.2; accepts `delay` for staggered groups |
| **HeroStagger** + **HeroItem** | [`components/sections/HeroStagger.tsx`](../../components/sections/HeroStagger.tsx) | mount (`initial="hidden" animate="visible"`) | Wraps hero content. `HeroStagger` is the parent (orchestrates `staggerChildren: 0.08`); each child uses `<HeroItem>` |
| **AnimatedMark** | [`components/sections/AnimatedMark.tsx`](../../components/sections/AnimatedMark.tsx) | scroll into view | Tooth-mark whose three segments assemble (crown scales in, then roots fade up). Use on page headers and major brand moments. Static fallback equivalent: import `MarkBullet` |
| **CountUp** | [`components/sections/CountUp.tsx`](../../components/sections/CountUp.tsx) | scroll into view | Animates a numeric value up to its target. Used in `StatGrid`. Parses leading digits, preserves suffix (`120+`, `85%`, `3 weeks`) |
| **ScrollProgress** | [`components/sections/ScrollProgress.tsx`](../../components/sections/ScrollProgress.tsx) | scroll position | Fixed top-of-page bar that fills navy → teal as the user scrolls. Lives in `app/layout.tsx`, applies site-wide |
| **MagneticButton** | [`components/primitives/MagneticButton.tsx`](../../components/primitives/MagneticButton.tsx) | mouse hover | Button that magnetically follows the cursor on hover. Variants: `primary` (navy bg) / `ghost` (outline) / `onDark` (light bg, for the dark CTA section). Strength prop default 0.18 |

### Decorative brand-mark elements (no motion)

These are static SVG marks used as decorative repeats — they make the brand mark a recurring visual element without animation overhead.

| Component | File | Use |
|---|---|---|
| **MarkBullet** | [`components/sections/MarkBullet.tsx`](../../components/sections/MarkBullet.tsx) | Tiny tooth-mark used as a list bullet. Default 12 px. Used in pricing list items |
| **SectionDivider** | [`components/sections/SectionDivider.tsx`](../../components/sections/SectionDivider.tsx) | Horizontal hairline with a centred `MarkBullet`. Use sparingly between major page sections to signal a transition without competing for attention |

## Patterns

### Scroll-into-view fade

For any section that should reveal as the user scrolls past it, wrap its body in `<AnimateInView>`. For staggered groups (e.g. four cards in a grid), pass an incrementing `delay` to each:

```tsx
{items.map((item, i) => (
  <AnimateInView key={item.id} delay={Math.min(i * 0.06, 0.24)}>
    {item.content}
  </AnimateInView>
))}
```

Cap the delay (`Math.min(i * 0.06, 0.24)`) so deep lists don't take forever to fully reveal.

### Mount-time hero entrance

The hero block uses the mount-triggered staggered pattern (animation runs once on first paint, not on scroll):

```tsx
<HeroStagger>
  <HeroItem><EyebrowOrLabel /></HeroItem>
  <HeroItem><h1 /></HeroItem>
  <HeroItem><p /></HeroItem>
  <HeroItem><CTAs /></HeroItem>
</HeroStagger>
```

### Number reveal

Wrap stat values in `<CountUp>`. Works with any string value — the component parses leading digits and animates them, preserving the rest of the string:

```tsx
<p className="text-4xl font-semibold tabular-nums">
  <CountUp value={s.value} />  {/* "120+", "85%", "3 weeks" all work */}
</p>
```

Always pair with `tabular-nums` to prevent width shift during the count.

### Hover-magnetism on critical CTAs

Use `MagneticButton` for primary conversion CTAs (Book a demo, Talk to us) where you want the small delight to reward intentional cursor movement. Don't use for ghost/secondary buttons — too much for low-commitment actions.

## When NOT to add motion

- Don't animate state changes that already have a colour or copy signal (e.g. don't pulse a "Live" badge — the badge already says "Live")
- Don't animate page chrome (Nav, Footer) on every navigation
- Don't add hover animations to non-interactive elements (decorative cards that don't link anywhere)
- Don't use long durations (>0.6 s) on entrance — feels sluggish on second page load
- Don't add motion to assist scanning (e.g. animating between rows of a table) — it slows readers down

## Accessibility

- All scroll-triggered animations use `viewport={{ once: true }}` — once revealed, content stays revealed
- `globals.css` overrides `transition-duration`, `animation-duration`, `animation-iteration-count`, and `scroll-behavior` to near-zero when `prefers-reduced-motion: reduce` is set
- `AnimatedMark` and `MagneticButton` are `"use client"` components — they hydrate after page load, but the static SVG / button content is visible immediately so non-JS users see correct content
- View transitions degrade gracefully in browsers that don't support them

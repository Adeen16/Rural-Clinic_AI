# RuralClinic AI - Design System & Brand Guidelines

## Brand Philosophy

RuralClinic AI is a clinical intake and triage platform designed for **rural healthcare environments** with limited resources. The design prioritizes:

- **Trust & Safety**: Calming colors that reduce patient anxiety
- **Clarity**: High contrast, readable typography for all lighting conditions
- **Speed**: Minimal cognitive load for rapid nurse workflows
- **Accessibility**: WCAG 2.1 AA compliant, mobile-first, low-bandwidth optimized

---

## Color System

### Core Palette

```
Background (Deepest)    #0a0a0a   - Primary background
Surface                 #121212   - Cards, modals, elevated surfaces
Surface Hover           #1e1e1e   - Interactive surface states
Border                  #2a2a2a   - Subtle separation
Border Light            #3f3f46   - Emphasized borders
```

### Typography Colors

```
Text Primary            #ffffff   - Headings, important content
Text Secondary          #a1a1aa   - Body text, descriptions (Zinc 400)
Text Muted              #71717a   - Placeholders, hints (Zinc 500)
```

### Brand Accent

```
Primary Blue            #3b82f6   - CTAs, links, interactive elements
Primary Hover           #2563eb   - Button hover states
Primary Glow            rgba(59, 130, 246, 0.15) - Focus rings, ambient effects
```

### Functional Colors

```
Recording Red           #ef4444   - Active recording, destructive actions
Recording Glow          rgba(239, 68, 68, 0.2)
Success Green           #10b981   - Confirmations, completed states
Success Glow            rgba(16, 185, 129, 0.15)
Warning Amber           #f59e0b   - Caution states, pending actions
```

### Clinical Triage Colors (5-Level ESI-based)

| Level | Name | Hex Color | Background | Usage |
|-------|------|-----------|------------|-------|
| 1 | Resuscitation | #dc2626 | rgba(220, 38, 38, 0.1) | Life-threatening, immediate intervention |
| 2 | Emergent | #ef4444 | rgba(239, 68, 68, 0.1) | High-risk, time-sensitive |
| 3 | Urgent | #f59e0b | rgba(245, 158, 11, 0.1) | Multiple resources needed |
| 4 | Less Urgent | #22c55e | rgba(34, 197, 94, 0.1) | One resource expected |
| 5 | Non-Urgent | #10b981 | rgba(16, 185, 129, 0.1) | No resources expected |

**Design Rule**: Never use red for non-critical UI elements. Reserve triage colors exclusively for clinical priority indicators.

---

## Typography

### Font Family

**Primary**: Inter (Google Fonts)
- Variable font for optimal performance
- Fallback: system-ui, -apple-system, sans-serif

### Type Scale

```
Display        48px / 3rem     Bold      Tracking: -0.02em
H1             36px / 2.25rem  Bold      Tracking: -0.02em
H2             30px / 1.875rem Semibold  Tracking: -0.01em
H3             24px / 1.5rem   Semibold  Tracking: 0
H4             20px / 1.25rem  Medium    Tracking: 0
Body Large     18px / 1.125rem Regular   Line-height: 1.6
Body           16px / 1rem     Regular   Line-height: 1.5
Body Small     14px / 0.875rem Regular   Line-height: 1.5
Caption        12px / 0.75rem  Medium    Tracking: 0.02em, Uppercase
```

### Mobile Adjustments

On screens < 640px:
- Display: 36px
- H1: 28px
- Body Large: 16px
- Minimum touch target text: 16px

---

## Spacing System

Base unit: 4px

```
0     0px
1     4px
2     8px
3     12px
4     16px
5     20px
6     24px
8     32px
10    40px
12    48px
16    64px
20    80px
24    96px
```

### Component Spacing

- Card padding: 24px (6 units)
- Section gap: 32px (8 units)
- Form field gap: 16px (4 units)
- Button padding: 16px 24px (4x6 units)
- Input padding: 16px 20px (4x5 units)

---

## Border Radius

```
sm      8px    - Small buttons, badges
md      12px   - Inputs, standard buttons
lg      16px   - Cards, modals
xl      20px   - Large cards
2xl     24px   - Hero elements
full    9999px - Pills, avatars
```

---

## Shadows

### Elevation System

```
sm      0 1px 2px rgba(0, 0, 0, 0.3)
md      0 4px 6px rgba(0, 0, 0, 0.4)
lg      0 10px 15px rgba(0, 0, 0, 0.4)
xl      0 20px 25px rgba(0, 0, 0, 0.5)
```

### Glow Effects (for focus/active states)

```
Primary Glow    0 0 0 3px rgba(59, 130, 246, 0.3)
Triage Red      0 0 40px -10px rgba(239, 68, 68, 0.5)
Triage Amber    0 0 40px -10px rgba(245, 158, 11, 0.5)
Triage Green    0 0 40px -10px rgba(16, 185, 129, 0.5)
```

---

## Component Guidelines

### Buttons

**Primary Button**
- Background: Primary Blue
- Text: White
- Height: 48px (minimum touch target)
- Border radius: 12px
- Shadow: 0 4px 14px rgba(59, 130, 246, 0.25)

**Secondary Button**
- Background: Transparent
- Border: 1px solid Border
- Text: Text Primary
- Hover: Surface Hover background

**Ghost Button**
- Background: Transparent
- Text: Text Secondary
- Hover: Surface Hover background, Text Primary

### Cards

- Background: Surface (#121212)
- Border: 1px solid Border (#2a2a2a)
- Border radius: 16px
- Padding: 24px
- Elevated variant: Add box-shadow lg

### Form Inputs

- Background: Background (#0a0a0a)
- Border: 1px solid Border
- Border radius: 12px
- Padding: 16px 20px
- Font size: 18px (for accessibility)
- Focus: Border Primary, Primary Glow shadow

### Triage Banners

- Border: 2px solid (triage color)
- Background: (triage color with 10% opacity)
- Border radius: 16px
- Padding: 24px
- Icon: 32px, matching triage color

---

## Accessibility Requirements

### Color Contrast
- All text must meet WCAG AA (4.5:1 for body, 3:1 for large text)
- Interactive elements must have 3:1 contrast against background

### Touch Targets
- Minimum: 44x44px
- Recommended: 48x48px for primary actions

### Focus States
- All interactive elements must have visible focus indicators
- Use Primary Glow ring (3px)
- Never remove outline without providing alternative

### Motion
- Respect `prefers-reduced-motion`
- Use subtle animations (< 200ms for micro-interactions)
- No auto-playing animations that distract from clinical workflow

### Screen Readers
- All icons must have aria-labels or sr-only text
- Form fields must have associated labels
- Live regions for status updates (triage results, processing states)

---

## Content Guidelines

### Voice & Tone

**For Patients:**
- Simple, reassuring language
- No medical jargon
- Present tense, active voice
- Example: "Please wait here. A nurse will see you soon."

**For Clinical Staff:**
- Concise, action-oriented
- Use standard clinical terminology
- Clear status indicators
- Example: "3 symptoms extracted. Verify before triage."

### Prohibited Content
- Never display medical diagnoses
- Never show AI confidence scores to patients
- Never use alarming language (e.g., "DANGER", "CRITICAL" visible to patients)

### Trust Indicators
- Always clarify AI's role: "AI-assisted, clinician verified"
- Show rule engine source for admin views
- Timestamp all clinical actions

---

## Mobile-First Breakpoints

```
sm      640px    - Large phones
md      768px    - Tablets
lg      1024px   - Laptops
xl      1280px   - Desktops
2xl     1536px   - Large screens
```

### Mobile Optimizations
- Stack layouts vertically below 768px
- Increase touch targets on mobile
- Use bottom-sheet modals instead of center modals
- Optimize images for 3G networks (< 100KB hero images)

---

## Loading States

### Skeleton Loaders (Preferred)
- Use skeleton loaders instead of spinners
- Match skeleton dimensions to content
- Subtle pulse animation (2s cycle)

### Processing States
- For AI processing: Purple accent (#8b5cf6)
- Show clear progress indicators
- Provide cancel option for long operations

---

## Icons

**Library**: Lucide React

**Sizes:**
- Small (in text): 16px
- Default: 20px
- Large (standalone): 24px
- Hero: 32-48px

**Clinical Icons:**
- Activity - Triage/vital signs
- AlertTriangle - High priority
- Clock - Wait time / Urgent
- CheckCircle - Verified / Low priority
- Stethoscope - Clinical staff
- Users - Specialist network
- FileText - Documentation
- Shield - Trust/Security indicators

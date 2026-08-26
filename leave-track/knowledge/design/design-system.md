# Design System Specification

## Color Palette

### Primary Colors
- Primary 50: hsl(230, 100%, 97%)
- Primary 100: hsl(230, 100%, 94%)
- Primary 200: hsl(230, 100%, 87%)
- Primary 300: hsl(230, 100%, 77%)
- Primary 400: hsl(230, 100%, 65%)
- Primary 500: hsl(230, 100%, 55%)
- Primary 600: hsl(230, 100%, 45%)
- Primary 700: hsl(230, 100%, 38%)
- Primary 800: hsl(230, 100%, 30%)
- Primary 900: hsl(230, 100%, 22%)

### Success Colors
- Success 50: hsl(142, 100%, 97%)
- Success 100: hsl(142, 100%, 94%)
- Success 500: hsl(142, 71%, 45%)
- Success 600: hsl(142, 71%, 35%)

### Warning Colors
- Warning 50: hsl(38, 100%, 97%)
- Warning 100: hsl(38, 100%, 94%)
- Warning 500: hsl(38, 92%, 50%)

### Error Colors
- Error 50: hsl(0, 100%, 97%)
- Error 100: hsl(0, 100%, 94%)
- Error 500: hsl(0, 84%, 60%)
- Error 600: hsl(0, 84%, 50%)

### Neutral Colors
- Neutral 50: hsl(210, 40%, 98%)
- Neutral 100: hsl(210, 40%, 96%)
- Neutral 200: hsl(214, 32%, 91%)
- Neutral 300: hsl(213, 27%, 84%)
- Neutral 400: hsl(215, 20%, 65%)
- Neutral 500: hsl(215, 16%, 47%)
- Neutral 600: hsl(215, 19%, 35%)
- Neutral 700: hsl(215, 25%, 27%)
- Neutral 800: hsl(217, 33%, 17%)
- Neutral 900: hsl(222, 47%, 11%)

## Typography

### Font Family
- Primary: Inter
- Fallback: system-ui, sans-serif

### Font Sizes
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)

## Spacing Scale
- 1: 0.25rem (4px)
- 2: 0.5rem (8px)
- 3: 0.75rem (12px)
- 4: 1rem (16px)
- 5: 1.25rem (20px)
- 6: 1.5rem (24px)
- 8: 2rem (32px)
- 10: 2.5rem (40px)
- 12: 3rem (48px)
- 16: 4rem (64px)
- 20: 5rem (80px)
- 24: 6rem (96px)

## Border Radius
- sm: 0.25rem (4px)
- md: 0.375rem (6px)
- lg: 0.5rem (8px)
- xl: 0.75rem (12px)
- 2xl: 1rem (16px)
- 4xl: 2rem (32px)

## Shadows
- soft: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)
- medium: 0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
- hard: 0 10px 40px -10px rgba(0, 0, 0, 0.15)

## Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Component Patterns

### Buttons
- Primary: bg-primary-600, text-white, hover:bg-primary-700
- Secondary: border-neutral-300, bg-white, text-neutral-700, hover:bg-neutral-50
- Ghost: text-neutral-700, hover:bg-neutral-100
- Danger: bg-error-600, text-white, hover:bg-error-500

### Inputs
- Border: neutral-300
- Focus: primary-500 border and ring
- Error: error-500 border and ring
- Disabled: neutral-50 bg, opacity-50

### Cards
- Border: neutral-200
- Shadow: soft (default)
- Border radius: xl (16px)

### Badges
- Success: bg-success-50, text-success-600
- Warning: bg-warning-50, text-warning-500
- Error: bg-error-50, text-error-600
- Neutral: bg-neutral-100, text-neutral-600

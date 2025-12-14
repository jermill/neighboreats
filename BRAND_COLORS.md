# NeighborEats Brand Colors

Based on the color palette: https://coolors.co/282119-8c3030-f8f9fa-026181-ff8c42

## Brand Color Palette

### Primary Colors

| Color Name | Hex Code | Tailwind Class | Usage |
|------------|----------|----------------|-------|
| **Deep Charcoal** | `#282119` | `brand-dark` | Dark backgrounds, text |
| **Rich Burgundy** | `#8C3030` | `brand-burgundy` | Customer accents, CTAs |
| **Soft White** | `#F8F9FA` | `brand-light` | Backgrounds, light sections |
| **Deep Teal** | `#026181` | `brand-teal` | Primary brand color, links |
| **Vibrant Coral** | `#FF8C42` | `brand-coral` | Chef accents, highlights |

## Role-Specific Colors

### Customer Colors
- **Primary**: `#8C3030` (brand-burgundy) - Used for customer-related UI elements
- **Variants**: 500, 600, 700 shades available

### Chef Colors
- **Primary**: `#FF8C42` (brand-coral) - Used for chef-related UI elements
- **Variants**: 500, 600, 700 shades available

### Driver Colors
- **Primary**: `#026181` (brand-teal) - Used for driver-related UI elements
- **Variants**: 500, 600, 700 shades available

## Usage Examples

### Tailwind CSS Classes

```tsx
// Background colors
bg-brand-dark
bg-brand-burgundy
bg-brand-light
bg-brand-teal
bg-brand-coral

// Text colors
text-brand-dark
text-brand-burgundy
text-brand-light
text-brand-teal
text-brand-coral

// Border colors
border-brand-teal
hover:border-brand-coral

// Gradients
bg-gradient-to-br from-brand-light to-cyan-50
bg-gradient-to-r from-red-200 via-orange-200 to-cyan-200
```

### Role-Based Classes

```tsx
// Customer UI
bg-customer-500
text-customer-600
hover:bg-customer-700

// Chef UI
bg-chef-500
text-chef-600
hover:bg-chef-700

// Driver UI
bg-driver-500
text-driver-600
hover:bg-driver-700
```

## Color Psychology

### Brand Burgundy (#8C3030)
- **Emotion**: Trust, sophistication, warmth
- **Use for**: Customer engagement, appetite appeal, premium feel

### Brand Coral (#FF8C42)
- **Emotion**: Energy, creativity, friendliness
- **Use for**: Chef personality, food excitement, action items

### Brand Teal (#026181)
- **Emotion**: Reliability, professionalism, calm
- **Use for**: Trust elements, delivery tracking, stability

### Brand Dark (#282119)
- **Emotion**: Grounded, authentic, earthy
- **Use for**: Footer, contrast, sophistication

### Brand Light (#F8F9FA)
- **Emotion**: Clean, fresh, modern
- **Use for**: Backgrounds, cards, breathing room

## Accessibility

All brand colors meet WCAG AA contrast requirements when used properly:

- **Dark text on Light backgrounds**: ✅ AAA
- **Light text on Dark backgrounds**: ✅ AAA
- **Burgundy on Light backgrounds**: ✅ AA
- **Teal on Light backgrounds**: ✅ AAA
- **Coral on Dark backgrounds**: ✅ AA

## Implementation Notes

### Updated Files
- `tailwind.config.ts` - Core color definitions
- `src/app/layout.tsx` - Theme color metadata
- `public/manifest.json` - PWA theme color
- `src/app/page.tsx` - Homepage components
- `src/app/explore/` - Guest browsing pages
- `src/components/shared/` - Shared components

### Color Mapping

**Old → New:**
- `teal-600` → `brand-teal`
- `rose-500` / `rose-600` → `customer-500` / `brand-burgundy`
- `amber-500` / `amber-600` → `brand-coral`
- `emerald-500` / `emerald-600` → `brand-teal` / `driver-500`

## Design System

### Primary Actions
- Main CTAs: `bg-brand-burgundy hover:bg-customer-500`
- Chef Actions: `bg-brand-coral hover:bg-amber-600`
- Driver Actions: `bg-driver-500 hover:bg-brand-teal`

### Interactive Elements
- Links: `text-brand-teal hover:text-brand-burgundy`
- Buttons: Role-specific colors with hover states
- Icons: Match surrounding context

### Backgrounds
- Hero sections: `bg-gradient-to-br from-brand-light via-orange-50 to-cyan-50`
- Feature cards: Gradient variations using brand colors
- Stats: Colored icon backgrounds with matching text

## Visual Examples

### Homepage Hero
```
Background: Gradient (brand-light → orange → cyan)
Decorative blobs: brand-burgundy, brand-coral, brand-teal (with opacity)
Logo text: brand-burgundy for "Eats"
Primary CTA: brand-burgundy background
```

### Feature Cards
```
Card 1 (Hyper-Local): Red-100/200 gradient, customer-500 icon
Card 2 (LIVE): Orange-100/200 gradient, brand-coral icon
Card 3 (Economics): Cyan-100/200 gradient, brand-teal icon
```

### How It Works Steps
```
Step 1 (Browse): Red gradient, customer-500 accent
Step 2 (Watch): Orange gradient, brand-coral accent
Step 3 (Order): Cyan gradient, brand-teal accent
Step 4 (Delivered): Cyan/Blue gradient, brand-teal accent
```

## Best Practices

1. **Consistency**: Use role-specific colors for role-specific UI
2. **Contrast**: Always check contrast ratios for accessibility
3. **Hierarchy**: Primary brand-teal, secondary brand-burgundy, accent brand-coral
4. **Gradients**: Use subtle gradients with brand colors at 20% opacity
5. **Hover States**: Darken by one shade level (500 → 600)

## Theme Color
PWA and browser theme color set to: `#026181` (brand-teal)

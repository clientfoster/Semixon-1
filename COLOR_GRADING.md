

## 1. Primary Color Palette (Royal Blue Theme)

### CSS Custom Properties (HSL Format)

```css
/* Base Colors */
--background: 220 50% 5%;        /* Very dark royal blue */
--foreground: 220 20% 95%;       /* Off-white text */

/* Card Colors */
--card: 220 40% 8%;              /* Dark card background */
--card-foreground: 220 20% 95%;  /* Card text */

/* Popover Colors */
--popover: 220 40% 8%;           /* Popover background */
--popover-foreground: 220 20% 95%; /* Popover text */

/* Primary Colors */
--primary: 220 85% 60%;          /* Bright royal blue */
--primary-foreground: 220 50% 5%; /* Dark blue text on primary */

/* Secondary Colors */
--secondary: 220 30% 12%;        /* Dark secondary background */
--secondary-foreground: 220 20% 95%; /* Secondary text */

/* Muted Colors */
--muted: 220 30% 12%;            /* Muted background */
--muted-foreground: 220 15% 65%; /* Muted text */

/* Accent Colors */
--accent: 220 100% 70%;          /* Lighter royal blue accent */
--accent-foreground: 220 50% 5%; /* Accent text */

/* System Colors */
--destructive: 0 62.8% 30.6%;    /* Error/danger red */
--destructive-foreground: 0 0% 98%; /* White text on error */
--border: 220 30% 15%;           /* Border color */
--input: 220 30% 15%;            /* Input border */
--ring: 220 85% 60%;             /* Focus ring */
--radius: 0.75rem;               /* Border radius */
```

### Sidebar Colors

```css
--sidebar-background: 220 50% 5%;
--sidebar-foreground: 220 20% 95%;
--sidebar-primary: 220 85% 60%;
--sidebar-primary-foreground: 220 50% 5%;
--sidebar-accent: 220 30% 12%;
--sidebar-accent-foreground: 220 20% 95%;
--sidebar-border: 220 30% 15%;
--sidebar-ring: 220 85% 60%;
```

---

## 2. Gradient System

### Primary Royal Blue Gradients

#### Standard Royal Gradient
```css
.gradient-royal {
  background: linear-gradient(135deg, 
    hsl(220, 100%, 25%) 0%, 
    hsl(220, 85%, 60%) 50%, 
    hsl(220, 100%, 35%) 100%
  );
}
```

#### Transparent Royal Gradient
```css
.gradient-royal-transparent {
  background: linear-gradient(135deg, 
    hsla(220, 100%, 25%, 0.8) 0%, 
    hsla(220, 85%, 60%, 0.7) 50%, 
    hsla(220, 100%, 35%, 0.8) 100%
  );
}
```

#### Light Royal Gradient
```css
.gradient-royal-light {
  background: linear-gradient(135deg, 
    hsl(220, 30%, 95%) 0%, 
    hsl(220, 25%, 98%) 50%, 
    hsl(220, 20%, 99%) 100%
  );
}
```

#### Dark Royal Gradient
```css
.gradient-royal-dark {
  background: linear-gradient(135deg, 
    hsl(220, 50%, 5%) 0%, 
    hsl(220, 40%, 8%) 50%, 
    hsl(220, 45%, 10%) 100%
  );
}
```

#### Subtle Royal Gradient
```css
.gradient-royal-subtle {
  background: linear-gradient(135deg, 
    hsl(220, 20%, 98%) 0%, 
    hsl(220, 15%, 99%) 100%
  );
}
```

#### Card Gradient
```css
.gradient-royal-card {
  background: linear-gradient(135deg, 
    hsl(220, 10%, 100%) 0%, 
    hsl(220, 5%, 98%) 100%
  );
}
```

#### Hero Gradient
```css
.gradient-royal-hero {
  background: linear-gradient(135deg, 
    hsl(220, 100%, 20%) 0%, 
    hsl(220, 90%, 50%) 50%, 
    hsl(220, 100%, 30%) 100%
  );
}
```

#### Accent Gradient
```css
.gradient-royal-accent {
  background: linear-gradient(135deg, 
    hsl(220, 85%, 60%) 0%, 
    hsl(220, 100%, 70%) 100%
  );
}
```

#### Muted Gradient
```css
.gradient-royal-muted {
  background: linear-gradient(135deg, 
    hsl(220, 15%, 92%) 0%, 
    hsl(220, 10%, 95%) 100%
  );
}
```

---

## 3. Text Gradients

### Royal Text Gradient
```css
.text-gradient-royal {
  background: linear-gradient(135deg, 
    hsl(220, 100%, 25%) 0%, 
    hsl(220, 85%, 60%) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Light Royal Text Gradient
```css
.text-gradient-royal-light {
  background: linear-gradient(135deg, 
    hsl(220, 85%, 60%) 0%, 
    hsl(220, 100%, 70%) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Dark Royal Text Gradient
```css
.text-gradient-royal-dark {
  background: linear-gradient(135deg, 
    hsl(220, 100%, 20%) 0%, 
    hsl(220, 90%, 50%) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### White Text Gradient
```css
.text-gradient-white {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 4. Tailwind Slate Colors

Complete palette used throughout the application:

| Color | Hex Value | Usage |
|-------|-----------|-------|
| Slate-50 | `#f8fafc` | Lightest slate, backgrounds |
| Slate-100 | `#f1f5f9` | Very light backgrounds |
| Slate-200 | `#e2e8f0` | Light borders, dividers |
| Slate-300 | `#cbd5e1` | Light borders, disabled states |
| Slate-400 | `#94a3b8` | Muted text, placeholders |
| Slate-500 | `#64748b` | Secondary text |
| Slate-600 | `#475569` | Dark text, borders |
| Slate-700 | `#334155` | Dark cards, inputs |
| Slate-800 | `#1e293b` | Darker backgrounds, cards |
| Slate-900 | `#0f172a` | Darkest background, primary bg |

---

## 5. Blue Color Scale

| Color | Hex Value | Usage |
|-------|-----------|-------|
| Blue-500 | `#3b82f6` | Standard blue, accents |
| Blue-600 | `#2563eb` | Darker blue, hover states |
| Blue-700 | `#1d4ed8` | Dark blue, hero sections |
| Blue-800 | `#1e40af` | Very dark blue |
| Blue-900 | `#1e3a8a` | Darkest blue, backgrounds |

---

## 6. Common Hero Section Gradients

### Primary Hero Gradient
```css
bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800
```
**Colors:**
- From: `#0f172a` (Slate-900)
- Via: `#1e3a8a` (Blue-900)
- To: `#1e293b` (Slate-800)

### Transparent Hero Gradient
```css
bg-gradient-to-br from-blue-900/80 via-blue-700/70 to-blue-900/80
```
**Colors:**
- From: `rgba(30, 58, 138, 0.8)` (Blue-900 at 80%)
- Via: `rgba(29, 78, 216, 0.7)` (Blue-700 at 70%)
- To: `rgba(30, 58, 138, 0.8)` (Blue-900 at 80%)

---

## 7. Shadow System

### Royal Shadows (Blue Tinted)

```css
/* Small Shadow */
.shadow-royal-sm {
  box-shadow: 
    0 4px 6px -1px rgba(59, 130, 246, 0.1), 
    0 2px 4px -1px rgba(59, 130, 246, 0.06);
}

/* Regular Shadow */
.shadow-royal {
  box-shadow: 
    0 10px 25px -5px rgba(59, 130, 246, 0.1), 
    0 10px 10px -5px rgba(59, 130, 246, 0.04);
}

/* Large Shadow */
.shadow-royal-lg {
  box-shadow: 
    0 20px 25px -5px rgba(59, 130, 246, 0.1), 
    0 10px 10px -5px rgba(59, 130, 246, 0.04);
}

/* Extra Large Shadow */
.shadow-royal-xl {
  box-shadow: 
    0 25px 50px -12px rgba(59, 130, 246, 0.25), 
    0 0 0 1px rgba(59, 130, 246, 0.05);
}
```

### Shadow RGBA Values

| Opacity | RGBA Value | Usage |
|---------|------------|-------|
| 4% | `rgba(59, 130, 246, 0.04)` | Very subtle shadow |
| 6% | `rgba(59, 130, 246, 0.06)` | Light shadow |
| 10% | `rgba(59, 130, 246, 0.1)` | Regular shadow |
| 25% | `rgba(59, 130, 246, 0.25)` | Strong shadow |
| 30% | `rgba(59, 130, 246, 0.3)` | Hover shadow |
| 40% | `rgba(59, 130, 246, 0.4)` | Glow effect |

---

## 8. Border Gradients

### Royal Border Gradient
```css
.border-gradient-royal {
  border: 1px solid transparent;
  background: 
    linear-gradient(white, white) padding-box, 
    linear-gradient(135deg, hsl(220, 100%, 25%), hsl(220, 85%, 60%)) border-box;
}
```

### Light Royal Border Gradient
```css
.border-gradient-royal-light {
  border: 1px solid transparent;
  background: 
    linear-gradient(white, white) padding-box, 
    linear-gradient(135deg, hsl(220, 85%, 60%), hsl(220, 100%, 70%)) border-box;
}
```

### Subtle Royal Border Gradient
```css
.border-gradient-royal-subtle {
  border: 1px solid transparent;
  background: 
    linear-gradient(white, white) padding-box, 
    linear-gradient(135deg, hsl(220, 20%, 90%), hsl(220, 15%, 95%)) border-box;
}
```

---

## 9. Button Gradients

### Primary Button Gradient
```css
.btn-gradient-royal {
  background: linear-gradient(135deg, 
    hsl(220, 100%, 25%) 0%, 
    hsl(220, 85%, 60%) 100%
  );
  color: white;
  transition: all 0.3s ease;
}

.btn-gradient-royal:hover {
  background: linear-gradient(135deg, 
    hsl(220, 100%, 20%) 0%, 
    hsl(220, 85%, 55%) 100%
  );
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
}
```

### Light Button Gradient
```css
.btn-gradient-royal-light {
  background: linear-gradient(135deg, 
    hsl(220, 85%, 60%) 0%, 
    hsl(220, 100%, 70%) 100%
  );
  color: white;
  transition: all 0.3s ease;
}

.btn-gradient-royal-light:hover {
  background: linear-gradient(135deg, 
    hsl(220, 85%, 55%) 0%, 
    hsl(220, 100%, 65%) 100%
  );
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
}
```

---

## 10. Card Gradients

### Card Gradient
```css
.card-gradient-royal {
  background: linear-gradient(135deg, 
    hsl(220, 10%, 100%) 0%, 
    hsl(220, 5%, 98%) 100%
  );
  border: 1px solid hsl(220, 20%, 90%);
}
```

### Hover Card Gradient
```css
.card-gradient-royal-hover {
  transition: all 0.3s ease;
}

.card-gradient-royal-hover:hover {
  background: linear-gradient(135deg, 
    hsl(220, 15%, 100%) 0%, 
    hsl(220, 10%, 98%) 100%
  );
  transform: translateY(-2px);
  box-shadow: 
    0 20px 25px -5px rgba(59, 130, 246, 0.1), 
    0 10px 10px -5px rgba(59, 130, 246, 0.04);
}
```

---

## 11. Background Patterns

### Royal Pattern
```css
.bg-royal-pattern {
  background-image: 
    radial-gradient(circle at 25% 25%, hsl(220, 85%, 60%, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, hsl(220, 100%, 25%, 0.1) 0%, transparent 50%);
}
```

### Light Royal Pattern
```css
.bg-royal-pattern-light {
  background-image: 
    radial-gradient(circle at 20% 20%, hsl(220, 85%, 60%, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, hsl(220, 100%, 25%, 0.05) 0%, transparent 50%);
}
```

### Dark Royal Pattern
```css
.bg-royal-pattern-dark {
  background-image: 
    radial-gradient(circle at 30% 30%, hsl(220, 85%, 60%, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, hsl(220, 100%, 25%, 0.15) 0%, transparent 50%);
}
```

---

## 12. Glass Effects

### Light Glass Effect
```css
.glass-royal {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Dark Glass Effect
```css
.glass-royal-dark {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 13. Icon Gradients

### Icon Text Gradient
```css
.icon-gradient-royal {
  background: linear-gradient(135deg, 
    hsl(220, 100%, 25%) 0%, 
    hsl(220, 85%, 60%) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Icon Background Gradient
```css
.icon-bg-gradient-royal {
  background: linear-gradient(135deg, 
    hsl(220, 100%, 25%) 0%, 
    hsl(220, 85%, 60%) 100%
  );
}
```

### Light Icon Background Gradient
```css
.icon-bg-gradient-royal-light {
  background: linear-gradient(135deg, 
    hsl(220, 85%, 60%) 0%, 
    hsl(220, 100%, 70%) 100%
  );
}
```

---

## 14. Chart Colors

```css
--chart-1: 220 85% 60%;  /* Primary blue */
--chart-2: 200 85% 60%;  /* Cyan blue */
--chart-3: 240 85% 60%;  /* Purple blue */
--chart-4: 180 85% 60%;  /* Teal */
--chart-5: 160 85% 60%;  /* Green blue */
```

**Hex Values:**
- Chart-1: `#3b82f6` (Primary Royal Blue)
- Chart-2: `#3b9ff6` (Cyan Blue)
- Chart-3: `#6b3bf6` (Purple Blue)
- Chart-4: `#3bf6f6` (Teal)
- Chart-5: `#3bf69f` (Green Blue)

---

## 15. Accent Colors (Special Elements)

### Timeline Multi-color Gradient
```css
background: linear-gradient(to bottom, 
  #3b82f6,  /* Blue-500 */
  #a855f7,  /* Purple-500 */
  #22c55e   /* Green-500 */
);
```

**Colors:**
- Blue-500: `#3b82f6`
- Purple-500: `#a855f7`
- Green-500: `#22c55e`

---

## 16. Admin Panel Specific Colors

### Background Colors
```css
Background: bg-slate-900        /* #0f172a */
Cards: bg-slate-800             /* #1e293b */
Hover: hover:bg-slate-700       /* #334155 */
```

### Border Colors
```css
Border: border-slate-700        /* #334155 */
Hover Border: hover:border-slate-600  /* #475569 */
```

### Input Colors
```css
Input Background: bg-slate-700  /* #334155 */
Input Border: border-slate-600  /* #475569 */
```

### Text Colors
```css
Primary Text: text-white        /* #ffffff */
Secondary Text: text-slate-300  /* #cbd5e1 */
Muted Text: text-slate-400      /* #94a3b8 */
Subtle Text: text-slate-500     /* #64748b */
Placeholder: placeholder-slate-400  /* #94a3b8 */
```

---

## 17. Text Shadow Effects

### Royal Text Shadow
```css
.text-shadow-royal {
  text-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}
```

### Large Royal Text Shadow
```css
.text-shadow-royal-lg {
  text-shadow: 0 8px 16px rgba(59, 130, 246, 0.4);
}
```

---

## 18. Hover Effects

### Lift Hover Effect
```css
.hover-lift {
  transition: all 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
}
```

### Glow Hover Effect
```css
.hover-glow {
  transition: all 0.3s ease;
}

.hover-glow:hover {
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
}
```

### Scale Hover Effect
```css
.animate-scale-hover {
  transition: transform 0.2s ease-in-out;
}

.animate-scale-hover:hover {
  transform: scale(1.05);
}
```

### Slide Up Hover Effect
```css
.animate-slide-up-hover {
  transition: transform 0.3s ease-in-out;
}

.animate-slide-up-hover:hover {
  transform: translateY(-2px);
}
```

---

## 19. Typography

### Font Families
```css
font-body: 'PT Sans', sans-serif;
font-headline: 'Space Grotesk', sans-serif;
font-code: monospace;
```

### Font Weights
- PT Sans: 400 (regular), 700 (bold)
- Space Grotesk: 300, 400, 500, 600, 700

---

## 20. Opacity Variations

### Common Opacity Values
| Value | Percentage | Usage |
|-------|------------|-------|
| /5 | 5% | Very subtle overlays |
| /10 | 10% | Subtle backgrounds |
| /20 | 20% | Light overlays |
| /30 | 30% | Medium overlays |
| /40 | 40% | Noticeable overlays |
| /50 | 50% | Half transparency |
| /60 | 60% | Prominent overlays |
| /70 | 70% | Strong overlays |
| /80 | 80% | Very strong overlays |
| /90 | 90% | Almost opaque |

---

## 21. Animation Classes

### Fade In Animations
```css
.animate-fade-in         /* Opacity: 0 → 1 */
.animate-fade-in-up      /* Fade + slide up */
```

### Slide Animations
```css
.animate-slide-in-left   /* Slide from left */
.animate-slide-in-right  /* Slide from right */
.animate-slide-in-up     /* Slide from bottom */
```

### Scale Animations
```css
.animate-scale-in        /* Scale: 0.8 → 1 */
.animate-zoom-in         /* Scale: 0.9 → 1 */
```

### Special Animations
```css
.animate-pulse-slow      /* Slow pulse effect */
.animate-bounce-gentle   /* Gentle bounce */
.animate-float           /* Floating effect */
.animate-shimmer         /* Shimmer effect */
.animate-glow-pulse      /* Glowing pulse */
```

### Animation Delays
```css
.animation-delay-100     /* 0.1s delay */
.animation-delay-200     /* 0.2s delay */
.animation-delay-300     /* 0.3s delay */
/* ... up to ... */
.animation-delay-1000    /* 1s delay */
```

---

## 22. Color Temperature & Psychology

### Primary Hue: 220° (Royal Blue)
- **Temperature:** Cool
- **Psychology:** Trust, reliability, professionalism, technology
- **Industry Fit:** Semiconductor, engineering, technology

### Why Royal Blue?
1. **Professional:** Conveys expertise and authority
2. **Technical:** Associated with innovation and technology
3. **Trust:** Inspires confidence in engineering solutions
4. **Visibility:** High contrast, accessible
5. **Brand Identity:** Distinctive and memorable

---

## 23. Accessibility Considerations

### Color Contrast Ratios
- **Primary text on background:** >7:1 (AAA)
- **Secondary text on background:** >4.5:1 (AA)
- **Button text on primary:** >4.5:1 (AA)

### Focus States
- All interactive elements use `--ring` color (Royal Blue)
- Focus ring: `0 0 0 3px rgba(59, 130, 246, 0.5)`

---

## 24. Usage Guidelines

### When to Use Each Color

**Royal Blue (Primary):**
- Call-to-action buttons
- Links and interactive elements
- Brand accents
- Focus states

**Slate Grays:**
- Backgrounds (900, 800, 700)
- Text (300, 400, 500)
- Borders (600, 700)
- Disabled states (400, 500)

**Gradients:**
- Hero sections (royal-hero)
- Cards (card-gradient-royal)
- Buttons (btn-gradient-royal)
- Text highlights (text-gradient-royal)

**Shadows:**
- Cards and elevated elements (shadow-royal)
- Hover states (shadow-royal-lg)
- Modals and overlays (shadow-royal-xl)

---

## 25. Quick Reference

### Most Common Color Combinations

**Hero Sections:**
```
bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800
```

**Cards:**
```
bg-slate-800 border-slate-700
```

**Primary Buttons:**
```
bg-blue-600 hover:bg-blue-700 text-white
```

**Input Fields:**
```
bg-slate-700 border-slate-600 text-white placeholder-slate-400
```

**Headings:**
```
text-white or text-gradient-royal
```

**Body Text:**
```
text-slate-300 (primary)
text-slate-400 (secondary)
text-slate-500 (muted)
```

---

## 26. Brand Color Values

### Primary Brand Color
**Royal Blue:**
- HSL: `hsl(220, 85%, 60%)`
- RGB: `rgb(59, 130, 246)`
- HEX: `#3b82f6`

### Secondary Brand Colors
**Dark Royal Blue:**
- HSL: `hsl(220, 100%, 25%)`
- RGB: `rgb(0, 42, 128)`
- HEX: `#002a80`

**Light Royal Blue:**
- HSL: `hsl(220, 100%, 70%)`
- RGB: `rgb(102, 153, 255)`
- HEX: `#6699ff`

---

## Conclusion

This color system creates a cohesive, professional design centered around **Royal Blue (#3b82f6 / hsl(220, 85%, 60%))** with dark mode aesthetics using slate grays for depth and contrast. The system is designed to be:

- **Consistent:** All colors derive from the primary hue of 220°
- **Accessible:** High contrast ratios for readability
- **Professional:** Tech-focused, trustworthy appearance
- **Flexible:** Multiple gradients and variations for different use cases
- **Scalable:** Easy to extend with new variations

---

**Last Updated:** November 23, 2025  
**Version:** 1.0  
**Maintained by:** Semixon Development Team

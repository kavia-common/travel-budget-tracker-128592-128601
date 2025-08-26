# Trip Tracker Design System

This folder contains the design tokens and component-level variables for a modern, pastel, travel-inspired UI.

Files:
- tokens.css: color palette, gradients, typography, spacing, radii, and shadows.
- components.css: component-level variables and utilities (container, grid, stack, buttons, badges).

Usage:
- tokens.css and components.css are globally imported from src/index.css.
- Build new components using variables (e.g., var(--space-6), var(--radius-lg)) for consistent spacing and look.
- Prefer the .btn class and utilities here over duplicating styles in component files.

Palette:
- Primary (teal): #6CC6CB
- Secondary (peach): #F6C7B6
- Accent (sunny): #FFD46B

Card Component:
- See src/components/common/Card.jsx and its card.css for a reusable rounded card with soft shadows and pastel variants.

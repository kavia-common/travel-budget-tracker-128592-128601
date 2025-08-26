import React from 'react';
import './card.css';

/**
 * PUBLIC_INTERFACE
 * Reusable Card component with rounded corners, soft shadows, and pastel variants.
 * Props:
 * - title?: string | ReactNode - Optional header title
 * - subtitle?: string | ReactNode - Optional subtitle below the title
 * - variant?: 'default' | 'teal' | 'peach' | 'sun' - Pastel background hue
 * - gradient?: boolean - If true, applies a soft pastel gradient overlay
 * - padded?: boolean - If false, removes inner padding
 * - footer?: ReactNode - Optional footer area (actions, meta)
 * - className?: string - Additional classNames
 */
export default function Card({
  title,
  subtitle,
  variant = 'default',
  gradient = false,
  padded = true,
  footer,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'tt-card',
    padded ? 'padded' : 'no-pad',
    variant !== 'default' ? `variant-${variant}` : '',
    gradient ? 'with-gradient' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} {...rest}>
      {(title || subtitle) && (
        <header className="tt-card__header">
          {typeof title === 'string' ? <h3 className="tt-card__title">{title}</h3> : title}
          {subtitle && (
            typeof subtitle === 'string' ? <p className="tt-card__subtitle">{subtitle}</p> : subtitle
          )}
        </header>
      )}
      <div className="tt-card__body">{children}</div>
      {footer && <footer className="tt-card__footer">{footer}</footer>}
    </section>
  );
}

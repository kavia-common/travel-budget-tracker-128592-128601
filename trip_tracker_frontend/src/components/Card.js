import React from 'react';
import clsx from 'clsx';

/**
 * PUBLIC_INTERFACE
 * Card component for consistent rounded, soft shadow layout.
 */
export default function Card({ title, subtitle, className, gradient=false, children, toolbar }) {
  return (
    <div className={clsx('card', gradient && 'gradient', className)}>
      {(title || toolbar) && (
        <div style={{display:'flex', alignItems:'center', marginBottom: 8, gap: 8}}>
          {title && (
            <div style={{display:'grid'}}>
              <div style={{fontWeight:800}}>{title}</div>
              {subtitle && <div style={{fontSize:12, color:'var(--muted)'}}>{subtitle}</div>}
            </div>
          )}
          <div style={{marginLeft:'auto'}}>{toolbar}</div>
        </div>
      )}
      {children}
    </div>
  );
}

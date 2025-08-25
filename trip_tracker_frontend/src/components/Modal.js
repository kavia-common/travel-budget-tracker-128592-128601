import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Simple centered modal overlay.
 */
export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.2)', display:'grid', placeItems:'center', zIndex:50
    }} onClick={onClose}>
      <div className="card" style={{width:'min(520px, 94vw)'}} onClick={e => e.stopPropagation()}>
        {title && <div style={{fontWeight:800, marginBottom:8}}>{title}</div>}
        <div>{children}</div>
        {footer && <div style={{marginTop:12, display:'flex', gap:8, justifyContent:'flex-end'}}>{footer}</div>}
      </div>
    </div>
  );
}

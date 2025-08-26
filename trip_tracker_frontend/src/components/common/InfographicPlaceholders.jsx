import React from 'react';

/**
 * PUBLIC_INTERFACE
 * A small collection of SVG-based infographic placeholders to visualize future charts.
 * - DonutChartPlaceholder: concentric ring with segments
 * - BarChartPlaceholder: grouped bars with subtle animation accents
 * - TrendLinePlaceholder: line chart with gradient fill
 *
 * These are purely decorative placeholders and inherit currentColor for stroke/fill accents
 * while using CSS variables for tints.
 */
export function DonutChartPlaceholder({ size = 140, className = '' }) {
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  // Fake segments as stroke-dasharray lengths
  const segments = [
    { pct: 0.42, color: 'var(--color-primary)' },
    { pct: 0.28, color: 'var(--color-secondary)' },
    { pct: 0.17, color: 'var(--color-accent)' },
    { pct: 0.13, color: 'var(--color-text-muted)' },
  ];

  let offset = 0;
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Donut chart placeholder"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth={stroke}
        opacity="0.5"
      />
      {segments.map((s, idx) => {
        const len = c * s.pct;
        const dasharray = `${len} ${c - len}`;
        const el = (
          <circle
            key={idx}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={s.color}
            strokeLinecap="round"
            strokeWidth={stroke}
            strokeDasharray={dasharray}
            strokeDashoffset={-offset}
          />
        );
        offset += len;
        return el;
      })}
      <circle cx={size / 2} cy={size / 2} r={r - stroke} fill="var(--color-surface)" opacity="0.9" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="14"
        fill="var(--color-text)"
      >
        100%
      </text>
    </svg>
  );
}

// Simple bar chart with three groups
export function BarChartPlaceholder({ width = '100%', height = 140, className = '' }) {
  const w = 280;
  const h = 140;
  const pad = 14;
  const max = 100;
  const bars = [
    { label: 'Food', values: [70, 52, 84], colors: ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)'] },
    { label: 'Stay', values: [40, 36, 64], colors: ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)'] },
    { label: 'Move', values: [55, 78, 45], colors: ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)'] },
    { label: 'Fun',  values: [32, 50, 26], colors: ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)'] },
  ];
  const groupW = (w - pad * 2) / bars.length;
  const barW = (groupW - 16) / 3;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      role="img"
      aria-label="Bar chart placeholder"
    >
      <rect x="0" y="0" width={w} height={h} fill="none" />
      {/* grid lines */}
      {[0.25, 0.5, 0.75].map((g, i) => (
        <line
          key={i}
          x1={pad}
          x2={w - pad}
          y1={h - pad - g * (h - pad * 2)}
          y2={h - pad - g * (h - pad * 2)}
          stroke="var(--color-border)"
          strokeWidth="1"
          opacity="0.7"
        />
      ))}
      {bars.map((b, gi) =>
        b.values.map((v, bi) => {
          const x = pad + gi * groupW + 8 + bi * barW;
          const bh = ((h - pad * 2) * v) / max;
          const y = h - pad - bh;
          return (
            <rect
              key={`${gi}-${bi}`}
              x={x}
              y={y}
              width={barW - 4}
              height={bh}
              rx="6"
              fill={b.colors[bi]}
              opacity="0.85"
            />
          );
        })
      )}
    </svg>
  );
}

export function TrendLinePlaceholder({ width = '100%', height = 140, className = '' }) {
  const w = 320;
  const h = 140;
  const pad = 14;
  // simple path through points
  const points = [
    [pad, h - 60],
    [80, h - 40],
    [140, h - 80],
    [200, h - 30],
    [260, h - 50],
    [w - pad, h - 28],
  ];
  const d = points.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(' ');

  // Create a light gradient id that will be unique enough in this component scope
  const gid = 'trendGrad';

  return (
    <svg width={width} height={height} viewBox={`0 0 ${w} ${h}`} className={className} role="img" aria-label="Trend line placeholder">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={w} height={h} fill="none" />
      <path d={d} fill="none" stroke="var(--color-primary)" strokeWidth="2.5" />
      <path
        d={`${d} L ${w - pad},${h - pad} L ${pad},${h - pad} Z`}
        fill={`url(#${gid})`}
        opacity="0.9"
      />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="var(--color-secondary)" />
      ))}
    </svg>
  );
}

// PUBLIC_INTERFACE
export default function InfographicPlaceholders() {
  /** Renders a small gallery of placeholders */
  return (
    <div className="grid grid-3">
      <div className="stack-sm">
        <strong>Spending Split</strong>
        <DonutChartPlaceholder />
      </div>
      <div className="stack-sm">
        <strong>Category Trends</strong>
        <BarChartPlaceholder />
      </div>
      <div className="stack-sm">
        <strong>Budget Progress</strong>
        <TrendLinePlaceholder />
      </div>
    </div>
  );
}

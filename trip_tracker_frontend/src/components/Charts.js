import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

/**
 * PUBLIC_INTERFACE
 * CategoryPie shows spending breakdown by category.
 */
export function CategoryPie({ data }) {
  const colors = ['#6CC6CB','#F6C7B6','#FFD46B','#A6E1E5','#F8D7CD','#FFF0BD','#B8E6EA','#EBD3CA'];
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));
  if (!chartData.length) return <div style={{color:'var(--muted)'}}>No data</div>;
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
          {chartData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

/**
 * PUBLIC_INTERFACE
 * SpendingBar shows bar chart per category.
 */
export function SpendingBar({ data }) {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));
  if (!chartData.length) return <div style={{color:'var(--muted)'}}>No data</div>;
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#6CC6CB" />
      </BarChart>
    </ResponsiveContainer>
  );
}

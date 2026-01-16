import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import styles from "../../styles/LeadsChart.module.css";

/* ---------- Tooltip ---------- */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{label}</p>
        <p className={styles.tooltipValue}>
          {payload[0].value} leads
        </p>
      </div>
    );
  }
  return null;
};

export default function LeadSourcesChart({ data = [] }) {
  const chartData =
    Array.isArray(data) && data.length > 0
      ? data
      : [{ source: "No Data", count: 1 }];

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Leads by Source</h3>

      <div className={styles.chartWrapper}>
        {/* 🔥 FIXED SIZE BAR CHART */}
        <BarChart
          width={420}
          height={280}
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            horizontal
            vertical={false}
          />

          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <YAxis
            type="category"
            dataKey="source"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
            width={120}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="count"
            fill="#6366f1"
            radius={[0, 6, 6, 0]}
            barSize={22}
          />
        </BarChart>
      </div>
    </div>
  );
}

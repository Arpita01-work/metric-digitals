import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import styles from "../../styles/LeadsChart.module.css";

/* ---------- Custom Tooltip ---------- */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{label}</p>

        <div className={styles.tooltipItems}>
          {payload.map((entry, index) => (
            <div key={index} className={styles.tooltipItem}>
              <div
                className={styles.tooltipDot}
                style={{ backgroundColor: entry.color }}
              />
              <span className={styles.tooltipValue}>{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

/* ---------- Main Component ---------- */
export default function LeadsChart({ data = [], period, onPeriodChange }) {
  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Leads & Requests</h3>
          <p className={styles.subtitle}>Overview of lead acquisition</p>
        </div>

        <Select value={period} onValueChange={onPeriodChange}>
          <SelectTrigger className={styles.selectTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="leads"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#colorLeads)"
            />
            <Area
              type="monotone"
              dataKey="requests"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorRequests)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.leadsDot}`} />
          <span className={styles.legendText}>Leads</span>
        </div>

        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.requestsDot}`} />
          <span className={styles.legendText}>Requests</span>
        </div>
      </div>
    </div>
  );
}

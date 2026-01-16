import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import styles from "../../styles/LeadsChart.module.css";

/* ---------- Custom Tooltip ---------- */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className={styles.tooltipItem}>
            <span>{entry.name}: </span>
            <strong>{entry.value}</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

/* ---------- Main Component ---------- */
export default function LeadsChart({
  data = [],
  period,
  onPeriodChange,
}) {
  const periodLabelMap = {
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
  };

  // 🔥 GUARANTEE VALID DATA
  const safeData =
    Array.isArray(data) && data.length > 0
      ? data
      : [
          { name: "No Data", leads: 0, requests: 0 },
        ];

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Leads & Requests</h3>
          <p className={styles.subtitle}>
            Overview of lead acquisition
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={styles.selectTrigger}>
              {periodLabelMap[period] || "Select Period"}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onPeriodChange("weekly")}>
              Weekly
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPeriodChange("monthly")}>
              Monthly
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPeriodChange("yearly")}>
              Yearly
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 🔥 CHART (NO ResponsiveContainer) */}
      <AreaChart
        width={600}          // ✅ FIXED WIDTH
        height={280}         // ✅ FIXED HEIGHT
        data={safeData}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
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

        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey="leads"
          stroke="#6366f1"
          fill="url(#colorLeads)"
        />

        <Area
          type="monotone"
          dataKey="requests"
          stroke="#10b981"
          fill="url(#colorRequests)"
        />
      </AreaChart>
    </div>
  );
}

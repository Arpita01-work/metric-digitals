import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import styles from "../../styles/TopServicesChart.module.css";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
];

const serviceLabels = {
  seo: "SEO",
  ppc: "PPC",
  social_media: "Social Media",
  content_marketing: "Content Marketing",
  email_marketing: "Email Marketing",
  web_design: "Web Design",
  branding: "Branding",
  analytics: "Analytics",
  consulting: "Consulting",
  other: "Other",
};

/* ---------- Tooltip ---------- */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{payload[0].name}</p>
        <p className={styles.tooltipValue}>{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function TopServicesChart({ data = [] }) {
  // ✅ GUARANTEE NON-EMPTY DATA
  const chartData =
    Array.isArray(data) && data.length > 0
      ? data.map((item) => ({
          name: serviceLabels[item.service] || item.service,
          value: item.count,
        }))
      : [{ name: "No Data", value: 1 }];

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Top Services</h3>

      {/* 🔥 FIXED SIZE CHART — WILL RENDER 100% */}
      <div className={styles.chartWrapper}>
        <PieChart width={300} height={300}>
          <Pie
            data={chartData}
            cx={150}
            cy={150}
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        {chartData.slice(0, 6).map((item, index) => (
          <div key={item.name} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{
                backgroundColor: COLORS[index % COLORS.length],
              }}
            />
            <span className={styles.legendName}>{item.name}</span>
            <span className={styles.legendValue}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

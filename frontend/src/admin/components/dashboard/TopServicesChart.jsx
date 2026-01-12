import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
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

/* ---------- Custom Tooltip ---------- */
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

/* ---------- Main Component ---------- */
export default function TopServicesChart({ data = [] }) {
  const chartData = data.map((item) => ({
    name: serviceLabels[item.service] || item.service,
    value: item.count,
  }));

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Top Services</h3>

      {chartData.length === 0 ? (
        <div className={styles.emptyState}>No service data available</div>
      ) : (
        <>
          {/* Chart */}
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className={styles.legend}>
            {chartData.slice(0, 6).map((item, index) => (
              <div key={item.name} className={styles.legendItem}>
                <div
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
        </>
      )}
    </div>
  );
}

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, subDays } from "date-fns";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Users,
  FileText,
  Target,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "../components/ui";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui";

import { AnalyticsAPI } from "../../api/analytics.api";
import styles from "../styles/Analytics.module.css";

/* ---------- Colors ---------- */
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

/* ---------- Tooltip ---------- */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className={styles.tooltipRow}>
            <span
              className={styles.tooltipDot}
              style={{ backgroundColor: entry.color }}
            />
            <span className={styles.tooltipValue}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [period, setPeriod] = useState("30");

  /* ---------- Queries ---------- */
  const { data: leads = [], isLoading: leadsLoading } = useQuery({
    queryKey: ["analytics-leads"],
    queryFn: AnalyticsAPI.getLeads,
  });

  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["analytics-requests"],
    queryFn: AnalyticsAPI.getRequests,
  });

  const isLoading = leadsLoading || requestsLoading;

  /* ---------- Time Series ---------- */
  const timeSeriesData = useMemo(() => {
    const days = Number(period);

    return Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - i - 1);
      const key = format(date, "yyyy-MM-dd");

      return {
        name: format(date, "MMM d"),
        leads: leads.filter(
          (l) =>
            format(new Date(l.created_date), "yyyy-MM-dd") === key
        ).length,
        requests: requests.filter(
          (r) =>
            format(new Date(r.created_date), "yyyy-MM-dd") === key
        ).length,
      };
    });
  }, [leads, requests, period]);

  /* ---------- Requests by Service (FIXED) ---------- */
  const requestsByService = useMemo(() => {
    const map = {};

    requests.forEach((r) => {
      map[r.service] = (map[r.service] || 0) + 1;
    });

    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
    }));
  }, [requests]);

  /* ---------- Stats ---------- */
  const stats = useMemo(() => {
    const converted = leads.filter(
      (l) => l.status === "converted"
    ).length;

    return {
      totalLeads: leads.length,
      totalRequests: requests.length,
      conversionRate:
        leads.length > 0
          ? ((converted / leads.length) * 100).toFixed(1)
          : 0,
      avgTouchCount:
        leads.length > 0
          ? (
              leads.reduce(
                (sum, l) => sum + (l.touch_count || 0),
                0
              ) / leads.length
            ).toFixed(1)
          : 0,
    };
  }, [leads, requests]);

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Analytics</h1>
          <p className={styles.pageSubtitle}>
            Track your marketing performance
          </p>
        </div>

        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className={styles.select}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className={styles.statSkeleton} />
              ))
          : (
            <>
              <StatCard icon={<Users />} value={stats.totalLeads} label="Total Leads" />
              <StatCard icon={<FileText />} value={stats.totalRequests} label="Total Requests" />
              <StatCard icon={<Target />} value={`${stats.conversionRate}%`} label="Conversion Rate" />
              <StatCard icon={<TrendingUp />} value={stats.avgTouchCount} label="Avg. Touch Count" />
            </>
          )}
      </div>

      {/* Charts */}
      <div className={styles.gridTwo}>
        <ChartCard title="Leads Over Time" loading={isLoading}>
          <AreaChart data={timeSeriesData}>
            <CartesianGrid stroke="#f1f5f9" vertical={false} />
            <XAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              dataKey="leads"
              stroke="#6366f1"
              fillOpacity={0.2}
              fill="#6366f1"
            />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Requests by Service" loading={isLoading}>
          <PieChart>
            <Pie
              data={requestsByService}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
            >
              {requestsByService.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ChartCard>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */
function StatCard({ icon, value, label }) {
  return (
    <Card className={styles.statCard}>
      <CardContent className={styles.statContent}>
        <div className={styles.statIcon}>{icon}</div>
        <div>
          <p className={styles.statValue}>{value}</p>
          <p className={styles.statLabel}>{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ChartCard({ title, loading, children }) {
  return (
    <Card className={styles.chartCard}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className={styles.chartContent}>
        {loading ? (
          <Skeleton className={styles.chartSkeleton} />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

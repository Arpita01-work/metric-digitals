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
  Legend,
} from "recharts";
import { TrendingUp, Users, FileText, Target } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "../components/ui";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";

import { Button } from "../components/ui/button";
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

export default function Analytics() {
  const [period, setPeriod] = useState("30");

  const { data: leads = [], isLoading: leadsLoading } = useQuery({
    queryKey: ["analytics-leads"],
    queryFn: AnalyticsAPI.getLeads,
  });

  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["analytics-requests"],
    queryFn: AnalyticsAPI.getRequests,
  });

  const isLoading = leadsLoading || requestsLoading;

  const safeLeads = useMemo(
    () =>
      Array.isArray(leads)
        ? leads.filter(l => l.created_date)
        : [],
    [leads]
  );

  const safeRequests = useMemo(
    () =>
      Array.isArray(requests)
        ? requests.filter(r => r.created_date)
        : [],
    [requests]
  );

  /* ---------- TIME SERIES ---------- */
  const timeSeriesData = useMemo(() => {
    const days = Number(period);
    const baseDate = new Date();

    return Array.from({ length: days }, (_, i) => {
      const date = subDays(baseDate, days - i - 1);
      const key = format(date, "yyyy-MM-dd");

      return {
        name: format(date, "MMM d"),
        leads: safeLeads.filter(
          l => format(new Date(l.created_date), "yyyy-MM-dd") === key
        ).length,
        requests: safeRequests.filter(
          r => format(new Date(r.created_date), "yyyy-MM-dd") === key
        ).length,
      };
    });
  }, [safeLeads, safeRequests, period]);

  /* ---------- REQUESTS BY SERVICE ---------- */
  const requestsByService = useMemo(() => {
    const map = {};
    safeRequests.forEach(r => {
      map[r.service] = (map[r.service] || 0) + 1;
    });

    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
    }));
  }, [safeRequests]);

  /* ---------- STATS ---------- */
  const stats = useMemo(() => {
    const converted = safeLeads.filter(l => l.status === "converted").length;

    return {
      totalLeads: safeLeads.length,
      totalRequests: safeRequests.length,
      conversionRate:
        safeLeads.length > 0
          ? ((converted / safeLeads.length) * 100).toFixed(1)
          : 0,
      avgTouchCount:
        safeLeads.length > 0
          ? (
              safeLeads.reduce(
                (sum, l) => sum + (l.touch_count || 0),
                0
              ) / safeLeads.length
            ).toFixed(1)
          : 0,
    };
  }, [safeLeads, safeRequests]);

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className={styles.select}>
              {period === "7"
                ? "Last 7 days"
                : period === "30"
                ? "Last 30 days"
                : "Last 90 days"}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setPeriod("7")}>
              Last 7 days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPeriod("30")}>
              Last 30 days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPeriod("90")}>
              Last 90 days
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {isLoading ? (
          Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className={styles.statSkeleton} />
            ))
        ) : (
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
          <AreaChart width={420} height={280} data={timeSeriesData}>
            <CartesianGrid stroke="#f1f5f9" vertical={false} />
            <XAxis />
            <YAxis />
            <Tooltip />
            <Area dataKey="leads" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Requests by Service" loading={isLoading}>
          <PieChart width={420} height={280}>
            <Pie
              data={requestsByService}
              dataKey="value"
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
          children
        )}
      </CardContent>
    </Card>
  );
}

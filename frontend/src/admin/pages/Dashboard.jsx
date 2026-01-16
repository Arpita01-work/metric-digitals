// Dashboard.jsx
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, FileText, TrendingUp, UserPlus } from "lucide-react";
import { format, subDays, startOfWeek, isAfter } from "date-fns";
import { AreaChart, XAxis, Area,YAxis, ResponsiveContainer, Tooltip } from "recharts";
import StatCard from "../components/dashboard/StatCard";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import LeadsChart from "../components/dashboard/LeadsChart";
import TopServicesChart from "../components/dashboard/TopServicesChart";
import LeadSourcesChart from "../components/dashboard/LeadSourcesChart";
import { Skeleton } from "../components/ui/skeleton";

import { fetchLeads, fetchLeadRequests } from "../../api/adminApi";
import styles from "../styles/dashboard.module.css";

export default function Dashboard() {
  const [chartPeriod, setChartPeriod] = useState("monthly");

  /* ------------------ FETCH DATA ------------------ */
  const { data: leads = [], isLoading: leadsLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: fetchLeads,
    keepPreviousData: true,
  });

  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchLeadRequests,
    keepPreviousData: true,
  });

  /* ------------------ SANITIZE DATA ------------------ */
  const safeLeads = useMemo(
    () =>
      leads.filter(
        (l) => l.created_date && !isNaN(new Date(l.created_date))
      ),
    [leads]
  );

  const safeRequests = useMemo(
    () =>
      requests.filter(
        (r) => r.created_date && !isNaN(new Date(r.created_date))
      ),
    [requests]
  );

  /* ------------------ STATS ------------------ */
  const stats = useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today);

    const newLeadsToday = safeLeads.filter(
      (l) =>
        format(new Date(l.created_date), "yyyy-MM-dd") ===
        format(today, "yyyy-MM-dd")
    ).length;

    const newLeadsWeek = safeLeads.filter((l) =>
      isAfter(new Date(l.created_date), weekStart)
    ).length;

    const convertedLeads = safeLeads.filter(
      (l) => l.status === "converted"
    ).length;

    const conversionRate =
      safeLeads.length > 0
        ? ((convertedLeads / safeLeads.length) * 100).toFixed(1)
        : 0;

        console.log("NOW:", new Date());
console.log("LEAD DATES:", safeLeads.map(l => l.created_date));


    return {
      totalLeads: safeLeads.length,
      newLeadsToday,
      newLeadsWeek,
      totalRequests: safeRequests.length,
      conversionRate,
    };
  }, [safeLeads, safeRequests]);

  /* ------------------ TOP SERVICES ------------------ */
  const topServices = useMemo(() => {
    const serviceCounts = {};
    safeRequests.forEach((r) => {
      serviceCounts[r.service] = (serviceCounts[r.service] || 0) + 1;
    });

    return Object.entries(serviceCounts)
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [safeRequests]);

  /* ------------------ LEAD SOURCES ------------------ */
  const leadSources = useMemo(() => {
    const sourceCounts = {};
    safeLeads.forEach((l) => {
      const source = l.lead_source || "Direct";
      sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    });

    return Object.entries(sourceCounts)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [safeLeads]);

  /* ------------------ CHART DATA ------------------ */
  const chartData = useMemo(() => {
    const days =
      chartPeriod === "weekly" ? 7 : chartPeriod === "monthly" ? 30 : 12;

    return Array.from({ length: days }, (_, i) => {
      const baseDate =
  safeLeads.length > 0
    ? new Date(safeLeads[0].created_date)
    : new Date();

const date = subDays(baseDate, days - i - 1);

      const dateStr = format(date, "yyyy-MM-dd");

      return {
        name:
          chartPeriod === "yearly"
            ? format(date, "MMM")
            : format(date, "dd MMM"),
        leads: safeLeads.filter(
          (l) =>
            format(new Date(l.created_date), "yyyy-MM-dd") === dateStr
        ).length,
        requests: safeRequests.filter(
          (r) =>
            format(new Date(r.created_date), "yyyy-MM-dd") === dateStr
        ).length,
      };
    });
  }, [safeLeads, safeRequests, chartPeriod]);

  /* ------------------ ACTIVITY FEED ------------------ */
  const activities = useMemo(() => {
    const all = [
      ...safeLeads.slice(0, 5).map((l) => ({
        type: l.status === "converted" ? "converted" : "lead",
        title: l.name,
        subtitle:
          l.status === "converted"
            ? "was converted"
            : "joined as a new lead",
        date: l.created_date,
      })),
      ...safeRequests.slice(0, 5).map((r) => ({
        type: "request",
        title: r.lead_name || "Unknown",
        subtitle: `requested ${r.service}`,
        date: r.created_date,
      })),
    ];

    return all
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8);
  }, [safeLeads, safeRequests]);

  const isInitialLoading = leadsLoading || requestsLoading;

  /* ------------------ UI ------------------ */
  return (
    
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your business.</p>
      </div>

      <div className={styles.statsGrid}>
        {isInitialLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className={styles.skeletonStat} />
              ))
          : (
            <>
              <StatCard title="Total Leads" value={stats.totalLeads} icon={Users} />
              <StatCard title="New This Week" value={stats.newLeadsWeek} icon={UserPlus} />
              <StatCard title="Total Requests" value={stats.totalRequests} icon={FileText} />
              <StatCard
                title="Conversion Rate"
                value={`${stats.conversionRate}%`}
                icon={TrendingUp}
              />
            </>
          )}
      </div>

      <div className={styles.chartsRow}>
        {isInitialLoading ? (
          <Skeleton className={styles.skeletonChart} />
        ) : (
          <LeadsChart
            data={chartData}
            period={chartPeriod}
            onPeriodChange={setChartPeriod}
          />
        )}

        {isInitialLoading ? (
          <Skeleton className={styles.skeletonChart} />
        ) : (
          <TopServicesChart data={topServices} />
        )}
      </div>

      <div className={styles.bottomRow}>
        {isInitialLoading ? (
          <>
            <Skeleton className={styles.skeletonSmall} />
            <Skeleton className={styles.skeletonSmall} />
          </>
        ) : (
          <>
            <LeadSourcesChart data={leadSources} />
            <ActivityFeed activities={activities} />
          </>
        )}
      </div>
    </div>
    
  );
  
}

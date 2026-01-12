// Dashboard.jsx
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, FileText, TrendingUp, UserPlus } from "lucide-react";
import { format, subDays, startOfWeek, isAfter } from "date-fns";

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


  const stats = useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today);

    const newLeadsToday = leads.filter(
      (l) =>
        format(new Date(l.created_date), "yyyy-MM-dd") ===
        format(today, "yyyy-MM-dd")
    ).length;

    const newLeadsWeek = leads.filter((l) =>
      isAfter(new Date(l.created_date), weekStart)
    ).length;

    const convertedLeads = leads.filter(
      (l) => l.status === "converted"
    ).length;

    const conversionRate =
      leads.length > 0
        ? ((convertedLeads / leads.length) * 100).toFixed(1)
        : 0;

    return {
      totalLeads: leads.length,
      newLeadsToday,
      newLeadsWeek,
      totalRequests: requests.length,
      conversionRate,
    };
  }, [leads, requests]);

  const topServices = useMemo(() => {
    const serviceCounts = {};
    requests.forEach((r) => {
      serviceCounts[r.service] = (serviceCounts[r.service] || 0) + 1;
    });

    return Object.entries(serviceCounts)
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [requests]);

  const leadSources = useMemo(() => {
    const sourceCounts = {};
    leads.forEach((l) => {
      const source = l.lead_source || "Direct";
      sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    });

    return Object.entries(sourceCounts)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [leads]);

  const chartData = useMemo(() => {
    const days =
      chartPeriod === "weekly" ? 7 : chartPeriod === "monthly" ? 30 : 12;

    return Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - i - 1);
      const dateStr = format(date, "yyyy-MM-dd");

      return {
        name:
          chartPeriod === "yearly"
            ? format(date, "MMM")
            : format(date, "dd MMM"),
        leads: leads.filter(
          (l) =>
            format(new Date(l.created_date), "yyyy-MM-dd") === dateStr
        ).length,
        requests: requests.filter(
          (r) =>
            format(new Date(r.created_date), "yyyy-MM-dd") === dateStr
        ).length,
      };
    });
  }, [leads, requests, chartPeriod]);

  const activities = useMemo(() => {
    const all = [
      ...leads.slice(0, 5).map((l) => ({
        type: l.status === "converted" ? "converted" : "lead",
        title: l.name,
        subtitle:
          l.status === "converted"
            ? "was converted"
            : "joined as a new lead",
        date: l.created_date,
      })),
      ...requests.slice(0, 5).map((r) => ({
        type: "request",
        title: r.lead_name || "Unknown",
        subtitle: `requested ${r.service}`,
        date: r.created_date,
      })),
    ];

    return all
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8);
  }, [leads, requests]);

const isInitialLoading = leadsLoading || requestsLoading;

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
        {isInitialLoading  ? (
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

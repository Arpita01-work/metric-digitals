import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { RequestsAPI } from "../../api/requests.api";
import { Link } from "react-router-dom";
import { createPageUrl } from "../lib/utils";
import { format } from "date-fns";
import { Search, ExternalLink } from "lucide-react";

import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import styles from "../styles/Requests.module.css";

/* ---------- Config ---------- */
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

const serviceStyles = {
  seo: "seo",
  ppc: "ppc",
  social_media: "social",
  content_marketing: "content",
  email_marketing: "email",
  web_design: "web",
  branding: "branding",
  analytics: "analytics",
  consulting: "consulting",
  other: "other",
};

const statusConfig = {
  pending: { label: "Pending", style: "pending" },
  in_progress: { label: "In Progress", style: "progress" },
  completed: { label: "Completed", style: "completed" },
  cancelled: { label: "Cancelled", style: "cancelled" },
};

export default function Requests() {
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  /* ---------- API ---------- */
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: RequestsAPI.getAll,
  });

  /* ---------- Filtering ---------- */
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchesSearch =
        !search ||
        r.lead_name?.toLowerCase().includes(search.toLowerCase()) ||
        r.lead_email?.toLowerCase().includes(search.toLowerCase()) ||
        r.message?.toLowerCase().includes(search.toLowerCase());

      const matchesService =
        serviceFilter === "all" || r.service === serviceFilter;

      const matchesStatus =
        statusFilter === "all" || r.status === statusFilter;

      return matchesSearch && matchesService && matchesStatus;
    });
  }, [requests, search, serviceFilter, statusFilter]);

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div>
        <h1 className={styles.pageTitle}>Requests</h1>
        <p className={styles.pageSubtitle}>
          All service requests from leads
        </p>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <Search />
          <Input
            placeholder="Search requests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.selects}>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {Object.entries(serviceLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {Object.entries(statusConfig).map(([key, s]) => (
                <SelectItem key={key} value={key}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <Skeleton className={styles.tableSkeleton} />
      ) : (
        <div className={styles.tableWrapper}>
          <Table>
            <TableHeader>
              <TableRow className={styles.tableHeader}>
                <TableHead>Lead</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className={styles.emptyCell}>
                    No requests found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests.map((r) => {
                  const status =
                    statusConfig[r.status] || statusConfig.pending;

                  return (
                    <TableRow key={r.id} className={styles.row}>
                      <TableCell>
                        <p className={styles.leadName}>
                          {r.lead_name || "Unknown"}
                        </p>
                        <p className={styles.leadEmail}>{r.lead_email}</p>
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={styles[serviceStyles[r.service]]}
                        >
                          {serviceLabels[r.service] || r.service}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <p className={styles.message}>{r.message || "—"}</p>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={styles[status.style]}
                        >
                          {status.label}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <span className={styles.source}>
                          {r.utm_source || "Direct"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className={styles.date}>
                          {format(new Date(r.created_date), "MMM d, yyyy")}
                        </span>
                      </TableCell>

                      <TableCell>
                        {r.lead_id && (
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className={styles.linkBtn}
                          >
                            <Link
                              to={createPageUrl(
                                `LeadDetail?id=${r.lead_id}`
                              )}
                            >
                              <ExternalLink />
                            </Link>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

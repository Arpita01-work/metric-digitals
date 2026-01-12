import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "../lib/utils";
import { format } from "date-fns";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  Hash,
  Globe,
  Target,
  Send,
  Trash2,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Textarea } from "../components/ui/textarea";
import { Skeleton } from "../components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

import { LeadsAPI } from "../../api/leads.api";
import { LeadRequestsAPI } from "../../api/leadRequests.api";
import { LeadNotesAPI } from "../../api/leadNotes.api";

import styles from "../styles/LeadDetail.module.css";

/* ---------- Status Map ---------- */
const statusConfig = {
  new: { label: "New", style: "new" },
  contacted: { label: "Contacted", style: "contacted" },
  qualified: { label: "Qualified", style: "qualified" },
  converted: { label: "Converted", style: "converted" },
  lost: { label: "Lost", style: "lost" },
};

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

export default function LeadDetail() {
  const leadId = new URLSearchParams(window.location.search).get("id");
  const [newNote, setNewNote] = useState("");

  const queryClient = useQueryClient();

  /* ---------- Queries ---------- */
  const { data: lead, isLoading } = useQuery({
    queryKey: ["lead", leadId],
    queryFn: () => LeadsAPI.getById(leadId),
    enabled: !!leadId,
  });

  const { data: requests = [], isLoading: requestsLoading } =
    useQuery({
      queryKey: ["lead-requests", leadId],
      queryFn: () => LeadRequestsAPI.listByLead(leadId),
      enabled: !!leadId,
    });

  const { data: notes = [], isLoading: notesLoading } =
    useQuery({
      queryKey: ["lead-notes", leadId],
      queryFn: () => LeadNotesAPI.listByLead(leadId),
      enabled: !!leadId,
    });

  /* ---------- Mutations ---------- */
  const updateLead = useMutation({
    mutationFn: (data) =>
      LeadsAPI.update(leadId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["lead", leadId]);
      toast.success("Lead updated");
    },
  });

  const addNote = useMutation({
    mutationFn: (content) =>
      LeadNotesAPI.create(leadId, content),
    onSuccess: () => {
      queryClient.invalidateQueries(["lead-notes", leadId]);
      setNewNote("");
      toast.success("Note added");
    },
  });

  const deleteNote = useMutation({
    mutationFn: (id) => LeadNotesAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["lead-notes", leadId]);
      toast.success("Note deleted");
    },
  });

  /* ---------- Loading ---------- */
  if (isLoading) {
    return (
      <div className={styles.skeleton}>
        <Skeleton className={styles.titleSkeleton} />
        <div className={styles.skeletonGrid}>
          <Skeleton className={styles.cardSkeleton} />
          <Skeleton className={styles.cardSkeletonWide} />
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className={styles.notFound}>
        <p>Lead not found</p>
        <Button asChild>
          <Link to={createPageUrl("Leads")}>
            Back to Leads
          </Link>
        </Button>
      </div>
    );
  }

  const status = statusConfig[lead.status] || statusConfig.new;

  /* ---------- UI ---------- */
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <Button variant="ghost" size="icon" asChild>
          <Link to={createPageUrl("Leads")}>
            <ArrowLeft />
          </Link>
        </Button>
        <div>
          <h1 className={styles.name}>{lead.name}</h1>
          <p className={styles.subtitle}>Lead Details</p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Profile */}
        <Card>
          <CardContent className={styles.profile}>
            <Avatar className={styles.avatar}>
              <AvatarImage src={lead.avatar_url} />
              <AvatarFallback>
                {lead.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h2 className={styles.profileName}>{lead.name}</h2>

            {lead.company && (
              <p className={styles.company}>{lead.company}</p>
            )}

            <Badge
              variant="outline"
              className={styles[status.style]}
            >
              {status.label}
            </Badge>

            <div className={styles.infoList}>
              <Info icon={<Mail />} text={lead.email} />
              {lead.phone && <Info icon={<Phone />} text={lead.phone} />}
              {lead.company && (
                <Info icon={<Building2 />} text={lead.company} />
              )}
              <Info
                icon={<Calendar />}
                text={`First contact: ${format(
                  new Date(
                    lead.first_contact_date || lead.created_date
                  ),
                  "MMM d, yyyy"
                )}`}
              />
              <Info
                icon={<Clock />}
                text={`Last contact: ${
                  lead.last_contacted_date
                    ? format(
                        new Date(lead.last_contacted_date),
                        "MMM d, yyyy"
                      )
                    : "—"
                }`}
              />
              <Info
                icon={<Hash />}
                text={`Touch count: ${lead.touch_count || 0}`}
              />
              {lead.lead_source && (
                <Info
                  icon={<Globe />}
                  text={`Source: ${lead.lead_source}`}
                />
              )}
              {lead.utm_campaign && (
                <Info
                  icon={<Target />}
                  text={`Campaign: ${lead.utm_campaign}`}
                />
              )}
            </div>

            <div className={styles.statusBox}>
              <p>Status</p>
              <Select
                value={lead.status}
                onValueChange={(v) =>
                  updateLead.mutate({
                    status: v,
                    touch_count: (lead.touch_count || 0) + 1,
                    last_contacted_date: new Date().toISOString(),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusConfig).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className={styles.rightCol}>
          {/* Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Request Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {requestsLoading ? (
                <Skeleton className={styles.block} />
              ) : requests.length === 0 ? (
                <p className={styles.empty}>No requests yet</p>
              ) : (
                <div className={styles.timeline}>
                  {requests.map((r) => (
                    <div key={r.id} className={styles.timelineItem}>
                      <span className={styles.timelineDot} />
                      <div className={styles.timelineCard}>
                        <Badge>
                          {serviceLabels[r.service] || r.service}
                        </Badge>
                        {r.message && <p>{r.message}</p>}
                        <span>
                          {format(
                            new Date(r.created_date),
                            "MMM d, yyyy HH:mm"
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Internal Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.noteInput}>
                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                />
                <Button
                  onClick={() =>
                    newNote.trim() && addNote.mutate(newNote)
                  }
                >
                  <Send />
                </Button>
              </div>

              {notesLoading ? (
                <Skeleton className={styles.block} />
              ) : notes.length === 0 ? (
                <p className={styles.empty}>No notes yet</p>
              ) : (
                <div className={styles.notes}>
                  {notes.map((n) => (
                    <div key={n.id} className={styles.note}>
                      <p>{n.content}</p>
                      <div>
                        <span>{n.author_name || "Admin"}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteNote.mutate(n.id)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small Component ---------- */
function Info({ icon, text }) {
  return (
    <div className={styles.infoRow}>
      {icon}
      <span>{text}</span>
    </div>
  );
}

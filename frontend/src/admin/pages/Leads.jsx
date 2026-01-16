import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LeadsAPI } from "../../api/leads.api";
import { Plus, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import LeadsTable from "../components/leads/LeadsTable";
import LeadFilters from "../components/leads/LeadsFilters";
import { Input} from "../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import styles from "../styles/Lead.module.css";

export default function Leads() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    lead: null,
  });
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const queryClient = useQueryClient();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: LeadsAPI.list,
  });

  const createMutation = useMutation({
    mutationFn: LeadsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      setShowCreateDialog(false);
      setNewLead({ name: "", email: "", phone: "", company: "" });
      toast.success("Lead created successfully");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      LeadsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: LeadsAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      setDeleteDialog({ open: false, lead: null });
      toast.success("Lead deleted");
    },
  });

  const sources = useMemo(() => {
    return [
      ...new Set(leads.map((l) => l.lead_source).filter(Boolean)),
    ];
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        !search ||
        lead.name?.toLowerCase().includes(search.toLowerCase()) ||
        lead.email?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;
      const matchesSource =
        sourceFilter === "all" ||
        lead.lead_source === sourceFilter;
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [leads, search, statusFilter, sourceFilter]);

  const handleStatusChange = (lead, newStatus) => {
    updateMutation.mutate({
      id: lead.id,
      data: {
        status: newStatus,
        touch_count: (lead.touch_count || 0) + 1,
        last_contacted_date: new Date().toISOString(),
      },
    });
  };

  const handleCreateLead = () => {
    if (!newLead.name || !newLead.email) {
      toast.error("Name and email are required");
      return;
    }

    createMutation.mutate({
      ...newLead,
      status: "new",
      touch_count: 0,
      first_contact_date: new Date().toISOString(),
    });
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Leads</h1>
          <p className={styles.pageSubtitle}>
            Manage and track your leads
          </p>
        </div>

        <div className={styles.headerActions}>
          <Button variant="outline" className={styles.exportBtn}>
            <Download /> Export
          </Button>

          <Button
            className={styles.addBtn}
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus /> Add Lead
          </Button>
        </div>
      </div>

      {/* Filters */}
      <LeadFilters
        search={search}
        onSearchChange={setSearch}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        source={sourceFilter}
        onSourceChange={setSourceFilter}
        sources={sources}
        onClearFilters={() => {
          setSearch("");
          setStatusFilter("all");
          setSourceFilter("all");
        }}
      />

      {/* Table */}
      {isLoading ? (
        <Skeleton className={styles.tableSkeleton} />
      ) : (
        <LeadsTable
          leads={filteredLeads}
          onStatusChange={handleStatusChange}
          onDelete={(lead) =>
            setDeleteDialog({ open: true, lead })
          }
        />
      )}

      {/* Create Dialog */}
      <Dialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      >
        <DialogContent className={styles.dialog}>
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>

          <div className={styles.form}>
            <Field
              label="Name *"
              value={newLead.name}
              onChange={(v) =>
                setNewLead({ ...newLead, name: v })
              }
            />
            <Field
              label="Email *"
              type="email"
              value={newLead.email}
              onChange={(v) =>
                setNewLead({ ...newLead, email: v })
              }
            />
            <Field
              label="Phone"
              value={newLead.phone}
              onChange={(v) =>
                setNewLead({ ...newLead, phone: v })
              }
            />
            <Field
              label="Company"
              value={newLead.company}
              onChange={(v) =>
                setNewLead({ ...newLead, company: v })
              }
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className={styles.addBtn}
              onClick={handleCreateLead}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending
                ? "Creating..."
                : "Create Lead"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog({ open, lead: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Lead
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              {deleteDialog.lead?.name}? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={styles.deleteBtn}
              onClick={() =>
                deleteMutation.mutate(
                  deleteDialog.lead?.id
                )
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* ---------- Small Helper ---------- */
function Field({ label, value, onChange, type = "text" }) {
  return (
    <div className={styles.field}>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

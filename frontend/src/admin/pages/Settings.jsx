import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SettingsAPI } from "../../api/settings.api";
import {
  Building2,
  Clock,
  Shield,
  Save,
  Bell,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Skeleton } from "../components/ui/skeleton";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";

import { toast } from "sonner";
import styles from "../styles/Settings.module.css";

export default function Settings() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    business_name: "",
    contact_email: "",
    notification_email: "",
    working_hours: "",
    response_sla: "24",
    auto_email_user_confirmation: true,
    auto_email_admin_notification: true,
  });

  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: SettingsAPI.get,
  });

  useEffect(() => {
    if (!settings) return;

    setFormData({
      business_name: settings.business_name || "",
      contact_email: settings.contact_email || "",
      notification_email: settings.notification_email || "",
      working_hours: settings.working_hours || "",
      response_sla: settings.response_sla || "24",
      auto_email_user_confirmation:
        settings.auto_email_user_confirmation ?? true,
      auto_email_admin_notification:
        settings.auto_email_admin_notification ?? true,
    });
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: (data) =>
      settings?.id
        ? SettingsAPI.update(settings.id, data)
        : SettingsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings saved");
    },
  });

  const handleChange = (field, value) =>
    setFormData((p) => ({ ...p, [field]: value }));

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Skeleton className={styles.headerSkeleton} />
        <Skeleton className={styles.cardSkeleton} />
        <Skeleton className={styles.cardSkeleton} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.subtitle}>
            Manage your system preferences
          </p>
        </div>

        <Button
          onClick={() => saveMutation.mutate(formData)}
          disabled={saveMutation.isPending}
          className={styles.saveBtn}
        >
          <Save />
          {saveMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Business Info */}
      <Card className={styles.card}>
        <CardHeader>
          <div className={styles.cardHeader}>
            <div className={`${styles.icon} ${styles.indigo}`}>
              <Building2 />
            </div>
            <div>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Basic information about your business
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className={styles.form}>
          <div>
            <Label>Business Name</Label>
            <Input
              value={formData.business_name}
              onChange={(e) =>
                handleChange("business_name", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Contact Email</Label>
            <Input
              type="email"
              value={formData.contact_email}
              onChange={(e) =>
                handleChange("contact_email", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Working Hours</Label>
            <Input
              value={formData.working_hours}
              onChange={(e) =>
                handleChange("working_hours", e.target.value)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className={styles.card}>
        <CardHeader>
          <div className={styles.cardHeader}>
            <div className={`${styles.icon} ${styles.violet}`}>
              <Bell />
            </div>
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure notification preferences
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className={styles.switchGroup}>
          <div>
            <Label>Notification Email</Label>
            <Input
              type="email"
              value={formData.notification_email}
              onChange={(e) =>
                handleChange("notification_email", e.target.value)
              }
            />
          </div>

          <div className={styles.switchRow}>
            <div>
              <Label>User Confirmation Emails</Label>
              <p>Send confirmation emails on form submission</p>
            </div>
            <Switch
              checked={formData.auto_email_user_confirmation}
              onCheckedChange={(v) =>
                handleChange("auto_email_user_confirmation", v)
              }
            />
          </div>

          <div className={styles.switchRow}>
            <div>
              <Label>Admin Notifications</Label>
              <p>Receive notifications for new leads</p>
            </div>
            <Switch
              checked={formData.auto_email_admin_notification}
              onCheckedChange={(v) =>
                handleChange("auto_email_admin_notification", v)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* SLA */}
      <Card className={styles.card}>
        <CardHeader>
          <div className={styles.cardHeader}>
            <div className={`${styles.icon} ${styles.amber}`}>
              <Clock />
            </div>
            <div>
              <CardTitle>Response Time</CardTitle>
              <CardDescription>
                Set response SLA expectations
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Label>Response SLA (hours)</Label><br/>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={styles.select}>
                {formData.response_sla} hours
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              {["1", "4", "8", "24", "48", "72"].map((v) => (
                <DropdownMenuItem
                  key={v}
                  onClick={() =>
                    handleChange("response_sla", v)
                  }
                >
                  {v} hours
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu><br/>
          <Label>Target time to respond to new leads</Label><br/>
        </CardContent>
      </Card>

      {/* Future */}
      <Card className={styles.dashed}>
        <CardContent className={styles.future}>
          <div className={styles.futureIcon}>
            <Shield />
          </div>
          <h3>Advanced Settings</h3>
          <p>
            RBAC, team management, and audit logs coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

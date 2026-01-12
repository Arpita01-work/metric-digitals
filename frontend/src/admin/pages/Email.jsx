import React, { useState } from "react";
import { Mail, Send, Eye, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import styles from "../styles/Email.module.css";

const emailTemplates = [
  {
    id: "user_confirmation",
    name: "User Confirmation Email",
    description:
      "Sent to users when they submit a contact form or service request",
    subject: "Thank you for contacting us!",
    preview: `Dear {{user_name}},

Thank you for reaching out to us! We have received your inquiry about {{service}} and our team will get back to you within 24 hours.

Best regards,
The Team`,
    enabled: true,
  },
  {
    id: "admin_notification",
    name: "Admin Notification Email",
    description:
      "Sent to admin when a new lead or request is submitted",
    subject: "New Lead: {{lead_name}}",
    preview: `New Lead Alert!

Name: {{lead_name}}
Email: {{lead_email}}
Service: {{service}}`,
    enabled: true,
  },
  {
    id: "follow_up",
    name: "Follow-up Email",
    description: "Scheduled follow-up email after initial contact",
    subject: "Following up on your inquiry",
    preview: `Hi {{user_name}},

We wanted to follow up on your inquiry about {{service}}.`,
    enabled: false,
  },
];

export default function Email() {
  const [templates, setTemplates] = useState(emailTemplates);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const handleToggle = (id) => {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, enabled: !t.enabled } : t
      )
    );
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div>
        <h1 className={styles.pageTitle}>Email Templates</h1>
        <p className={styles.pageSubtitle}>
          Manage automated email notifications
        </p>
      </div>

      {/* Notice */}
      <Card className={styles.noticeCard}>
        <CardContent className={styles.noticeContent}>
          <div className={styles.notice}>
            <div className={styles.noticeIcon}>
              <Settings />
            </div>
            <div>
              <h3 className={styles.noticeTitle}>
                Email Configuration
              </h3>
              <p className={styles.noticeText}>
                Email templates are configured here. To customize or
                add templates, contact your system administrator.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates */}
      <div className={styles.templateList}>
        {templates.map((template) => (
          <Card key={template.id} className={styles.templateCard}>
            <CardContent className={styles.templateContent}>
              <div className={styles.templateRow}>
                <div className={styles.templateInfo}>
                  <div
                    className={
                      template.enabled
                        ? styles.iconActive
                        : styles.iconInactive
                    }
                  >
                    <Mail />
                  </div>

                  <div>
                    <div className={styles.templateHeader}>
                      <h3 className={styles.templateTitle}>
                        {template.name}
                      </h3>
                      <Badge
                        variant={
                          template.enabled
                            ? "default"
                            : "secondary"
                        }
                      >
                        {template.enabled ? "Active" : "Disabled"}
                      </Badge>
                    </div>

                    <p className={styles.templateDesc}>
                      {template.description}
                    </p>

                    <p className={styles.subject}>
                      <strong>Subject:</strong>{" "}
                      {template.subject}
                    </p>
                  </div>
                </div>

                <div className={styles.templateActions}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPreviewTemplate(template)
                    }
                  >
                    <Eye /> Preview
                  </Button>

                  <Switch
                    checked={template.enabled}
                    onCheckedChange={() =>
                      handleToggle(template.id)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Email Settings</CardTitle>
          <CardDescription>
            Configure email behavior
          </CardDescription>
        </CardHeader>

        <CardContent className={styles.settings}>
          {[
            "Send user confirmation emails",
            "Send admin notifications",
            "Include UTM data in notifications",
          ].map((label) => (
            <div key={label} className={styles.settingRow}>
              <div>
                <Label>{label}</Label>
                <p className={styles.settingDesc}>
                  Automatically manage this email behavior
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Placeholder */}
      <Card className={styles.placeholder}>
        <CardContent className={styles.placeholderContent}>
          <div className={styles.placeholderIcon}>
            <Send />
          </div>
          <h3 className={styles.placeholderTitle}>
            Custom Email Editor
          </h3>
          <p className={styles.placeholderText}>
            A visual drag-and-drop email editor is coming soon.
          </p>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog
        open={!!previewTemplate}
        onOpenChange={() => setPreviewTemplate(null)}
      >
        <DialogContent className={styles.previewDialog}>
          <DialogHeader>
            <DialogTitle>
              {previewTemplate?.name}
            </DialogTitle>
            <DialogDescription>
              Subject: {previewTemplate?.subject}
            </DialogDescription>
          </DialogHeader>

          <div className={styles.previewBody}>
            <pre className={styles.previewBox}>
              {previewTemplate?.preview}
            </pre>
            <div className={styles.previewNote}>
              Variables like {"{{user_name}}"} will be
              replaced automatically.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

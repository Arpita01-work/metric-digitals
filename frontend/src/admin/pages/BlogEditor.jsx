import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import { ArrowLeft, Eye, Image as ImageIcon, X } from "lucide-react";
import { formatISO } from "date-fns";

import {
  Input,
  Textarea,
  Button,
  Label,
  Badge,
  Skeleton,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui";

import { BlogAPI } from "../../api/blog.api";
import { MediaAPI } from "../../api/media.api";
import { createPageUrl } from "../lib/utils";
import { toast } from "sonner";
import styles from "../styles/BlogEditor.module.css";

export default function BlogEditor() {
  const blogId = new URLSearchParams(window.location.search).get("id");
  const isEditing = Boolean(blogId);

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image: "",
    meta_title: "",
    meta_description: "",
    tags: [],
    status: "draft",
  });

  const [newTag, setNewTag] = useState("");
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  const [uploading, setUploading] = useState(false);

  /* ---------- Fetch Blog ---------- */
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => BlogAPI.getById(blogId),
    enabled: isEditing,
  });

  /* ---------- Fetch Media ---------- */
  const { data: mediaFiles = [] } = useQuery({
    queryKey: ["media"],
    queryFn: MediaAPI.list,
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        content: blog.content || "",
        excerpt: blog.excerpt || "",
        featured_image: blog.featured_image || "",
        meta_title: blog.meta_title || "",
        meta_description: blog.meta_description || "",
        tags: blog.tags || [],
        status: blog.status || "draft",
      });
    }
  }, [blog]);

  /* ---------- Save Blog ---------- */
  const saveMutation = useMutation({
    mutationFn: (payload) =>
      isEditing
        ? BlogAPI.update(blogId, payload)
        : BlogAPI.create(payload),

    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      toast.success(isEditing ? "Blog updated" : "Blog created");
      window.location.href = createPageUrl("Blogs");
    },
  });

  const handleChange = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));

    if (field === "title" && !isEditing) {
      setFormData((p) => ({
        ...p,
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim(),
      }));
    }
  };

  const handleSave = (status) => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    saveMutation.mutate({
      ...formData,
      status,
      published_date:
        status === "published" && !blog?.published_date
          ? formatISO(new Date())
          : blog?.published_date,
    });
  };

  /* ---------- Upload Image ---------- */
  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const res = await MediaAPI.upload(file);
      setFormData((p) => ({
        ...p,
        featured_image: res.url,
      }));
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (isEditing && isLoading) {
    return (
      <div className={styles.wrapper}>
        <Skeleton className={styles.titleSkeleton} />
        <Skeleton className={styles.editorSkeleton} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Button variant="ghost" size="icon" asChild>
            <Link to={createPageUrl("Blogs")}>
              <ArrowLeft />
            </Link>
          </Button>
          <h1 className={styles.pageTitle}>
            {isEditing ? "Edit Blog" : "New Blog"}
          </h1>
        </div>

        <div className={styles.headerActions}>
          <Button
            variant="outline"
            onClick={() => handleSave("draft")}
            disabled={saveMutation.isPending}
          >
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave("published")}
            disabled={saveMutation.isPending}
            className={styles.publishBtn}
          >
            <Eye /> Publish
          </Button>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Main */}
        <div className={styles.main}>
          <Card>
            <CardContent className={styles.formCard}>
              <Field label="Title">
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </Field>

              <Field label="Slug">
                <Input
                  value={formData.slug}
                  onChange={(e) => handleChange("slug", e.target.value)}
                />
              </Field>

              <Field label="Content">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(v) => handleChange("content", v)}
                />
              </Field>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.featured_image ? (
                <div className={styles.imagePreview}>
                  <img src={formData.featured_image} alt="" />
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => handleChange("featured_image", "")}
                  >
                    <X />
                  </Button>
                </div>
              ) : (
                <label className={styles.uploadBox}>
                  <ImageIcon />
                  <span>{uploading ? "Uploading…" : "Upload Image"}</span>
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      e.target.files && handleImageUpload(e.target.files[0])
                    }
                  />
                </label>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Excerpt</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => handleChange("excerpt", e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.tagInput}>
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    if (newTag && !formData.tags.includes(newTag)) {
                      setFormData((p) => ({
                        ...p,
                        tags: [...p.tags, newTag],
                      }));
                      setNewTag("");
                    }
                  }}
                >
                  Add
                </Button>
              </div>

              <div className={styles.tagList}>
                {formData.tags.map((t) => (
                  <Badge
                    key={t}
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        tags: p.tags.filter((x) => x !== t),
                      }))
                    }
                  >
                    {t} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Media Dialog */}
      <Dialog open={showMediaDialog} onOpenChange={setShowMediaDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
          </DialogHeader>
          <div className={styles.mediaGrid}>
            {mediaFiles.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  handleChange("featured_image", f.url);
                  setShowMediaDialog(false);
                }}
              >
                <img src={f.url} alt={f.name} />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className={styles.field}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

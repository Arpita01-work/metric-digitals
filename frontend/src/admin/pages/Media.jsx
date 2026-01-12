import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Upload,
  Search,
  Grid,
  List,
  Trash2,
  Copy,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
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
import { toast } from "sonner";
import { MediaAPI } from "../../api/media.api";
import styles from "../styles/Media.module.css";

export default function Media() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFile, setSelectedFile] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [uploading, setUploading] = useState(false);

  /* ---------- Queries ---------- */
  const { data: files = [], isLoading } = useQuery({
    queryKey: ["media"],
    queryFn: MediaAPI.list,
  });

  /* ---------- Mutations ---------- */
  const uploadMutation = useMutation({
    mutationFn: MediaAPI.upload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      toast.success("File uploaded");
    },
    onError: () => toast.error("Upload failed"),
    onSettled: () => setUploading(false),
  });

  const deleteMutation = useMutation({
    mutationFn: MediaAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      setDeleteDialog(null);
      setSelectedFile(null);
      toast.success("File deleted");
    },
  });

  /* ---------- Helpers ---------- */
  const handleUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    files.forEach((file) => uploadMutation.mutate(file));
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied");
  };

  const filteredFiles = files.filter((f) =>
    f.name?.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (bytes) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  /* ---------- UI ---------- */
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Media Library</h1>
          <p className={styles.subtitle}>Manage uploaded files</p>
        </div>

        <label>
          <Button disabled={uploading}>
            <Upload />
            {uploading ? "Uploading..." : "Upload Files"}
          </Button>
          <input type="file" multiple hidden onChange={handleUpload} />
        </label>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <Input
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className={styles.viewSwitch}>
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            onClick={() => setViewMode("grid")}
          >
            <Grid />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            onClick={() => setViewMode("list")}
          >
            <List />
          </Button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className={styles.grid}>
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className={styles.thumbSkeleton} />
            ))}
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className={styles.empty}>
          <ImageIcon />
          <p>No files uploaded</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className={styles.grid}>
          {filteredFiles.map((file) => (
            <button
              key={file.id}
              className={styles.thumb}
              onClick={() => setSelectedFile(file)}
            >
              <img src={file.url} alt={file.name} />
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.list}>
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className={styles.listRow}
              onClick={() => setSelectedFile(file)}
            >
              <img src={file.url} alt="" />
              <div>
                <p>{file.name}</p>
                <span>
                  {formatSize(file.size)} •{" "}
                  {format(new Date(file.created_at), "MMM d, yyyy")}
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  copyUrl(file.url);
                }}
              >
                <Copy />
              </Button>
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteDialog(file);
                }}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
          </DialogHeader>

          {selectedFile && (
            <>
              <img src={selectedFile.url} className={styles.previewImg} />
              <Input readOnly value={selectedFile.url} />
            </>
          )}

          <DialogFooter>
            <Button asChild>
              <a href={selectedFile?.url} target="_blank" rel="noreferrer">
                <ExternalLink /> Open
              </a>
            </Button>
            <Button
              variant="destructive"
              onClick={() => setDeleteDialog(selectedFile)}
            >
              <Trash2 /> Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteDialog}
        onOpenChange={() => setDeleteDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate(deleteDialog.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

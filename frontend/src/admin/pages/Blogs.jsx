import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogAPI } from "../../api/blog.api";
import { Link } from "react-router-dom";
import { createPageUrl } from "../lib/utils";
import { format } from "date-fns";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Input,
  Button,
  Badge,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui";
import { toast } from "sonner";
import styles from "../styles/Blog.module.css";

export default function Blogs() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, blog: null });

  const queryClient = useQueryClient();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: BlogAPI.list,
  });

  const deleteMutation = useMutation({
    mutationFn: BlogAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog deleted");
      setDeleteDialog({ open: false, blog: null });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: ({ id, status }) =>
      BlogAPI.updateStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog updated");
    },
  });

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesSearch =
        !search ||
        b.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.author_name?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [blogs, search, statusFilter]);

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Blogs</h1>
          <p className={styles.pageSubtitle}>Manage your blog content</p>
        </div>

        <Button asChild className={styles.newBtn}>
          <Link to={createPageUrl("BlogEditor")}>
            <Plus /> New Blog
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <Search />
          <Input
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filterButtons}>
          {["all", "published", "draft"].map((s) => (
            <Button
              key={s}
              size="sm"
              variant={statusFilter === s ? "default" : "outline"}
              className={
                statusFilter === s ? styles[`filter_${s}`] : ""
              }
              onClick={() => setStatusFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
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
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredBlogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className={styles.emptyCell}>
                    No blogs found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBlogs.map((blog) => (
                  <TableRow key={blog.id} className={styles.row}>
                    <TableCell>
                      <div className={styles.titleCell}>
                        {blog.featured_image && (
                          <img
                            src={blog.featured_image}
                            alt=""
                            className={styles.thumb}
                          />
                        )}
                        <div>
                          <p className={styles.blogTitle}>{blog.title}</p>
                          {blog.slug && (
                            <p className={styles.slug}>/{blog.slug}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className={styles.author}>
                      {blog.author_name || blog.author || "Unknown"}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          blog.status === "published"
                            ? styles.badgePublished
                            : styles.badgeDraft
                        }
                      >
                        {blog.status}
                      </Badge>
                    </TableCell>

                    <TableCell className={styles.date}>
                      {format(
                        new Date(blog.created_date),
                        "MMM d, yyyy"
                      )}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className={styles.actionBtn}
                          >
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              to={createPageUrl(
                                `BlogEditor?id=${blog.id}`
                              )}
                            >
                              <Edit /> Edit
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              togglePublishMutation.mutate({
                                id: blog.id,
                                status:
                                  blog.status === "published"
                                    ? "draft"
                                    : "published",
                              })
                            }
                          >
                            {blog.status === "published" ? (
                              <>
                                <EyeOff /> Unpublish
                              </>
                            ) : (
                              <>
                                <Eye /> Publish
                              </>
                            )}
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            className={styles.deleteItem}
                            onClick={() =>
                              setDeleteDialog({ open: true, blog })
                            }
                          >
                            <Trash2 /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog({ open, blog: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete “
              {deleteDialog.blog?.title}”?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={styles.deleteConfirm}
              onClick={() =>
                deleteMutation.mutate(deleteDialog.blog?.id)
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

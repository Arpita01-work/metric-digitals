import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";

import styles from "../../styles/LeadsFilter.module.css";

export default function LeadFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  source,
  onSourceChange,
  sources = [],
  onClearFilters,
}) {
  const hasActiveFilters = status !== "all" || source !== "all" || search;

  return (
    <div className={styles.wrapper}>
      {/* Search */}
      <div className={styles.searchWrapper}>
        <Search className={styles.searchIcon} />
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {/* Status Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className={styles.dropdownBtn}>
              {status === "all"
                ? "All Status"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => onStatusChange("all")}>
              All Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange("new")}>
              New
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange("contacted")}>
              Contacted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange("qualified")}>
              Qualified
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange("converted")}>
              Converted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange("lost")}>
              Lost
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Source Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className={styles.dropdownBtn}>
              {source === "all" ? "All Sources" : source}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => onSourceChange("all")}>
              All Sources
            </DropdownMenuItem>

            {sources.map((s) => (
              <DropdownMenuItem
                key={s}
                onClick={() => onSourceChange(s)}
              >
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className={styles.clearBtn}
          >
            <X className={styles.clearIcon} />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}

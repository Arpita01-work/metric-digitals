import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import styles from "./Layout.module.css";
import avatar from "../admin/assets/avatar.jpeg";
import {
  LayoutDashboard,
  Users,
  FileText,
  Image,
  Settings,
  BarChart3,
  Mail,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  MessageSquare,
} from "lucide-react";

import { Button } from "../admin/components/ui/button";
import { Input } from "../admin/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../admin/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../admin/components/ui/dropdown-menu";

/* ---------------- NAVIGATION ---------------- */

const navigation = [
  { name: "Dashboard", href: "admin", icon: LayoutDashboard },
  { name: "Leads", href: "admin/leads", icon: Users },
  { name: "Requests", href: "admin/requests", icon: MessageSquare },
  { name: "Analytics", href: "admin/analytics", icon: BarChart3 },
  { name: "Blogs", href: "admin/blogs", icon: FileText },
  { name: "Media", href: "admin/media", icon: Image },
  { name: "Email", href: "admin/email", icon: Mail },
  { name: "Settings", href: "admin/settings", icon: Settings },
];

/* ---------------- LAYOUT ---------------- */

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /* ---------------- AUTH ALTERNATIVE ---------------- */
  useEffect(() => {
    // Simulated logged-in admin user
    const storedUser = localStorage.getItem("admin_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const mockUser = {
        full_name: "Admin User",
        email: "admin@example.com",
        avatar_url: "",
      };
      localStorage.setItem("admin_user", JSON.stringify(mockUser));
      setUser(mockUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_user");
    navigate("/"); // redirect to home or login
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className={styles.layout}>
      {sidebarOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${
          sidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <div className={styles.sidebarInner}>
          <div className={styles.logo}>
            <Link to={createPageUrl("Dashboard")} className={styles.logoLink}>
              <div className={styles.logoIcon}>A</div>
              <span>AdminCRM</span>
            </Link>
            <button
              className={styles.closeBtn}
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <nav className={styles.nav}>
            {navigation.map((item) => {
              const isActive = currentPageName === item.href;
              return (
                <Link
                  key={item.name}
                  to={createPageUrl(item.href)}
                  className={`${styles.navItem} ${
                    isActive ? styles.active : ""
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className={styles.user}>
            <Avatar>
              <AvatarImage src={avatar || ""} />
              <AvatarFallback>
                {user?.full_name?.[0] || "A"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p>{user?.full_name}</p>
              <span>{user?.email}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        <header className={styles.header}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className={styles.search}>
            <Search size={16} />
            <Input placeholder="Search anything..." />
          </div>

          <div className={styles.headerRight}>
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Avatar>
                    <AvatarImage src={avatar || ""} />
                    <AvatarFallback>
                      {user?.full_name?.[0] || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to={createPageUrl("Settings")}>
                    <Settings size={16} /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className={styles.logout}
                >
                  <LogOut size={16} /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}

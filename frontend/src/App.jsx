// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

// Public pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Portfolios from "./pages/Portfolios";
import About from "./pages/About";
import Services from "./pages/Services";
import BlogDetail from "./pages/BlogDetail";

import Header from "./common/Header";
import Footer from "./common/Footer";

// Admin layout
import Layout from "./admin/Layout";

// Admin pages
import Dashboard from "./admin/pages/Dashboard";
import Analytics from "./admin/pages/Analytics";
import BlogEditor from "./admin/pages/BlogEditor";
import BlogsAdmin from "./admin/pages/BlogsAdmin";
import Email from "./admin/pages/Email";
import LeadDetail from "./admin/pages/LeadDetail";
import Leads from "./admin/pages/Leads";
import Media from "./admin/pages/Media";
import Requests from "./admin/pages/Requests";
import Settings from "./admin/pages/Settings";

const App = () => {
  return (
    <Router basename="/metric-digitals">
      <ScrollToTop />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Header />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route
          path="/blog"
          element={
            <>
              <Header />
              <Blog />
              <Footer />
            </>
          }
        />

        <Route
          path="/blog/:id"
          element={
            <>
              <Header />
              <BlogDetail />
              <Footer />
            </>
          }
        />

        <Route
          path="/portfolios"
          element={
            <>
              <Header />
              <Portfolios />
              <Footer />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/services"
          element={
            <>
              <Header />
              <Services />
              <Footer />
            </>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <Layout currentPageName="Dashboard">
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/admin/leads"
          element={
            <Layout currentPageName="Leads">
              <Leads />
            </Layout>
          }
        />

        <Route
          path="/admin/requests"
          element={
            <Layout currentPageName="Requests">
              <Requests />
            </Layout>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <Layout currentPageName="Analytics">
              <Analytics />
            </Layout>
          }
        />

        <Route
          path="/admin/blogs"
          element={
            <Layout currentPageName="Blogs">
              <BlogsAdmin />
            </Layout>
          }
        />

        <Route
          path="/admin/blogeditor"
          element={
            <Layout currentPageName="Blogs">
              <BlogEditor />
            </Layout>
          }
        />

        <Route
          path="/admin/email"
          element={
            <Layout currentPageName="Email">
              <Email />
            </Layout>
          }
        />

        <Route
          path="/admin/media"
          element={
            <Layout currentPageName="Media">
              <Media />
            </Layout>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <Layout currentPageName="Settings">
              <Settings />
            </Layout>
          }
        />

        <Route
          path="/admin/lead/:id"
          element={
            <Layout currentPageName="Leads">
              <LeadDetail />
            </Layout>
          }
        />

        {/* ✅ MUST BE LAST */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

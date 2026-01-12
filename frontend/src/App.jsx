import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Portfolios from "./pages/Portfolios";
import About from "./pages/About";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Services from "./pages/Services";
import Dashboard from "./admin/pages/Dashboard";
import Analytics from "./admin/pages/Analytics";
import BlogEditor from "./admin/pages/BlogEditor";
import Blogs from "./admin/pages/Blogs";
import Email from "./admin/pages/Email";
import LeadDetail from "./admin/pages/LeadDetail";
import Leads from "./admin/pages/Leads";
import Media from "./admin/pages/Media";
import Requests from "./admin/pages/Requests";
import Settings from "./admin/pages/Settings";

const App = () => {
    return(
        <Router>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='contact/' element={<Contact/>} />
                <Route path='blog/' element={<Blog/>} />
                <Route path='portfolios/' element={<Portfolios/>} />
                <Route path='about/' element={<About/>} />
                <Route path='services/' element={<Services/>} />
                <Route path='admin/' element={<Dashboard/>} />
                <Route path='analytics/' element={<Analytics/>} />
                <Route path='blogeditor/' element={<BlogEditor/>} />
                <Route path='blogadmin/' element={<Blogs/>} />
                <Route path='email/' element={<Email/>} />
                <Route path='leaddetails/' element={<LeadDetail/>} />
                <Route path='leads/' element={<Leads/>} />
                <Route path='media/' element={<Media/>} />
                <Route path='requests/' element={<Requests/>} />
                <Route path='settings/' element={<Settings/>} />
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App;
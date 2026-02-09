import { lazy, Suspense } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useTheme } from "./context/ThemeContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Lazy loaded components
const LandingPage = lazy(() => import("./pages/LandingPage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Projects = lazy(() => import("./pages/Projects"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const BlogList = lazy(() => import("./pages/BlogList"));
const Blog = lazy(() => import("./pages/Blog"));

function App() {
  const { isDark } = useTheme();

  return (
    <LazyMotion features={domAnimation} strict={false}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        limit={3}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={!isDark ? "light" : "dark"}
      />
      <Router>
        <ScrollToTop />
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen bg-background">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 border-3 border-primary/20 rounded-full"></div>
                <div className="absolute inset-0 border-3 border-primary rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
          }
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<Blog />} />
          </Routes>
          <Footer />
        </Suspense>
      </Router>
    </LazyMotion>
  );
}

export default App;

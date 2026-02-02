import { lazy, Suspense } from "react";

import { LazyMotion, domAnimation } from "framer-motion";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Lazy loaded components
const LandingPage = lazy(() => import("./components/LandingPage"));

function App() {
  return (
    <LazyMotion features={domAnimation} strict={false}>
      <Router>
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
          </Routes>
        </Suspense>
      </Router>
    </LazyMotion>
  );
}

export default App;

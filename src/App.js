import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Analytics from "./components/Analytics";

import ErrorBoundary from "./components/ErrorBoundary";
import TestError from "./components/TestError";
import NotFound from "./pages/NotFound";

// Lazy Load Pages for Performance Optimization
const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Services = lazy(() => import("./pages/Services"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const About = lazy(() => import("./pages/About"));
const Analysis = lazy(() => import("./pages/Analysis"));
const Contact = lazy(() => import("./pages/Contact"));
const Connect = lazy(() => import("./pages/Connect"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <Router>
            <Analytics />
            <ScrollToTop />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="portfolio" element={<Portfolio />} />
                  <Route path="services" element={<Services />} />
                  <Route path="gallery" element={<Gallery />} />
                  <Route path="testimonials" element={<Testimonials />} />
                  <Route path="analysis" element={<Analysis />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="connect" element={<Connect />} />
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="terms-of-service" element={<TermsOfService />} />
                  <Route path="test-error" element={<TestError />} />
                </Route>
                {/* Catch-all route for 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
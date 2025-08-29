import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Demo from './components/Demo';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import TechnicalSpecs from './components/TechnicalSpecs';
import Support from './components/Support';
import Footer from './components/Footer';
import Success from './components/Success';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import HIPAACompliance from './components/HIPAACompliance';
import Security from './components/Security';
import FAQ from './components/FAQ';
import SetupGuide from './components/SetupGuide';
import VideoTutorials from './components/VideoTutorials';
import EMRIntegration from './components/EMRIntegration';
import ROICalculator from './components/ROICalculator';
import AboutUs from './components/AboutUs';
import Download from './components/Download';

function App() {
  // Error handling for CSS selector issues
  useEffect(() => {
    // Handle any CSS selector errors gracefully
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('*,:x')) {
        // Suppress this specific CSS selector error
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  // Debug routing
  console.log('Current path:', window.location.pathname);

  // Simple routing based on URL path
  const path = window.location.pathname;
  
  if (path === '/success') {
    return <Success />;
  }
  
  if (path === '/privacy-policy') {
    return <PrivacyPolicy />;
  }
  
  if (path === '/terms-of-service') {
    return <TermsOfService />;
  }
  
  if (path === '/hipaa-compliance') {
    return <HIPAACompliance />;
  }
  
  if (path === '/security') {
    return <Security />;
  }
  
  if (path === '/faq') {
    return <FAQ />;
  }
  
  if (path === '/setup-guide') {
    return <SetupGuide />;
  }
  
  if (path === '/video-tutorials') {
    return <VideoTutorials />;
  }
  
  if (path === '/emr-integration') {
    return <EMRIntegration />;
  }
  
  if (path === '/roi-calculator') {
    return <ROICalculator />;
  }
  
  if (path === '/about') {
    return <AboutUs />;
  }
  
  if (path === '/download') {
    return <Download />;
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Demo />
      <Benefits />
      <Testimonials />
      <Pricing />
      <TechnicalSpecs />
      <Support />
      <Footer />
    </div>
  );
}

export default App;
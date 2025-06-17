import React, { useEffect, Suspense, lazy } from 'react';

// Lazy load components
const Header = lazy(() => import('./components/Header'));
const Home = lazy(() => import('./components/Home')); 
const Footer = lazy(() => import('./components/Footer'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize AOS
    const AOS = window.AOS;
    if (AOS) {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }

    // Save scroll position before refresh
    window.onbeforeunload = function () {
      localStorage.setItem('scrollPosition', window.scrollY);
    };

    // Restore scroll position after page load
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      localStorage.removeItem('scrollPosition');
    }
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Header />
      <Home />
      <Footer />
    </Suspense>
  );
}

export default App;
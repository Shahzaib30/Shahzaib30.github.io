import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // Get the current location object, which includes the pathname
  const { pathname } = useLocation(); 

  // Use useEffect to run a side effect whenever the pathname changes
  useEffect(() => {
    // Scroll the window to the top-left corner
    window.scrollTo(0, 0); 
    
    // For modern React Router v6, a more robust option is:
    // document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    
  }, [pathname]); // Re-run effect only when pathname changes

  // This component doesn't render anything visually
  return null;
}

export default ScrollToTop;
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Component that attaches scroll to top hanler on router change
// renders nothing, just attaches side effects
const ScrollToTopControlller = () => {
  const history = useHistory();

  const {
    location: { pathname, search },
  } = history;

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
      });
    } catch (error) {
      // fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [pathname, search]);

  // renders nothing, since nothing is needed
  return null;
};

export default ScrollToTopControlller;

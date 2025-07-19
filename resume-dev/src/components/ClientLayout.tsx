'use client';

import { useState, useEffect, ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Preloader from '@/components/Preloader';
import { useHasMounted } from '@/hooks/useHasMounted';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [loading, setLoading] = useState(true);
  const hasMounted = useHasMounted();

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!hasMounted) {
    return <Preloader />;
  }

  return (
    <ThemeProvider>
      {loading ? <Preloader /> : children}
    </ThemeProvider>
  );
};

export default ClientLayout;
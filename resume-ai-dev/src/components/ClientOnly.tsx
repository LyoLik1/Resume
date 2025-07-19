'use client';

import { useHasMounted } from '@/hooks/useHasMounted';
import { ReactNode, useState, useEffect } from 'react';
import Preloader from './Preloader';

interface ClientOnlyProps {
  children: ReactNode;
}

const ClientOnly = ({ children }: ClientOnlyProps) => {
  const hasMounted = useHasMounted();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    
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

  return loading ? <Preloader /> : <>{children}</>;
};

export default ClientOnly;
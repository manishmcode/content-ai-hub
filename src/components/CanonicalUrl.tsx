import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import site from '../config/site.json';

export const CanonicalUrl = () => {
  const { pathname, search, hash } = useLocation();
  const path = `${pathname.replace(/\/{2,}/g, '/').replace(/\/+$/, '')}/`;

  useEffect(() => {
    const existing = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!site.pagePaths.includes(path)) {
      existing?.remove();
      return;
    }

    const canonical = existing || document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `${site.origin}${path}`;
    if (!existing) document.head.appendChild(canonical);
  }, [path]);

  if (site.pagePaths.includes(path) && pathname !== path) {
    return <Navigate to={`${path}${search}${hash}`} replace />;
  }
  return null;
};

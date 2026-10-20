import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import site from '../config/site.json';
import pages from '../config/seo.json';
import structuredData from '../config/structured-data.json';

type Metadata = { title: string; description: string; ogDescription?: string; imageAlt: string };
const metadata = pages as Record<string, Metadata>;
const imageUrl = `${site.origin}/logo.webp`;

const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
};

export const PageMetadata = () => {
  const { pathname } = useLocation();
  const path = `${pathname.replace(/\/{2,}/g, '/').replace(/\/+$/, '')}/`;

  useEffect(() => {
    const page = metadata[path];
    if (!page) return;
    const url = `${site.origin}${path}`;
    const socialDescription = page.ogDescription || page.description;
    document.title = page.title;
    setMeta('meta[name="description"]', 'name', 'description', page.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', page.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', socialDescription);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Content AI Hub');
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', page.imageAlt);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', socialDescription);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
    setMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', page.imageAlt);
  }, [path]);

  useEffect(() => {
    const pageSchema = structuredData.pages[path as keyof typeof structuredData.pages];
    const schema = pageSchema && { ...pageSchema, publisher: structuredData.organization };
    let element = document.head.querySelector<HTMLScriptElement>('script[data-content-aihub-schema]');
    if (!schema) {
      element?.remove();
      return;
    }
    if (!element) {
      element = document.createElement('script');
      element.type = 'application/ld+json';
      element.dataset.contentAihubSchema = 'true';
      document.head.appendChild(element);
    }
    element.text = JSON.stringify(schema).replace(/</g, '\\u003c');
  }, [path]);
  return null;
};

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'GAPING';
const SITE_ORIGIN = 'https://gaping.vercel.app';
const DEFAULT_TITLE = 'GAPING · Gap Year de Producto';
const DEFAULT_DESCRIPTION = 'Un proyecto de innovación personal, diseñado como si fuera un producto.';

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

/**
 * Sets the document title, meta description and canonical URL for the
 * current route. Restores the site defaults on unmount so navigating away
 * (or to a page that doesn't call this hook) doesn't leave stale metadata
 * behind.
 */
export function usePageMeta(title?: string, description?: string) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE;
    const desc = description ?? DEFAULT_DESCRIPTION;
    const canonicalUrl = pathname === '/' ? SITE_ORIGIN + '/' : SITE_ORIGIN + pathname;

    document.title = fullTitle;
    setMetaTag('name', 'description', desc);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('property', 'og:description', desc);
    setMetaTag('name', 'twitter:description', desc);
    setCanonical(canonicalUrl);

    return () => {
      document.title = DEFAULT_TITLE;
      setMetaTag('name', 'description', DEFAULT_DESCRIPTION);
      setMetaTag('property', 'og:title', DEFAULT_TITLE);
      setMetaTag('name', 'twitter:title', DEFAULT_TITLE);
      setMetaTag('property', 'og:description', DEFAULT_DESCRIPTION);
      setMetaTag('name', 'twitter:description', DEFAULT_DESCRIPTION);
      setCanonical(SITE_ORIGIN + '/');
    };
  }, [title, description, pathname]);
}

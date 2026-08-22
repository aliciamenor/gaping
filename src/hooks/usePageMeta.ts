import { useEffect } from 'react';

const SITE_NAME = 'GAPING';
const DEFAULT_TITLE = 'GAPING · Gap Year de Producto';
const DEFAULT_DESCRIPTION = 'Documentación de mi gap year: un proyecto de innovación personal para ampliar mi visión del mundo y aportar a la sociedad.';

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Sets the document title and meta description for the current route.
 * Restores the site defaults on unmount so navigating away (or to a page
 * that doesn't call this hook) doesn't leave stale metadata behind.
 */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE;
    const desc = description ?? DEFAULT_DESCRIPTION;

    // Tab title stays just the brand name; fullTitle (per-page) is still
    // used for og:title/twitter:title since those drive link previews.
    document.title = SITE_NAME;
    setMetaTag('name', 'description', desc);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('property', 'og:description', desc);
    setMetaTag('name', 'twitter:description', desc);

    return () => {
      document.title = SITE_NAME;
      setMetaTag('name', 'description', DEFAULT_DESCRIPTION);
      setMetaTag('property', 'og:title', DEFAULT_TITLE);
      setMetaTag('name', 'twitter:title', DEFAULT_TITLE);
      setMetaTag('property', 'og:description', DEFAULT_DESCRIPTION);
      setMetaTag('name', 'twitter:description', DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}

import { useEffect } from 'react';
import { getCityMeta, getHomeMeta } from '../lib/cities';
import {
  SITE_URL, SITE_NAME, SITE_LOCALE,
  DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_WIDTH, DEFAULT_OG_IMAGE_HEIGHT, DEFAULT_OG_IMAGE_ALT,
} from '../lib/seo';

const DEFAULT_TITLE = 'MAbroad — Descubre y compara tu ciudad Erasmus ideal';

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(data) {
  let el = document.querySelector('script[data-tmate-jsonld]');
  if (!data) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-tmate-jsonld', 'true');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * useSEO
 * Actualiza title, meta description, canonical, Open Graph, Twitter Card
 * y JSON-LD dinámicamente. Sin dependencias extra — nativo del DOM.
 *
 * Dos formas de usarlo:
 *  - useSEO({ isHome: true })                      → metadatos de home
 *  - useSEO({ city, overallScore })                 → metadatos de ficha de ciudad
 *  - useSEO({ title, description, path, jsonLd })   → cualquier otra página
 */
export function useSEO({ city = null, overallScore = 0, isHome = false, title, description, path, jsonLd } = {}) {
  useEffect(() => {
    const meta = isHome
      ? getHomeMeta()
      : city
        ? getCityMeta(city, overallScore)
        : (title || description)
          ? { title, description, ogImage: DEFAULT_OG_IMAGE }
          : null;

    if (!meta) return;

    const finalTitle = meta.title || DEFAULT_TITLE;
    const rawPath = path ?? window.location.pathname;
    const url = `${SITE_URL}${rawPath === '/' ? '/' : rawPath.replace(/\/$/, '')}`;

    document.title = finalTitle;
    setMeta('name', 'description', meta.description);
    setCanonical(url);

    // Open Graph
    setMeta('property', 'og:title', finalTitle);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:type', city ? 'article' : 'website');
    setMeta('property', 'og:locale', SITE_LOCALE);
    if (meta.ogImage) {
      setMeta('property', 'og:image', meta.ogImage);
      setMeta('property', 'og:image:secure_url', meta.ogImage);
      const isDefault = meta.ogImage === DEFAULT_OG_IMAGE;
      const alt = isDefault ? DEFAULT_OG_IMAGE_ALT : city ? `Vista de ${city.name}, ${city.country}` : DEFAULT_OG_IMAGE_ALT;
      setMeta('property', 'og:image:alt', alt);
      setMeta('name', 'twitter:image:alt', alt);
      // Dimensiones solo cuando se conocen (imagen de marca 1200×630).
      for (const [k, v] of [['og:image:width', DEFAULT_OG_IMAGE_WIDTH], ['og:image:height', DEFAULT_OG_IMAGE_HEIGHT]]) {
        const el = document.querySelector(`meta[property="${k}"]`);
        if (isDefault) setMeta('property', k, String(v));
        else if (el) el.remove();
      }
    }

    // Twitter Card
    setMeta('name', 'twitter:card', meta.ogImage ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', finalTitle);
    setMeta('name', 'twitter:description', meta.description);
    if (meta.ogImage) setMeta('name', 'twitter:image', meta.ogImage);

    // JSON-LD (datos estructurados) — opcional, lo decide cada página
    setJsonLd(jsonLd || null);

    return () => {
      // Restaurar valores por defecto al desmontar, para que la siguiente
      // página no herede metadatos de la anterior si tarda en montar.
      document.title = DEFAULT_TITLE;
      setJsonLd(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, overallScore, isHome, title, description, path, jsonLd]);
}

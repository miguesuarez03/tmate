import { useEffect } from 'react';
import { getCityMeta, getHomeMeta } from '../lib/cities';

/**
 * useSEO
 * Actualiza <title> y meta description dinámicamente.
 * Sin dependencias extra — nativo del DOM.
 *
 * @param {{ city?: object, overallScore?: number, isHome?: boolean }} options
 */
export function useSEO({ city = null, overallScore = 0, isHome = false } = {}) {
  useEffect(() => {
    const meta = isHome
      ? getHomeMeta()
      : city
        ? getCityMeta(city, overallScore)
        : null;

    if (!meta) return;

    // Title
    document.title = meta.title;

    // Meta description
    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
      descEl = document.createElement('meta');
      descEl.setAttribute('name', 'description');
      document.head.appendChild(descEl);
    }
    descEl.setAttribute('content', meta.description);

    // OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', meta.title);

    // OG description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', meta.description);

    // OG image (solo en páginas de ciudad)
    if (meta.ogImage) {
      let ogImg = document.querySelector('meta[property="og:image"]');
      if (!ogImg) {
        ogImg = document.createElement('meta');
        ogImg.setAttribute('property', 'og:image');
        document.head.appendChild(ogImg);
      }
      ogImg.setAttribute('content', meta.ogImage);
    }

    return () => {
      // Restaurar title por defecto al desmontar
      document.title = 'TMate — Descubre tu próximo Erasmus';
    };
  }, [city, overallScore, isHome]);
}

import { useState, useCallback } from 'react';
import { getFavorites, toggleFavorite as toggle, isFavorite as check } from '../lib/cities';

/**
 * useFavorites
 * Hook reactivo para gestionar favoritos.
 * Persiste en localStorage. Preparado para sincronizar con backend.
 */
export function useFavorites() {
  const [favs, setFavs] = useState(() => getFavorites());

  const toggleFavorite = useCallback((slug) => {
    const next = toggle(slug);
    setFavs(next);
    return next;
  }, []);

  const isFav = useCallback((slug) => favs.includes(slug), [favs]);

  return {
    favorites: favs,
    favoritesCount: favs.length,
    toggleFavorite,
    isFav,
  };
}

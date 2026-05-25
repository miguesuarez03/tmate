import { useState, useMemo, useCallback } from 'react';
import { filterCities, getRegions } from '../lib/cities';

/**
 * useCityFilter
 * Encapsula toda la lógica de filtrado, búsqueda y ordenación.
 * Usado en HomePage. Preparado para una página /explore con filtros avanzados.
 *
 * @param {{ initialRegion?: string, initialSort?: string }} options
 */
export function useCityFilter({ initialRegion = 'Todos', initialSort = 'name' } = {}) {
  const [region, setRegion]   = useState(initialRegion);
  const [query, setQuery]     = useState('');
  const [sortKey, setSortKey] = useState(initialSort);
  const [experiences, setExperiences] = useState([]);

  const regions = useMemo(() => getRegions(), []);

  const cities = useMemo(
    () => filterCities({ region, query, experiences: experiences.length ? experiences : undefined }, sortKey),
    [region, query, sortKey, experiences]
  );

  const resetFilters = useCallback(() => {
    setRegion('Todos');
    setQuery('');
    setSortKey('name');
    setExperiences([]);
  }, []);

  const toggleExperience = useCallback((exp) => {
    setExperiences(prev =>
      prev.includes(exp) ? prev.filter(e => e !== exp) : [...prev, exp]
    );
  }, []);

  return {
    // estado
    region, query, sortKey, experiences,
    // resultado
    cities,
    totalCount: cities.length,
    regions,
    // setters
    setRegion, setQuery, setSortKey,
    toggleExperience,
    resetFilters,
    hasActiveFilters: region !== 'Todos' || query !== '' || experiences.length > 0,
  };
}

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filterCities, getRegions } from '../lib/cities';

/**
 * useCityFilter
 * Encapsula toda la lógica de filtrado, búsqueda y ordenación.
 * Usado en HomePage. Preparado para una página /explore con filtros avanzados.
 *
 * El filtro de región vive en la URL (?region=...) en vez de en estado local:
 * así, si entras a una ciudad y pulsas "atrás", la región que tenías
 * seleccionada sigue ahí — no se resetea por desmontar el componente.
 * query/sortKey/experiences se quedan en estado local porque hoy no hay UI
 * que los modifique (region es el único filtro real que existe en pantalla).
 *
 * @param {{ initialRegion?: string, initialSort?: string }} options
 */
export function useCityFilter({ initialRegion = 'Todos', initialSort = 'name' } = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get('region') || initialRegion;

  const [query, setQuery]     = useState('');
  const [sortKey, setSortKey] = useState(initialSort);
  const [experiences, setExperiences] = useState([]);

  const regions = useMemo(() => getRegions(), []);

  const setRegion = useCallback((next) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (!next || next === 'Todos') {
        params.delete('region');
      } else {
        params.set('region', next);
      }
      return params;
    }, { replace: true });
  }, [setSearchParams]);

  const cities = useMemo(
    () => filterCities({ region, query, experiences: experiences.length ? experiences : undefined }, sortKey),
    [region, query, sortKey, experiences]
  );

  const resetFilters = useCallback(() => {
    setRegion('Todos');
    setQuery('');
    setSortKey('name');
    setExperiences([]);
  }, [setRegion]);

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

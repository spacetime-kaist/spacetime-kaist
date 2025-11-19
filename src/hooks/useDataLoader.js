import { useState, useEffect } from 'react';

/**
 * Custom hook to load JSON data from public/data folder
 * @param {string} dataFile - Name of the JSON file (without .json extension)
 * @returns {object} - { data, loading, error }
 */
export function useDataLoader(dataFile) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/data/${dataFile}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load ${dataFile}.json`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        console.error(`Error loading ${dataFile}:`, err);
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dataFile]);

  return { data, loading, error };
}


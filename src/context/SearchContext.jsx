/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(searchQuery);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      setError(null);

      const endpoints = ['musics', 'albums', 'playlists', 'artists'];
      const results = {};

      for (const endpoint of endpoints) {
        const url = `https://yt-music-api-zeta.vercel.app/api/express/search/${endpoint}?query=${searchQuery}`;
        console.log(url);
        const response = await fetch(url);
        results[`${endpoint}Results`] = await response.json();
      }

      return results;
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };


  const updateSearchResults = async () => {
    if (searchQuery.trim() !== '') {
      const results = await fetchSearchResults();
      setSearchResults(results);
    }
  };
  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, searchResults, updateSearchResults, loading, error }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  return useContext(SearchContext);
};

export { useSearch };

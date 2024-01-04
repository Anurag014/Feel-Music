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
        const url = `https://10097b2b-9957-4339-b1cd-c510ad531fc5-00-3ds2d9xmjg2e2.asia-b.replit.dev/search/${endpoint}?query=${searchQuery}`;
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
    value={{ searchQuery, setSearchQuery, searchResults, updateSearchResults,loading,error }}
  >
    {children}
  </SearchContext.Provider>
);
};

const useSearch = () => {
  return useContext(SearchContext);
};

export { useSearch };

import { useState } from 'react';
import axios from 'axios';
import icons from '../../assets/icons/icons.svg';
import scss from './SearchLocation.module.scss';

const SearchLocation = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: query,
          format: 'json',
          addressdetails: 1,
          countrycodes: 'de',
          limit: 5
        }
      });
      setSearchResults(response.data);
      onSearch(response.data);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() !== '') {
      handleSearch(query);
    } else {
      setSearchResults([]);
    }
  };

  const handleClearInput = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleResultClick = (result) => {
    setSearchQuery(result.display_name);
    setSearchResults([]);
    onSearch([result]);
  };

  return (
    <div className={scss.searchLocation}>
      <input 
        type="text" 
        placeholder="PLZ або місто..." 
        value={searchQuery}
        onChange={handleChange}
      />
      
      {searchQuery && (
        <button className={scss.clearButton} onClick={handleClearInput}>
          <svg className={scss.icon}>
            <use href={`${icons}#icon-close`}></use>
          </svg>
        </button>
      )}

      <div className={scss.searchResults}>
        {searchResults.map(result => (
          <div 
            key={result.place_id}
            onClick={() => handleResultClick(result)}
            className={scss.resultItem}
          >
            {result.display_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchLocation;

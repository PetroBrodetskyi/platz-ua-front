import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import scss from './SearchLocation.module.scss';
import locationData from './locations.json';

const SearchLocation = ({ onSearch }) => {
  const [plzQuery, setPlzQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    const filteredResults = locationData.filter(
      (location) =>
        (plzQuery === '' || location.plz.toString().includes(plzQuery)) &&
        (cityQuery === '' || location.city.toLowerCase().includes(cityQuery.toLowerCase()))
    );
    setSearchResults(filteredResults);
    onSearch(filteredResults);
  };

  useEffect(() => {
    if ((plzQuery || '').trim() !== '' || (cityQuery || '').trim() !== '') {
      handleSearch();
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [plzQuery, cityQuery]);

  const handlePlzChange = (e) => {
    setPlzQuery(e.target.value || '');
  };

  const handleCityChange = (e) => {
    setCityQuery(e.target.value || '');
  };

  const handleClearPlz = () => {
    setPlzQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleClearCity = () => {
    setCityQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleResultClick = (result) => {
    setPlzQuery(result.plz.toString());
    setCityQuery(result.city);
    setSearchResults([]);
    setTimeout(() => setShowResults(false), 0);
    onSearch([result]);
  };

  return (
    <div className={scss.searchLocation}>
      <div className={scss.container}>
        <div className={scss.inputWrapper}>
          <input 
            type="text" 
            placeholder="PLZ" 
            value={plzQuery}
            onChange={handlePlzChange}
            className={scss.inputPlz}
          />
          {plzQuery && (
            <button className={scss.clearButton} onClick={handleClearPlz}>
              <IoClose className={scss.icon} />
            </button>
          )}
        </div>

        <div className={scss.inputWrapper}>
          <input 
            type="text" 
            placeholder="Місто" 
            value={cityQuery}
            onChange={handleCityChange}
            className={scss.inputCity}
          />
          {cityQuery && (
            <button className={scss.clearButton} onClick={handleClearCity}>
              <IoClose className={scss.icon} />
            </button>
          )}
          
        </div>
        <div>
          <button className={scss.searchButton} onClick={handleSearch}>
            Пошук
          </button>
        </div>
      </div>

      {showResults && (
        <div className={scss.searchResults}>
          {searchResults.map(result => (
            <div 
              key={`${result.plz}-${result.city}`}
              onClick={() => handleResultClick(result)}
              className={scss.resultItem}
            >
              {result.city} ({result.plz})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchLocation;
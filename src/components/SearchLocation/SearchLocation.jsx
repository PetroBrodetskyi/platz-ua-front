import { useState, useEffect, useCallback } from 'react';
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { ButtonBase } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import scss from './SearchLocation.module.scss';
import locationData from './locations.json';
import { setLocation, fetchProducts, fetchProductsByLocation, clearProducts } from '../../redux/features/productsSlice';

const SearchLocation = () => {
  const [plzQuery, setPlzQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();

  const filterLocations = useCallback(() => {
    return locationData.filter(
      (location) =>
        (plzQuery === '' || location.plz.toString().includes(plzQuery)) &&
        (cityQuery === '' || location.city.toLowerCase().includes(cityQuery.toLowerCase()))
    );
  }, [plzQuery, cityQuery]);

  const handleSearch = useCallback(async () => {
    const filteredResults = filterLocations();
    setSearchResults(filteredResults);

    if (filteredResults.length > 0) {
      dispatch(clearProducts()); // Очищення поточних продуктів перед завантаженням нових
      dispatch(fetchProductsByLocation({ PLZ: plzQuery, city: cityQuery }));
    } else {
      console.log('No results found for products.');
      dispatch(clearProducts()); // Очищення поточних продуктів
      dispatch(fetchProductsByLocation([])); // Завантаження порожнього списку
    }
  }, [plzQuery, cityQuery, dispatch, filterLocations]);

  useEffect(() => {
    if (plzQuery.trim() !== '' || cityQuery.trim() !== '') {
      const filteredResults = filterLocations();
      setSearchResults(filteredResults);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
      dispatch(clearProducts()); // Очищення поточних продуктів перед завантаженням нових
      dispatch(fetchProducts({ page: 1 })); // Завантаження початкових продуктів (найновіших оголошень)
    }
  }, [plzQuery, cityQuery, filterLocations, dispatch]);

  const handleChange = (setter) => (e) => {
    const value = e.target.value || '';
    setter(value);
  };

  const handleClearAll = () => {
    setPlzQuery('');
    setCityQuery('');
    setSearchResults([]);
    setShowResults(false);

    dispatch(clearProducts()); // Очищення поточних продуктів перед завантаженням нових
    dispatch(fetchProducts({ page: 1 })); // Завантаження початкових продуктів (найновіших оголошень)
  };

  const handleResultClick = (result) => {
    setPlzQuery(result.plz.toString());
    setCityQuery(result.city);
    setSearchResults([]);
    setTimeout(() => setShowResults(false), 0);
    dispatch(setLocation(result));
  };

  return (
    <div className={scss.searchLocation}>
      <div className={scss.container}>
        <div className={scss.plzCity}>
          <div className={scss.inputWrapper}>
            <input 
              type="text" 
              placeholder="PLZ" 
              value={plzQuery}
              onChange={handleChange(setPlzQuery)}
              className={scss.inputPlz}
            />
            {plzQuery && (
              <button className={scss.clearButton} onClick={handleClearAll}>
                <IoClose className={scss.icon} />
              </button>
            )}
          </div>

          <div className={scss.inputWrapper}>
            <input 
              type="text" 
              placeholder="Місто" 
              value={cityQuery}
              onChange={handleChange(setCityQuery)}
              className={scss.inputCity}
            />
            {cityQuery && (
              <button className={scss.clearButton} onClick={handleClearAll}>
                <IoClose className={scss.icon} />
              </button>
            )}
          </div>
        </div>
        <div>
          <ButtonBase 
            className={scss.searchButton} 
            onClick={handleSearch}
            focusRipple
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={scss.motionWrapper}
            >
              <IoSearchSharp className={scss.iconSearch} />
            </motion.div>
          </ButtonBase>
        </div>
      </div>

      {showResults && searchResults.length > 0 && (
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

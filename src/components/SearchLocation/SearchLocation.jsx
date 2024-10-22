import { useState, useEffect, useCallback } from 'react';
import { IoClose, IoSearchSharp } from 'react-icons/io5';
import { ButtonBase } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useTheme } from '../../context/ThemeContext';
import {
  setLocation,
  fetchProducts,
  fetchProductsByLocation,
  clearProducts
} from '../../redux/features/productsSlice';
import axios from 'axios';
import scss from './SearchLocation.module.scss';

const SearchLocation = () => {
  const [plzQuery, setPlzQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isResultSelected, setIsResultSelected] = useState(false);
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  const fetchLocations = useCallback(async () => {
    if (!plzQuery.trim() && !cityQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/locations/search?plz=${plzQuery}&city=${cityQuery}`
      );
      setSearchResults(response.data);
      setShowResults(response.data.length > 0 && !isResultSelected);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setSearchResults([]);
      setShowResults(false);
    }
  }, [plzQuery, cityQuery, isResultSelected]);

  useEffect(() => {
    if (!isResultSelected) {
      fetchLocations();
    }
  }, [plzQuery, cityQuery, fetchLocations, isResultSelected]);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setIsResultSelected(false);
  };

  const handleClearAll = () => {
    setPlzQuery('');
    setCityQuery('');
    setSearchResults([]);
    setShowResults(false);

    dispatch(clearProducts());
    dispatch(fetchProducts({ page: 1 }));
  };

  const handleResultClick = (result) => {
    setPlzQuery(result.plz.toString());
    setCityQuery(result.city);
    setSearchResults([]);
    setShowResults(false);
    dispatch(setLocation(result));
    setIsResultSelected(true);
  };

  const handleSearch = () => {
    dispatch(fetchProductsByLocation({ PLZ: plzQuery, city: cityQuery }));
    setShowResults(false);
  };

  const tooltipStyles = {
    [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
      {
        marginTop: '24px'
      }
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
              className={`${scss.inputPlz} ${isDarkMode ? scss.darkMode : ''}`}
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
              className={`${scss.inputCity} ${isDarkMode ? scss.darkMode : ''}`}
            />
            {cityQuery && (
              <button className={scss.clearButton} onClick={handleClearAll}>
                <IoClose className={scss.icon} />
              </button>
            )}
          </div>
        </div>
        <div>
          <Tooltip
            title="Пошук"
            placement="bottom-end"
            slotProps={{
              popper: { sx: tooltipStyles }
            }}
          >
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
          </Tooltip>
        </div>
      </div>

      {showResults && searchResults.length > 0 && (
        <div
          className={`${scss.searchResults} ${isDarkMode ? scss.darkMode : ''}`}
        >
          {searchResults.map((result) => (
            <div
              key={`${result.plz}-${result.city}`}
              onClick={() => handleResultClick(result)}
              className={`${scss.resultItem} ${isDarkMode ? scss.darkMode : ''}`}
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

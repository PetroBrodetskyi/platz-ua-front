import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Map from '../../Map';
import { useTheme } from '../../../context/ThemeContext';
import scss from './LocationMap.module.scss';

const LocationMap = ({ loadingCoordinates, coordinates, plz, city }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${scss.mapContainer} ${isDarkMode ? scss.darkMode : ''}`}>
      <h3 className={scss.title}>Локація</h3>
      <div className={scss.mapInfoContainer}>
        <p className={scss.mapInfo}>
          На карті відображено місцезнаходження населеного пункту, зазначеного
          продавцем при створенні оголошення. Це дозволяє приблизно оцінити, де
          знаходиться товар або послуга. Для отримання точної адреси зверніться
          до продавця під час обговорення деталей замовлення.
        </p>
        <div className={scss.map}>
          {loadingCoordinates ? (
            <Skeleton
              variant="rectangular"
              animation="pulse"
              width="100%"
              height="400px"
              style={{ borderRadius: '8px' }}
            />
          ) : coordinates ? (
            <Map
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
              plz={plz}
              city={city}
            />
          ) : (
            <p>Координати не знайдено</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;

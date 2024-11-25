import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { FaMapMarkedAlt } from 'react-icons/fa'; // Імпорт іконки
import Map from '../../Map';
import { useTheme } from '../../../context/ThemeContext';
import scss from './LocationMap.module.scss';

const LocationMap = ({ loadingCoordinates, coordinates, plz, city }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={scss.locationMap}>
      <h3 className={scss.title}>Локація</h3>
      <div
        className={`${scss.mapContainer} ${isDarkMode ? scss.darkMode : ''}`}
      >
        <div className={scss.mapInfoContainer}>
          <p className={scss.mapInfo}>
            На карті відображено місцезнаходження населеного пункту, зазначеного
            продавцем при створенні оголошення. Це дозволяє приблизно оцінити,
            де знаходиться товар або послуга. Для отримання точної адреси, якщо
            це необхідно, зверніться до продавця під час обговорення деталей
            замовлення.
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
              <div className={scss.placeholder}>
                <FaMapMarkedAlt className={scss.icon} />
                <p className={scss.text}>Координати не знайдено</p>
                <p>
                  Можливо, дозвіл на доступ до геоданих був відключений або
                  заборонений
                </p>
                <p>
                  Перевірте налаштування доступу до місцезнаходження у вашому
                  браузері або пристрої
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;

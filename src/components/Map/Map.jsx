import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer
} from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';
import scss from './Map.module.scss';
import { borderRadius } from '@mui/system';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '4px'
};

const Map = ({ latitude, longitude, plz, city }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const center = useMemo(
    () => ({ lat: latitude, lng: longitude }),
    [latitude, longitude]
  );

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      draggable: true
    }),
    []
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: userLat, longitude: userLng } = position.coords;
          setUserLocation({ lat: userLat, lng: userLng });
        },
        (error) =>
          console.error('Не вдалося отримати місце розташування:', error)
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation && latitude && longitude) {
      const distanceTo = Math.sqrt(
        Math.pow(userLocation.lat - latitude, 2) +
          Math.pow(userLocation.lng - longitude, 2)
      );
      setDistance((distanceTo * 111).toFixed(2));
    }
  }, [userLocation, latitude, longitude]);

  const handleDirectionsResponse = (response) => {
    if (response?.status === 'OK') {
      setDirectionsResponse(response);
    } else {
      console.error('Directions request failed:', response);
    }
  };

  if (!isLoaded) {
    return <div>Завантаження карти...</div>;
  }

  return (
    <div className={scss.mapContainer}>
      <div className={scss.map}>
        <GoogleMap
          id="google-map"
          mapContainerStyle={containerStyle}
          zoom={12}
          center={center}
          options={mapOptions}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {userLocation && !directionsResponse && (
            <DirectionsService
              options={{
                destination: { lat: latitude, lng: longitude },
                origin: userLocation,
                travelMode: 'DRIVING'
              }}
              callback={handleDirectionsResponse}
            />
          )}

          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
              options={{
                suppressMarkers: false
              }}
            />
          )}
        </GoogleMap>
        <div>
          {distance && (
            <p className={scss.distance}>
              Відстань до {plz} {city} складає приблизно: {distance} км
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;

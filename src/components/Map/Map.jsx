import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import scss from './Map.module.scss';

import icon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = L.icon({
  iconUrl: icon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
});

const userIcon = L.icon({
  iconUrl: icon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41]
});

const Map = ({ latitude, longitude, plz, city }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude: userLat, longitude: userLng } = coords;
          setUserLocation([userLat, userLng]);
        },
        (error) =>
          console.error('Не вдалося отримати місце розташування:', error),
        { enableHighAccuracy: true }
      );
    } else {
      console.warn('Геолокація не підтримується вашим браузером.');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation && latitude && longitude) {
      const dist = (
        L.latLng(userLocation).distanceTo(L.latLng(latitude, longitude)) / 1000
      ).toFixed(2);
      setDistance(dist);
    }
  }, [userLocation, latitude, longitude]);

  const AddRoute = () => {
    const map = useMap();

    useEffect(() => {
      if (userLocation && latitude && longitude) {
        const routingControl = L.Routing.control({
          waypoints: [L.latLng(userLocation), L.latLng(latitude, longitude)],
          routeWhileDragging: true,
          lineOptions: { styles: [{ color: '#000', weight: 5 }] }
        }).addTo(map);

        return () => {
          routingControl.remove();
        };
      }
    }, [userLocation, latitude, longitude, map]);

    return null;
  };

  return (
    <div className={scss.mapContainer}>
      <MapContainer
        center={userLocation || [latitude, longitude]}
        zoom={13}
        className={scss.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup className={scss.popup}>
            {plz} {city}
          </Popup>
        </Marker>

        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup className={scss.info}>Ваше місце розташування</Popup>
          </Marker>
        )}

        <AddRoute />
      </MapContainer>

      {distance && (
        <p style={{ marginTop: 10, fontSize: 16 }}>
          Відстань до {plz} {city} складає приблизно: {distance} км
        </p>
      )}
    </div>
  );
};

export default Map;

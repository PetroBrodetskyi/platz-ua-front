import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import scss from './Map.module.scss';

const Map = ({ latitude, longitude, plz, city }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{
        height: '400px',
        width: '100%',
        borderRadius: '8px'
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          {plz} {city}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

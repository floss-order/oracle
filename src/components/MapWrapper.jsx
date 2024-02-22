import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Create a React component that includes the MapContainer and other components
function MyMap() {
  return (
    <MapContainer
      style={{ width: '100%', height: '100%', position: 'relative' }}
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      attributionControl={false}
    >
      <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MyMap;

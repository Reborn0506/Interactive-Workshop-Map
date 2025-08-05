'use client';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet for custom icons
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default function Map({ center = [50.0412, 21.9991], zoom = 12 }) {
  const [workshops, setWorkshops] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted on client side
  useEffect(() => {
    setIsMounted(true);
    fetch('/api/workshops?lat=50.0412&lng=21.9991&service=Oil Change')
      .then((res) => res.json())
      .then((data) => setWorkshops(data))
      .catch((error) => console.error('Error fetching workshops:', error));
  }, []);

  // Render nothing until mounted on client
  if (!isMounted) return null;

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {workshops.map((workshop) => (
        <Marker key={workshop.id} position={[workshop.lat, workshop.lng]}>
          <Popup>
            <h3 className="font-bold">{workshop.name}</h3>
            <p>Services: {JSON.parse(workshop.services).join(', ')}</p>
            <p>Rating: {workshop.rating}/5</p>
            <a href={`/workshop/${workshop.id}`} className="text-blue-500">
              View Details
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
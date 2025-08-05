import dynamic from 'next/dynamic';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';

// Dynamically import Map component with SSR disabled
const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [mapCenter, setMapCenter] = useState([50.0412, 21.9991]);

  const handleSearch = ({ lat, lng, service }) => {
    setMapCenter([lat, lng]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">Car Workshop Booking</h1>
      </header>
      <main className="p-4">
        <SearchBar onSearch={handleSearch} />
        <Map center={mapCenter} />
      </main>
    </div>
  );
}
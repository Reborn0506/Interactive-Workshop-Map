'use client';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [service, setService] = useState('');

  const handleSearch = async () => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
    const data = await response.json();
    if (data.length > 0) {
      onSearch({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), service });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 p-4 bg-white shadow-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter location (e.g., Rzeszów)"
        className="p-2 border rounded flex-1"
      />
      <input
        type="text"
        value={service}
        onChange={(e) => setService(e.target.value)}
        placeholder="Enter service (e.g., Oil Change)"
        className="p-2 border rounded flex-1"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}
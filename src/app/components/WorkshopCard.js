'use client';
export default function WorkshopCard({ workshop }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col md:flex-row gap-4">
      <img
        src={JSON.parse(workshop.images)[0] || '/default-workshop.jpg'}
        alt={workshop.name}
        className="w-full md:w-1/3 rounded-md object-cover"
      />
      <div className="flex-1">
        <h2 className="text-xl font-bold">{workshop.name}</h2>
        <p className="text-gray-600">Services: {JSON.parse(workshop.services).join(', ')}</p>
        <p className="text-gray-600">Rating: {workshop.rating}/5</p>
        <p className="text-gray-600">Distance: {(workshop.distance / 1000).toFixed(1)} km</p>
        <a
          href={`/workshop/${workshop.id}`}
          className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
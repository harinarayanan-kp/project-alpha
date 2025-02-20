import Image from "next/image";

const EventTile = ({ event }) => (
  <div className="border rounded-lg shadow-md transition-transform transform hover:-translate-y-1 max-w-sm mx-auto p-4">
    <div className="event-details">
      <h2 className="text-2xl font-semibold mb-2">{event.ename}</h2>
      <p className="text-gray-600 mb-1">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-1">{event.time}</p>
      <p className="text-gray-600 mb-1">{event.venue}</p>
      <p className="text-gray-600 mb-1">Hosted by: {event.club_name}</p>
      {event.reg_link && (
        <a href={event.reg_link} className="text-blue-500 hover:underline block mt-2" target="_blank" rel="noopener noreferrer">
          Register Here
        </a>
      )}
      {event.socialmedia_link && (
        <a href={event.socialmedia_link} className="text-blue-500 hover:underline block mt-2" target="_blank" rel="noopener noreferrer">
          Follow on Instagram
        </a>
      )}
    </div>
  </div>
);

export default EventTile;

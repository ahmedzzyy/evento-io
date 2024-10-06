const EventCard = ({ event }) => (
    <div className="event-card">
        <h2>{event.title}</h2>
        <p>{event.description.substring(0, 100) + "..."}</p>
        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
        <a href={`/events/${event._id}`}>View Details</a>
    </div>
);

export default EventCard;

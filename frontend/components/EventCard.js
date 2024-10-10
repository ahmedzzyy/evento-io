import styles from "@/styles/EventCard.module.css";

const EventCard = ({ event }) => (
    <div className={styles.eventCard}>
        <h2>{event.title}</h2>
        <p>{event.description.substring(0, 100)} {event.description.length > 100 ? "..." : ""}</p>
        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
        <a href={`/events/${event._id}`}>View Details</a>
    </div>
);

export default EventCard;

// TODO : Conflicting token auth methods - resolve - Bearer Token vs x-auth-token
//          -- Update that in Insomnia
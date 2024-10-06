import { useEffect, useState } from "react";
import Link from "next/link";
import { filterEvents } from "@/services/eventService";
import EventCard from "@/components/EventCard";

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const dateFrom = new Date().toISOString().split('T')[0]; // Provides a timestamp
                const dateTo = undefined; // Omit dateTo
                const location = undefined; // Omit location
                const type = undefined; // Omit type
                const fetchedEvents = await filterEvents({ dateFrom, dateTo, location, type });

                setEvents(fetchedEvents);
                setLoading(false);
            } catch (err) {
                setError('Failed to load events.');
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading events ...</div>
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="homepage">
            <h1>Welcome to Evento!</h1>
            <p>Explore upcoming events or create your own!</p>

            <div className="event-list">
                {events.length > 0 ? (
                    events.map(event => (
                        <>
                            <EventCard key={event._id} event={event} />
                            <Link to={`/events/${event._id}`}>View Details</Link>
                        </>
                    ))
                ) : (
                    <p>No upcoming events available</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;
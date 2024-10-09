import { useEffect, useState } from "react";
import { fetchEventByOrganizer } from "@/services/eventService";
import { useRouter } from "next/router";
import EventCard from "@/components/EventCard";
import styles from "@/styles/organizer.module.css";

const OrganizerProfile = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const fetchOrganizerEvents = async () => {
            try {
                const organizerEvents = await fetchEventByOrganizer(); // API call to fetch events organized by the user
                setEvents(organizerEvents);
            } catch (err) {
                setError(err.message || 'Failed to fetch user events');;
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizerEvents();
    }, []);

    const handleCreateEvent = () => {
        router.push('/events/create');  // Redirect to event creation page
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h2>Organizer Dashboard</h2>
            <button className={styles.createButton} onClick={handleCreateEvent}>Create New Event</button>

            <h3>Your Events</h3>
            {events.length > 0 ? (
                <div className={styles.eventsContainer}>
                    {events.map((event) => (
                        <div key={event._id}>
                            <EventCard key={event._id} event={event} />
                            <button onClick={() => router.push(`/events/edit/${event._id}`)}>Edit</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.noEvents}>You haven't created any events yet.</p>
            )}
        </div>
    );
};

export default OrganizerProfile;

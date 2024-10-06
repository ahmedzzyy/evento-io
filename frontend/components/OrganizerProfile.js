import { useEffect, useState } from "react";
import { fetchEventByOrganizer } from "@/services/eventService";
import { useRouter } from "next/router";
import EventCard from "@/components/EventCard";

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
        <div>
            <h2>Organizer Dashboard</h2>
            <button onClick={handleCreateEvent}>Create New Event</button>

            <h3>Your Events</h3>
            {events.length > 0 ? (
                <>
                    {events.map((event) => (
                        <>
                            <EventCard key={event._id} event={event} />
                            <button onClick={() => router.push(`/events/edit/${event._id}`)}>Edit</button>
                        </>
                    ))}
                </>
            ) : (
                <p>You haven't created any events yet.</p>
            )}
        </div>
    );
};

export default OrganizerProfile;

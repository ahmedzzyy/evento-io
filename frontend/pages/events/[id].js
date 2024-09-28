import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchEventById } from "@/services/eventService";
import Link from "next/link";

const EventDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchEvent = async () => {
                try {
                    const fetchedEvent = await fetchEventById(id);
                    setEvent(fetchedEvent);
                } catch (err) {
                    setError("Failed to fetch event details")
                } finally {
                    setLoading(false);
                }
            };

            fetchEvent();
        }
    }, [id]);

    if (loading) {
        return <div>Loading Event Details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!event) {
        return <div>No event found</div>;
    }

    return (
        <div className="event-detail">
            <h1>{event.title}</h1>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Organizer:</strong> {event.organizer.name}</p>

            {/* Back to all events link */}
            <Link href="/events">
                <a>Back to All Events</a>
            </Link>
        </div>
    );
}

export default EventDetail;
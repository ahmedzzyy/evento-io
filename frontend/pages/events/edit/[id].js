import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchEventById, updateEvent } from "@/services/eventService";
import withAuth from "@/components/withAuth";

const EditEvent = () => {
    const router = useRouter();
    const { id } = router.query; // Event ID from URL

    const [event, setEvent] = useState({
        title: '',
        description: '',
        location: '',
        date: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch event when component mounts
        const fetchEvent = async () => {
            try {
                const fetchedEvent = await fetchEventById(id);
                setEvent({
                    title: fetchedEvent.title,
                    description: fetchedEvent.description,
                    location: fetchedEvent.location,
                    date: fetchedEvent.date.split('T')[0], // Format date for input
                })
            } catch (err) {
                setError("Failed to Load Event");
            }
        }

        if (id) fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateEvent(id, event);
            router.push(`/events/${id}`);
        } catch (err) {
            setError("Failed to update event");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="edit-event-page">
            <h1>Edit Event</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={event.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={event.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Event'}
                </button>
            </form>
        </div>
    );
}

export default withAuth(EditEvent, 'organizer');
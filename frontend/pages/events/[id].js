import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchEventById } from "@/services/eventService";
import { createRegistration } from "@/services/registrationService";
import styles from "@/styles/EventDetail.module.css";

const EventDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRegistered, setRegistered] = useState(false);

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

    const handleRegister = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert("Please log in to register for the event.");
            router.push('/auth/login');  // Redirect to login page if not logged in
            return;
        }

        try {
            await createRegistration(id);
            alert("Successfully registered for the event!");
            setRegistered(true);
        } catch (err) {
            setError("Failed to Register for event");
        }
    }

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
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.eventTitle}>{event.title}</h1>
                <p className={styles.date}>Date: {new Date(event.date).toLocaleDateString()}</p>
            </div>

            <div className={styles.details}>
                <h2>Details</h2>
                <p className={styles.description}>{event.description}</p>
            </div>

            <div className={styles.actions}>
                {!isRegistered ? (
                    <button onClick={handleRegister} className={styles.registerButton}>Register</button>
                ) : (
                    <p>You are already registered for this event.</p>
                )}
            </div>
        </div>
    );
}

export default EventDetail;
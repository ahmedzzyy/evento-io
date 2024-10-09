import { useState } from "react";
import { useRouter } from "next/router";
import { createEvent } from "@/services/eventService";
import withAuth from "@/components/withAuth";
import styles from "@/styles/createEvent.module.css";

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const eventData = { title, description, location, date };

        try {
            await createEvent(eventData);
            router.push("/");
        } catch (err) {
            setError("Failed to create Event");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Create a New Event</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Event Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Event Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.textarea}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="date">Event Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Create Event
                </button>
            </form>
        </div>
    );

}

export default withAuth(CreateEvent);
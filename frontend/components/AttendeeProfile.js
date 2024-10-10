import { useEffect, useState } from "react";
import { fetchRegisteredEvents, fetchPastEvents, fetchUpcomingEvents } from "@/services/userService";
import EventCard from "@/components/EventCard";
import styles from "@/styles/attendee.module.css";

const AttendeeProfile = () => {
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [viewOption, setViewOption] = useState('upcoming'); // Set default view option to 'upcoming'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const userEvents = await fetchRegisteredEvents();
                const userPastEvents = await fetchPastEvents();
                const userUpcomingEvents = await fetchUpcomingEvents();
                setRegisteredEvents(userEvents);
                setPastEvents(userPastEvents);
                setUpcomingEvents(userUpcomingEvents);
            } catch (err) {
                setError(err.message || 'Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        getUserProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>

            {/* View options */}
            <div className={styles.viewOptions}>
                <button className={`${styles.viewButton} ${viewOption === 'upcoming' ? styles.active : ''}`} onClick={() => setViewOption('upcoming')}>
                    Upcoming Events
                </button>
                <button className={`${styles.viewButton} ${viewOption === 'past' ? styles.active : ''}`} onClick={() => setViewOption('past')}>
                    Past Events
                </button>
                <button className={`${styles.viewButton} ${viewOption === 'both' ? styles.active : ''}`} onClick={() => setViewOption('both')}>
                    All Events
                </button>
            </div>

            {/* Conditionally render the events based on the selected view */}
            {viewOption === 'upcoming' && (
                <>
                    <h2>Upcoming Events</h2>
                    {upcomingEvents.length > 0 ? (
                        <div className={styles.eventsContainer}>
                            {upcomingEvents.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <p className={styles.noEvents}>No upcoming events.</p>
                    )}
                </>
            )}

            {viewOption === 'past' && (
                <>
                    <h2>Past Events</h2>
                    {pastEvents.length > 0 ? (
                        <div className={styles.eventsContainer}>
                            {pastEvents.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <p className={styles.noEvents}>No past events.</p>
                    )}
                </>
            )}

            {viewOption === 'both' && (
                <>
                    <h2>Registered Events</h2>
                    {registeredEvents.length > 0 ? (
                        <div className={styles.eventsContainer}>
                            {registeredEvents.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <p className={styles.noEvents}>No registered events.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default AttendeeProfile;

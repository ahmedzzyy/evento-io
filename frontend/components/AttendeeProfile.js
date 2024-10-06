import { useEffect, useState } from "react";
import { fetchRegisteredEvents, fetchPastEvents, fetchUpcomingEvents } from "@/services/userService";
import EventCard from "@/components/EventCard";

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
        <div className="user-profile">

            {/* View options */}
            <div className="view-options">
                <button onClick={() => setViewOption('upcoming')}>
                    Upcoming Events
                </button>
                <button onClick={() => setViewOption('past')}>
                    Past Events
                </button>
                <button onClick={() => setViewOption('both')}>
                    All Events
                </button>
            </div>

            {/* Conditionally render the events based on the selected view */}
            {viewOption === 'upcoming' && (
                <>
                    <h2>Upcoming Events</h2>
                    {upcomingEvents.length > 0 ? (
                        <>
                            {upcomingEvents.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </>
                    ) : (
                        <p>No upcoming events.</p>
                    )}
                </>
            )}

            {viewOption === 'past' && (
                <>
                    <h2>Past Events</h2>
                    {pastEvents.length > 0 ? (
                        <>
                            {pastEvents.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </>
                    ) : (
                        <p>No past events.</p>
                    )}
                </>
            )}

            {viewOption === 'both' && (
                <>
                    <h2>Registered Events</h2>
                    {registeredEvents.length > 0 ? (
                        <>
                            {registeredEvents.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </>
                    ) : (
                        <p>No registered events.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default AttendeeProfile;

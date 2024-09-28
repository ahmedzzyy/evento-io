import React, { useEffect, useState } from 'react';
import { fetchUserProfile, fetchRegisteredEvents, fetchPastEvents, fetchUpcomingEvents } from "../../services/userService";
import EventCard from "../../components/EventCard";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [viewOption, setViewOption] = useState('upcoming'); // Set default view option to 'upcoming'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const userProfile = await fetchUserProfile();
                const userEvents = await fetchRegisteredEvents();
                const userPastEvents = await fetchPastEvents();
                const userUpcomingEvents = await fetchUpcomingEvents();
                setUser(userProfile);
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
            <h1>{user?.name}'s Profile</h1>
            <p>Email: {user?.email}</p>

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
                        <ul>
                            {upcomingEvents.map((event) => (
                                <li key={event._id}>
                                    {event.title} - {new Date(event.date).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No upcoming events.</p>
                    )}
                </>
            )}

            {viewOption === 'past' && (
                <>
                    <h2>Past Events</h2>
                    {pastEvents.length > 0 ? (
                        <ul>
                            {pastEvents.map((event) => (
                                <li key={event._id}>
                                    {event.title} - {new Date(event.date).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
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

export default UserProfile;

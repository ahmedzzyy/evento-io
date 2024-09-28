import React, { useEffect, useState } from 'react';
import { fetchUserProfile, fetchRegisteredEvents } from "../../services/userService";
import EventCard from "../../components/EventCard";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const userProfile = await fetchUserProfile();
                const userEvents = await fetchRegisteredEvents();
                setUser(userProfile);
                setRegisteredEvents(userEvents);
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

            <h2>Registered Events</h2>
            {registeredEvents.length > 0 ? (
                <ul>
                    {registeredEvents.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </ul>
            ) : (
                <p>No registered events.</p>
            )}
        </div>
    );
};

export default UserProfile;

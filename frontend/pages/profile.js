import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from "@/services/userService";
import AttendeeProfile from "@/components/AttendeeProfile";
import OrganizerProfile from "@/components/OrganizerProfile";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const userProfile = await fetchUserProfile();
                setUser(userProfile);
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
        <div className='user-profile'>
            <h1>{user?.name}{"'"}s Profile</h1>
            <p>Email: {user?.email}</p>
            {user.role === "organizer" ? (
                <OrganizerProfile />
            ) : (
                <AttendeeProfile />
            )}
        </div>
    );
};

export default UserProfile;

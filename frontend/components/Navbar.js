import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';

const NavBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');
    const router = useRouter();

    // Check if the user is logged in by looking for a token in localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Decode the token to get user information
                const decodedUser = jwt_decode(token);
                setUserRole(decodedUser.role); // Assuming the token has a 'role' field
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Invalid token', error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // Logout function: Remove token and redirect to login page
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push('/auth/login');
    };

    return (
        <nav>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>

                {isAuthenticated ? (
                    <>
                        {userRole === 'organizer' ? (
                            <>
                                <li>
                                    <a href="/events/manage">Manage My Events</a>
                                </li>
                                <li>
                                    <a href="/events/create">Create New Event</a>
                                </li>
                                <li>
                                    <a href="/events/attendees">View Attendees</a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a href="/profile/registered">My Registered Events</a>
                                </li>
                                <li>
                                    <a href="/profile/past">Past Events</a>
                                </li>
                            </>
                        )}
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <a href="/auth/login">Login</a>
                        </li>
                        <li>
                            <a href="/auth/signup">Sign Up</a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;

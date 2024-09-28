import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import Link from "next/link";

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
                    <Link href="/">Home</Link>
                </li>

                {isAuthenticated ? (
                    <>
                        {userRole === 'organizer' ? (
                            <>
                                <li>
                                    <Link href="/events/manage">Manage My Events</Link>
                                </li>
                                <li>
                                    <Link href="/events/create">Create New Event</Link>
                                </li>
                                <li>
                                    <Link href="/events/attendees">View Attendees</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/profile/registered">My Registered Events</Link>
                                </li>
                                <li>
                                    <Link href="/profile/past">Past Events</Link>
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
                            <Link href="/auth/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/auth/signup">Sign Up</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import Link from "next/link";
import styles from "@/styles/navbar.module.css";

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
        <nav className={styles.navbar}>
            <Link href="/" className={styles.navbarBrand}>
                Evento
            </Link>
            <div className={styles.navbarLinks}>
                {isAuthenticated ? (
                    <>
                        {userRole === 'organizer' ? (
                            <>
                                <Link className={styles.navbarLink} href="/events/manage">Manage My Events</Link>
                                <Link className={styles.navbarLink} href="/events/create">Create New Event</Link>
                                <Link className={styles.navbarLink} href="/events/attendees">View Attendees</Link>
                            </>
                        ) : (
                            <>
                                <Link className={styles.navbarLink} href="/profile/registered">My Registered Events</Link>
                                <Link className={styles.navbarLink} href="/profile/past">Past Events</Link>
                            </>
                        )}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link className={styles.navbarLink} href="/auth/login">Login</Link>
                        <Link className={styles.navbarLink} href="/auth/signup">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;

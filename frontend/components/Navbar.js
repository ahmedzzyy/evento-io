import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUserProfile } from "@/services/userService.js";
import Link from "next/link";
import styles from "@/styles/navbar.module.css";

const NavBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');
    const router = useRouter();

    // Check if the user is logged in
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await fetchUserProfile();

                // Check if user exists and has the necessary property like 'id'
                if (!user || !user._id) {
                    // Redirect to Login
                    setIsAuthenticated(false);
                } else {
                    // Redirected to homepage if unauthorized
                    setIsAuthenticated(true);
                    setUserRole(user.role);
                }
            } catch (err) {
                setIsAuthenticated(false);
            }
        }

        checkAuth();
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
                                <Link className={styles.navbarLink} href="/profile">Manage My Events</Link>
                                <Link className={styles.navbarLink} href="/events/create">Create New Event</Link>
                            </>
                        ) : (
                            <>
                                <Link className={styles.navbarLink} href="/profile">My Events</Link>
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

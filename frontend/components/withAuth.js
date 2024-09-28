import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchUserProfile } from "../services/userService";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const checkAuth = async () => {
                const user = await fetchUserProfile();

                // Check if user exists and has the necessary property like 'id'
                if (!user || !user.id) {
                    // Redirect to Login
                    router.push("/auth/login");
                }
            }

            checkAuth();
        }, [router]);

        // Render the original component if the user is authenticated
        return <WrappedComponent {...props} />;
    }
}
import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchUserProfile } from "../services/userService";

const withAuth = (WrappedComponent, requiredRole = null) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const checkAuth = async () => {
                const user = await fetchUserProfile();

                // Check if user exists and has the necessary property like 'id'
                if (!user || !user._id) {
                    // Redirect to Login
                    router.push("/auth/login");
                } else if (requiredRole && user.role !== requiredRole) {
                    // Redirected to homepage if unauthorized
                    router.push('/');
                }
            }

            checkAuth();
        }, [router]);

        // Render the original component if the user is authenticated
        return <WrappedComponent {...props} />;
    }
}

export default withAuth;
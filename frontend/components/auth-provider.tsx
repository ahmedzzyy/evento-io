"use client"

import { fetchUserProfile } from "@/services/userService";
import { CommonUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    user: CommonUser | null
    loading: boolean
    setUser: (user: CommonUser | null) => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    setUser: () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<CommonUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await fetchUserProfile();

                if ("msg" in userData) {
                    console.log("Failed to load user: ", userData.msg);
                    return;
                }

                setUser(userData);
            } catch (error) {
                console.error("Failed to load user: ", error);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
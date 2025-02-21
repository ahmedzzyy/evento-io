import { RegisterUser } from "@/types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

// Signup a new user
export const signupUser = async (
    userData: RegisterUser
): Promise<{ token: string }> => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to sign up');
    }

    return res.json();
};

// Login an existing user
export const loginUser = async (
    credentials: { email: string; password: string; }
): Promise<{ token: string } | { msg: string }> => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to log in');
    }

    return res.json();  // Will include token
};

// Logout a user (Clear token on client-side)
export const logoutUser = (): void => {
    localStorage.removeItem('token');  // Remove token from localStorage
};

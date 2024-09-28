const BASE_URL = '/api/auth';

// Signup a new user
export const signupUser = async (userData) => {
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
export const loginUser = async (credentials) => {
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
export const logoutUser = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
};

import { CommonUser, IEvent } from "@/types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

// Fetch user's profile (Authenticated users only)
export const fetchUserProfile = async (): Promise<CommonUser | { msg: string }> => {
    const token = localStorage.getItem('token');  // Get JWT token from local storage

    const res = await fetch(`${BASE_URL}/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        }
    });

    if (!res.ok) {
        const errorData = await res.json();
        return { msg: errorData.msg }
    }

    return res.json();
}

// Update user's profile (Authenticated users only)
export const updateUser = async (updatedUserData: unknown) => {
    const token = localStorage.getItem('token');  // Get JWT token from local storage

    const res = await fetch(`${BASE_URL}/me`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        },
        body: JSON.stringify(updatedUserData)
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update user profile');
    }

    return res.json();  // Return the updated event data
}

// Fetch user's registered events (Authenticated users only)
export const fetchRegisteredEvents = async (): Promise<IEvent | { msg: string }> => {
    const token = localStorage.getItem('token');  // Get JWT token from local storage

    const res = await fetch(`${BASE_URL}/me/registered-events`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        }
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to get registered events.');
    }

    return res.json();
}

// Fetch user's past events (Authenticated users only)
export const fetchPastEvents = async (): Promise<IEvent | { msg: string }> => {
    const token = localStorage.getItem('token');  // Get JWT token from local storage

    const res = await fetch(`${BASE_URL}/me/past-events`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        }
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to get past events.');
    }

    return res.json();
}

// Fetch user's upcoming events (Authenticated users only)
export const fetchUpcomingEvents = async (): Promise<IEvent | { msg: string }> => {
    const token = localStorage.getItem('token');  // Get JWT token from local storage

    const res = await fetch(`${BASE_URL}/me/upcoming-events`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        }
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to get upcoming events.');
    }

    return res.json();
}
import { EventData, FilterParams, IEvent, PaginatedEventsResponse } from "@/types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/events`;

// Create a new event (Authenticated users only)
export const createEvent = async (eventData: EventData): Promise<IEvent> => {
    const token = localStorage.getItem('token');  // Get JWT token from local storage

    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        },
        body: JSON.stringify(eventData)
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create event');
    }

    return res.json();  // Return the created event data
};

// Fetch all events by a particular organizer (user itself)
export const fetchEventByOrganizer = async (): Promise<IEvent> => {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/organizer`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create event');
    }

    return res.json();  // Return the events data
}

// Fetch all events (unfiltered)
export const fetchAllEvents = async (): Promise<IEvent[]> => {
    const res = await fetch(`${BASE_URL}`);
    if (!res.ok) {
        throw new Error('Failed to fetch events');
    }
    return res.json();
};

// Fetch a specific event by ID
export const fetchEventById = async (eventId: string): Promise<IEvent | { msg: string }> => {
    const res = await fetch(`${BASE_URL}/${eventId}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch event with ID: ${eventId}`);
    }
    return res.json();
};

// Fetch paginated events (with optional keyword, page, and limit in the query)
export const searchEvents = async (
    keyword: string = '',
    page: number = 1,
    limit: number = 10
): Promise<PaginatedEventsResponse> => {
    const query = new URLSearchParams({
        keyword,
        page: page.toString(),
        limit: limit.toString(),
    }).toString();

    const res = await fetch(`${BASE_URL}/search?${query}`);
    if (!res.ok) {
        throw new Error('Failed to fetch paginated events');
    }
    return res.json();
};

// Fetch filtered events (with optional dateFrom, dateTo, location, and type in the query)
export const filterEvents = async (
    { dateFrom, dateTo, location, type }: FilterParams
): Promise<IEvent[]> => {
    const query = new URLSearchParams({
        dateFrom: dateFrom || '',
        dateTo: dateTo || '',
        location: location || '',
        type: type || '',
    }).toString();

    const res = await fetch(`${BASE_URL}/filter?${query}`);
    if (!res.ok) {
        throw new Error('Failed to fetch filtered events');
    }
    return res.json();
};

// Update an event (Authenticated users only)
export const updateEvent = async (
    eventId: string, updatedEventData: Partial<EventData>
): Promise<IEvent | { msg: string }> => {
    const token = localStorage.getItem('token');  // Get JWT token from local storage

    const res = await fetch(`${BASE_URL}/${eventId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        },
        body: JSON.stringify(updatedEventData)
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update event');
    }

    return res.json();  // Return the updated event data
};

// Delete an event (Authenticated users only)
export const deleteEvent = async (eventId: string): Promise<{ msg: string }> => {
    const token = localStorage.getItem('token');  // Get JWT token from local storage

    const res = await fetch(`${BASE_URL}/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        }
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete event');
    }

    return res.json();  // Return the confirmation or status
};

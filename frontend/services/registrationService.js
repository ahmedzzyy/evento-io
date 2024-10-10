const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/registrations`;

// Register for an event (Authenticated users only)
export const createRegistration = async (eventId) => {
    const token = localStorage.getItem('token');  // Get JWT token from local storage

    const res = await fetch(`${BASE_URL}/${eventId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        }
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to register for the event');
    }

    return res.json();
}

// De-Register for an event (Authenticated users only)
export const deleteRegistration = async (eventId) => {
    const token = localStorage.getItem('token');  // Get JWT token from local storage

    const res = await fetch(`${BASE_URL}/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        }
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete registration');
    }

    return res.json();
}

// Attendees for an event (Authenticated users only)
export const fetchAttendees = async (eventId) => {
    const token = localStorage.getItem('token');  // Get JWT token from local storage

    const res = await fetch(`${BASE_URL}/${eventId}/attendees`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        }
    });

    return res.json();
}

// Mark attendee as present or absent (Authenticated organizers only)
export const updateAttendees = async (eventId, userId, updatedStatus) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/${eventId}/attendees/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in Authorization header
        },
        body: JSON.stringify({ status: updatedStatus })
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update attendance');
    }

    return res.json();
}

// Attendee List CSV file for an event (Authenticated organizers only)
export const exportAttendeeList = async (eventId) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/${eventId}/export`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        }
    });

    // Convert the response to a Blob object (for files)
    const blob = await res.blob();

    // Create a link element to trigger file download
    const downloadURL = window.URL.createObjectURL(blob);
    const downloadLinkElement = document.createElement('a');
    downloadLinkElement.href = downloadURL;
    downloadLinkElement.click();

    // Cleaning up the URL object
    window.URL.revokeObjectURL(downloadURL);
}
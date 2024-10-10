import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchAttendees, updateAttendees, exportAttendeeList } from "@/services/registrationService.js";
import withAuth from "@/components/withAuth.js";
import styles from "@/styles/attendeeList.module.css";

const EventAttendees = () => {
    const router = useRouter();
    const { id } = router.query; // Event ID from URL

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [attendees, setAttendees] = useState([]);

    useEffect(() => {
        // Fetch event attendee list when component mounts
        const getAttendees = async () => {
            try {
                setLoading(false);
                const fetchedEvent = await fetchAttendees(id);
                setAttendees(fetchedEvent);
                setLoading(false);
            } catch (err) {
                setError("Failed to Load Event Attendees List");
                console.error(err);
            }
        }

        if (id) getAttendees();
    }, [id]);

    const handleExport = async () => {
        try {
            await exportAttendeeList(id);
        } catch (err) {
            console.error(err);
            setError("Failed to export Event Attendees List");
        }
    }

    const handleStatusChange = async (attendeeId, updatedStatus) => {
        try {
            await updateAttendees(id, attendeeId, updatedStatus);
            // Update local state to reflect the status change
            setAttendees((prevAttendees) =>
                prevAttendees.map((attendee) =>
                    attendee.attendee._id === attendeeId ? { ...attendee, status: updatedStatus } : attendee
                )
            );
        } catch (err) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) {
        return <p>Loading attendees...</p>;
    }

    return (
        <div className={styles.container}>
            <h1>Attendees for Event</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className={styles.exportBtn} onClick={handleExport}>
                Export as CSV
            </button>

            <table className={styles.attendeeTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendees.map((attendee) => (
                        <tr key={attendee.attendee._id}>
                            <td>{attendee.attendee.username}</td>
                            <td>{attendee.attendee.email}</td>
                            <td>{attendee.status || 'Registered'}</td>
                            <td>
                                <select
                                    value={attendee.status || 'Registered'}
                                    onChange={(e) => handleStatusChange(attendee.attendee._id, e.target.value)}
                                >
                                    <option disabled value="registered">Registered</option>
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default withAuth(EventAttendees, 'organizer');
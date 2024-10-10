import { Router } from "express";
import Registration from "../models/Registration.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/role.js";
import Event from "../models/Event.js";
import { Parser } from "json2csv";

const router = Router();

// @route   POST /api/registrations/:eventId
// @desc    Register for an event
// @access  Private (Attendees only)
router.post('/:eventId', auth, async (req, res) => {
    try {
        // Check if the user is already registered for this event
        const existingRegistration = await Registration.findOne({
            event: req.params.eventId,
            attendee: req.user.id,
        });
  
        if (existingRegistration) {
            return res.status(400).json({ msg: 'You are already registered for this event' });
        }
  
        // Create a new registration
        const newRegistration = new Registration({
            event: req.params.eventId,
            attendee: req.user.id,
        });
        
        await newRegistration.save();
        res.json({ msg: 'Successfully registered for the event' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE /api/registrations/:eventId
// @desc    Cancel event registration
// @access  Private (Attendees only)
router.delete('/:eventId', auth, async (req, res) => {
    try {
        const registration = await Registration.findOneAndDelete({
            event: req.params.eventId,
            attendee: req.user.id,
        });

        if (!registration) {
            return res.status(404).json({ msg: 'You are not registered for this event' });
        }
  
        res.json({ msg: 'Successfully canceled registration' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/registrations/:eventId/attendees
// @desc    Get registered attendees for an event (Organizer only)
// @access  Private
router.get(
    '/:eventId/attendees',
    [ auth, checkRole(['organizer']) ],
    async (req, res) => {
        try {
            // Ensure the organizer is viewing attendees for their own event
            const event = await Event.findById(req.params.eventId);
            if (!event) {
                return res.status(404).json({ msg: 'Event not found' });
            }

            if (event.organizer.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized' });
            }
  
            // Fetch the attendees
            const attendees = await Registration.find({ event: req.params.eventId }).populate('attendee', 'username email');
      
            res.json(attendees);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
});

// @route   PUT /api/registrations/:eventId/attendees/:userId
// @desc    Mark an attendee as present or absent
// @access  Private (Organizer only)
router.put('/:eventId/attendees/:userId', auth, async (req, res) => {
    const { status } = req.body;

    // Only allow "present" or "absent" as valid statuses
    if (!['present', 'absent'].includes(status)) {
        return res.status(400).json({ msg: 'Invalid attendance status' });
    }

    try {
        // Find the event and check if the current user is the organizer
        const event = await Event.findById(req.params.eventId);
  
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        if (event.organizer.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Unauthorized to manage this event' });
        }
  
        // Find the registration for this event and user
        const registration = await Registration.findOne({
            event: req.params.eventId,
            attendee: req.params.userId,
        });
  
        if (!registration) {
            return res.status(404).json({ msg: 'Registration not found' });
        }
  
        // Update the status
        registration.status = status;
        await registration.save();
  
        res.json({ msg: `Attendee marked as ${status}` });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/registrations/:eventId/export
// @desc    Export attendee list as CSV
// @access  Private (Organizer only)
router.get('/:eventId/export', auth, async (req, res) => {
    try {
        // Find the event and check if the current user is the organizer
        const event = await Event.findById(req.params.eventId);

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        if (event.organizer.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Unauthorized to manage this event' });
        }

        // Find all registrations for the event
        const registrations = await Registration.find({ event: req.params.eventId })
        .populate('attendee', 'username email');  // Populate attendee details
        console.log(registrations);

        // Prepare data for CSV
        const attendees = registrations.map(reg => ({
            username: reg.attendee.username,
            email: reg.attendee.email,
            status: reg.status,
            registeredAt: reg.registeredAt,
        }));

        // Convert JSON to CSV
        const json2csv = new Parser();
        const csv = json2csv.parse(attendees);

        // Set CSV headers for the response
        res.header('Content-Type', 'text/csv');
        res.attachment(`${event.title}-attendees.csv`);
        res.send(csv);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

export default router;
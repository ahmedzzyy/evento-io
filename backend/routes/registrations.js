import { Router } from "express";
import Registration from "../models/Registration";
import auth from "../middleware/auth";
import checkRole from "../middleware/role.js";
import Event from "../models/Event.js";

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

export default router;
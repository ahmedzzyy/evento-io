import { Router } from "express";
import User from "../models/User.js";
import Registration from "../models/Registration.js";
import auth from "../middleware/auth.js";
import bcrypt from "bcryptjs";

const router = Router();

// @route   GET /api/users/me
// @desc    Get the authenticated user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
  
// @route   PUT /api/users/me
// @desc    Update the authenticated user's profile
// @access  Private
router.put('/me', auth, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
  
        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/users/me/registered-events
// @desc    Get events the user has registered for
// @access  Private
router.get('/me/registered-events', auth, async (req, res) => {
    try {
        // Find all registrations for the current user
        const registrations = await Registration.find({ attendee: req.user.id })
        .populate('event');  // Populate the event details

        const registeredEvents = registrations.map(registration => registration.event);

        res.json(registeredEvents);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/users/me/past-events
// @desc    Get past events the user has registered for
// @access  Private
router.get('/me/past-events', auth, async (req, res) => {
    try {
        const currentDate = new Date();

        // Find all registrations for the current user
        const registrations = await Registration.find({ attendee: req.user.id })
        .populate({
            path: 'event',
            match: { date: { $lt: currentDate } }  // Only include events that have already passed
        });

        // Filter out null events (in case no past event matched)
        const pastEvents = registrations.filter(reg => reg.event !== null).map(reg => reg.event);

        res.json(pastEvents);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/users/me/upcoming-events
// @desc    Get upcoming events the user has registered for
// @access  Private
router.get('/me/upcoming-events', auth, async (req, res) => {
    try {
        const currentDate = new Date();

        // Find all registrations for the current user
        const registrations = await Registration.find({ attendee: req.user.id })
        .populate({
            path: 'event',
            match: { date: { $gt: currentDate } }  // Only include future events
        });
        
        // Filter out null events (in case no upcoming event matched)
        const upcomingEvents = registrations.filter(reg => reg.event !== null).map(reg => reg.event);

        res.json(upcomingEvents);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

export default router;

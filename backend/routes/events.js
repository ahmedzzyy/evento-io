import { Router } from "express";
import { check, validationResult } from "express-validator";
import Event from "../models/Event.js";
import auth from "../middleware/auth.js";

const router = Router();

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Only authenticated users can create events)
router.post(
    '/',
    [
        auth,  // Protect the route with auth middleware
        check('title', 'Title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('date', 'Please include a valid date').isDate(),
        check('location', 'Location is required').notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, date, location } = req.body;

        try {
            const newEvent = new Event({
              title,
              description,
              date,
              location,
              organizer: req.user.id,  // Set the organizer as the authenticated user
            });
      
            const event = await newEvent.save();
            res.json(event);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);
      
// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (_req, res) => {
    try {
        const events = await Event.find().populate('organizer', 'username email');
        res.json(events);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/events/:id
// @desc    Get an event by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('organizer', 'username email');
    
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
      
// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (Only the organizer can update the event)
router.put('/:id', auth, async (req, res) => {
    const { title, description, date, location } = req.body;

    const eventFields = {};
    if (title) eventFields.title = title;
    if (description) eventFields.description = description;
    if (date) eventFields.date = date;
    if (location) eventFields.location = location;
    
    try {
        let event = await Event.findById(req.params.id);
    
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
      
        // Check if the user is the organizer
        if (event.organizer.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
      
        event = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: eventFields },
            { new: true }
        );
    
        res.json(event);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
      
// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Only the organizer can delete the event)
router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Check if the user is the organizer
        if (event.organizer.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
    
        await event.remove();
        res.json({ msg: 'Event removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
      
export default router;
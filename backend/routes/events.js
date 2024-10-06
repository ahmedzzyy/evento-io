import { Router } from "express";
import { check, validationResult } from "express-validator";
import Event from "../models/Event.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/role.js";

const router = Router();

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Only authenticated users can create events)
router.post(
    '/',
    [
        auth,  // Protect the route with auth middleware
        checkRole(['organizer']), // Organizers allowed to post
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

// @route   GET /api/events/organizer
// @desc    Get events created by the organizer
// @access  Private (Only authenticated users can create events)
router.get(
    '/organizer',
    [
        auth,  // Protect the route with auth middleware
        checkRole(['organizer']), // Organizers allowed to post
    ],
    async (req, res) => {
        try {
            const organizerID = req.user.id;
            // Find events where the organizer matches the authenticated user
            const events = await Event.find({ organizer: organizerID });

            if (!events) {
                return res.status(404).json({ message: "No Events found for this organizer." });
            }

            res.json(events);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
)
      
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

// @route   GET /api/events/search
// @desc    Search events by title or description
// @access  Public
router.get('/search', async (req, res) => {
    const { keyword, page = 1, limit=10 } = req.query;
  
    try {
        // Calculate the number of itsms to skip for the upcoming page
        const skip = (page - 1) * limit;

        // Find events where the title or description matches the keyword
        const events = await Event.find({
            $or: [
            { title: { $regex: keyword, $options: 'i' } },  // Case-insensitive search
            { description: { $regex: keyword, $options: 'i' } },
            ],
        })
        .skip(skip)
        .limit(Number(limit));

        // Get total number of events matching the keyword
        const total = await Event.countDocuments({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ],
        });
  
        res.json({
            events,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalEvents: total,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/events/filter
// @desc    Filter events by date, location, or type
// @access  Public
router.get('/filter', async (req, res) => {
    const { dateFrom, dateTo, location, type } = req.query;
  
    try {
        // Create a filter object
        const filters = {};
  
        // Filter by date range
        if (dateFrom || dateTo) {
            filters.date = {};
            if (dateFrom) filters.date.$gte = new Date(dateFrom);
            if (dateTo) filters.date.$lte = new Date(dateTo);
        }
  
        // Filter by location
        if (location) {
            filters.location = { $regex: location, $options: 'i' };  // Case-insensitive
        }
  
        // Find events that match the filters
        const events = await Event.find(filters);
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
    
        await Event.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Event removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
      
export default router;
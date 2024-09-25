import { Schema, model } from "mongoose";

const RegistrationSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',  // Reference to the Event model
        required: true,
    },
    attendee: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,
    },
    registeredAt: {
        type: Date,
        default: Date.now,  // Automatically set the registration time
    }
});

export default model('Registration', RegistrationSchema);
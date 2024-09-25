import { Schema, model } from 'mongoose';

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

export default model('Event', EventSchema);

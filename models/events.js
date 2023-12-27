import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    event_type: {
        type: String,
        required: true
    },
    scout: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    registered: {
        type: Number,
        required: true,
        default: 0
    }
});

export const event = mongoose.model("events", eventSchema);

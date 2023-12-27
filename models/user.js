import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    details: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }
});

export const user = mongoose.model("users", userSchema);


const athleteSchema = mongoose.Schema({
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    wins: {
        type: Number,
        default: 0
    },
    loses: {
        type: Number,
        default: 0
    },
    totalGames: {
        type: Number,
        default: 0
    },
    gameCategory: {
        type: String,
        required: true
    },
    coachData: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

export const athlete = mongoose.model("athletes", athleteSchema);



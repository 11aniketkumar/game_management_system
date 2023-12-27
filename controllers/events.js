import { event } from '../models/events.js';

export const getAllEvents = async (req, res) => {
    const events = await event.find();
    return events;
};

export const insertNewEvent = async (req, res) => {
    const { name, date, venue, event_type, scout, description } = req.body;

    console.log(req.body);

    await event.create({
        name,
        date,
        venue,
        event_type,
        scout,
        description
    });

    res.redirect("/show_event");
};

export const removeEvent = async(req, res) => {
    const eventIdToRemove = req.body.event;
    await event.findByIdAndDelete(eventIdToRemove);
    res.redirect("/show_event");
}


export const registerEvent = async (req, res) => {
    const eventId = req.body.event;

    const e = await event.findById(eventId);
    var n = e.registered + 1;
    await event.updateOne({ _id: e._id }, { $set: { registered: n } });

    res.redirect("/show_event_athlete");
}

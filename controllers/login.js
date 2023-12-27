import { athlete, user } from '../models/user.js';
import { getAllEvents } from './events.js';

export const getUserAccount = async(req, res) => {
    const { email, password } = req.body;

    const data = await user.findOne({ email, password });

    if(data) {
        if (data.role === "athlete") {
            if(data.details) {
                const userId = data._id.toString();

                const { remember } = req.body;

                if(remember) {
                    res.cookie("token", userId, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 30*24*60*60*1000)
                    });
                } else {
                    res.cookie("token", userId, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 24*60*60*1000)
                    });
                }
 
                res.redirect("/show_event_athlete");
            } else {
                const coachNames = await user.find({ role: "coach" }, { name: 1 });

                res.render("athlete_profile", { name:data.name, email:data.email, gender:data.gender, phone:data.phone });
            }
        } else if (data.role === "coach") {
            res.redirect("/show_event");
        } else if(data.role === "admin") {
            res.redirect("/show_event");
        }
    } else {
        res.send("user not found");
    }
}


export const updateDetails = async(req, res)=> {
    const { email, dob, gender, gamecat, coach, tot_played, wins, lost } = req.body;

    // const existingCoach = await Coach.findOne({ coachName: coach });
    const userDoc = await user.findOne({ email });
    
    let id = await athlete.create({
        gender: gender,
        dob: dob,
        wins: wins,
        losses: lost,
        totalGames: tot_played,
        gameCategory: gamecat,
        // coachData: coach
        coachData: userDoc._id
    });
    
    await user.updateOne({ email }, { $set: { details: id } });
    res.redirect("/");
}
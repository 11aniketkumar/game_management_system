import express from 'express';
import path from 'path';
import cookieParser from "cookie-parser";

import { connectDB } from './data/database.js';
import { checkPassword, isRegistered, saveUserAccount } from './controllers/register.js';
import { getUserAccount, updateDetails } from './controllers/login.js';
import { getAllEvents, insertNewEvent, registerEvent, removeEvent } from './controllers/events.js';

connectDB;

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());

app.listen(5000, ()=>{
    console.log("server is running on port 5000!");
});

app.get("/", (req, res)=>{
    res.render("landing");
});

app.get("/signup", (req, res)=>{
    res.render("signup");
});
app.post("/register", checkPassword, isRegistered, saveUserAccount);

app.get("/signin", (req, res)=>{
    res.render("signin");
});
app.post("/login", getUserAccount);

app.post("/createAccount", updateDetails);





app.get("/show_event", async(req,res)=>{
    const events = await getAllEvents(req, res);
    res.render('home', { events });
});

app.get("/show_event_athlete", async(req,res)=>{
    const events = await getAllEvents(req, res);
    res.render('home_athlete', { events });
});

app.get("/new_event", (req,res)=>{
    res.render("new_event");
});

app.post("/create_event", insertNewEvent);

app.post("/remove_event", removeEvent);

app.post("/register_event", registerEvent);
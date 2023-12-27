import { user, athlete } from '../models/user.js';

export const checkPassword = (req, res, next)=>{
    const{ password, c_password } = req.body;

    if(password === c_password) {
        next();
    } else {
        res.send("password mismatch!");
    }
}

export const isRegistered = async(req, res, next)=>{
    const{ email } = req.body;
    const data = await user.findOne({ email });

    if(data) {
        res.send("user already exists in database");
    } else {
        next();
    }
}

export const saveUserAccount = async(req,res) => {
    const {name, email, phone, gender, password, role} = req.body;
    
    await user.create({
        name,
        email,
        phone,
        gender,
        password,
        role
    });

    res.redirect("/");
}
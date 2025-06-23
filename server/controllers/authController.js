const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup Endpoint logic
exports.signup = async (req, res) => {
    const { email, password } = req.body;

    const userexists = await User.findOne({ email});
    if(userexists) return res.statuts(400).json({ message: "User alredy exixts"});

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed});

    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    res.json(token);
};

// Login Endpoint Logic
exports.login = async (req, res) => {
    const { email, password} = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User Not found"});
    if (!match) return res.status(401).json({ message: "Incorrect password"});

    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    res.json(token);


}
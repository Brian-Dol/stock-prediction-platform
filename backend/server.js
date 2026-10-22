require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const User = require('./models/User');
const Prediction = require('./models/Prediction');
const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set. Copy .env.example to .env and set it.');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/stock-prediction-db');

const authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).send('Unauthorized');
        }
        if (!user.isAdmin) {
            return res.status(403).send('Forbidden');
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).send({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.send({ message: 'Sign-up successful' });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    user.lastLoginDate = new Date();
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.send({ token, isAdmin: user.isAdmin });
});

app.post('/predict', async (req, res) => {
    const { prediction } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const newPrediction = new Prediction({ userId, prediction });
    await newPrediction.save();

    res.send({ message: 'Prediction saved successfully' });
});

app.get('/predictions', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const predictions = await Prediction.find({ userId }).sort({ date: -1 });
    res.send(predictions);
});

app.post('/changepassword', async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) return res.status(400).send('Current password is incorrect');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.send({ message: 'Password changed successfully' });
});

app.post('/create-admin', authenticateAdmin, async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).send({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, isAdmin: true });
    await user.save();

    res.send({ message: 'Admin user created successfully' });
});

app.get('/admin/users', authenticateAdmin, async (req, res) => {
    const users = await User.find({}, 'email signupDate lastLoginDate');
    res.send(users);
});

app.get('/admin/predictions', authenticateAdmin, async (req, res) => {
    const predictions = await Prediction.find({}).populate('userId', 'email');
    res.send(predictions);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

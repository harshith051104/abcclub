require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const hackathonRoutes = require('./routes/hackathonRoutes');
const teamRoutes = require('./routes/teamRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const eventRoutes = require('./routes/eventRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Increase payload size limit for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Connect to MongoDB and initialize models
const initializeApp = async () => {
    try {
        const { usersConn, hackathonConn } = await connectDB();
        
        // Make connections available globally
        app.locals.db = {
            users: usersConn,
            hackathon: hackathonConn
        };

        // Set up models with their respective databases
        const User = require('./models/User');
        const HackathonUser = require('./models/HackathonUser');
        const HackathonProblem = require('./models/HackathonProblem');
        const Event = require('./models/Event');

        // Initialize models with their respective connections
        User.init(app.locals.db.users.models.User ? app.locals.db.users.models.User.schema : User.schema);
        HackathonUser.init(app.locals.db.hackathon.models.HackathonUser ? app.locals.db.hackathon.models.HackathonUser.schema : HackathonUser.schema);
        HackathonProblem.init(app.locals.db.hackathon.models.HackathonProblem ? app.locals.db.hackathon.models.HackathonProblem.schema : HackathonProblem.schema);
        const EventModel = app.locals.db.users.model('Event', Event.schema);

        // Make models available globally
        app.locals.models = {
            User: app.locals.db.users.models.User,
            HackathonUser: app.locals.db.hackathon.models.HackathonUser,
            HackathonProblem: app.locals.db.hackathon.models.HackathonProblem,
            Event: EventModel
        };

        // Routes
        app.use('/api/auth', authRoutes);
        app.use('/api/hackathon', hackathonRoutes);
        app.use('/api/team', teamRoutes);
        app.use('/api/gallery', galleryRoutes);
        app.use('/api/events', eventRoutes);
        app.use('/api/upload', uploadRoutes);
        app.use('/api/email', contactRoutes);

        // Error handling middleware for file uploads
        app.use((err, req, res, next) => {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({
                    message: 'File size too large. Maximum size is 10MB.'
                });
            }
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json({
                    message: 'Invalid file type. Only images are allowed.'
                });
            }
            next(err);
        });

        // General error handling middleware
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ 
                message: 'Something went wrong!',
                error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
            });
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize app:', error);
        process.exit(1);
    }
};

initializeApp();
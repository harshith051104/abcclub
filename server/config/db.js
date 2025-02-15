const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const usersConn = await mongoose.createConnection(process.env.MONGODB_URI_USERS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const hackathonConn = await mongoose.createConnection(process.env.MONGODB_URI_HACKATHON, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected Successfully');
        return { usersConn, hackathonConn };
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

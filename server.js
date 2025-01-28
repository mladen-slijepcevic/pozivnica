const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',  // or your email service
    auth: {
        user: process.env.EMAIL_USER,     // your email
        pass: process.env.EMAIL_PASSWORD  // your email password or app-specific password
    }
});

// Store RSVPs in memory (replace with database in production)
const rsvps = [];

// RSVP endpoint
app.post('/api/rsvp', async (req, res) => {
    const { name, email, attendance, guests } = req.body;
    
    if (!name || !email || !attendance) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const rsvp = {
        id: Date.now(),
        name,
        email,
        attendance,
        guests: parseInt(guests) || 0,
        timestamp: new Date()
    };

    try {
        // Send confirmation email to guest
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Wedding RSVP Confirmation',
            html: `
                <h1>Thank you for your RSVP!</h1>
                <p>Dear ${name},</p>
                <p>We have received your RSVP with the following details:</p>
                <ul>
                    <li>Attendance: ${attendance}</li>
                    <li>Number of guests: ${rsvp.guests}</li>
                </ul>
                <p>We look forward to celebrating with you!</p>
            `
        });

        // Send notification to wedding organizers
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ORGANIZER_EMAIL,  // your email to receive notifications
            subject: 'New Wedding RSVP Received',
            html: `
                <h1>New RSVP Received</h1>
                <ul>
                    <li>Name: ${name}</li>
                    <li>Email: ${email}</li>
                    <li>Attendance: ${attendance}</li>
                    <li>Number of guests: ${rsvp.guests}</li>
                    <li>Timestamp: ${rsvp.timestamp}</li>
                </ul>
            `
        });

        rsvps.push(rsvp);
        res.status(201).json({ message: 'RSVP received', rsvp });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to process RSVP' });
    }
});

// Get all RSVPs (add authentication in production)
app.get('/api/rsvp', (req, res) => {
    res.json(rsvps);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

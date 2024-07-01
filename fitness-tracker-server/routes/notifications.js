const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');


router.get('/', auth, async (req, res) => {
    try {
        const notification = await Notification.find({ user: req.user.id}).sort({ date: -1});
        res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/', auth, async (req, res) => {
    const { message } = req.body;
    try {
        const newNotification = new Notification({
             user: req.user.id,
            message,
        });

        const notification = await newNotification.save();
        res.json(notification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
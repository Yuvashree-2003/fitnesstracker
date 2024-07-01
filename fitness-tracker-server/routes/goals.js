const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goal = require('../models/Goal');


router.get('/', auth, async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user.id}).sort({ date: -1});
        res.json(goals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/', auth, async (req, res) => {
    const { goalType, target } = req.body;
    try {
        const newGoal = new Goal({
             user: req.user.id,
             goalType,
             target,
        });

        const goal = await newGoal.save();
        res.json(goal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
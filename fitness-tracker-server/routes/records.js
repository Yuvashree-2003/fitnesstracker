const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');
const Record = require('../models/Record');

router.post(
    '/',
    [
        auth,
        [
        check('workoutType', 'Workout typeis required').not().isEmpty(),
        check('duration','Duration is required').isInt({ min:1 }),
        check('intensity','Intensity is required').isIn(['slow', 'medium', 'intense']),
        ],
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const { workoutType, duration, intensity} = req.body;
        const caloriesBurnt = calculateCaloriesBurnt(duration, intensity);

    

        try {
            const newRecord = new Record({
                user: req.user.id,
                workoutType,
                duration,
                intensity,
                caloriesBurnt,
            });

            const record = await newRecord.save();
            res.json(record);

            
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);


router.post('/', auth, async(req, res) => {
   
        try {
            const record = await Record.find({ user: req.user.id}).sort({date: -1});
            res.json(records);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);


router.delete('/:id', auth, async (req, res) => {
    try {
        const record = await Record.finallyById(req.params.id);

        if(!record) {
            return res.status(404).json({msg: 'Record not found'});
        }

        if(record.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        await record.remove();
        res.json({msg: 'Record removed'});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.put('/:id', auth, async (req, res) => {
    const { workoutType, duration, intensity} = req.body;

    const caloriesBurnt = calculateCaloriesBurnt(duration, intensity);

    const updatedRecord = {
        workoutType,
        duration,
        intensity,
        caloriesBurnt,
        date: Date.now(),
    };

    try {
        let record = await Record.findById(req.params.id);

        if(!record) {
            return res.status(404).json({msg:'Record not found'});
        }

        if(record.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        record = await Record.findByIdAndUpdate(req.params.id, {$set: updatedRecord}, {new: true});

        res.json(record);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

const calculateCaloriesBurnt = (duration, intensity) => {
    const baseCalories = 5;
    const intensityMultiplier = intensity === 'slow' ? 1 : intensity === 'medium' ? 1.5 : 2;
    return duration*baseCalories*intensityMultiplier;
};

module.exports = router;
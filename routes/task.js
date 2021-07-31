const {Router} = require('express');
const config = require('config');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = Router();

// добавление задачи
router.post('/create', auth, async (req, res) => {
    try {
        const {title} = req.body;
        const {description} = req.body;
        const existing = await Task.findOne({title});
        if (existing) {
            return res.json({task: existing});
        }
        const task = new Task({
            title, description, owner: req.user.userId
        });
        await task.save();
        res.status(201).json({task});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

// вывод задачи
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({owner: req.user.userId});
        res.json(tasks);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

//удаление задачи
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.json(task);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

module.exports = router;

const express = require('express');
const { getTasksForABoard, addTask, deleteTask, changeTasksOrderWithinBoard, updateTaskName, updateTaskStatus, changeTaskBoard } = require('../DAO/taskCRUD');
const taskRouter = express.Router();

taskRouter.get('/:id', async (req, res) => {
    try {
        const board = req.params;
        const boardId = board.id;
        const tasks = await getTasksForABoard({ boardId });
        res.status(200).send(tasks.rows);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
});

taskRouter.post('/', async (req, res) => {
    try {
        const task = req.body;
        const boardId = task.boardId;
        const name = task.name;
        const prevOrder = task.prevOrder;
        await addTask({ boardId, name, prevOrder });
        res.status(200).send(task);
    } catch (e) {   
        console.log(e)
        res.status(500).send(e);
    }
});

taskRouter.delete('/:id', async (req, res) => {
    try {
        const task = req.params;
        const id = task.id;
        await deleteTask({ id });
        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

taskRouter.put('/name', async (req, res) => {
    try {
        const task = req.body;
        const id = task.id;
        const name = task.name;
        let val = await updateTaskName({ id, name });
        res.status(200).send('Updated task name ' + val);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
});

taskRouter.put('/status', async (req, res) => {
    try {
        const task = req.body;
        const id = task.id;
        const isComplete = task.is_complete;
        console.log(task);
        await updateTaskStatus({ id, isComplete });
        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

taskRouter.put('/board', async (req, res) => {
    try {
        const task = req.body.task;
        const id = task.id;
        const boardId = task.board.id;
        await changeTaskBoard(id, boardId);
        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})

taskRouter.patch('/order', async (req, res) => {
    try {
        const newOrder = req.body;
        await changeTasksOrderWithinBoard({ newTaskOrder: newOrder });
        res.status(200).send(newOrder);
    } catch (e) {

    }
})

module.exports = taskRouter;
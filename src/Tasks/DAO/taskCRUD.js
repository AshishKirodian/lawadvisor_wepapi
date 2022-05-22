const { Connection, dbClient } = require("../../Utils/db");

async function getTasksForABoard({ boardId }) {
    const connection = await Connection.getOpenConnection(dbClient);
    return await connection.query('select * from lawadvisor.tasks where board_id = $1 order by task_order asc', [boardId]);
}

async function addTask({ boardId, name, prevOrder }) {
    console.log(boardId, name, prevOrder)
    const connection = await Connection.getOpenConnection(dbClient);
    const nextOrder = prevOrder + 1;
    return await connection.query('insert into lawadvisor.tasks (board_id, name, is_complete, task_order) values ($1, $2, false, $3)', [boardId, name, nextOrder]);
}

async function deleteTask({ id }) {
    const connection = await Connection.getOpenConnection(dbClient);
    return await connection.query('delete from lawadvisor.tasks where id = $1', [id]);
}

async function updateTaskStatus({ id, isComplete }) {
    const connection = await Connection.getOpenConnection(dbClient);
    return await connection.query('update lawadvisor.tasks set is_complete = $1 where id = $2', [isComplete, id]);
}

async function updateTaskName({ id, name }) {
    const connection = await Connection.getOpenConnection(dbClient);
    return await connection.query('update lawadvisor.tasks set name = $1 where id = $2', [name, id]);
}

async function changeTaskBoard({ newBoardId, taskId }) {
    const connection = await Connection.getOpenConnection(dbClient);
    return await connection.query('update lawadvisor.tasks set board_id = $1 where id = $2', [newBoardId, taskId]);
}

async function changeTasksOrderWithinBoard({ newTaskOrder }) {
    const connection = await Connection.getOpenConnection(dbClient);
    for (let i = 0; i < newTaskOrder.length; i++) {
        await connection.query('update lawadvisor.tasks set task_order = $1 where id = $2', [newTaskOrder[i].task_order, newTaskOrder[i].id]);
    }
}

module.exports = {
    getTasksForABoard,
    addTask,
    deleteTask,
    updateTaskStatus,
    updateTaskName,
    changeTaskBoard,
    changeTasksOrderWithinBoard,
}
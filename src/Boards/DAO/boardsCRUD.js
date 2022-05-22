const { Connection, dbClient } = require("../../Utils/db");

async function getAllBoards() {
    try {
        const connection = await Connection.getOpenConnection(dbClient);
        return await connection.query('select * from lawadvisor.boards order by board_order asc');
    } catch (e) {
        console.log(e)
    }
}

async function addBoards({ name }) {
    try {
        const connection = await Connection.getOpenConnection(dbClient);
        return await connection.query('insert into lawadvisor.boards (name) values ($1)', [name]);
    } catch (e) {
        console.log(e)
    }
}

async function deleteBoard({ id }) {
    const connection = await Connection.getOpenConnection(dbClient);
    return await connection.query('delete from lawadvisor.boards where id = $1', [id]);
}

async function updateBoard({ id, name }) {
    const connection = await Connection.getOpenConnection(dbClient);
    return await connection.query('update lawadvisor.boards set name = $1 where id = $2', [name, id]);
}

async function updateBoardOrders({ boards }) {
    const connection = await Connection.getOpenConnection(dbClient);
    // update table  lawadvisor.boards with boards array
    for (let i = 0; i < boards.length; i++) {
        await connection.query('update lawadvisor.boards set board_order = $1 where id = $2', [boards[i].board_order, boards[i].id]);
    }
}

module.exports = {
    getAllBoards,
    addBoards,
    deleteBoard,
    updateBoard,
    updateBoardOrders,
};
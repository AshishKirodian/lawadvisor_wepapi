const express = require('express');
const { getAllBoards, addBoards, deleteBoard, updateBoard, updateBoardOrders } = require('../DAO/boardsCRUD');
const boardsRoute = express.Router();

boardsRoute.get('/', async (req, res) => {
    let boards = await getAllBoards();
    res.status(200).send(boards.rows);
});

boardsRoute.post('/', async (req, res) => {
    try {
        const board = req.body;
        // TODO: add duplication check here
        const { name } = board;
        await addBoards({ name });
        res.status(200).send(board);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
});

boardsRoute.delete('/:id', async (req, res) => {
    try {
        const board = req.params;
        console.log(board);
        const boardId = board.id;
        await deleteBoard({ id: boardId });
        res.status(200).send(board);
    } catch (e) {
        res.status(500).send(e);
    }
});

boardsRoute.patch('/', async (req, res) => {
    try {
        const board = req.body;
        const boardId = board.id;
        const name = board.name;
        await updateBoard(boardId, name);
        res.status(200).send(board);
    } catch (e) {
        res.status(500).send(e);
    }
})

// update board table order
boardsRoute.patch('/order', async (req, res) => {
    try {
        const boards = req.body;
        await updateBoardOrders({ boards });
        res.status(200).send(boards);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = boardsRoute;
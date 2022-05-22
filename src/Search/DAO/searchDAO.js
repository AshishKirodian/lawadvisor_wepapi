const { dbClient, Connection } = require('../../Utils/db');

async function search({ term }) {
    const connection = await Connection.getOpenConnection(dbClient);
    // TODO: index the tasks and optimize the search
    return await connection.query('select * from lawadvisor.tasks where name like $1', [`%${term}%`]);
}

module.exports = search;
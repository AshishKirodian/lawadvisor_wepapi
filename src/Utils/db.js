const { Pool } = require('pg');

const dbParams = {
    user: '',
    password: '',
    host: '',
    port: 5432,
    database: ''
}

let dbClient = new Pool({
    user: dbParams.user,
    host: dbParams.host,
    database: dbParams.database,
    password: dbParams.password,
    port: dbParams.port,
    ssl: {
        rejectUnauthorized: false
    }
});

class Connection {
    static instance = null;
    static async getOpenConnection(client) {
        if (this.instance !== null) {
            return client;
        } else {
            this.instance = await client.connect();
            return this.instance;
        }
    }
}

module.exports = {
    Connection, dbClient
};
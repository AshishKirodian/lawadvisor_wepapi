const { Pool } = require('pg');

const dbParams = {
    user: 'zspuduhlesrzoq',
    password: 'a756088dea471751abc1c77f6848ca3c2c917f51140988f30762da874b10536d',
    host: 'ec2-99-80-170-190.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'db7npgn9jrlito'
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
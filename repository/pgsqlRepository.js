const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'LoginData',
  password: 'password123',
  port: 5432,
});

let login = async(un) => {
    if(client._connected == false)
        await client.connect();

    let query = `
            SELECT password
            FROM Users
            WHERE username = $1
        `;
    
    const res = await client.query(query, [un]);
    console.log(res);
    //await client.end();
    if(res.rows.length > 0) return res.rows[0].password;
    else return null;
}

let register = async(name, un, email, pw) => {
    if(client._connected == false)
        await client.connect();

    let query = `
           INSERT INTO Users(name, username, email, password)
           VALUES($1, $2, $3, $4)
        `;

    const res = await client.query(query, [name, un, email, pw]);
    console.log(res.rowCount);
    //await client.end();
    return res.rowCount;
}

module.exports = {
    login: login,
    register: register
}
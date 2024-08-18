require('dotenv').config();
import { Client } from "pg";
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: process.env.PASSWORD,
})
//or
// const client = new Client({
//     connectionString: process.env.CONECTION_STRING
//   })

client.connect()
  .then(() => { console.log('db connected!') })
  .catch(err => { console.log('postgres error::' + err) });

async function createUsersTable() {
  const result = await client.query(`
      CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
  `)
  console.log(result)
}
// createUsersTable();


// PostgreSQL expects single quotes ' around string literals, but your query uses double quotes ",
//  which are interpreted as identifiers (column names).
const insertUser = async () => {
  const username = 'bob';
  const email = 'bob@gmail.com';
  const password = '123';
  try {
    // const user=await client.query(`
    //   INSERT INTO USERS(username,email,password)
    //   VALUES('bob','bob@gmail.com','123');
    //   `)
    //   console.log(user);
    // This is an insecure way to store data in your tables. 
    // When you expose this functionality eventually via HTTP, someone can do an SQL INJECTION 
    // to get access to your data/delete your data.

    const user = await client.query(`
      INSERT INTO USERS(username,email,password)
      VALUES($1,$2,$3);
      `, [username, email, password])    //await client.query(query,values);
    console.log(user);
     
    // This is an insecure way to store data in your tables. 
    // When you expose this functionality eventually via HTTP, someone can do an SQL INJECTION 
    // to get access to your data/delete your data.
  } catch (err) {
    console.log('error::' + err.message);
  }
}
// insertUser();

const getUser=async (id:number)=>{
  const query=`SELECT * from users where id=$1`
  const values=[id];
  const users=await client.query(query,values);
  console.log(users.rows);
}
// getUser(1);

const createAddressTable=async()=>{
  const query=`CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  street VARCHAR(255) NOT NULL,
  pincode VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`;
//on delete cascade means when the user is deleted,his/her address entry will also get deleted
await client.query(query)
.then((response)=>console.log(response))
.catch(err=>console.log(err));
}
// createAddressTable();

const learningJoins=async()=>{
const query=`SELECT users.id, users.username, users.email, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
JOIN addresses ON users.id = addresses.user_id
WHERE users.id = '1';`   //can remove this line to get all users with their addresses
await client.query(query)
.then((response)=>console.log(response.rows))
.catch(err=>console.log(err));
}

learningJoins();







import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

const saltRounds = 10;

const port = 4000;
const app = express();
const jsonParser = bodyParser.json();

app.use(cors());
app.use(express.json());

interface DataUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  requirement: string;
}

const mockDatabase: DataUser[] = []; 


// const initializeConnection = async () => {
//     const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: '1234',
//       database: 'registration'
//     });
  
//     return connection;
//   };


app.post('/regis', jsonParser, async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password, requirement }: DataUser = req.body;
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    // const connection = await initializeConnection();
    // const [rows] = await connection.query(
    //     'INSERT INTO users (firstname, lastname, email, password, requirement) VALUES (?, ?, ?, ?, ?)',
    //     [
    //         firstname, lastname, email, hashPassword, requirement
    //     ]
    // );

    mockDatabase.push({
      firstname,
      lastname,
      email,
      password: hashPassword,
      requirement,
    });

    console.log("Registration successful.");
    res.status(201).json({ message: "Registration successful" });

  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err instanceof Error ? err.message : 'Registration failed' });
  }
  console.log('mockDatabase',mockDatabase);
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


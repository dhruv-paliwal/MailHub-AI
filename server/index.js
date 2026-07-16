import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import Connection from './database/db.js';
import routes from './routes/route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/', routes);

const PORT = 8000;

//Connection();

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
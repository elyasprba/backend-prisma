import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bestRouter from './routes';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 8000;

server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use(bestRouter);

server.listen(PORT, () => {
  console.log(`App listening on port 8000`);
});

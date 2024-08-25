import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';

import bestRouter from './routes';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = async () => {
  try {
    server.use(cors(corsOptions));
    server.use(express.urlencoded({ extended: false }));
    server.use(express.json());

    server.use(bestRouter);

    server.use(
      logger(':method :url :status :res[content-length] - :response-time ms')
    );

    server.listen(PORT, () => {
      console.log(`App listening on port 8000`);
    });
  } catch (error) {
    console.log(error);
  }
};

app();

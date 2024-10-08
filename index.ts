import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import bestRouter from './src/routes';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 8000;

const app = async () => {
  try {
    const corsOptions = {
      origin: ['http://localhost:4200'],
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    };

    server.use(
      morgan(':method :url :status :res[content-length] - :response-time ms')
    );

    server.use(cors(corsOptions));
    server.use(express.urlencoded({ extended: false }));
    server.use(express.json());

    server.use(bestRouter);

    server.listen(PORT, () => {
      console.log('App listening on port 8000');
    });
  } catch (error) {
    console.log(error);
  }
};

app();

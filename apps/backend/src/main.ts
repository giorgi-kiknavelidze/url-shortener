import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { addLink, getLink, s } from './routes';
import { LinksService } from './services';
import { exceptionHandler } from './middlewares';

dotenv.config();

const app = express();

const linkService = new LinksService();

app.use(cors());
app.use(morgan('common'));

app.use(addLink(linkService));
app.use(getLink(linkService));
app.use(s(linkService));
app.use(exceptionHandler(true));

mongoose.connect(process.env.MONGOOSE_URI || '');

app.listen(process.env.PORT ?? 8080, () => {
  console.log('server started');
});

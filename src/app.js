import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { isLoggedIn } from './middleware/authMiddleware.js';

dotenv.config();
const app = express();

// Create __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set Static Path

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());

app.use('/', userRoutes);
app.use('/post', isLoggedIn, postRoutes);

app.use((req, res, next) => {
  res.render('404');
});

app.use((err, req, res, next) => {
  console.log(err.message);
});

export default app;

import { PORT } from './config/config.js';
import express from 'express';
import { bookController } from './controller/bookController.js'
import { authController } from './controller/authController.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import { protectedBookController } from './controller/protectedBookController.js';
import { validateCredentials } from './middleware/validateCredentials.js';

const app = express();
app.use(express.json());

app.use('/api/books', bookController);
app.use('/api/auth', validateCredentials, authController);
app.use('/api/review', authMiddleware, protectedBookController);

app.listen(PORT, () => {
    console.log('Server is running!');
});
import express from 'express';
import baseRouter from './routes';
import morgan from 'morgan';

const app = express();

// Middleware declarations
app.use(morgan("dev"))
app.use('/api', baseRouter);

app.listen(3000, () => console.log("server starting on port 3000"));

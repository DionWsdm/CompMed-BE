import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors'
import dotenv from 'dotenv';
import userRoute from './route/User';
import postinganRoute from './route/Postingan';
import authRoute from './route/Auth';
import { Request, Response, NextFunction } from 'express';

dotenv.config()
const PORT = process.env.PORT;

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Terjadi Request ke API ini");
    next()
});

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/login", authRoute);
app.use("/posts", postinganRoute);
app.use("/register", userRoute);

const server = http.createServer(app);

app.listen(PORT, () => {
    console.log(`Server berhasil running di port ${PORT}`)
})

export default app;
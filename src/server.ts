import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import helmet from "helmet";
// import xss from 'xss-clean'
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import globalErrorHandler from "./controllers/error.controller";
import connection from "./utils/mongoose";
//routes
import authRouter from "./routes/auth.router";
import userRouter from "./routes/user.router";
import adminRouter from "./routes/admin.router";


const app = express();

app.use(cookieParser("secret"));
app.disable("x-powered-by");
const allowedOrigins = [
  "http://localhost:3000",
];
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Credentials", "true");
  const origin: string = req.headers.origin || "";
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(mongoSanitize());
app.use(morgan("dev"));

//routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/aaa", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use(globalErrorHandler);
connection();
const server = app.listen(9999, () => {
  console.log(`this app is listening on port 9999....`);
});



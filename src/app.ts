import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";
import globalErrorHandler from "./controllers/error.controller";

//routes
import moverRouter from "./routes/magic-mover.routes";

const app = express();

app.disable("x-powered-by");

const allowedOrigins = ["http://localhost:3000"];

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

app.use("/api/v1/movers", moverRouter);


app.use(globalErrorHandler);

export { app };

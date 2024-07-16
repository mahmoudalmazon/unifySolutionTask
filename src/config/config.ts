import dotenv  from "dotenv";
dotenv.config();
const env = process.env.NODE_ENV?.trimEnd();
const DB_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000, 
  keepAlive: true,
  autoIndex: true,
  retryWrites: true,
};
const DB_USERNANE =  env === "production" ? process.env.DB_USERNAME : process.env.DB_USERNAME_TEST;
const DB_PASSWORD =  env === "production" ? process.env.DB_PASSWORD : process.env.DB_PASSWORD_TEST;
const DB_NAME = env === "production" ? process.env.DB_NAME : process.env.DB_NAME_TEST;
const DB_URI =
  env === "production"
    ? `mongodb+srv://${DB_USERNANE}:${DB_PASSWORD}@cluster0.juqxue3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    : `mongodb+srv://${DB_USERNANE}:${DB_PASSWORD}@cluster0.juqxue3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const DB = {
  username: DB_USERNANE,
  password: DB_PASSWORD,
  name: DB_NAME,
  options: DB_OPTIONS,
  uri: DB_URI,
};




//server
const SERVER_PORT = process.env.SERVER_PORT || 8000 ;
const SERVER_CORS_ORIGIN = process.env.SERVER_CORS_ORIGIN || "http://localhost:3000";
const SERVER = {
  port: SERVER_PORT,
  cors: {
    origin: SERVER_CORS_ORIGIN,
  },
};
//url
const CLIENT_URI = process.env.CLIENT_URI || "http://localhost:3000";

const CLIENT = {
  uri: CLIENT_URI,
};

// EXPORT VARIABLES
export default {
  db: DB,
  server: SERVER,
  client: CLIENT,
};
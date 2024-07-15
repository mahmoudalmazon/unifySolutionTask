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
const DB_LOCAL_HOST = process.env.DB_LOCAL_HOST;
const DB_LOCAL_PROTOCOL = process.env.DB_LOCAL_PROTOCOL;
const DB_LIVE_HOST = process.env.DB_LIVE_HOST;
const DB_LIVE_PROTOCOL = process.env.DB_LIVE_PROTOCOL; 
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
//jwt

const jwtSecret = process.env.SERVER_TOKEN_SECRET ;
const jwtExpireIn = process.env.SERVER_TOKEN_EXPIRESIN ;
const cookieExpireIn = process.env.SERVER_COOKIE_EXPIRESIN ;


const s3BucketName = process.env.S3_BUCKET_NAME
const s3AccessKeyId = process.env.S3_ACCESS_KEY_ID
const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY
const s3Region = process.env.S3_REGION
//server
const SERVER_PORT = process.env.SERVER_PORT || 8000 ;
const SERVER_CORS_ORIGIN = process.env.SERVER_CORS_ORIGIN || "http://localhost:3000";
const SERVER_TOKEN_SECRET =process.env.SERVER_TOKEN_SECRET || "somesupersecret";
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "error-404";
const SERVER_COOKIE_SECRET = process.env.SERVER_COOKIE_SECRET || "secret";
const SERVER_COOKIE_DOMAIN = process.env.SERVER_COOKIE_DOMAIN || "localhost";
const SERVER = {
  port: SERVER_PORT,
  token: {
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
  cookie: {
    secret: SERVER_COOKIE_SECRET,
    domain: SERVER_COOKIE_DOMAIN || 'localhost:3000',
  },
  cors: {
    origin: SERVER_CORS_ORIGIN,
  },
};
//url
const CLIENT_URI = process.env.CLIENT_URI || "http://localhost:3000";

const CLIENT = {
  uri: CLIENT_URI,
};

//NODEMAILER

const NODEMAILER_HOST = process.env.NODEMAILER_HOST || "smtp.ethereal.email";
const NODEMAILER_PORT = process.env.NODEMAILER_PORT || 587;
const NODEMAILER_SECURE = process.env.NODEMAILER_SECURE || "false";
const NODEMAILER_AUTH_USER = process.env.NODEMAILER_AUTH_USER;
const NODEMAILER_AUTH_PASSWORD = process.env.NODEMAILER_AUTH_PASSWORD;

const NODEMAILER = {
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  secure: NODEMAILER_SECURE === "true" ? true : false,
  user: NODEMAILER_AUTH_USER,
  password: NODEMAILER_AUTH_PASSWORD,
}; 

//AGANCY
const ClientId = process.env.ClientId ;
const ClientSecret = process.env.ClientSecret;
const AgancyUrl = process.env.agencyUrl;
const AgancyInfo = {
  ClientId: ClientId,
  ClientSecret: ClientSecret,
  AgancyUrl: AgancyUrl,
};
//DPO
const TestCompanyToken = env === "production" ? process.env.PRODUCTION_COMPANY_TOKEN  : process.env.TestCompanyToken 
const PaymentCurrency = process.env.PaymentCurrency
const Endpoint = process.env.Endpoint || ""
const DPOinfo ={
  TestCompanyToken:TestCompanyToken,
  PaymentCurrency:PaymentCurrency,
  Endpoint:Endpoint,
  serviceType: env === "production" ? process.env.SERVICE_TYPE_PRODUCTION : process.env.SERVICE_TYPE_TEST
}
//cloudinary
const cloud_name = process.env.cloud_name
const api_key = process.env.api_key
const api_secret = process.env.api_secret
const clouinary = {
  cloud_name:cloud_name,
  api_key:api_key,
  api_secret:api_secret
}
//StartData
const adminEmail = process.env.adminEmail || 'admin@admin.com'
const adminName = process.env.adminName || 'admin'
const adminPass = process.env.adminPass ||'admin123'
const startData = {
  admin:{
    adminEmail:adminEmail,
    adminName:adminName,
    adminPass:adminPass
  }
}

const TESTING_TOKEN = process.env.TESTING_TOKEN;
const PRODUCTION_TOKEN = process.env.PRODUCTION_TOKEN;
const TESTING_BASEURL = process.env.TESTING_BASEURL;
const PRODUCTION_BASEURL = process.env.PRODUCTION_BASEURL;


const BASEURL= env === "production" ? PRODUCTION_BASEURL  : TESTING_BASEURL;
const TOKEN = env === "production" ? PRODUCTION_TOKEN : TESTING_TOKEN;
//Auth key  
const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_CLINENTID
const AuthKey = {
  goggle:{
    ClientId:GOOGLE_AUTH_CLIENT_ID
  },
  facebook:{
    ClientID : process.env.facebook_Client_ID,
    AppID  : process.env.facebook_App_ID,
    AppSecret : process.env.facebook_App_Secret
  }
}
// EXPORT VARIABLES
export default {
  db: DB,
  server: SERVER,
  nodemailer: NODEMAILER,
  client: CLIENT,
  DPOinfo: DPOinfo,
  AgancyInfo: AgancyInfo,
  clouinary: clouinary,
  jwtSecret,
  jwtExpireIn,
  cookieExpireIn,
  s3BucketName,
  s3AccessKeyId,
  s3SecretAccessKey,
  s3Region,
  startData,
  AuthKey,
  BASEURL,
  TOKEN,
};
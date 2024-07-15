import mongoose from "mongoose";
import config from "../config/config";

const connection = async () => {
  try {
    console.log(      config.db.uri
    )
    await mongoose.connect(
      config.db.uri
      ,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("mongo DB Connected Successfully");
  } catch (err) {
    console.log(err);
  }
};

export default connection;

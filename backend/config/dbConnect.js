//Code to connect to database

import mongoose from "mongoose";

export const connectDatabase = () => {
  let DB_URI = "";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    DB_URI = process.env.DB_URI_LOCAL;
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    DB_URI = process.env.DB_URI_PROD;
  }

  console.log("DB_URI: ", DB_URI);

  mongoose
    .connect(DB_URI)
    .then((con) =>
      console.log(
        `Mongodb Database connected with host ${con?.connection?.host}`
      )
    );
};

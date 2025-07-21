/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    // console.log(envVars.NODE_ENV);
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected To DB!!!");
    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listenning to port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await seedSuperAdmin();
})();

process.on("SIGTERM", (err) => {
  console.log("SIGTERM SIgnal detected .....Server Shutting down!!!", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGINT", (err) => {
  console.log("SIGINT SIgnal detected .....Server Shutting down!!!", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected .....Server Shutting down!!!", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected .....Server Shutting down!!!", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//Unhandled rejection error
// Promise.reject(new Error("I forgot to catch this promise"));

//Uncaught Exception Error
// throw new Error("I forgot to handled this local Error");

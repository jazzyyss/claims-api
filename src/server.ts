import express from "express";
const app = express();
import {testDbConnection} from "./config/db.js";

const PORT = process.env.PORT || 4000;

(async () => {
  await testDbConnection();

  app.listen(PORT, _ => {
    console.log(`Server running on port ${PORT}`);
  })
})()
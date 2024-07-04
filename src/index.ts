// express
import express, { Application } from "express";
// env
import dotenv from "dotenv";
const env = process.env.NODE_ENV || "development";
const envFile = env === "development" ? ".env.dev" : ".env";
dotenv.config({ path: envFile });
// cors
const cors = require("cors");
// routers
import router from "./routes/index";
// app
const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

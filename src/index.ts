// express
import express, { Application } from "express";
// env
import dotenv from "dotenv";
dotenv.config();
// cors
const cors = require('cors');
// routers
import router from "./routes/index";
// app
const app: Application = express();
app.use(express.json());
app.use(router);
app.use(cors({
    origin: '*'
  }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

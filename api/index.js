import express from "express";
import cors from "cors";
import backupRoutes from "./routes/backup.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", backupRoutes);

app.listen(8800);

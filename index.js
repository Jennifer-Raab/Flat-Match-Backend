import express from "express";
import cors from "cors";
import "dotenv/config";

import pool from "./src/db/db.js";

import AnnouncementsRouter from "./src/routes/AnnouncementsRouter.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/announcements", AnnouncementsRouter);

app.get("/", (req, res) => res.status(200).send("Hallo"));

const errorDictionary = ["ERR_NOT_PASSWORD"];

app.use((err, req, res, next) => {
    console.log(err.stack);
    if (errorDictionary.includes(err.name)) {
        console.log(err.message);
        res.status(err.statusCode || 500).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
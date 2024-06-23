import express from "express";
import connectionDB from "./DB/connetionDB.js";
import bookRouter from "./Src/Modules/Books/book.Routes.js"
import authorRouter from "./Src/Modules/Author/author.Routes.js"
const app = express();
const port = 3000;

connectionDB()


app.use(express.json());
app.use("/book", bookRouter);
app.use("/author", authorRouter);




app.get("*", (req, res) => res.json("error"));
app.listen(port, () => console.log(`app listening on port ${port}!`));

import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("hello");
});
app.listen(3333, () => console.log("servidor rodando na porta 3333"));

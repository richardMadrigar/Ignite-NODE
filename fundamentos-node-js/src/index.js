const express = require("express")

const app = require("./app.js")


app.use(express.json());

app.listen(3333, () => {
  console.log("servidor rodando na porta 3333");
});


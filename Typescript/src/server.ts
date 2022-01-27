import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello");
});

app.post("/courses", (request, response) => {
  const { name } = request.body;

  return response.json({ name });
});

app.listen(3333, () => console.log("servidor rodando na porta 3333"));

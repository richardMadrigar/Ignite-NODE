
const express = require("express")

const { v4: uuidv4 } = require("uuid")

const verifyExistsAccountCPF = require("./middlewares/verifyExistsAccountCPF")
const customers = require("./db/index")

const app = express();

app.use(express.json());


const getBalance = (statement) => {
  const balance = statement.reduce((acc, item) => {

    if (item.type === "credit") {
      return acc + item.amount;
    } else {
      return acc - item.amount;
    }
  }, 0)
  return balance
}

app.post("/account", (req, res) => {
  const { cpf, name } = req.body

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return res.status(400).send({ error: "costumer already exists" })
  }
  id = uuidv4()


  customers.push({
    cpf, name, id: uuidv4(), statement: []
  })
  return res.status(201).send()
})

app.get("/statement", verifyExistsAccountCPF, (req, res) => {
  const customer = req.customer;

  return res.status(200).json(customer.statement)
})

app.post("/deposit", verifyExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body;
  const customer = req.customer;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation)

  return res.status(201).send();

})

app.post("/withdraw", verifyExistsAccountCPF, (req, res) => {
  const { amount } = req.body

  const customer = req.customer;

  const balance = getBalance(customer.statement)

  if (balance < amount) {
    return res.status(400).json({ error: "Insufficient funds" })
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit"
  };
  customer.statement.push(statementOperation);

  return res.status(201).send();
})


app.get("/statement/date", verifyExistsAccountCPF, (req, res) => {
  const customer = req.customer;
  const { date } = req.query;
  console.log(date);

  const dateFormat = new Date(date + " 00:00")

  const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString())

  return res.status(200).json(statement)
})


app.put("/account", verifyExistsAccountCPF, (req, res) => {
  const { name } = req.body;
  const customer = req.customer;

  customer.name = name;
  return res.status(201).send();
});


app.get("/account", verifyExistsAccountCPF, (req, res) => {
  const customer = req.customer;

  return res.json(customer)
});


app.delete("/account", verifyExistsAccountCPF, (req, res) => {
  const customer = req.customer;

  customers.slice(customer, 1);

  return res.status(200).json(customer)
})

app.get("/users", (req, res) => {
  return res.status(200).json(customers)
})

app.get("/balance", verifyExistsAccountCPF, (req, res) => {
  const customer = req.customer;

  const balance = getBalance(customer.statement)
  return res.status(200).json(balance)
})


module.exports = app;
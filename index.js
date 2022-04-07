const express = require("express");
const app = express();
const morgan = require("morgan");
morgan.token("body", (req) => JSON.stringify(req.body));

app.use(morgan(":method :url :status :response-time ms :body"));
app.use(express.json());

let ranger = [
  {
    id: 1,
    name: "Red Ranger",
    number: "011-111111",
  },

  {
    id: 2,
    name: "Yellow Ranger",
    number: "022-222222",
  },

  {
    id: 3,
    name: "Blue Ranger",
    number: "033-333333",
  },

  {
    id: 4,
    name: "Black Ranger",
    number: "044-444444",
  },
];

app.get("/", (request, response) => {
  response.send("<h2>Hello Rangers!</h2>");
});

app.get("/api/ranger", morgan(`tiny`), (request, response) => {
  response.send(JSON.stringify(ranger));
});

app.get("/info", (request, response) => {
  response.send(
    `<h1>Phonebook has info for four people</h1> <p>${new Date()}</p>`
  );
});

app.get("/api/ranger/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = ranger.find((person) => person.id === id);
  console.log(person);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/ranger/:id", (request, response) => {
  const id = Number(request.params.id);
  ranger = ranger.filter((person) => person.id !== id);
  response.status(204).end();
});

app.use(express.json());

app.post("/api/ranger", (request, response) => {
  const body = request.body;
  const person = {
    id: Math.floor(Math.random() * 1000),
    name: body.name,
    number: body.number,
  };
  if (!body.name || !body.number) {
    return response.status(400).json({ error: `name or num is missing` });
  }
  if (ranger.map((x) => x.name).includes(body.name)) {
    return response.status(400).json({ error: `name must be unique` });
  }

  console.log(ranger);
  ranger = ranger.concat(person);
  response.json(ranger);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

// 3.7: Phonebook backend step7
// installed morgan configure it to log messages to your console based on the tiny configuration.

// 3.8: Phonebook backend step8

import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

app.get("/taskplease", (req, res) => {
  res.send("Hey, it's me. The server.");
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

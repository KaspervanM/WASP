import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

interface taskObject {
  title: string;
  description: string;
  code: string;
}

var code: string =
  "function testFunc(min,max) {return ((max-min)+1) * (min + max) / 2;} testFunc(a,b);";
code = "const a = 0; const b = 100; " + code;

const task: taskObject = {
  title: "testTask",
  description: "This is a demo task for testing purposes only.",
  code: code
};

app.get("/taskplease", (req, res) => {
  res.send(JSON.stringify(task));
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

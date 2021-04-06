"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
app.get("/", (req, res) => {
    res.send("The sedulous hyena ate the antelope!");
});
var code = "function testFunc(min,max) {return ((max-min)+1) * (min + max) / 2;} testFunc(a,b);";
code = "const a = 0; const b = 100; " + code;
const task = {
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
//# sourceMappingURL=app.js.map
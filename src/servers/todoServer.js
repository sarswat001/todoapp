const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
var todos;
var todosMap = new Map();

app.use(bodyParser.json());
app.use(cors());

function middleware(req,res,next){
fs.readFile("../assets/todos.json", "utf8", (err, data) => {
    if (err) throw err;
    todos = JSON.parse(data);
    todosMap.clear();
    todos.forEach(element => {
    todosMap.set(element.id,element);
    });
    const todoId = Number(req.params.id);
    if(todosMap.has(todoId)){
    next();
    }else{
    res.status(404).send('Todo Not Found');
    }
});
}

function getTodos(req,res){
fs.readFile("../assets/todos.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
});
}

function getTodosById(req,res){
const todoId = Number(req.params.id);
const requestedTodo = todosMap.get(todoId);
res.status(200).json(requestedTodo);
}

function createTodos(req,res){
let todoId = 100;
do{
    todoId = 100 + Math.floor((Math.random() * 10) + 1)
}while(todosMap.has(todoId));

let newTodo = {
    id: todoId,
    title: req.body.title,
    description: req.body.description
}
fs.readFile("../assets/todos.json", "utf8", (err, data) => {
    if (err) throw err;
    todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile("../assets/todos.json", JSON.stringify(todos), (err) => {
    if (err) throw err;
    res.status(201).json(newTodo);
    });
});
}

function updateTodos(req,res){
const todoId = Number(req.params.id);
const requestedTodo = todosMap.get(todoId);
requestedTodo.title = req.body.title;
fs.writeFile("../assets/todos.json", JSON.stringify(todos), (err) => {
    if (err) throw err;
    res.status(200).json('Todo Updated');
});
}

function deleteTodo(req,res){
const todoId = Number(req.params.id);
todos = todos.filter((item) => item.id !== todoId);
todosMap.delete(todoId);
fs.writeFile("../assets/todos.json", JSON.stringify(todos), (err) => {
    if (err) throw err;
    res.status(200).json('Todo Deleted');
});
}

app.get('/todos', getTodos);
app.get('/todos/:id',middleware,getTodosById);
app.post('/todos',createTodos);
app.put('/todos/:id',middleware,updateTodos);
app.delete('/todos/:id',middleware,deleteTodo);

app.listen(3000,()=>{console.log(`listening to port 3000`)});

module.exports = app;

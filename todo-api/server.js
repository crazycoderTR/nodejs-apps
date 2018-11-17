"use strict";
/* ---------------- Variable Definition ---------------- */
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');
const app = express();
const port = 3000;
/* ---------------- Variable Definition ---------------- */

/* ---------------- Database Connection ---------------- */
const db = require('./db');
/* ---------------- Database Connection ---------------- */
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
    // Get /todos : List all todo
    
    db.Todo.findAll().then(todos => {
        res.json(todos);
    });
});

app.post('/todos', (req, res) => {
    // Post /todos : create, save todo

    let body = _.pick(req.body, 'description', 'completed');
    db.Todo.create(body).then(todo => {
        res.json(todo.toJSON());
    }, err => res.json(err.toJSON()));
});

app.put('/todos/:id', (req, res) => {
    // Put /todos/:id : update todo
    let todoID = req.params.id;
    let body = _.pick(req.body, 'description', 'completed');
    let attr = {};

    if(body.hasOwnProperty('description')){
        attr.description = body.description;
    }
    if(body.hasOwnProperty('completed')){
        attr.completed = body.completed;
    }

    db.Todo.findOne({
        where: {
            id: todoID
        }
    }).then(todoData => {
        if(todoData) {
            todoData.update(attr).then(updatedTodo => {
                res.json(updatedTodo.toJSON());
            }, () => res.status(400).send());
        }
        else res.status(404).send({error: 'Not found data'});
    }, () => res.status(500).send());
});

app.delete('/todos/:id', (req, res) => {
    // Delete /todos/:id : delete todo
    let todoID = req.params.id;

    db.Todo.destroy({
        where: {
            id: todoID
        }
    }).then((deletedTodo) => {
        if(deletedTodo === 0) res.status(404).send({error: 'ID not found!'});
        else{
            res.status(204).send({message: `${deletedTodo} Deleted!!!`});
        }
    }, () => {
        res.status(500).send();
    });
});

db.sequelize.sync().then(() => {
    console.log('Connection Succesfull');
    app.listen(port, () => console.log(`Express listening on ${port}!`));
});


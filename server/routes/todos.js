const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');


//PUT /api/todos/fdghg4567fgh/toggle
router.put('/:id/toggle', (req, res)=>{
  Todo.toggle(req.params.id, (err, newTodo)=>{
    //find todo by id
    //toggle isComplete
    //save the todo
    //pass the updated todo into the callback
    if(err){
      res.status(400).send(err);
    }
    Todo.find({},(err, todos)=>{
      res.status(err ? 400 : 200).send( err || todos );
    });
  });
});

//base url: /api/todos
router.route('/')
    .get((req, res)=>{
      Todo.find({},(err, todos)=>{
        res.status(err ? 400 : 200).send( err || todos );
      });
    })
    .post((req, res)=>{
      Todo.create(req.body, (err, newTodo)=>{
        res.status(err ? 400 : 200).send( err || newTodo );
      });
    })
router.route('/:id')
    .get((req, res)=>{
      Todo.findById(req.params.id, (err, todo)=>{
        res.status(err ? 400 : 200).send( err ||  todo);
      });
    })
    .delete((req, res)=>{
      Todo.findByIdAndRemove(req.params.id, err=>{
        res.status(err ? 400 : 200).send( err);
      });
    })
    // .put((req, res)=>{
    //   Todo.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, todo)=>{
    //     res.status(err ? 400 : 200).send( err ||  todo);
    //   });
    // })
    .put((req, res)=>{
      Todo.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, todo) => {
        if(err) {
          return res.status(400).send(err);
        }
        Todo.find({}, (err, todos) => {
          res.status(err ? 400 : 200).send(err || todos);
        });
      });
  })


module.exports = router;

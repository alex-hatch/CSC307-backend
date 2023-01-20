const express = require('express');
const app = express();
const port = 5001;

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// find users by name and job 
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});


app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        removeUser(result);
        res.send(id);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}


const findUserByNameAndJob = (name, job) => { 
    return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job); 
}


app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = Math.random();
    addUser(userToAdd);
    res.send(userToAdd);
    res.status(201).end();
});

function addUser(user){
    users['users_list'].push(user);
}

function removeUser(user){
    for (let i = 0; i < users.users_list.length; i++) {
        if(users.users_list[i] == user) {
            users.users_list.splice(i, 1);
            return;
        }
    }
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   

// hello world

const express = require('express');
const mongoose = require('mongoose');
const Job = require('./model/job');
const input1 = require('./input1.json');
const input2 = require('./input2.json');

const app = express();
const dbURI = 'mongodb+srv://admin:test1234@cluster0.uvjtw.mongodb.net/uiDatabase?retryWrites=true&w=majority';
const input1Id = "60ec433091ce0d3f289a6687";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected successfully");
        app.listen(3000);
    })
    .catch((err) => console.log(err));

app.get("/add-items", () => {
    const job1 = new Job(input1);
    const job2 = new Job(input2);
    job1.save().then(() => console.log("item added"))
                .catch((err) => console.log(err));
    job2.save().then(() => console.log("item added"))
                .catch((err) => console.log(err));
});

app.get("/all-items", (req,res) => {
    Job.find().then(result => res.send(result))
              .catch(err => console.log(err));
});

app.get("/single-item", (req, res) => {
    Job.findById(input1Id)
    .then(result => {
        res.send(result);
        console.log(result);
    })
    .catch(err => console.log(err));
});


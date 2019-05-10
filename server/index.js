const express = require('express');
let app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const git = require('../helpers/github');
const save = require('../database/index')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  console.log('express post request', req.body.user);
  let user = req.body.user;

  git.getReposByUsername(user, (data, err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('repo data found');
      save.save(data);
    }
  });

  res.send('express post request');
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  console.log('get server');
  res.send('getting in server')
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});


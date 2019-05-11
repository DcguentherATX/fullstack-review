const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const git = require('../helpers/github');
const db = require('../database/index');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  if (req.body.user !== '') {
    console.log('express post request', req.body.user);
    let user = req.body.user;

    git.getReposByUsername(user, (data, err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('repo data found');
        db.save(data);
      }
    });

    res.send('express post request');
    // TODO - your code here!
    // This route should take the github username provided
    // and get the repo information from the github API, then
    // save the repo information in the database
  }
});

app.get('/repos', function (req, res) {
  db.findAll({}, (err, data) => {
    if (err) {
      console.log('error in server getting repos: ', err);
    } else {
      console.log('getting data: ', data);
      var results = [];

      for (var i = 0; i < data.length; i++) {
        var repoObj = {};
        for (var key in data[i]) {
          if (key === 'name' || key === 'html_url' || key === 'forks') {
            repoObj[key] = data[i][key];
          }
        }
        results.push(repoObj)
      }
      res.send(results);
    }
  })
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});


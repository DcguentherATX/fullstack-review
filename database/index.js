const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  id: {
    type: Number,
    unique: true
  },
  html_url: {
    type: String,
    unique: true
  },
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  console.log('inside of save: ', data[0])
  Repo.insertMany(data, (err) => {
    if (err) {
      console.log('insertion error: ', err)
    }
    console.log('attempting to update')
    Repo.update(data, { upsert: true })

  });
}

let findAll = (obj, callback) => {
  Repo.find(obj, (err, repos) => {
    if (err) {
      console.log('error in db retrieving repos: ', err);
    }
    callback(null, repos);
  })
}

module.exports = { save, findAll };
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  id: Number,
  html_url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  console.log('inside of save: ', data[0])
  Repo.insertMany();


}

module.exports.save = save;
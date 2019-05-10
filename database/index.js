const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  username: String,
  repoName: String,
  repoId: Number,
  url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let user = new Repo({
  username: this.data.owner.login,
  repoName: this.data.name,
  repoId: this.data.id,
  url: this.data.html_url,
  forks: this.data.forks
});

let save = (err, user) => {
  if (err) return console.error(err);
  this.username = user.data.owner.login;
  this.repoName = user.data.name;
  this.repoId = user.data.id;
  this.url = user.data.html_url;
  this.forks = user.data.forks;
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;
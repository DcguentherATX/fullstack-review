import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.

    {props.repos.map((repo, i) =>
      <div key={i} b>Name: {repo.name}<br></br>
        URL: {repo.html_url}<br></br>
        Forks: {repo.forks}<br></br>
        <br></br>
      </div>
    )}

  </div>
)

export default RepoList;
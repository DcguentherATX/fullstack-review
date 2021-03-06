import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    Axios.get('/repos')
      .then((response) => {
        this.setState({
          repos: response.data
        })
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  search(term) {
    console.log(`${term} was searched`);
    // TODO
    Axios.post('/', { user: term })
      .then((res) => {
        console.log('axios post req')
        console.log(res)
      })
      .catch((err) => {
        console.log(error);
      })
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
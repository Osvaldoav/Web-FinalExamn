import React from 'react';
import './App.css';
import Item from './components/Item';

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      peliculas : []
    }

    this.renderList.bind(this);
    this.getRequest.bind(this);
  }

  getRequest(){
    const url = "http://localhost:8080/api/moviedex";
    const settings = {
      method: 'GET'
    };

    fetch(url, settings)
      .then(response => response.json())
      .then(movies => {
        this.setState({peliculas: movies, title: '', year: '', rating: ''});
      })
      .catch(e => {
        console.log('error: ', e);
      });
  }

  componentDidMount(){
    this.getRequest();
  }

  renderList(){
    const movies = this.state.peliculas;
    if(movies){
      return movies.map(movie => {
        return <Item pelicula={movie} key={movie._id}></Item>
      });
    }
  }

  render(){
    return (
      <div>
        <h1>MovieDex</h1>
        <form>
          <label>title</label>
          <input type="text" onChange={(e) => this.setState({title: e.target.value})} value={this.state.title}></input>
          <label>year</label>
          <input type="text" onChange={(e) => this.setState({year: e.target.value})} value={this.state.year}></input>
          <label>rating</label>
          <input type="text" onChange={(e) => this.setState({rating: e.target.value})} value={this.state.rating}></input>
          <button onClick={(e) => {
            e.preventDefault();
            const {title, year, rating} = this.state;
            const url = "http://localhost:8080/api/moviedex";
            const settings = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({film_title: title, year, rating})
            };
            fetch(url, settings)
            .then((data) => {
              console.log('success!', data);
              this.getRequest();
            })
            .catch(error => {
              console.error('Error:', error);
            });
          }}
          >
            Add movie
          </button>
        </form>
        {this.renderList()}
      </div>
    );
  }
}

export default App;
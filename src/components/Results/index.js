import React, {Component} from 'react';
import GetPictures from '../utils.js';
import {Link} from 'react-router-dom';
import Search from '../Search';
import * as ROUTES from '../../constants/routes';



class ResultsPage extends Component {

  constructor(props) {
    super();
    this.state = {
      query: null,
      pictures: null
    }
    this.useImage = this.useImage.bind(this);
  }

  componentDidMount() {
    const {query} = this.props.match.params;
    this.setState({query});

    const finalQuery = query + " black and white";

    //do DB request for query
    GetPictures(finalQuery).then( (results) => {
      const pictures = results.value;
      console.log(pictures);
      //save state pics
      this.setState({pictures});
    });
  }

  useImage(value) {
    console.log(value);
    //save p object in database
    //use p.id to redirect to activity/:id
  }

  render() {
    let images;

    if (this.state.pictures === null) {
       images = "Loading";
    }
    else {
      images = this.state.pictures.map( p => {
        return (
          <Link to={ROUTES.ACTIVITY} onClick={this.useImage} value={p}>
            <img key={p.id} src={p.thumbnailUrl} width="150px" alt={p.name} />
          </Link>
        )
      })
    }

    return (
      <div>
        <Search />
        <hr />
        <div className="results">
          <h1>Choose A {this.props.match.params.query.toUpperCase()} Picture to Colour</h1>
          <div className="image-results">
            {images}
          </div>

        </div>
      </div>
    )
  }

}

export default ResultsPage;

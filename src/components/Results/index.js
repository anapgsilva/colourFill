import React, {Component} from 'react';
import GetPictures from '../utils.js';
import {Link} from 'react-router-dom';
import Search from '../Search';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';


class Results extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      pictures: [],
      imagesLoaded: false
    }
    this.showImage = this.showImage.bind(this);
  }

  componentDidMount() {
    const {query} = this.props.match.params;
    this.setState({query});

    const finalQuery = query + " black and white";

    // do DB request for query
    GetPictures(finalQuery).then( (result) => {
      //save state pics
      this.setState({pictures: result.value, imagesLoaded: true});
    });
  }


  async showImage(picture) {
    //save p object in database
    await this.props.firebase.doCreatePicture(picture);
  }

  render() {
    let images;

    if (this.state.imagesLoaded) {
      images = this.state.pictures.map( p => {
        return (
          <Link to={ROUTES.ACTIVITY} key={p.imageId}>
            <img src={p.thumbnailUrl} width="150px" alt={p.name} onClick={() => this.showImage(p)} />
          </Link>
        )
      })
    } else {
      images = "Loading images..."
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

const ResultsPage = compose(withFirebase)(Results);

export default ResultsPage;

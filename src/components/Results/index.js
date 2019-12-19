import React, {Component} from 'react';
import GetPictures from '../utils.js';
import Search from '../Search';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import camera from '../../images/camera.png';



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

    // do DB request for query
    GetPictures(query).then( (result) => {
      //save state pics
      this.setState({pictures: result.value, imagesLoaded: true});
    });
  }


  async showImage(picture) {
    //save p object in database
    const name = this.state.query;
    picture.name = name;
    await this.props.firebase.doCreatePicture(picture, (key) => {
      this.props.history.push(`/activity/${key}`);
    });
  }

  render() {
    let images;

    if (this.state.imagesLoaded) {
      images = this.state.pictures.map( p => {
        return (
          <img src={p.thumbnailUrl} alt={p.name} onClick={() => this.showImage(p)} key={p.imageId} />
        )
      })
    } else {
      images = "Loading images..."
    }

    return (
      <div>
        <div className="selection" >
          <Search />
          <Link to={ROUTES.CAMERA}>
            <img src={camera} alt="camera icon"/>
          </Link>
        </div>

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

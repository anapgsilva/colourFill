import React, {Component} from 'react';
import GetPictures from '../utils.js';
import {Link} from 'react-router-dom';
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
      //save pics
      this.setState({pictures});
    });
  }

  useImage(value) {
    console.log(value);
  }

  render() {
    let images;

    if (this.state.pictures === null) {
       images = "Loading";
    }
    else {
      images = this.state.pictures.map( p => {
        return (
          <Link to={ROUTES.ACTIVITY} onClick={this.useImage} value={p.contentUrl}>
            <img key={p.id} src={p.thumbnailUrl} width="150px" alt={p.name} />
          </Link>
        )
      })
    }

    return (
      <div>
        Results for {this.props.match.params.query}.
        <div className="image-results">
          {images}
        </div>

      </div>
    )
  }

}

export default ResultsPage;

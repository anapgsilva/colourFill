import React, {Component} from 'react';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import {Link} from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';


class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: {},
      picturesLoaded: false
    }
    this.showPicture = this.showPicture.bind(this);
    this.fillGallery = this.fillGallery.bind(this);
  }

  componentDidMount() {
    this.fillGallery();
  }

  async fillGallery() {
    await this.props.firebase
    .doGetPictures((pictures) => {
      this.setState({pictures: pictures[0], picturesLoaded: true});
    })
  }

  showPicture(key) {
    console.log('key', key);
    this.props.history.push(`/activity/${key}`);
  }

  render() {
    let pictures;

    if (this.state.picturesLoaded === false) {
      pictures = "Loading pictures...";
    } else {
      let images = this.state.pictures;
      console.log(images);

      pictures = Object.entries(images).map( picArray => {
        const key = picArray[0];
        const pic = picArray[1];
        return (
          <Link to={ROUTES.ACTIVITY} key={key} onClick={() => this.showPicture(key)}>
            <h4>{pic.name}</h4>
            <img src={pic.thumbnailUrl} width="150px" alt={pic.name} />
          </Link>
        )
      });
    }


    return (
      <div>
        {pictures !== undefined ?
        <div>
          <h1>My Colouring Pictures</h1>
          <div className="image-results">
            {pictures}
          </div>
        </div> :
        <h1>You have no pictures saved.</h1>}
      </div>
    )
  }
};

const condition = authUser => !!authUser;

const GalleryPage = compose(withFirebase)(Gallery);

export default withAuthorization(condition)(GalleryPage);

import React, {Component} from 'react';
import { withAuthorization } from '../Session';
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
      if (pictures[0] !== null) {
        this.setState({pictures: pictures[0]});
      }
      this.setState({picturesLoaded: true});
    })
  }

  showPicture(key) {
    this.props.history.push(`/activity/${key}`);
  }

  render() {
    let pictures;

    if (this.state.picturesLoaded === false) {
      pictures = "Loading pictures...";
    }
    else {
      let images = this.state.pictures;

      if (images !== null && Object.keys(images).length > 0){

        pictures = Object.entries(images).map( picArray => {
          const key = picArray[0];
          const pic = picArray[1];
          return (
            <div key={key}>
              <h4 className="pic-name">{pic.name}</h4>
              <img src={pic.thumbnailUrl? pic.thumbnailUrl : pic.src} alt={pic.name} onClick={() => this.showPicture(key)} />
            </div>
          )
        });
      }
    }


    return (
      <div>
        {pictures !== undefined ?
        <div className="results">
          <h2>My Colouring Pictures</h2>
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

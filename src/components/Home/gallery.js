import React, {Component} from 'react';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import {Link} from 'react-router-dom';


class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      pictures: []
    }
    this.showPicture = this.showPicture.bind(this);
    this.fillGallery = this.fillGallery.bind(this);
  }

  componentDidMount() {
    this.fillGallery();
  }

  fillGallery(props) {
    this.props.firebase
      .doGetPictures()
      .then((res) => {
        this.setState({pictures: res})
      })
      .catch(error => {
        window.alert({ error });
      });
  }

  showPicture(event) {
    const id = event.target.value.id;
    this.props.history.push(`/activity/${id}`);
  }

  render() {
    let images;

    if (this.state.pictures.length > 0) {
      const imagesArray = this.state.pictures;
      images = imagesArray.map( p => {
        return (
          <Link to={ROUTES.ACTIVITY} onClick={this.showPicture} value={p}>
            <img key={p.key} src={p.thumbnailUrl} width="150px" alt={p.name} />
          </Link>
        )
      });
    }

    return (
      <div>
        {this.state.pictures.length > 0 ?
        <div>
          <h1>My Colouring Pictures</h1>
          images
        </div> :
        <h1>You have no pictures saved.</h1>}
      </div>
    )
  }
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Gallery);

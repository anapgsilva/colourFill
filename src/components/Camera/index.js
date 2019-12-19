import React, {Component} from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import EdgeDetector from './edgedetector.js';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withAuthorization } from '../Session';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

class CameraTool extends Component {
  constructor(props) {
    super(props);

    this.myRef1 = React.createRef();
    this.myRef2 = React.createRef();

    this.state = {
      imageLoaded: false
    }
    this.handleTakePhoto = this.handleTakePhoto.bind(this);
    this.savePicture = this.savePicture.bind(this);
  }

  handleTakePhoto(dataUri) {

    // Do stuff with the photo...
    console.log('takePhoto');

    this.img = new Image();
    this.img.src = dataUri;
    this.img.width = 768;
    this.img.height = 576;

    // Run at start
    this.tracing = new EdgeDetector();
    this.tracing.imgElement = this.img;
    this.tracing.threshold = 25;

    this.tracing.imgElement.onload = () => {
      this.tracing.init(this.myRef1, this.myRef2);
      this.setState({imageLoaded: true});

    }
  }

  async savePicture () {
    const src = await this.tracing.rawCanvas.toDataURL();

    const picture = {
      name: "Camera photo",
      color_src: this.img.src,
      src: src,
      width: this.img.width,
      height: this.img.height,
      type: "photo",
    }
    console.log(picture);

    await this.props.firebase.doCreatePicture(picture, (key) => {
      this.props.history.push(`/activity/${key}`);
    });
  }

  render() {
    return (
      <div className="camera-page">
        <Link to={ROUTES.HOME}>Back to My Colouring Pictures</Link>
        <div className="camera">
          <Camera
            onTakePhoto = {(dataUri) => this.handleTakePhoto(dataUri)}/>
        </div>

        <div className="canvas-edge" >
          <canvas className="canvas-child" ref={this.myRef1} />
          <canvas className="canvas-child" ref={this.myRef2} />
          {this.state.imageLoaded ?
          <Button onClick={this.savePicture}>
            Colour This Picture
          </Button> : ""}
        </div>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

const CameraPage = compose(withFirebase)(CameraTool);

export default withAuthorization(condition)(CameraPage);

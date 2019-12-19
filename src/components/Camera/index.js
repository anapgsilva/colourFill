import React, {Component} from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import EdgeDetector from './edgedetector.js';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


class CameraPage extends Component {
  constructor() {
    super();

    this.myRef1 = React.createRef();
    this.myRef2 = React.createRef();

    this.state = {
      imageLoaded: false
    }
    this.handleTakePhoto = this.handleTakePhoto.bind(this);
    this.goToCameraActivity = this.goToCameraActivity.bind(this);
  }

  handleTakePhoto(dataUri) {

    // Do stuff with the photo...
    console.log('takePhoto');

    let img = new Image();
    img.src = dataUri;
    img.width = 768;
    img.height = 576;

    // Run at start
    this.tracing = new EdgeDetector();
    this.tracing.imgElement = img;
    this.tracing.threshold = 30;

    this.tracing.imgElement.onload = () => {
      this.tracing.init(this.myRef1, this.myRef2);
      this.setState({imageLoaded: true});

    }
  }

  goToCameraActivity() {
    console.log(this.myRef2.current);
  }

  render() {
    return (
      <div>
        <Link to={ROUTES.HOME}>Back to My Colouring Pictures</Link>
        <div className="camera">
          <Camera
            onTakePhoto = {(dataUri) => this.handleTakePhoto(dataUri)}/>
        </div>

        <div className="canvas-edge" >
          <canvas className="canvas-child" ref={this.myRef1} />
          <canvas className="canvas-child" ref={this.myRef2} />
          {this.state.imageLoaded ?
          <Button onClick={this.goToCameraActivity}>
            Colour This Picture
          </Button> : ""}
        </div>
      </div>
    )
  }
}

export default CameraPage;

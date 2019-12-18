import React, {Component} from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import EdgeDetector from './edgedetector.js';


class CameraPage extends Component {
  constructor() {
    super();

    this.myRef1 = React.createRef();
    this.myRef2 = React.createRef();

    this.state = {
      imageLoaded: false
    }
    this.handleTakePhoto = this.handleTakePhoto.bind(this);
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
    this.tracing.threshold = 65;

    this.tracing.imgElement.onload = () => {
      this.tracing.init(this.myRef1, this.myRef2);
      this.setState({imageLoaded: true});
    }
  }


  render() {
    return (
      <div>
        <div className="camera">
          <Camera
            onTakePhoto = {(dataUri) => this.handleTakePhoto(dataUri)}/>
        </div>
        <div className="canvas-edge" >
          <canvas className="canvas1" ref={this.myRef1} />
          <canvas className="canvas2" ref={this.myRef2} />
        </div>
      </div>
    )
  }
}

export default CameraPage;

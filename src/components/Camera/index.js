import React, {Component} from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import EdgeDetector from './edgedetector.js';


class CameraPage extends Component {
  constructor() {
    super();

    this.myRef = React.createRef();

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
    this.tracing.threshold = 60;
    const result = this.tracing.init(this.myRef);
    console.log(result);

    if (result) {
      this.setState({imageLoaded: true});
    }
  }


  render() {
    console.log(this.myRef);
    return (
      <div className="camera">
        <Camera
          onTakePhoto = {(dataUri) => this.handleTakePhoto(dataUri)}/>

        <canvas className="canvas" ref={this.myRef} />
      </div>
    )
  }
}

export default CameraPage;

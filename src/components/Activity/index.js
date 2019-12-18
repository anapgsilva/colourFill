import React, {Component} from 'react';
import { withAuthorization } from '../Session';
import Palette from './palette.js';
// import image from '../../images/elsa.jpg';
import {Button} from 'react-bootstrap';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';


class Activity extends Component {
  //add save button - saves url and events
  //have choice of fill or paint

  constructor(props){
    super(props);
    // Refs info from: https://reactjs.org/docs/refs-and-the-dom.html
    this.myRef = React.createRef();

    this.state = {
      imageLoaded: false,
      picture: {},
      currentColor: "",
    }

    this.getPicture = this.getPicture.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.convertHexToRGB = this.convertHexToRGB.bind(this);
    this.handleFilling = this.handleFilling.bind(this);
    this.floodFill = this.floodFill.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.savePicture = this.savePicture.bind(this);
    this.deletePicture = this.deletePicture.bind(this);
    this.handleName = this.handleName.bind(this);
  }

  componentDidMount() {
    //get image from DB using key
    const key = this.props.match.params.id;
    this.getPicture(key);
  }

  async getPicture(key) {
    //request to firebase to do patch picture
    await this.props.firebase
      .doGetPicture( key, async (result) => {

      this.setState({picture: result});
////////put an if for when image.contentUrl doesnt exist
      this.img = new Image();
      //Get the source for image
      console.log("pic url", result.contentUrl);

      const urlData  = await this.props.firebase.doGetImageData(result.contentUrl);
      console.log('urlData', urlData);
      
      this.img.src = urlData;
      // this.img.src = image;
      // this.img.src = "https://colourfill.firebaseapp.com/dataImage";

      this.img.onload = () => {
        console.log("image loading");

        this.setState({imageLoaded: true});
      };

    });
  }


  async savePicture() {
    //get id from url
    const key = this.props.match.params.id;
    const picture = this.state.picture;
    //request to firebase to do patch picture
    await this.props.firebase.doSavePicture(key, picture, (result) => {

      if (result) {
        window.alert('Picture saved successfully!', 'success');
      }
    })
  }

  async deletePicture() {
    //get id from url
    const key = this.props.match.params.id;
    //request to firebase to do delete picture
    await this.props.firebase.doDeletePicture(key, () => {
      this.props.history.push('/');
    });
  }

  handleColor(color) {
    this.setState({currentColor: color});
  }


  convertHexToRGB(hex) {
    //http://www.javascripter.net/faq/hextorgb.htm
    let color = [];

    const R = hexToR(hex);
    const G = hexToG(hex);
    const B = hexToB(hex);

    function hexToR(hex) {return parseInt((cutHex(hex)).substring(0,2),16)};

    function hexToG(hex) {return parseInt((cutHex(hex)).substring(2,4),16)};

    function hexToB(hex) {return parseInt((cutHex(hex)).substring(4,6),16)};

    function cutHex(hex) {return (hex.charAt(0)==="#") ? hex.substring(1,7) : hex};

    color = [R, G, B, 255];
    return color;
  }

  handleFilling(event) {
    //pixel coordinates that was clicked on
    const x = event.nativeEvent.layerX;
    const y = event.nativeEvent.layerY;
    //get currentColor in rgb
    let color = this.convertHexToRGB(this.state.currentColor);

    let newEvent = {type: "fill", color, x, y};

    let {events, ...rest} = this.state.picture;

    if (events === undefined) {
      events = [];
    }

    this.setState({ picture: {
      events: [...events, newEvent],
      ...rest
    }});
  }


  floodFill(ctx, x, y, fillColor, range = 1) {
    //https://stackoverflow.com/questions/2106995/how-can-i-perform-flood-fill-with-html-canvas
    const getPixel = (imageData, x, y) => {
      // console.log("getting the pixel");
      if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
        return [-1, -1, -1, -1];  // impossible color
      } else {
        const offset = (y * imageData.width + x) * 4;
        return imageData.data.slice(offset, offset + 4);
      }
    }

    const setPixel = (imageData, x, y, fillColor) => {
      // console.log('setting the pixel');
      const offset = (y * imageData.width + x) * 4;
      imageData.data[offset + 0] = fillColor[0];
      imageData.data[offset + 1] = fillColor[1];
      imageData.data[offset + 2] = fillColor[2];
      imageData.data[offset + 3] = fillColor[3];
    }

    const colorsMatch = (a, b, rangeSq) => {
        const dr = a[0] - b[0];
        const dg = a[1] - b[1];
        const db = a[2] - b[2];
        const da = a[3] - b[3];
        return dr * dr + dg * dg + db * db + da * da < rangeSq;
    }


    // read the pixels in the canvas
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    // flags for if we visited a pixel already
    const visited = new Uint8Array(imageData.width* imageData.height);

    // get the before pixel color we're filling
    const targetColor = getPixel(imageData, x, y);

    if (colorsMatch([0,0,0,255], targetColor, 128)) {
      return;
    }
    // check we are actually filling a different color
    else if (!colorsMatch(targetColor, fillColor)) {

      const rangeSq = range * range;
      const pixelsToCheck = [x, y];

      while (pixelsToCheck.length > 0) {
        const y = pixelsToCheck.pop();
        const x = pixelsToCheck.pop();

        const currentColor = getPixel(imageData, x, y);
        if (!visited[y * imageData.width + x] &&
             colorsMatch(currentColor, targetColor, rangeSq)) {

          setPixel(imageData, x, y, fillColor);
          // mark we were here already
          visited[y * imageData.width + x] = 1;
          // add new pixels to check
          pixelsToCheck.push(x + 1, y);
          pixelsToCheck.push(x - 1, y);
          pixelsToCheck.push(x, y + 1);
          pixelsToCheck.push(x, y - 1);
        }
      }
      // put the data back
      ctx.putImageData(imageData, 0, 0);

    }
  }

  removeEvent() {
    const {events, ...rest} = this.state.picture;
    events.pop();

    this.setState({picture: {
      events: events,
      ...rest
      }
    });
  }

  handleName(event) {
    const {name, ...rest} = this.state.picture;

    this.setState({picture: {
        name: event.target.value,
        ...rest
      }
    });
  }

  render() {
    if (this.state.imageLoaded) {
      this.canvas = this.myRef.current;
      this.canvas.width = this.img.width;
      this.canvas.height = this.img.height;

      //get the context API
      this.ctx = this.canvas.getContext("2d");
      //copy image pixels to the canvas
      this.ctx.drawImage(this.img, 0, 0);

      if (this.state.picture.events) {
        this.state.picture.events.forEach( e => {
          if (e.type === 'fill') {
            this.floodFill(this.ctx, e.x, e.y, e.color, 128);
          }
        });
      }
    }

    return (
      <div id='ActivityDIV'>
        <Palette onSelectColor={this.handleColor} onUndoMove={this.removeEvent} />

        <canvas className="canvas" ref={this.myRef} onClick={this.handleFilling} />

        <div className="delete-save">
          <div className="delete-pic" onClick={this.deletePicture}>
            Delete Picture
          </div>
          <label className="save-pic">
          Picture Name:
            <input type="text" placeholder={this.state.picture.name} onChange={this.handleName} />
            <Button onClick={this.savePicture}>
              Save
            </Button>
          </label>

        </div>
      </div>
    )
  }

};


const condition = authUser => !!authUser;

const ActivityPage = compose(withFirebase)(Activity);


export default withAuthorization(condition)(ActivityPage);



// PAINT BRUSH
// const brushFill = function(x, y, color) {
//
//   //call the pixel data
//   let imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
//   let pixels = imageData.data;
//
//   const pxIndex = ((x-1) + (y-1)*this.canvas.width)*4;
//
//   pixels[pxIndex] = color[0];
//   pixels[pxIndex+1] = color[1];
//   pixels[pxIndex+2] = color[2];
//   pixels[pxIndex+3] = color[3];
//
//   let offset = 50;
//
//   for (let i = x-offset; i < x+offset; i++) {
//     for (let j = y-offset; j < y+offset; j++) {
//
//       this.ctx.beginPath();
//       let newX = 25 + j * 50; // x coordinate
//       let newY = 25 + i * 50; // y coordinate
//       let radius = 20; // Arc radius
//       let startAngle = 0; // Starting point on circle
//       let endAngle = 2* Math.PI; // End point on circle
//       // let anticlockwise = i % 2 !== 0; // clockwise or anticlockwise
//
//       this.ctx.arc(newX, newY, radius, startAngle, endAngle);
//
//       // this.ctx.fill();
//
//       //
//       if (i > 1) {
//         this.ctx.fill();
//       } else {
//         this.ctx.stroke();
//       }
//     }
//   }
//
//   this.ctx.putImageData(imageData, 0, 0);
// }

import React, {Component} from 'react';
import { withAuthorization } from '../Session';
import Palette from './palette.js';
import image from '../../images/elsa.jpg';



class ActivityPage extends Component {
  //adds image in user database (url and events)

  //on click in image, paint/fill image


  constructor(){
    super();
    // Refs info from: https://reactjs.org/docs/refs-and-the-dom.html
    this.myRef = React.createRef();

    this.state = {
      imageLoaded: false,
      currentColor: "",
      events: []
    }

    this.handleColor = this.handleColor.bind(this);
    this.convertHexToRGB = this.convertHexToRGB.bind(this);
    this.handleFilling = this.handleFilling.bind(this);
    this.floodFill = this.floodFill.bind(this);
  }

  componentDidMount() {

    this.img = new Image();

    // this.img.src = "https://i.pinimg.com/originals/21/07/c6/2107c650f8be35fb218ad7941d565d41.jpg";
    this.img.src = image;

    this.img.onload = () => {
        this.setState({imageLoaded: true});
    };
  }


  handleColor(colour) {
    this.setState({currentColor: colour});
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

    this.setState({ events: [...this.state.events, newEvent] });
  }


  floodFill(ctx, x, y, fillColor, range = 1) {
    console.log('filling');
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
      // console.log('chceking if colors match');
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

    // check we are actually filling a different color
    if (!colorsMatch(targetColor, fillColor)) {

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


  render() {
    if (this.state.imageLoaded) {
      this.canvas = this.myRef.current;
      this.canvas.width = this.img.width;
      this.canvas.height = this.img.height;

      //get the context API
      this.ctx = this.canvas.getContext("2d");
      //copy image pixels to the canvas
      this.ctx.drawImage(this.img, 0, 0);

      this.state.events.forEach( e => {
        if (e.type === 'fill') {
          this.floodFill(this.ctx, e.x, e.y, e.color, 25);
        }
      });

    }

    return (
      <div id='ActivityDIV'>
        <Palette onSelectColor={this.handleColor} />
        <canvas className="canvas" ref={this.myRef} onClick={this.handleFilling} />
      </div>
    )
  }

};


const condition = authUser => !!authUser;

export default withAuthorization(condition)(ActivityPage);



// PAINT BRUSH

//call the pixel data
// let imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

// let pixels = imageData.data;
// const pxIndex = (x-1)*4 + (y-1) * this.canvas.width*4;
//
// pixels[pxIndex] = color[0];
// pixels[pxIndex+1] = color[1];
// pixels[pxIndex+2] = color[2];
// pixels[pxIndex+3] = color[3];

// let offset = 50;

// for (let i = x-offset; i < x+offset; i++) {
//   for (let j = y-offset; j < y+offset; j++) {
//
//     this.ctx.beginPath();
//     let newX = 25 + j * 50; // x coordinate
//     let newY = 25 + i * 50; // y coordinate
//     let radius = 20; // Arc radius
//     let startAngle = 0; // Starting point on circle
//     let endAngle = 2* Math.PI; // End point on circle
//     // let anticlockwise = i % 2 !== 0; // clockwise or anticlockwise
//
//     this.ctx.arc(newX, newY, radius, startAngle, endAngle);
//
//     // this.ctx.fill();
//
//     //
//     if (i > 1) {
//       this.ctx.fill();
//     } else {
//       this.ctx.stroke();
//     }
//   }
// }
//
// this.ctx.putImageData(imageData, 0, 0);
//}

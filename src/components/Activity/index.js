import React, {Component} from 'react';
import { withAuthorization } from '../Session';
import Palette from './palette.js';
// import image from '../../images/elsa.jpg';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import camera from '../../images/camera.png';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';



class Activity extends Component {
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
    // this.drawImageScaled = this.drawImageScaled.bind(this);
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

      if (result.contentUrl && result.contentUrl.length > 0) {
        this.img = new Image();
        //Get the source for image
        const urlData  = await this.props.firebase.doGetImageData(result.contentUrl);

        this.img.src = window.URL.createObjectURL(urlData);

        this.img.onload = () => {
          this.setState({imageLoaded: true});
        };
      }
      else if (result.type === 'photo') { //if camera photo
        this.img = new Image();
        this.img.src = result.src;

        this.img.onload = () => {
          this.setState({imageLoaded: true});
        };
      }
      else {
        window.alert("This image does not exist.");
      }

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

  // drawImageScaled(img, ctx) {
  //   const canvas = ctx.canvas ;
  //   const hRatio = canvas.width  / img.width;
  //   const vRatio =  canvas.height / img.height;
  //   const ratio  = Math.min ( hRatio, vRatio );
  //   const centerShift_x = ( canvas.width - img.width*ratio ) / 2;
  //   const centerShift_y = ( canvas.height - img.height*ratio ) / 2;
  //   ctx.clearRect(0,0,canvas.width, canvas.height);
  //
  //   //copy image pixels to the canvas
  //   ctx.drawImage(img,0,0, img.width, img.height,
  //    centerShift_x, centerShift_y, img.width*ratio, img.height*ratio);
  //
  //   return ctx;
  // }

  render() {
    if (this.state.imageLoaded) {

      this.canvas = this.myRef.current;
      this.canvas.width = this.img.width;
      this.canvas.height = this.img.height;

      if(this.state.picture.ctx){
        this.ctx = this.state.picture.ctx;
      }
      else {
      //get the context API
      this.ctx = this.canvas.getContext("2d");
      //copy image pixels to the canvas
      this.ctx.drawImage(this.img, 0, 0);
      // this.ctx = this.drawImageScaled(this.img, this.ctx);
      }

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
        <div className="links">
          <Link to={ROUTES.HOME}>Back to My Colouring Pictures</Link>
          <Link to={ROUTES.CAMERA}>
            <img src={camera} alt="camera icon"/>
          </Link>
        </div>

        <Palette onSelectColor={this.handleColor} onUndoMove={this.removeEvent} />

        <canvas className="canvas" ref={this.myRef} onClick={this.handleFilling} />

        <div className="delete-save">
          <div className="delete-pic" onClick={this.deletePicture}>
            Delete Picture
          </div>
          <label className="save-pic">
          Picture Name:
            <input type="text" placeholder={this.state.picture.name} onChange={this.handleName} />
            <Button type="text" onClick={this.savePicture}>
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

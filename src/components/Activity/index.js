import React, {Component} from 'react';
import { withAuthorization } from '../Session';
import Palette from './palette.js'



class ActivityPage extends Component {
  //adds image in user database

  //component colour picker
  //add image to canva
  //make polygon shapes in image with edge detection
  //on click in palette, select colour, show in circle
  //on click in image, paint/fill image




  constructor(){
    super();

    // Refs info from: https://reactjs.org/docs/refs-and-the-dom.html
    this.myRef = React.createRef();

    this.state = {
      imageLoaded: false,
      currentColor: "",
      selectedColors: [],
    }
  }

  componentDidMount() {

    this.img = new Image();

    this.img.src = "https://i.pinimg.com/originals/21/07/c6/2107c650f8be35fb218ad7941d565d41.jpg";

    this.img.onload = () => {
        this.setState({imageLoaded: true});

        //run another function to have image ready to be manipulated????
    };




  }

  render() {
    if (this.state.imageLoaded) {
      const canvas = this.myRef.current;
      canvas.width = this.img.width;
      canvas.height = this.img.height;

      //get the context API
      const ctx = canvas.getContext("2d");
      //copy image pixels to the canvas
      ctx.drawImage(this.img, 0, 0);

      //how to call the pixel data when we need
      // let idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    return (
      <div id='ActivityDIV'>
        <Palette />
        <canvas className="canvas" ref={this.myRef} />
      </div>
    )
  }

};



//make a red grid over the image
// function canvasTest(img) {
//     // Now let's set R and B channels equal to G
//     let idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     for (let i=0,n=img.width*img.height*4; i<n; i+=4) {
//         idata.data[i] = idata.data[i+2] = idata.data[i+1];
//     }
//     ctx.putImageData(idata, 0, 0);
//
//     // Add a red grid
//     ctx.beginPath();
//     for (let y=0; y<img.height; y+=50) {
//         ctx.moveTo(0, y+0.5); ctx.lineTo(img.width, y+0.5);
//     }
//     for (let x=0; x<img.width; x+=50) {
//         ctx.moveTo(x+0.5, 0); ctx.lineTo(x+0.5, img.height);
//     }
//     ctx.strokeStyle = "#F00";
//     ctx.lineWidth = 1;
//     ctx.stroke();
//
//     // add the final result to page
//     document.body.appendChild(canvas);
// }







const condition = authUser => !!authUser;

export default withAuthorization(condition)(ActivityPage);



function EdgeDetector() {

  // Variables
  this.img = undefined;
  this.imgElement = undefined;
  this.threshold = undefined;
  this.ctx = undefined;
  this.canvasElement = undefined;
  this.rawCanvas = undefined;
  this.rawctx = undefined;
  this.ctxDimensions = {
    width: undefined,
    height: undefined
  };
  this.pixelData = undefined;
  this.threshold = undefined;
  this.pointerColor = 'rgba(255,0,0,1)';


  this.init = function(myRef){
    // Build the canvas
    this.myRef = myRef;

    this.canvasElement = this.myRef.current;
    this.canvasElement.width = this.imgElement.width;
    this.canvasElement.height = this.imgElement.height;
    this.rawCanvas = this.myRef.current;
    this.rawCanvas.width = this.imgElement.width;
    this.rawCanvas.height = this.imgElement.height;

    this.ctx = this.canvasElement.getContext('2d');
    this.rawctx = this.rawCanvas.getContext('2d');

    // Store the Canvas Size
    this.ctxDimensions.width = this.imgElement.width;
    this.ctxDimensions.height = this.imgElement.height;

    return this.copyImage();
  };

  // this.findEdges = function(){
  //   this.copyImage();
  // };

  this.copyImage = function(){
    this.rawctx.clearRect(0,0,this.ctxDimensions.width,this.ctxDimensions.height);
    console.log(this.imgElement.src);
    this.ctx.drawImage(this.imgElement,0,0,this.ctxDimensions.width,this.ctxDimensions.height);
    //Grab the Pixel Data, and prepare it for use
    this.pixelData = this.ctx.getImageData(0,0,this.ctxDimensions.width, this.ctxDimensions.height);
    console.log("pixels", this.pixelData.data);

    return this.coreLoop();
  };

  this.coreLoop = function(){
    let x = 0;
    let y = 0;

    let left = undefined;
    let top = undefined;
    let right = undefined;
    let bottom = undefined;

    for(y=0;y<this.pixelData.height;y++){
        for(x=0;x<this.pixelData.width;x++){
            // get this pixel's data
            // currently, we're looking at the blue channel only.
            // Since this is a B/W photo, all color channels are the same.
            // ideally, we would make this work for all channels for color photos.
            let index = (x + y * this.ctxDimensions.width) * 4;
            let pixel = this.pixelData.data[index+2];

            // Get the values of the surrounding pixels
            // Color data is stored [r,g,b,a][r,g,b,a]
            // in sequence.
            left = this.pixelData.data[index-4];
            right = this.pixelData.data[index+4];
            top = this.pixelData.data[index-(this.ctxDimensions.width*4)];
            bottom = this.pixelData.data[index+(this.ctxDimensions.width*4)];

            //Compare it all.
            // (Currently, just the left pixel)
            if(pixel>left+this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel<left-this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel>right+this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel<right-this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel>top+this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel<top-this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel>bottom+this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel<bottom-this.threshold){
                this.plotPoint(x,y);
            }
        }
    }
    return "It should work now"
  };

  this.plotPoint = function(x,y){
      console.log("I see this");
      console.log("ctx", this.ctx);
      this.ctx.beginPath();
      this.ctx.arc(x, y, 0.5, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = 'green';
      this.ctx.fill();
      this.ctx.beginPath();
      // this.ctx.stroke();
      console.log("ctx", this.ctx);


      // Copy onto the raw canvas
      // this is probably the most useful application of this,
      // as you would then have raw data of the edges that can be used.
      console.log("rawctx", this.rawctx);

      this.rawctx.beginPath();
      this.rawctx.arc(x, y, 0.5, 0, 2 * Math.PI, false);
      this.rawctx.fillStyle = 'green';
      this.rawctx.fill();
      this.rawctx.beginPath();
      console.log("rawctx", this.rawctx);

  };
}


export default EdgeDetector;

import React, {Component} from 'react';

class Palette extends Component {
  constructor() {
    super();
    this.state = {

      colors: ['#FFFFFF', '#8E53A1', '#6ABD46', '#71CCDC', '#F7DAAF', '#EC2527', '#F16824', '#CECCCC', '#5A499E', '#06753D', '#024259', '#FDD209', '#7D4829', '#931B1E', '#B44426', '#979797', '#C296C5', '#54B948', '#3C75BB', '#F7ED45', '#E89D5E', '#F26F68', '#F37123', '#676868', '#9060A8', '#169E49', '#3CBEB7', '#FFCD37', '#E5B07D', '#EF3C46', '#FDBE17', '#4E4D4E', '#6B449B', '#BACD3F', '#1890CA', '#FCD55A', '#D8C077', '#A62E32', '#F16A2D', '#343433', '#583E98', '#BA539F', '#9D2482', '#DD64A5', '#DB778D', '#EC4394', '#E0398C', '#68AF46', '#4455A4', '#FBEE34', '#AD732A', '#D91E36', '#F99B2A'],

      chosenColor: '#FFFFFF',

    }
    this.swatchClick = this.swatchClick.bind(this);
    // this.colorRollover = this.colorRollover.bind(this);
  }

  //on click in a colour, changes bg color of colorHolder
  swatchClick(colour){
    this.setState({chosenColor: colour });
  }



  render(){
    return (
      <div className='swatchHolder'>

        <ul>
          {this.state.colors.map( colour => {
            return (
              <li key={colour} style={{backgroundColor: colour}} onClick={ () => this.swatchClick(colour)} >
              </li>
          )})}
        </ul>

        <div className="colorHolder" style={{backgroundColor: this.state.chosenColor}}>
          Current Color
        </div>
      </div>
    )
  }


}


export default Palette;




  // let mainHolder, colorHolder;
  // let btnRandom, btnClear, btnDownloadSVG, btnDownloadPNG
  // let svgObject, svgOutline, svgColor;
  // let swatchUp, swatchDown;
  // let fillSpeed = 0.15;
  //
  // var closeOffset;
  //
  //
  //
  // function colorMe() {
  //   TweenMax.to(this, fillSpeed, { fill: chosenColor });
  // }


//   function svgRandom() {
//     $(svgColor).each(function(){
//       var randomNum = Math.floor((Math.random() * colors.length) + 1);
//       TweenMax.to(this, fillSpeed, { fill: colors[randomNum] });
//     })
//   }
//   function svgClear() {
//     $(svgColor).each(function(){
//       TweenMax.to(this, fillSpeed, { fill: "#FFF" });
//     })
//   }
//   function svgDownloadSVG() {
//    var svgInfo = $("<div/>").append($(svgObject).clone()).html();
//    $(this).attr({
//             href:"data:image/svg+xml;utf8,"+svgInfo,
//             download:'coloringBook.svg',
//             target:"_blank"
//     });
//   }
//   function svgDownloadPNG() {
//    // Future expantion:
//    // Look at https://bl.ocks.org/biovisualize/8187844
//   }
//
//
//   $.fn.makeSVGcolor = function(svgURL) {
//     mainHolder = this
//     $( this ).load(svgURL, function() {
//       svgObject  = $('svg', this)
//       svgColor   = $('g:nth-child(2)', svgObject).children()
//       svgOutline = $('g:nth-child(1)', svgObject).children()
//       $(svgColor).on('click', colorMe)
//       $(mainHolder).makeSwatches()
//       $('.swatchHolder').addClass('gray')
//     });
//   }
//
//   $.fn.btnRandom    = function() {
//     btnRandom = this
//     $(btnRandom).on('click', svgRandom)
//   }
//   $.fn.btnClear     = function() {
//     btnClear = this
//     $(btnClear).on('click', svgClear)
//   }
//   $.fn.btnDownload  = function(type) {
//     if(type == 'PNG'){
//       btnDownloadPNG = this
//       $(this).on('mouseenter', svgDownloadPNG)
//     } else {
//       btnDownloadSVG = this
//       $(this).on('mouseenter', svgDownloadSVG)
//     }
//   }
// }( jQuery ));
//
// $('#ActivityDIV'   ).makeSVGcolor('https://s3-us-west-2.amazonaws.com/s.cdpn.io/40041/cheshire.svg')
// $('#btnRandom'     ).btnRandom()
// $('#btnClear'      ).btnClear()
// $('#btnDownloadSVG').btnDownload()

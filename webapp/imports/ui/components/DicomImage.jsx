import React from 'react';
import ReactDom from 'react-dom';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

import createReactClass from 'create-react-class';

import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';
import Hammer from 'hammerjs';

export const DicomImage = createReactClass({
  getInitialState: function() {
    return {
      wwwc: '',
      zoom: 1.0
    };
  },
  render() {
    var viewportStyle = {
      height: 1333,
      width: '100%'
    }
    return (
      <div className='viewportContainer'
           unselectable='on'
           onContextMenu={this.returnFalse}
           //onSelectStart={this.returnFalse}
           onMouseDown={this.returnFalse}
           style={viewportStyle}           
           >
          <div className="viewportElement" style={{height: '100%'}}></div>
          <div className="topLeft dicomTag">
              { this.props.title }
          </div>
          <div className="bottomRight dicomTag">
              Zoom: {this.state.zoom}
          </div>
          <div className="bottomLeft dicomTag">
              WW/WC: {this.state.wwwc}
          </div>
      </div>
      );
  },
  
  onImageRendered() {
    //var domNode = $(this.getDOMNode());
    var domNode = ReactDom.findDOMNode(this);
    var topLeft = domNode.find(".topLeft");
    var topRight = domNode.find(".topRight");
    var bottomRight = domNode.find(".bottomRight");
    var bottomLeft = domNode.find(".bottomLeft");

    var element = domNode.find(".viewportElement").get(0);
    var viewport = cornerstone.getViewport(element)

    this.setState({
      wwwc: Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter),
      zoom: viewport.scale.toFixed(2)
    });
  },

  returnFalse(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  // handleResize() {
  //   this.updateHeight();
  //   // var domNode = this.getDOMNode();
  //   var domNode = ReactDom.findDOMNode(this);
  //   var element = $(domNode).find('.viewportElement').get(0);
  //   cornerstone.resize(element, true);
  // },

  // updateHeight() {
  //   // var domNode = this.getDOMNode();
  //   var domNode = ReactDom.findDOMNode(this);
  //   var container = $(domNode);
  //   // Subtract the header height and some padding
  //   var windowHeight = $(window).height() - $("#header").height() - 10 ;
  //   container.css({
  //     height: windowHeight
  //   });
  // },

  componentDidMount() {
    //this.updateHeight();
    // var domNode = this.getDOMNode();
    var domNode = ReactDom.findDOMNode(this);
    var element = $(domNode).find('.viewportElement').get(0);
    $(element).on("CornerstoneImageRendered", this.onImageRendered);
    window.addEventListener('resize', this.handleResize);


    if(typeof cornerstone === "object"){
      cornerstone.enable(element);
      cornerstone.registerImageLoader('http', cornerstoneWebImageLoader.loadImage);
      cornerstone.registerImageLoader('https', cornerstoneWebImageLoader.loadImage);
      cornerstoneWebImageLoader.external.cornerstone = cornerstone;
      cornerstoneTools.external.cornerstone = cornerstone;
      cornerstoneTools.external.Hammer = Hammer;

      // var imageId = "example://1";
      // var imageId = 'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg'
      if(this.props.imageUrl){
        var imageUrl = this.props.imageUrl
        console.log('DicomImage received the following imageUrl: ', imageUrl)

        cornerstone.loadImage(imageUrl).then(function(image) {
            cornerstone.displayImage(element, image);
            cornerstoneTools.mouseInput.enable(element);
            cornerstoneTools.mouseWheelInput.enable(element);
            cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
            cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
            cornerstoneTools.zoom.activate(element, 5); // zoom is the default tool for right mouse button
            cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
    
            cornerstoneTools.touchInput.enable(element);
            cornerstoneTools.panTouchDrag.activate(element);
            cornerstoneTools.zoomTouchPinch.activate(element);
        });    
      } else {
        console.info('this.props.imageUrl wasnt passed to the DicomImage react component.')
      }
    } else {
      console.info('Cornerstone.js not loaded.  DICOM Viewing is not currently supported.')
    }

    // start a new React render tree with our node and the children
    // passed in from above, this is the other side of the portal.
    //ReactDom.render(<div>{this.props.children}</div>, domNode);    
  },

  componentWillUnmount() {
    var domNode = ReactDom.findDOMNode(this);
    var element = $(domNode).find('.viewportElement').get(0);
    $(element).off("CornerstoneImageRendered", this.onImageRendered);
    window.removeEventListener('resize', this.handleResize);
  }
});
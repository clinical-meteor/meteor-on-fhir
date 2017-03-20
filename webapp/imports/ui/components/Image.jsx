import React from 'react';
import ReactDom from 'react-dom';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

export const Image = React.createClass({
  getInitialState: function() {
    return {
      wwwc: '',
      zoom: 1.0
    };
  },
  render() {
    return (
      <div className='viewportContainer'
           unselectable='on'
           onContextMenu={this.returnFalse}
           onSelectStart={this.returnFalse}
           onMouseDown={this.returnFalse}>
          <div className="viewportElement"></div>
          <div className="topLeft dicomTag">
              Patient Name
          </div>
          <div className="topRight dicomTag">
              Hospital
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

  handleResize() {
    this.updateHeight();
    // var domNode = this.getDOMNode();
    var domNode = ReactDom.findDOMNode(this);
    var element = $(domNode).find('.viewportElement').get(0);
    cornerstone.resize(element, true);
  },

  updateHeight() {
    // var domNode = this.getDOMNode();
    var domNode = ReactDom.findDOMNode(this);
    var container = $(domNode);
    // Subtract the header height and some padding
    var windowHeight = $(window).height() - $("#header").height() - 10 ;
    container.css({
      height: windowHeight
    });
  },

  componentDidMount() {
    this.updateHeight();
    // var domNode = this.getDOMNode();
    var domNode = ReactDom.findDOMNode(this);
    var element = $(domNode).find('.viewportElement').get(0);
    $(element).on("CornerstoneImageRendered", this.onImageRendered);
    window.addEventListener('resize', this.handleResize);



    cornerstone.enable(element);
    var imageId = "example://1";
    cornerstone.loadImage(imageId).then(function(image) {
        cornerstone.displayImage(element, image);
        cornerstoneTools.mouseInput.enable(element);
        cornerstoneTools.mouseWheelInput.enable(element);
        cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
        cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
        cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
        cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel

        cornerstoneTools.touchInput.enable(element);
        cornerstoneTools.panTouchDrag.activate(element);
        cornerstoneTools.zoomTouchPinch.activate(element);
    });


    // start a new React render tree with our node and the children
    // passed in from above, this is the other side of the portal.
    //ReactDom.render(<div>{this.props.children}</div>, domNode);    
  },

  componentWillUnmount() {
    var element = $(domNode).find('.viewportElement').get(0);
    $(element).off("CornerstoneImageRendered", this.onImageRendered);
    window.removeEventListener('resize', this.handleResize);
  }
});
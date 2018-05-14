import React from "react";
import ReactEventComponent from "react-swipe-event-component";
 
class SwipeEventExample extends ReactEventComponent {
  constructor(props) {
    super(props);
 
    // Set tolerance in constructor if you want to customize it
    this.setTolerance(30);
  }
 
  // Implement functions you need in your component
  handleSwipeLeft() { 
      alert('left!')
      /* Do something while swipe left is detected */ 
    }
  handleSwipeRight() {
      alert('right!')
      /* Do something while swipe right is detected */
    }
  handleSwipeUp() { 
      alert('up!')
      /* Do something while swipe up is detected */ 
    }
  handleSwipeDown() { 
      alert('down!')
      /* Do something while swipe down is detected */ 
    }

  handleWheelLeft() { /* Do something while wheel left is detected */ }
  handleWheelRight() { /* Do something while wheel right is detected */ }
  handleWheelUp() { /* Do something while wheel up is detected */ }
  handleWheelDown() { /* Do something while wheel down is detected */ }
 
  // Add {...this.touchEventProperties} to the element which need to detect swipe events
  render() {
    return (
      <div {...this.touchEventProperties} >
        {this.props.children}
      </div>
    );
  }
}
 
export default SwipeEventExample;
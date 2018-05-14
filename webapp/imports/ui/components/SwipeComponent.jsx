import Swipeable from 'react-swipeable'
 
class SwipeComponent extends React.Component {
 
  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
    alert("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
  }
 
  swipingLeft(e, absX) {
    console.log("You're Swiping to the Left...", e, absX)
    alert("You're Swiping to the Left...", e, absX)
  }
 
  swiped(e, deltaX, deltaY, isFlick, velocity) {
    console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
  }
 
  swipedUp(e, deltaY, isFlick) {
    console.log("You Swiped Up...", e, deltaY, isFlick)
    alert("You Swiped Up...", e, deltaY, isFlick)
  }
 
  render() {
    return (
      <Swipeable
        onSwiping={this.swiping}
        onSwipingLeft={this.swipingLeft}
        onSwiped={this.swiped}
        onSwipedUp={this.swipedUp} >
          You can swipe here!
      </Swipeable>
    )
  }
}
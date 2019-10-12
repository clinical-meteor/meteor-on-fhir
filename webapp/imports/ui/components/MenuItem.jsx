import React from 'react';
import { ListItem } from 'material-ui';

export class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { active, ...otherProps } = this.props;

    // console.log('MenuItem', this.props)

    return (
      <ListItem {...otherProps} >
        { this.props.children }
      </ListItem>
    );
  }
}
export default MenuItem;
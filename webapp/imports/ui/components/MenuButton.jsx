import React from 'react';
import { FlatButton } from 'material-ui';

export class MenuButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { active, ...otherProps } = this.props;
    return (
      <div>
        <FlatButton {...otherProps} />
      </div>
    );
  }
}
export default MenuButton;
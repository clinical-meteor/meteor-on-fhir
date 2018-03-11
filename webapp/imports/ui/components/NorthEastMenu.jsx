import React from 'react';

export class NorthEastMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { active, ...otherProps } = this.props;
    return (
      <div {...otherProps} >
        { this.props.children }
      </div>
    );
  }
}
export default NorthEastMenu;
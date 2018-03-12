import React from 'react';
import { ListItem } from 'material-ui/List';

export default class MenuPatientSummary extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { active, ...otherProps } = this.props;
    return (
      <div id='menuPatientSummary' {...otherProps} >
        { this.props.children }
      </div>
    );
  }
}

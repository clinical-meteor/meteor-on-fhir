import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Card, CardMedia, CardTitle, CardText, CardActions, Toggle } from 'material-ui';
import { DynamicSpacer } from 'meteor/clinical:glass-ui';

import { get } from 'lodash';
import { Alert, Table } from 'react-bootstrap';

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};

let disabledStyle = {backgroundColor: '#eeeeee', color: '#333333', borderColor: '#dddddd'};

export class PrivacyPolicyCard extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
    };

    return data;
  }

  render(){
    return (
      <div>
         <CardTitle title='Privacy Policy'  />
         <CardText style={{textAlign: 'justify'}} >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nisi leo, mattis ut interdum sit amet, varius scelerisque felis. Ut a ullamcorper lectus. Sed volutpat nunc velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas ut neque mi. Curabitur blandit nisi eu purus semper, sit amet ultrices enim tristique. Morbi id hendrerit libero. Sed porttitor rhoncus enim ac efficitur. Vivamus volutpat lacinia rhoncus. Proin vel fringilla velit. Vestibulum nisi enim, tristique et sem at, facilisis ultricies lacus. Phasellus semper tempus dolor et consectetur. Nam commodo massa sed tortor venenatis iaculis.</p>
            <p>Maecenas commodo euismod vestibulum. Aliquam ac velit vel mauris semper luctus. Nunc nibh sapien, pharetra ut elit feugiat, euismod malesuada eros. Praesent nec venenatis lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque in augue lacus. Aliquam varius mi nec felis mollis, semper aliquet ligula molestie. In condimentum lacus non libero tempor hendrerit. Duis fermentum maximus tempus. Proin vestibulum interdum quam. Suspendisse potenti.</p>
            <p>Sed ornare augue vel libero mattis, eget fringilla sapien hendrerit. Suspendisse maximus efficitur leo, et hendrerit ipsum pellentesque eu. Vestibulum ac tortor vel leo interdum laoreet. Aliquam erat volutpat. Nulla ac suscipit quam. Sed fermentum felis scelerisque nisi mollis efficitur. Praesent ut eros massa. Vivamus non justo sit amet eros suscipit consequat sed eget mi. Suspendisse potenti. Nunc est ligula, interdum quis pulvinar id, pretium non odio.</p>
            <p>Suspendisse non sollicitudin sem. Nunc quis ante consequat, malesuada tellus et, sodales tortor. Mauris pretium ornare augue at viverra. Aliquam erat volutpat. Fusce ultricies ut tortor a bibendum. Vivamus eget nisl eu nisl consectetur bibendum. Etiam nulla sapien, rhoncus id dignissim eu, convallis eget erat. Donec bibendum libero in mi dignissim interdum. Nunc felis dolor, efficitur nec arcu eget, porttitor condimentum tellus. Nullam turpis lorem, ornare et mattis in, euismod feugiat neque. Morbi rhoncus, erat id suscipit rutrum, sapien enim volutpat nunc, nec tempor odio tortor et lacus. Nulla in placerat mi, nec tristique magna. Phasellus sit amet cursus ex. In a turpis quis velit auctor bibendum. Sed vitae elementum odio, imperdiet pellentesque nisi. Cras tincidunt tempor porttitor.</p>
            <p>Quisque facilisis dolor mattis felis ullamcorper, in accumsan dolor fringilla. Aliquam erat volutpat. Praesent lacinia enim sagittis diam placerat tincidunt. Aliquam quis vulputate libero, eu ornare augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent pulvinar diam quis nisi sodales, eget ultricies enim semper. Fusce vel tortor purus. Nullam id urna non ipsum dapibus tincidunt et a velit. Phasellus massa urna, suscipit vel nisl non, tincidunt consequat sapien. Vivamus et vulputate lorem. Curabitur sed sollicitudin nisi. Praesent bibendum dolor vel nisl dignissim pulvinar. Fusce posuere mauris aliquet risus mollis, vel varius nunc dapibus. Nulla facilisi. Praesent egestas mollis odio, vel facilisis urna pulvinar a. Curabitur at nisi eget metus cursus laoreet vel vitae neque.</p>
          </CardText>
        </div>
    );
  }
}

ReactMixin(PrivacyPolicyCard.prototype, ReactMeteorData);
export default PrivacyPolicyCard;


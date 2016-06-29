import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { createContainer } from 'meteor/react-meteor-data';

import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function (){
  Session.set('appSurfaceOffset', false);
});

export class PageContainer extends React.Component {
  //mixins: [ReactMeteorData],
  constructor(props) {
    super(props);
  }

  getMeteorData() {
    let data = {
      style: {
        marginTop: '6.4rem',
        marginBottom: '6.4rem',
        paddingTop: '6.4rem',
        WebkitTransition: 'ease .2s',
        transition: 'ease .2s'
      }
    };


    if (Session.get('appWidth') > 1024) {
      data.style.position = 'relative';
      data.style.maxWidth = '1024px';
      data.style.width = '100%';
      // data.style.left = '0px';
      // data.style.width = '100%';
      if (Session.get('appSurfaceOffset')) {
        // data.style.left = '100px';
        data.style.left = (Session.get('appWidth') - 1024) * 0.1618;
        data.style.marginRight = '100px';
      } else {
        data.style.left = (Session.get('appWidth') - 1024) * 0.5;
      }

    } else {
      data.style.position = 'absolute';
      data.style.margin = '0px';
      data.style.width = '100%';
      // data.style.left = ((Session.get('appWidth') - 768) * 0.5) + 'px';
    }



    return data;
  }

  render(){
    return (
      <section style={this.data.style}>
        <div style={{position: 'static'}}>
          { this.props.children }
        </div>
      </section>
    );
  }
}
PageContainer.propTypes = {

};
PageContainer.defaultProps = {

};
ReactMixin(PageContainer.prototype, ReactMeteorData);

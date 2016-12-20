import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { insertPost } from '/imports/api/posts/methods';
import { GlassCard } from '/imports/ui/components/GlassCard';

import RaisedButton from 'material-ui/RaisedButton';

import { Meteor } from 'meteor/meteor';

Session.setDefault('weblogPostContent', false);
export class AddPost extends React.Component {
  getMeteorData() {
    let data = {
      style: {},
      state: {
        weblogPostContent: ''
      }
    };

    if (Session.get('weblogPostContent')) {
      data.state.weblogPostContent = Session.get('weblogPostContent');
    }

    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
    }

    return data;
  }
  render(){
    return (
      <GlassCard id="addPostCard">
        <CardTitle
          title="Healthlog"
        />
        <CardText>
          <TextField
            id='weblogPostInput'
            ref='weblogPostContent'
            name='weblogPostContent'
            floatingLabelText="Type some text and press enter to create a post..."
            value={this.data.state.weblogPostContent}
            onChange={this.changePost.bind(this)}
            multiLine={true}
            rows={5}
            /><br/>
          <RaisedButton id="addPostButton" onMouseUp={ this.handleInsertPost.bind(this) } primary={true} label='New Post' />
        </CardText>
      </GlassCard>
    );
  }
  handleInsertPost(){
      let newPost = {
        title: this.refs.weblogPostContent.refs.input.value,
        createdAt: new Date(),
        createdBy: {
          display: Meteor.user().fullName(),
          reference: Meteor.userId()
        }
      };
      if (Meteor.user().profile && Meteor.user().profile.avatar) {
        newPost.createdBy.avatar = Meteor.user().profile.avatar;
      }

      insertPost.call(newPost, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Post added!', 'success');
          Session.set('weblogPostContent', false);
        }
      });
  }

  changePost(){
    Session.set('weblogPostContent', this.refs.weblogPostContent.refs.input.value);
  }
}



ReactMixin(AddPost.prototype, ReactMeteorData);

import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { insertPost } from '/imports/api/posts/methods';
import { GlassCard } from '/imports/ui/components/GlassCard';

import RaisedButton from 'material-ui/RaisedButton';

import { Meteor } from 'meteor/meteor';

Session.setDefault('weblogPostContent', '');
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

    return data;
  }
  render(){
    return (
      <GlassCard id="addPostCard">
        <CardText>
          <TextField
            id='weblogPostInput'
            ref='weblogPostContent'
            name='weblogPostContent'
            floatingLabelText="New clinical impression..."
            value={this.data.state.weblogPostContent}
            onChange={this.changePost.bind(this)}
            multiLine={true}
            rows={5}
            fullWidth
            /><br/>
          <RaisedButton id="addPostButton" onMouseUp={ this.handleInsertPost.bind(this) } primary={true} label='New Post' />
        </CardText>
      </GlassCard>
    );
  }
  handleInsertPost(){
    let newPost = {
      title: Session.get('weblogPostContent'),
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

  changePost(event, value){
    Session.set('weblogPostContent', value);
  }
}



ReactMixin(AddPost.prototype, ReactMeteorData);

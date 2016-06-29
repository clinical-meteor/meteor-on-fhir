import React  from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Bert } from 'meteor/themeteorchef:bert';
import { FormGroup } from 'react-bootstrap';
import { CardTitle, CardText } from 'react-toolbox/lib/card';
import Input  from 'react-toolbox/lib/input';
import { insertPost } from '../../../api/posts/methods.js';
import { GlassCard } from '/imports/ui/components/GlassCard';

import { Meteor } from 'meteor/meteor';

// const handleInsertPost = (event, topicId) => {
//   const target = event.target;
//   const title = target.value.trim();
//
//   if (title !== '' && event.keyCode === 13) {
//     //console.log('title', title);
//     let newPost = {
//       title: title,
//       createdAt: new Date(),
//       createdBy: {
//         display: Meteor.user().fullName(),
//         reference: Meteor.userId()
//       },
//       topicId: topicId
//     };
//     if (Meteor.user().profile && Meteor.user().profile.avatar) {
//
//     }
//
//     insertPost.call(newPost, (error) => {
//       if (error) {
//         Bert.alert(error.reason, 'danger');
//       } else {
//         target.value = '';
//         Bert.alert('Post added!', 'success');
//       }
//     });
//   }
// };

export class AddPostToConversation extends React.Component {
  getMeteorData() {

    let data = {
      style: {}
    };

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

  handleInsertPost(topicId, event){
    const target = event.target;
    // console.log("this", this);
    // console.log("topicId", topicId);
    // console.log("event.keyCode", event.keyCode);


    const title = this.refs.addPostToConversationInput.refs.input.value.trim();

    //console.log("handleInsertPost");
    //console.log("Meteor.user()", Meteor.user());


    if (title !== '' && event.keyCode === 13) {
      //console.log('title', title);
      let newPost = {
        title: title,
        createdAt: new Date(),
        createdBy: {
          display: Meteor.user().fullName(),
          reference: Meteor.userId()
        },
        topicId: topicId
      };

      if (Meteor.user().profile && Meteor.user().profile.avatar) {
        newPost.createdBy.avatar = Meteor.user().profile.avatar;
      }

      //console.log("newPost", newPost);

      insertPost.call(newPost, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          target.value = '';
          Bert.alert('Post added!', 'success');
        }
      });
    }
  }

  render(){
    return (
      <GlassCard>
        <CardText>
          <FormGroup>
            <Input
              multiline
              label='Add Post'
              name='addPost'
              type="textarea"
              onKeyUp={ this.handleInsertPost.bind(this, this.props.topicId) }
              rows="5"
              ref="addPostToConversationInput"
              />
          </FormGroup>
        </CardText>
      </GlassCard>
    );
  }
}


AddPostToConversation.propTypes = {};
ReactMixin(AddPostToConversation.prototype, ReactMeteorData);

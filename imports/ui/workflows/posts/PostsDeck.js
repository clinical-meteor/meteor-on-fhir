import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Button from 'react-toolbox/lib/button';
import { GlassCard } from '../../components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Table from 'react-toolbox/lib/table';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

import Spacer from '../../components/Spacer';

import { removePost } from '../../../api/posts/methods.js';


export default class PostsDeck extends React.Component {
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: {
        checkbox: false
      },
      posts: []
    }

    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = "blur(5px)";
    }

    if (Posts.find().count() > 0) {
      data.posts = Posts.find({},{sort: {createdAt: -1}}).fetch();
    }
    console.log("data.posts", data.posts);


    return data;
  };
  render () {
    let self = this;

    return(
      <div className="postDeck">
        {this.data.posts.map(function(item, i){
          let createdAt = "";
          if (item.createdAt) {
            createdAt = moment(item.createdAt).format("YYYY, MMMM Do (dddd) hh:mm a");
          }
          return (
            <div className="postCard" key={i}>
              <GlassCard>
                <CardTitle
                  avatar="https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAKeAAAAJDJkM2RmNTMzLWI4OGUtNDZmOC1iNTliLWYwOTc1ZWM0YmIyZg.jpg"
                  title="Abigail Watson"
                  subtitle={createdAt}
                />

                <CardText>
                  { item.title}
                </CardText>
                <CardActions>
                  <Button className="editButton" label="Edit" style={{color: "lightgray"}} />
                  <Button className="deleteButton" onMouseUp={self.handleDeleteButton.bind(self, i, item)} label="Delete" style={{color: "lightgray"}} />
                </CardActions>
              </GlassCard>
              <Spacer />
            </div>

          );
        })}

      </div>
    );
  };

  handleDeleteButton(index, post){
    console.log("handleDeleteButton");

    removePost.call({
      _id: post._id
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Post removed!', 'success');
      }
    });
  };
};


PostsDeck.propTypes = {

};
PostsDeck.defaultProps = {

};
ReactMixin(PostsDeck.prototype, ReactMeteorData);

// export default PostsDeck;
//
//
//
// const handleDeleteButton = (event, index, post) => {
//
//   var postId = post._id;
//
//   alert('postId', postId);
//
//   if (postId !== '' && event.keyCode === 13) {
//     console.log('postId', postId);
//     removePost.call({
//       postId,
//     }, (error) => {
//       if (error) {
//         Bert.alert(error.reason, 'danger');
//       } else {
//         target.value = '';
//         Bert.alert('Post removed!', 'success');
//       }
//     });
//   }
// };


import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import { GlassCard } from '../../components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Table from 'react-toolbox/lib/table';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

import Spacer from '../../components/Spacer';

import './Post';

PostsDeck = React.createClass({
  mixins: [ReactMeteorData],
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
      data.posts = Posts.find().fetch();
    }
    console.log("data.posts", data.posts);


    return data;
  },
  render () {

    let postCards = [];
    let title = "";

    for (var i=0; i < this.data.posts.length; i++) {
      if (this.data && this.data.posts && this.data.posts[i]) {
        title = this.data.posts[i].title;
      }
      console.log("title", title);


      postCards.push(
        <div className="postCard" key={i}>
          <GlassCard>
            <CardTitle
              avatar="https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAKeAAAAJDJkM2RmNTMzLWI4OGUtNDZmOC1iNTliLWYwOTc1ZWM0YmIyZg.jpg"
              title="Abigail Watson"
              subtitle="YYYY-MM-DD"
            />

            <CardText>
              {title}
            </CardText>
            <CardActions>
              <Button className="editButton" label="Edit" style={{color: "lightgray"}} />
              <Button className="deleteButton" label="Delete" style={{color: "lightgray"}} />
            </CardActions>
          </GlassCard>
          <Spacer />
        </div>
      );
    }


    return(
      <div>
        {postCards}
      </div>
    );
  }
});

export default PostsDeck;

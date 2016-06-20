import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData, createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { GlassApp } from '../components/GlassApp';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';

import { Session } from 'meteor/session';
import { Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import OpacitySlider from '../components/OpacitySlider';

let defaultState = {
  index: 0
}
Session.setDefault('themePageState', defaultState);


export class ThemePage extends React.Component {
  constructor(props) {
    super(props);
  };
  getMeteorData() {
    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: defaultState,
      colors: {
        colorA: "",
        colorB: "",
        colorC: "",
        colorD: "",
        colorE: ""
      }
    }

    if (Session.get('themePageState')) {
      data.state = Session.get('themePageState');
    }

    return data;
  };

  render(){
    var backgroundThumbnail = {
      width: "180px",
      display: "inline-block",
      marginRight: "5px",
      marginBottom: "5px",
      height: "115px"
    }
    // deep clone
    var redTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    redTile.background = "#A64C4C";

    var blueTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    blueTile.background = "#89cff0";

    var grayTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    grayTile.background = "#999999";

    var greenTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    greenTile.background = "#AEC9A8";

    return(
      <div id="aboutPage">
        <PageContainer>
          <GlassCard>
            <CardTitle
              title="Theme"
              subtitle="Pick a background and color!"
            />
            <Tabs index={this.data.state.index} onChange={this.handleTabChange}>

              <Tab label='Backgrounds' onActive={this.handleActive}>
                <div style={{position: "relative"}}>

                  <div id="backgroundImageGallary" style={{display: "inline-block"}}>
                    <Image src="/backgrounds/AntelopeCanyon.jpg" style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src="/backgrounds/BristleGrass.jpg" style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src="/backgrounds/DucksonaMistyPond.jpg" style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src="/backgrounds/EagleWaterfall.jpg" style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src="/backgrounds/EarthAndMoon.jpg" style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src="/backgrounds/EarthHorizon.jpg" style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src="/backgrounds/Flamingos.jpg" style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src="/backgrounds/Isles.jpg" style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src="/backgrounds/MilkyWay.jpg" style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src="/backgrounds/Moon.jpg" style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src="/backgrounds/Yosemite.jpg" style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src="/backgrounds/AmericanPharoah.jpg" style={backgroundThumbnail} responsive onClick={this.onImageClick} />

                    <Image responsive style={grayTile} onClick={this.onColorClick} />
                    <Image responsive style={redTile} onClick={this.onColorClick} />
                    <Image responsive style={greenTile} onClick={this.onColorClick} />
                    <Image responsive style={blueTile} onClick={this.onColorClick} />

                    <Image src="/thumbnail/Flames.jpg" style={backgroundThumbnail} responsive onClick={this.onVideoClick} style={{border: "1px solid lightgray"}} />
                  </div>
                </div>
              </Tab>
              <Tab label='Colors'>
                <div style={{position: "relative"}}>
                  <Input type='text' label='colorA' name='colorA' style={this.data.style} value={this.data.colors.colorA} />
                  <Input type='text' label='colorB' name='colorB' style={this.data.style} value={this.data.colors.colorB} />
                  <Input type='text' label='colorC' name='colorC' style={this.data.style} value={this.data.colors.colorC} />
                  <Input type='text' label='colorD' name='colorD' style={this.data.style} value={this.data.colors.colorD} />
                  <Input type='text' label='colorE' name='colorE' style={this.data.style} value={this.data.colors.colorE} />
                </div>

              </Tab>
              <Tab label='Settings'>
                <div style={{position: "relative"}}>
                  <label>Opacity</label>
                  <OpacitySlider />
                  <br />
                  <label>Darkroom</label>
                  <Button ref="darkroomButton" className={style.button} icon="exposure" onClick={this.clickOnDarkroomButton} style={{marginLeft: "20px", backgroundColor: "#dddddd"}} />
                </div>

              </Tab>
            </Tabs>

          </GlassCard>
        </PageContainer>
      </div>
    );
  }
  handleTabChange(index) {
    var state = Session.get('themePageState');
    state.index = index;
    Session.set('themePageState', state);
  };

  handleActive() {
    console.log('Special one activated');
  };

  onColorClick(event){
    Session.set('backgroundImagePath', false);
    Session.set('backgroundColor', event.currentTarget.style["background-color"]);
  };
  onImageClick(event){
    Session.set('backgroundColor', false);
    Session.set('backgroundImagePath', "backgrounds/" + event.currentTarget["src"].split("/")[4]);

    //console.log("event.currentTarget", event.currentTarget["src"].split("/")[4]);
  };
  onVideoClick(event){
    Session.set('backgroundImagePath', false);
    Session.set('backgroundColor', false);
    Session.set('lastVideoRun', new Date());
  };
  clickOnDarkroomButton(){
    Session.toggle('darkroomEnabled');
  };
}


ThemePage.propTypes = {};
ThemePage.defaultProps = {};
ReactMixin(ThemePage.prototype, ReactMeteorData);

import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardTitle } from 'material-ui/Card';
import { Image } from 'react-bootstrap';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import { Bert } from 'meteor/themeteorchef:bert';

import { Session } from 'meteor/session';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { PageContainer } from '/imports/ui/components/PageContainer';
import OpacitySlider from '/imports/ui/components/OpacitySlider';

import { Meteor } from 'meteor/meteor';
import { setUserTheme } from '../../api/users/methods';


let defaultState = {
  index: 0
};
Session.setDefault('themePageState', defaultState);


export class ThemePage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: defaultState,
      colors: {
        colorA: '',
        colorB: '',
        colorC: '',
        colorD: '',
        colorE: ''
      }
    };

    if (Session.get('themePageState')) {
      data.state = Session.get('themePageState');
    }

    return data;
  }

  render(){
    var backgroundThumbnail = {
      width: '180px',
      display: 'inline-block',
      marginRight: '5px',
      marginBottom: '5px',
      height: '115px'
    };

    // deep clone
    var redTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    redTile.background = '#A64C4C';

    var blueTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    blueTile.background = '#89cff0';

    var grayTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    grayTile.background = '#999999';

    var greenTile = JSON.parse(JSON.stringify(backgroundThumbnail));
    greenTile.background = '#AEC9A8';

    return(
      <div id='aboutPage'>
        <PageContainer>
          <GlassCard>
            <CardTitle
              title='Theme'
              subtitle='Pick a background and color!'
            />
            <Tabs index={this.data.state.index} onChange={this.handleTabChange}>

              <Tab label='Backgrounds' onActive={this.handleActive}>
                <div style={{position: 'relative'}}>

                  <div id='backgroundImageGallary' style={{display: 'inline-block'}}>
                    <Image src='/backgrounds/medical/BambooIllustration.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/Zen.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/Zen-Rocks.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/LargeZenRocks.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/Yoga-Gray.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/Yoga-Ocean.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/Massage.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />

                    <Image src='/backgrounds/medical/BathPetals.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />

                    <Image src='/backgrounds/medical/SaltScrub-Pink.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/SaltScrub-Horizontal.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />

                    <Image src='/backgrounds/medical/SpaBeds.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/Candles.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/Sauna.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />

                    <Image src='/backgrounds/medical/PlasmidRed.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/PlasmidBlue.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />

                    <Image src='/backgrounds/medical/Radiograph-Chest-Portable.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/EmergencyRoom.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/EMT.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />

                    <Image src='/backgrounds/medical/StarTrek-Medbay.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/MedBay.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />
                    <Image src='/backgrounds/medical/Genetic-Engineering.jpg' style={backgroundThumbnail} responsive onClick={this.onImageClick} />

                    <Image responsive style={grayTile} onClick={this.onColorClick} />
                    <Image responsive style={redTile} onClick={this.onColorClick} />
                    <Image responsive style={greenTile} onClick={this.onColorClick} />
                    <Image responsive style={blueTile} onClick={this.onColorClick} />

                    <Image src='/thumbnail/Flames.jpg' style={backgroundThumbnail} responsive onClick={this.onVideoClick} style={{border: '1px solid lightgray'}} />
                  </div>
                </div>
              </Tab>
              <Tab label='Colors'>
                <div style={{position: 'relative'}}>
                  <Input type='text' label='colorA' name='colorA' style={this.data.style} value={this.data.colors.colorA} />
                  <Input type='text' label='colorB' name='colorB' style={this.data.style} value={this.data.colors.colorB} />
                  <Input type='text' label='colorC' name='colorC' style={this.data.style} value={this.data.colors.colorC} />
                  <Input type='text' label='colorD' name='colorD' style={this.data.style} value={this.data.colors.colorD} />
                  <Input type='text' label='colorE' name='colorE' style={this.data.style} value={this.data.colors.colorE} />
                </div>

              </Tab>
              <Tab label='Settings'>
                <div style={{position: 'relative'}}>
                  <label>Opacity</label>
                  <OpacitySlider />
                  <br />
                  <label>Darkroom</label>
                  <Button ref='darkroomButton' icon='exposure' onClick={this.clickOnDarkroomButton} style={{marginLeft: '20px', backgroundColor: '#dddddd'}} />
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
  }

  handleActive() {
    //console.log('Special one activated');
  }

  onColorClick(event){
    //console.log("onColorClick", event.currentTarget.style['background-color']);

    Session.set('backgroundImagePath', false);
    Session.set('backgroundColor', event.currentTarget.style['background-color']);

    setUserTheme.call({
      _id:  Meteor.userId(),
      backgroundColor: event.currentTarget.style['background-color']
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Background color updated!', 'success');
      }
    });
  }

  onImageClick(event){
    //console.log("onImageClick", 'backgrounds/medical/' + event.currentTarget['src'].split('/')[5]);

    Session.set('backgroundColor', false);
    Session.set('backgroundImagePath', 'backgrounds/medical/' + event.currentTarget['src'].split('/')[5]);

    setUserTheme.call({
      _id:  Meteor.userId(),
      backgroundImagePath: 'backgrounds/medical/' + event.currentTarget['src'].split('/')[5]
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Background image updated!', 'success');
      }
    });
  }

  onVideoClick(){
    //console.log("onVideoClick");

    Session.set('backgroundImagePath', false);
    Session.set('backgroundColor', false);
    Session.set('lastVideoRun', new Date());

    // we're calling setUserTheme without any parameters, which will reset the theme
    // and use the default video background
    setUserTheme.call({
      _id:  Meteor.userId()
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Background image updated!', 'success');
      }
    });
  }

  clickOnDarkroomButton(){
    Session.toggle('darkroomEnabled');
  }
}


ThemePage.propTypes = {};
ThemePage.defaultProps = {};
ReactMixin(ThemePage.prototype, ReactMeteorData);

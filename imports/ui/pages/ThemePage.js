import React from 'react';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { GlassApp } from '../components/GlassApp';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import Button from 'react-toolbox/lib/button';


export class ThemePage extends React.Component {
  constructor(props) {
    super(props);
  };

  render(){
    return(
      <div id="aboutPage">
        <PageContainer>
          <GlassCard>
            <CardTitle
              title="Theme"
              subtitle="Subtitle here"
            />
            <hr />
            <div style={{position: "relative"}}>
              <Button ref="a" className={style.button} style={{marginLeft: "20px", backgroundColor: "#999999"}} />
              <Button ref="b" className={style.button} style={{marginLeft: "20px", backgroundColor: "#A64C4C"}} />
              <Button ref="c" className={style.button} style={{marginLeft: "20px", backgroundColor: "#AEC9A8"}} />
              <Button ref="d" className={style.button} style={{marginLeft: "20px", backgroundColor: "#89cff0"}}/>
            </div>

            <div style={{position: "relative"}}>
              <Button ref="blurButton" className={style.button} icon="blur_on" onClick={this.clickOnBlurButton} style={{marginLeft: "20px", backgroundColor: "#dddddd"}} />
              <Button ref="darkroomButton" className={style.button} icon="exposure" onClick={this.clickOnDarkroomButton} style={{marginLeft: "20px", backgroundColor: "#dddddd"}} />
              <Button ref="backgroundColorsButton" className={style.button} icon="palette" onClick={this.clickOnBackgroundColorsButton} style={{marginLeft: "20px", backgroundColor: "#dddddd"}} />
              <Button ref="backgroundImagesButton" className={style.button} icon="theaters" onClick={this.clickOnBackgroundImagesButton} style={{marginLeft: "20px", backgroundColor: "#dddddd"}}/>
            </div>

            <CardActions>
              <Button label="Images" />
              <Button label="Color" />
            </CardActions>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}

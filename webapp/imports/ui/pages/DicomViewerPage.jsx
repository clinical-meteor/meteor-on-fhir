import { CardText, CardTitle } from 'material-ui/Card';
import { Col, Grid, Row } from 'react-bootstrap';
import {blue500, orange500} from 'material-ui/styles/colors';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard, FullPageCanvas, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import { DicomImage } from '/imports/ui/components/DicomImage';


import { get } from 'lodash';

const styles = {
  errorStyle: {
    color: orange500
  },
  underlineStyle: {
    borderColor: orange500
  },
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
};


export class DicomViewerPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    
    let data = {
    };    

    return data;
  }
  render(){
    return(
      <div id="aboutPage">
        <FullPageCanvas >
          <Row>
              <Col md={6}>
                <GlassCard height='auto' style={{position: 'relative'}}>
                  <DicomImage imageUrl='https://upload.wikimedia.org/wikipedia/commons/a/a1/Normal_posteroanterior_%28PA%29_chest_radiograph_%28X-ray%29.jpg' />
                </GlassCard>
              </Col>                    
              <Col md={6}>
                <GlassCard height='auto' style={{position: 'relative'}}>
                <DicomImage imageUrl='https://upload.wikimedia.org/wikipedia/commons/2/22/Chest_x-ray_-_lateral_view.jpg' />
                </GlassCard>
              </Col>                    
          </Row>
          <Row>
              <Col md={4}>
                <GlassCard>
                </GlassCard>
              </Col>                    
              <Col md={4}>
                <GlassCard>
                </GlassCard>
              </Col>                    
              <Col md={4}>
                <GlassCard>
                </GlassCard>
              </Col>                    
          </Row>
        </FullPageCanvas>
      </div>
    );
  }
}


ReactMixin(DicomViewerPage.prototype, ReactMeteorData);
export default DicomViewerPage;
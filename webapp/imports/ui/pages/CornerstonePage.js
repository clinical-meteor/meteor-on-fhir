import { CardActions, CardHeader, CardText } from 'material-ui/Card';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { Image } from '/imports/ui/components/Image';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

export class CornerstonePage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      style: {}
    };
    return data;
  }
  render(){
    return(
      <div id="CornerstonePage">
        <VerticalCanvas>
          <GlassCard>
            <CardHeader
              title="DICOM"
            />
            <CardText>
              <Image />
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
ReactMixin(CornerstonePage.prototype, ReactMeteorData);
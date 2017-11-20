import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';


import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { CardTitle, CardText } from 'material-ui/Card';


export class SupportPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {};

    return data;
  }
  render(){
    return(
      <div id="supportPage">
        <VerticalCanvas >
          <GlassCard>
            <CardTitle
              title="Support"
            />
            <CardText>
              For help and support email customerservice@symptomatic.io
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


ReactMixin(SupportPage.prototype, ReactMeteorData);

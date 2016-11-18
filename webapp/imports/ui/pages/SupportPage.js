import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';


import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';

import { CardTitle, CardText } from 'react-toolbox/lib/card';


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
        <PhoneContainer >
          <GlassCard>
            <CardTitle
              title="Support"
            />
            <CardText>
              For help and support email customerservice@symptomatic.io
            </CardText>
          </GlassCard>
        </PhoneContainer>
      </div>
    );
  }
}


ReactMixin(SupportPage.prototype, ReactMeteorData);

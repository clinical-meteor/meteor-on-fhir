import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';



export class OutboundHeaderPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {};
    return data;
  }
  render(){
    return(
      <div id="inboundHeaderPage">
        <VerticalCanvas >
          <GlassCard>
            <CardTitle
              title="Outbound HL7 Messages"
            />
            <CardText>



            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


ReactMixin(OutboundHeaderPage.prototype, ReactMeteorData);

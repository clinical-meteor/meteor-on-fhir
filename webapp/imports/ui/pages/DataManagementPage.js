import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { CardTitle, CardText } from 'material-ui/Card';



export class DataManagementPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {};
    return data;
  }
  render(){
    return(
      <div id="dataManagementPage">
        <VerticalCanvas >
          <GlassCard>
            <CardTitle
              title="Data Management"
            />
            <CardText>



            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


ReactMixin(DataManagementPage.prototype, ReactMeteorData);

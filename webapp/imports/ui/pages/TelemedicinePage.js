import { Card, CardText, CardTitle } from 'material-ui/Card';

import Glass from '/imports/ui/Glass';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import { PractitionersTable } from '/imports/ui/workflows/practitioners/PractitionersTable';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

export class TelemedicinePage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        preview: {
          width: '400px', 
          height: '250px',
          backgroundColor: 'lightgray',
          position: 'absolute',
          right: '40px',
          top: '84px'
        }
      },
      state: {}
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("TelemedicinePage[data]", data);
    return data;
  }


  render() {
    return (
      <div id="telemedicinePage"> 
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardText>
              <PractitionersTable />
            </CardText>
          </GlassCard>
        </VerticalCanvas>

        <div id='preview' style={this.data.style.preview}>
        </div>
      </div>
    );
  }
}



ReactMixin(TelemedicinePage.prototype, ReactMeteorData);

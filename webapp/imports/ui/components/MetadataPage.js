import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardTitle, CardText, CardHeader } from 'material-ui/Card';

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Session } from 'meteor/session';
import { EJSON } from 'meteor/ejson';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';




Session.setDefault('conformanceStatement', '');
Meteor.call('getMetadata', function(error, result){
  if (result) {
    Session.set('conformanceStatement', result);
  }
});

export class MetadataPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      conformance: Session.get('conformanceStatement')
    };
    return data;
  }
  getMetadata(){
    Meteor.call('getMetadata', function(error, result){
      if (result) {
        Session.set('conformanceStatement', result);
      }
    });
  }
  render(){
    return (
      <VerticalCanvas>
        <GlassCard>
          <CardTitle
            title="Metadata"
          />
           <CardText>
            <pre>
              {  JSON.stringify(this.data.conformance, null, 2) }
            </pre>
           </CardText>
        </GlassCard>
      </VerticalCanvas>
    );
  }
}
ReactMixin(MetadataPage.prototype, ReactMeteorData);

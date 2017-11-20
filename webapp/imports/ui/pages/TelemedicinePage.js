import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import { OTPublisher, OTSession, OTStreams, OTSubscriber } from 'opentok-react';

import Glass from '/imports/ui/Glass';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import { PractitionersTable } from '/imports/ui/workflows/practitioners/PractitionersTable';
import RaisedButton from 'material-ui/RaisedButton';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { Session }  from 'meteor/session';
import { Table } from 'react-bootstrap';
import { UserTable } from '/imports/ui/workflows/users/UserTable';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { get } from 'lodash';

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
        },
        incomingVideobox: {
          // width: '400px', 
          // height: '250px',
          // backgroundColor: 'inherit',
          // position: 'absolute',
          // right: '40px',
          // top: '354px'
          left: '0px',
          top: '0px',
          width: Session.get('appWidth') + 'px', 
          height: Session.get('appHeight') + 'px',
          backgroundColor: 'inherit',
          position: 'absolute',
          zIndex: -1
        }
      },
      state: {},
      tokbox: {
        apiKey: false,
        sessionId: false,
        token: false,
        incomingToken: false
      },
      notifications: []
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
      if(get(Meteor.settings, 'public.credentials.tokbox.apiKey')){
        data.tokbox.apiKey = get(Meteor.settings, 'public.credentials.tokbox.apiKey');
      }
      if(get(Meteor.user(), 'profile.tokbox.sessionId')){
        data.tokbox.sessionId = get(Meteor.user(), 'profile.tokbox.sessionId');   
      }
      if(get(Meteor.user(), 'profile.tokbox.token')){
        data.tokbox.token = get(Meteor.user(), 'profile.tokbox.token');   
      }

      if(get(Meteor.user(), 'profile.notifications[0]')){
        data.notifications = get(Meteor.user(), 'profile.notifications');   

        data.notifications.forEach(function(notification){
          if(notification.type == 'videocall'){
            if(notification.token){
              data.tokbox.incomingToken = notification.token;
            }
          }
        });
      }
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("TelemedicinePage[data]", data);
    return data;
  }

  establishTokboxSession(){
    console.log('establishTokboxSession');
    Meteor.call('establishTokboxSession');
  }
  generateTokboxToken(){
    console.log('generateTokboxToken');
    Meteor.call('generateTokboxToken');
  }
  endTokboxSession(){
    console.log('endTokboxSession');
    Meteor.call('endTokboxSession');    
  }
  incomingCallsRowClick(){
    console.log('incomingCallsRowClick');
  }
  videocallUser(token, callee){
    console.log('videocallUser', callee, token);
    
    Meteor.call('videocallUser', callee, token);
  }
  render() {
    var videoBox;
    var incomingVideoBox;

    if(this.data.tokbox.apiKey && this.data.tokbox.sessionId && this.data.tokbox.token){
      videoBox = <OTSession 
          apiKey={this.data.tokbox.apiKey} 
          sessionId={this.data.tokbox.sessionId} 
          token={this.data.tokbox.token} 
          >
          <OTPublisher properties={{  width: '400px', height: '250px'}} />
          <OTStreams > 
            <OTSubscriber />
          </OTStreams>
        </OTSession>
    }


    if(this.data.tokbox.apiKey && this.data.tokbox.sessionId && this.data.tokbox.incomingToken){
      incomingVideoBox = <OTSession 
          apiKey={this.data.tokbox.apiKey} 
          sessionId={this.data.tokbox.sessionId} 
          token={this.data.tokbox.incomingToken} 
          >
          <OTPublisher properties={{  width: this.data.style.incomingVideobox.width, height: this.data.style.incomingVideobox.height}} />
          <OTStreams > 
            <OTSubscriber />
          </OTStreams>
        </OTSession>
    }    

    let incomingCallsTableRow = [];
    for (var i = 0; i < this.data.notifications.length; i++) {
      incomingCallsTableRow.push(
      <tr className='practitionerRow' key={i} style={this.data.style.row} onClick={ this.incomingCallsRowClick.bind('this', this.data.notifications[i].primaryText) }>
        <td className="name">{this.data.notifications[i].primaryText}</td>
        <td className="telecomValue">{this.data.notifications[i].telecomValue}</td>
        <td className="identifier">{this.data.notifications[i].identifier}</td>
        <td className="token" style={{maxWidth: '25%'}}>{this.data.notifications[i].token}</td>
      </tr>);
    }



    return (

      
      <div id="telemedicinePage"> 
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title="Step 1. Establish Session with Server" />
            <CardText>
              <RaisedButton label="Connect to Server" primary={true} style={{width: '100%'}} onClick={this.establishTokboxSession.bind(this) } />
            </CardText>

            <CardTitle title="Step 2. Create a Chat Room" />
            <CardText>
              <RaisedButton label="Create Token" primary={true} style={{width: '100%'}} onClick={this.generateTokboxToken.bind(this) } />
            </CardText>

            <CardTitle title="Step 3. Dial a User" />
            <CardText>
              < UserTable limit={10} searchbar={true} avatars={false} onClick={ this.videocallUser.bind(this, this.data.tokbox.token) } />
              {/* <PractitionersTable /> */}
            </CardText>

            <CardTitle title="Step 4. Receive Calls" />
            <CardText>
            <Table id="notificationsTable" responses hover >
              <thead>
                <tr>
                  <th className="name">name</th>
                  <th className="telecomValue">telecom</th>
                  <th className="identifier">identifier</th>
                  <th className="token" style={{maxWidth: '25%'}}>token</th>
                </tr>
              </thead>
              <tbody>
                { incomingCallsTableRow }
              </tbody>
            </Table>
            </CardText>

            <CardTitle title="Step 5. Leave Chat Room" />
            <CardText>
              <RaisedButton label="End Session" primary={true} style={{width: '100%'}} onClick={this.endTokboxSession.bind(this) } />
            </CardText>
          
          
          </GlassCard>
        </VerticalCanvas>

        <div id='selfieVideobox' style={this.data.style.preview}>
          { videoBox }
        </div>
        <div id='incomingVideobox' style={this.data.style.incomingVideobox}>
          { incomingVideoBox }
        </div>
      </div>
    );
  }
}



ReactMixin(TelemedicinePage.prototype, ReactMeteorData);

import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

let defaultBodySite = {
  resourceType: 'BodySite',
  active: true,
  name: "",
  identifier: [{
    use: 'usual',
    value: ''
  }],
  telecom: [{
    system: "phone",
    value: '',
    use: ''
  }, {
    system: "email",
    value: '',
    use: ''
  }]
};

Session.setDefault('bodySiteUpsert', false);
Session.setDefault('selectedBodySite', false);


export default class BodySiteDetail extends React.Component {
  getMeteorData() {
    let data = {
      bodySiteId: false,
      bodySite: {
        name: '',
        phone: '',
        email: '',
        identifier: ''
      }
    };

    if (Session.get('bodySiteUpsert')) {
      data.bodySite = Session.get('bodySiteUpsert');
    } else {
      if (Session.get('selectedBodySite')) {
        data.bodySiteId = Session.get('selectedBodySite');
        console.log("selectedBodySite", Session.get('selectedBodySite'));

        let selectedBodySite = BodySites.findOne({_id: Session.get('selectedBodySite')});
        console.log("selectedBodySite", selectedBodySite);

        if (selectedBodySite) {
          data.bodySite.name = selectedBodySite.name;
          data.bodySite.identifier = selectedBodySite.identifier[0].value;

          if(selectedBodySite.telecom){
            selectedBodySite.telecom.forEach(function(telecom){
              if(telecom.system === "phone"){
                data.bodySite.phone = telecom.value;
              }
              if(telecom.system === "email"){
                data.bodySite.email = telecom.value;
              }
            });
          }
        }
      } else {
        data.bodySite = {
          name: '',
          phone: '',
          email: '',
          identifier: ''
        };
      }

    }

    console.log('BodySiteDetail', data);
    return data;
  }


  // this could be a mixin
  changeState(field, event, value){
    let bodySiteUpdate;

    if(process.env.NODE_ENV === "test") console.log("BodySiteDetail.changeState", field, event, value);

    // if there's an existing bodySite, use them
    if (Session.get('selectedBodySite')) {
      bodySiteUpdate = this.data.bodySite;
    } else {
      // by default, assume there's no other data and we're creating a new bodySite
      if (Session.get('bodySiteUpsert')) {
        bodySiteUpdate = Session.get('bodySiteUpsert');
      } else {
        bodySiteUpdate = {
          name: '',
          phone: '',
          email: '',
          identifier: ''
        };
      }
    }

    switch (field) {
      case "bodySiteName":
        bodySiteUpdate.name = value;
        break;
      case "identifier":
        bodySiteUpdate.identifier = value;
        break;
      case "phone":
        bodySiteUpdate.phone = value;
        break;
      case "email":
        bodySiteUpdate.email = value;
        break;
      default:
    }


    // bodySiteUpdate[field] = value;
    if(process.env.NODE_ENV === "test") console.log("bodySiteUpdate", bodySiteUpdate);

    Session.set('bodySiteUpsert', bodySiteUpdate);
  }
  openTab(index){
    // set which tab is selected
    let state = Session.get('bodySiteCardState');
    state["index"] = index;
    Session.set('bodySiteCardState', state);
  }


  render() {
    return (
      <div id={this.props.id} className="bodySiteDetail">
        <CardText>
          <TextField
            id='bodySiteNameInput'
            ref='bodySiteName'
            name='name'
            floatingLabelText='BodySite Name'
            value={ (this.data.bodySite.name) ? this.data.bodySite.name : ''}
            onChange={ this.changeState.bind(this, 'bodySiteName')}
            fullWidth
            /><br/>
          <TextField
            id='identifierInput'
            ref='identifier'
            name='identifier'
            floatingLabelText='Identifier'
            value={this.data.bodySite.identifier ? this.data.bodySite.identifier : ''}
            onChange={ this.changeState.bind(this, 'identifier')}
            fullWidth
            /><br/>
          <TextField
            id='activeInput'
            ref='active'
            name='active'
            floatingLabelText='Active'
            value={(this.data.bodySite.active) ? this.data.bodySite.active : ''}
            onChange={ this.changeState.bind(this, 'active')}
            fullWidth
            /><br/>
          <TextField
            id='codeInput'
            ref='code'
            name='code'
            floatingLabelText='Code'
            value={(this.data.bodySite.code) ? this.data.bodySite.code : ''}
            onChange={ this.changeState.bind(this, 'code')}
            fullWidth
            /><br/>
          <TextField
            id='qualifierInput'
            ref='qualifier'
            name='qualifier'
            floatingLabelText='Qualifier'
            value={(this.data.bodySite.qualifier) ? this.data.bodySite.qualifier : ''}
            onChange={ this.changeState.bind(this, 'qualifier')}
            fullWidth
            /><br/>        
          <TextField
            id='descriptionInput'
            ref='description'
            name='description'
            floatingLabelText='Description'
            value={(this.data.bodySite.description) ? this.data.bodySite.description : ''}
            onChange={ this.changeState.bind(this, 'description')}
            fullWidth
            /><br/>        
          <TextField
            id='imageInput'
            ref='image'
            name='image'
            floatingLabelText='Image'
            value={(this.data.bodySite.image) ? this.data.bodySite.image : ''}
            onChange={ this.changeState.bind(this, 'image')}
            fullWidth
            /><br/>      
          <TextField
            id='patientInput'
            ref='patient'
            name='patient'
            floatingLabelText='Description'
            value={(this.data.bodySite.patient) ? this.data.bodySite.patient : ''}
            onChange={ this.changeState.bind(this, 'patient')}
            fullWidth
            /><br/>                  

          </CardText>
        <CardActions>
          { this.determineButtons(this.data.bodySiteId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(bodySiteId){
    if (bodySiteId) {
      return (
        <div>
          <RaisedButton id="saveBodySiteButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteBodySiteButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} style={{marginLeft: '20px'}} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveBodySiteButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }


  // this could be a mixin
  handleSaveButton(){
    let bodySiteUpdate = Session.get('bodySiteUpsert');

    if(process.env.NODE_ENV === "test") console.log("bodySiteUpdate", bodySiteUpdate);


    if (Session.get('selectedBodySite')) {
      if(process.env.NODE_ENV === "test") console.log("update practioner");
      delete bodySiteUpdate._id;

      var updatedOrg = defaultBodySite;
      updatedOrg.resourceType = "BodySite";
      updatedOrg.name = bodySiteUpdate.name;
      updatedOrg.telecom = [{
        resourceType: 'ContactPoint',
        system: "phone",
        value: bodySiteUpdate.phone,
        use: ''
      }, {
        resourceType: 'ContactPoint',
        system: "email",
        value: bodySiteUpdate.email,
        use: ''
      }]
      updatedOrg.identifier = [{
        resourceType: 'Identifier',
        use: 'usual',
        value: bodySiteUpdate.identifier,
      }];

      if(process.env.NODE_ENV === "test") console.log("updatedOrg", updatedOrg);

      BodySites.update(
        {_id: Session.get('selectedBodySite')}, {$set: updatedOrg }, function(error) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('BodySite updated!', 'success');
            Session.set('bodySitePageTabIndex', 1);
            Session.set('selectedBodySite', false);
            Session.set('bodySiteUpsert', false);
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new bodySite", bodySiteUpdate);

      var newBodySite = defaultBodySite;
      newBodySite.name = bodySiteUpdate.name;
      newBodySite.telecom = [{
        system: "phone",
        value: bodySiteUpdate.phone,
        use: ''
      }, {
        system: "email",
        value: bodySiteUpdate.email,
        use: ''
      }]
      newBodySite.identifier = [{
        use: 'usual',
        value: bodySiteUpdate.identifier,
      }];

      BodySites.insert(newBodySite, function(error) {
        if (error) {
          console.log('BodySites.insert[error]', error)
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('BodySite added!', 'success');
          Session.set('bodySitePageTabIndex', 1);
          Session.set('selectedBodySite', false);
          Session.set('bodySiteUpsert', false);
        }
      });
    }
  }

  // this could be a mixin
  handleCancelButton(){
    if(process.env.NODE_ENV === "test") console.log("handleCancelButton");
  }

  handleDeleteButton(){
    Meteor.call('removeBodySiteById', Session.get('selectedBodySite'), function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('BodySite deleted!', 'success');
        Session.set('bodySitePageTabIndex', 1);
        Session.set('selectedBodySite', false);
        Session.set('bodySiteUpsert', false);
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "BodySites", recordId: Session.get('selectedBodySite')});
      }
    });
  }
}


BodySiteDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(BodySiteDetail.prototype, ReactMeteorData);

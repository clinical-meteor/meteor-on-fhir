import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

let defaultOrganization = {
  resourceType: 'Organization',
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

Session.setDefault('organizationUpsert', false);
Session.setDefault('selectedOrganization', false);


export default class OrganizationDetail extends React.Component {
  getMeteorData() {
    let data = {
      organizationId: false,
      organization: {
        name: '',
        phone: '',
        email: '',
        identifier: ''
      }
    };

    if (Session.get('organizationUpsert')) {
      data.organization = Session.get('organizationUpsert');
    } else {
      if (Session.get('selectedOrganization')) {
        data.organizationId = Session.get('selectedOrganization');
        console.log("selectedOrganization", Session.get('selectedOrganization'));

        let selectedOrganization = Organizations.findOne({_id: Session.get('selectedOrganization')});
        console.log("selectedOrganization", selectedOrganization);

        if (selectedOrganization) {
          data.organization.name = selectedOrganization.name;
          data.organization.identifier = selectedOrganization.identifier[0].value;

          if(selectedOrganization.telecom){
            selectedOrganization.telecom.forEach(function(telecom){
              if(telecom.system === "phone"){
                data.organization.phone = telecom.value;
              }
              if(telecom.system === "email"){
                data.organization.email = telecom.value;
              }
            });
          }
        }
      } else {
        data.organization = {
          name: '',
          phone: '',
          email: '',
          identifier: ''
        };
      }

    }

    console.log('OrganizationDetail', data);
    return data;
  }


  // this could be a mixin
  changeState(field, event, value){
    let organizationUpdate;

    if(process.env.NODE_ENV === "test") console.log("OrganizationDetail.changeState", field, event, value);

    // if there's an existing organization, use them
    if (Session.get('selectedOrganization')) {
      organizationUpdate = this.data.organization;
    } else {
      // by default, assume there's no other data and we're creating a new organization
      if (Session.get('organizationUpsert')) {
        organizationUpdate = Session.get('organizationUpsert');
      } else {
        organizationUpdate = {
          name: '',
          phone: '',
          email: '',
          identifier: ''
        };
      }
    }

    switch (field) {
      case "organizationName":
        organizationUpdate.name = value;
        break;
      case "identifier":
        organizationUpdate.identifier = value;
        break;
      case "phone":
        organizationUpdate.phone = value;
        break;
      case "email":
        organizationUpdate.email = value;
        break;
      default:
    }


    // organizationUpdate[field] = value;
    if(process.env.NODE_ENV === "test") console.log("organizationUpdate", organizationUpdate);

    Session.set('organizationUpsert', organizationUpdate);
  }
  openTab(index){
    // set which tab is selected
    let state = Session.get('organizationCardState');
    state["index"] = index;
    Session.set('organizationCardState', state);
  }


  render() {
    return (
      <div id={this.props.id} className="organizationDetail">
        <CardText>
          <TextField
            id='organizationNameInput'
            ref='organizationName'
            name='name'
            floatingLabelText='Organization Name'
            value={ (this.data.organization.name) ? this.data.organization.name : ''}
            onChange={ this.changeState.bind(this, 'organizationName')}
            fullWidth
            /><br/>
          <TextField
            id='identifierInput'
            ref='identifier'
            name='identifier'
            floatingLabelText='Identifier'
            value={this.data.organization.identifier ? this.data.organization.identifier : ''}
            onChange={ this.changeState.bind(this, 'identifier')}
            fullWidth
            /><br/>
          <TextField
            id='phoneInput'
            ref='phone'
            name='phone'
            floatingLabelText='Phone'
            value={(this.data.organization.phone) ? this.data.organization.phone : ''}
            onChange={ this.changeState.bind(this, 'phone')}
            fullWidth
            /><br/>
          <TextField
            id='emailInput'
            ref='email'
            name='email'
            floatingLabelText='Email'
            value={(this.data.organization.email) ? this.data.organization.email : ''}
            onChange={ this.changeState.bind(this, 'email')}
            fullWidth
            /><br/>
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.organizationId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(organizationId){
    if (organizationId) {
      return (
        <div>
          <RaisedButton id="saveOrganizationButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteOrganizationButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveOrganizationButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }


  // this could be a mixin
  handleSaveButton(){
    let organizationUpdate = Session.get('organizationUpsert');

    if(process.env.NODE_ENV === "test") console.log("organizationUpdate", organizationUpdate);


    if (Session.get('selectedOrganization')) {
      if(process.env.NODE_ENV === "test") console.log("update practioner");
      delete organizationUpdate._id;

      var updatedOrg = defaultOrganization;
      updatedOrg.resourceType = "Organization";
      updatedOrg.name = organizationUpdate.name;
      updatedOrg.telecom = [{
        resourceType: 'ContactPoint',
        system: "phone",
        value: organizationUpdate.phone,
        use: ''
      }, {
        resourceType: 'ContactPoint',
        system: "email",
        value: organizationUpdate.email,
        use: ''
      }]
      updatedOrg.identifier = [{
        resourceType: 'Identifier',
        use: 'usual',
        value: organizationUpdate.identifier,
      }];

      if(process.env.NODE_ENV === "test") console.log("updatedOrg", updatedOrg);

      Organizations.update(
        {_id: Session.get('selectedOrganization')}, {$set: updatedOrg }, function(error) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Organization updated!', 'success');
            Session.set('organizationPageTabIndex', 1);
            Session.set('selectedOrganization', false);
            Session.set('organizationUpsert', false);
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new organization", organizationUpdate);

      var newOrganization = defaultOrganization;
      newOrganization.name = organizationUpdate.name;
      newOrganization.telecom = [{
        system: "phone",
        value: organizationUpdate.phone,
        use: ''
      }, {
        system: "email",
        value: organizationUpdate.email,
        use: ''
      }]
      newOrganization.identifier = [{
        use: 'usual',
        value: organizationUpdate.identifier,
      }];

      Organizations.insert(newOrganization, function(error) {
        if (error) {
          console.log('Organizations.insert[error]', error)
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Organization added!', 'success');
          Session.set('organizationPageTabIndex', 1);
          Session.set('selectedOrganization', false);
          Session.set('organizationUpsert', false);
        }
      });
    }
  }

  // this could be a mixin
  handleCancelButton(){
    if(process.env.NODE_ENV === "test") console.log("handleCancelButton");
  }

  handleDeleteButton(){
    removeOrganizationById.call(
      {_id: Session.get('selectedOrganization')}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Organization deleted!', 'success');
        Session.set('organizationPageTabIndex', 1);
        Session.set('selectedOrganization', false);
        Session.set('organizationUpsert', false);
      }
    });
  }
}


OrganizationDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(OrganizationDetail.prototype, ReactMeteorData);

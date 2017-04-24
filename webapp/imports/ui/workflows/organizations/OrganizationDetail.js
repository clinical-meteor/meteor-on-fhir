import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

let defaultOrganization = {
  resourceType: 'Organization',
  code: {
    text: ""
  },
  isBrand: true,
  manufacturer: {
    display: '',
    reference: ''
  },
  product: {
    form: {
      text: 'tablet'
    },
    ingredient: [{
      item: {
        resourceType: 'Substance',
        code: {
          text: ''
        },
        description: ''
      },
      instance: [{
        quantity: ''
      }]
    }]
  },
  package: {
    container: {
      text: 'bottle'
    },
    content: [{
      amount: {
        value: 30,
        unit: 'tablet'
      }
    }]
  }
};

Session.setDefault('organizationUpsert', false);
Session.setDefault('selectedOrganization', false);


export default class OrganizationDetail extends React.Component {
  getMeteorData() {
    let data = {
      organizationId: false,
      organization: defaultOrganization
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
          data.organization = selectedOrganization;
        }
      } else {
        data.organization = defaultOrganization;
      }

    }

    return data;
  }


  // this could be a mixin
  changeState(field, event, value){
    let organizationUpdate;

    if(process.env.NODE_ENV === "test") console.log("OrganizationDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new organization
    if (Session.get('organizationUpsert')) {
      organizationUpdate = Session.get('organizationUpsert');
    } else {
      organizationUpdate = defaultOrganization;
    }



    // if there's an existing organization, use them
    if (Session.get('selectedOrganization')) {
      organizationUpdate = this.data.organization;
    }

    switch (field) {
      case "organizationName":
        organizationUpdate.code.text = value;
        break;
      case "manufacturerDisplay":
        organizationUpdate.manufacturer.display = value;
        break;
      case "organizationForm":
        organizationUpdate.product.form.text = value;
        break;
      case "activeIngredient":
        organizationUpdate.product.ingredient[0].item.code.text = value;
        break;
      case "activeIngredientQuantity":
        organizationUpdate.product.ingredient[0].instance[0].quantity = value;
        break;
      case "activeIngredientDescription":
        organizationUpdate.product.ingredient[0].item.description = value;
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
            name='organizationName'
            floatingLabelText='Organization Name'
            value={ (this.data.organization.code) ? this.data.organization.code.text : ''}
            onChange={ this.changeState.bind(this, 'organizationName')}
            fullWidth
            /><br/>
          <TextField
            id='manufacturerDisplayInput'
            ref='manufacturerDisplay'
            name='manufacturerDisplay'
            floatingLabelText='Manufacturer'
            value={this.data.organization.manufacturer ? this.data.organization.manufacturer.display : ''}
            onChange={ this.changeState.bind(this, 'manufacturerDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='organizationFormInput'
            ref='organizationForm'
            name='organizationForm'
            floatingLabelText='Substance Form'
            value={(this.data.organization.product) ? this.data.organization.product.form.text : ''}
            onChange={ this.changeState.bind(this, 'organizationForm')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientInput'
            ref='activeIngredient'
            name='activeIngredient'
            floatingLabelText='Active Ingredient'
            value={(this.data.organization.product) ? this.data.organization.product.ingredient[0].item.code.text : ''}
            onChange={ this.changeState.bind(this, 'activeIngredient')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientQuantityInput'
            ref='activeIngredientQuantity'
            name='activeIngredientQuantity'
            floatingLabelText='Quantity'
            value={(this.data.organization.product) ? this.data.organization.product.ingredient[0].instance[0].quantity : ''}
            onChange={ this.changeState.bind(this, 'activeIngredientQuantity')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientDescriptionInput'
            ref='activeIngredientDescription'
            name='activeIngredientDescription'
            floatingLabelText='Active Ingredient Description'
            value={(this.data.organization.product) ? this.data.organization.product.ingredient[0].item.description : ''}
            onChange={ this.changeState.bind(this, 'activeIngredientDescription')}
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
    let organizationUpdate = Session.get('organizationUpsert', organizationUpdate);

    if(process.env.NODE_ENV === "test") console.log("organizationUpdate", organizationUpdate);


    if (Session.get('selectedOrganization')) {
      if(process.env.NODE_ENV === "test") console.log("update practioner");
      delete organizationUpdate._id;

      Organizations.update(
        {_id: Session.get('selectedOrganization')}, {$set: organizationUpdate }, function(error) {
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

      Organizations.insert(organizationUpdate, function(error) {
        if (error) {
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

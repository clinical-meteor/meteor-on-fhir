import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Bert } from 'meteor/themeteorchef:bert';

import { CardText, CardActions } from 'material-ui/Card';

let defaultLocation = {
  resourceType: 'Location',
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

Session.setDefault('locationUpsert', false);
Session.setDefault('selectedLocation', false);


export default class LocationDetail extends React.Component {
  getMeteorData() {
    let data = {
      locationId: false,
      location: defaultLocation
    };

    if (Session.get('locationUpsert')) {
      data.location = Session.get('locationUpsert');
    } else {
      if (Session.get('selectedLocation')) {
        data.locationId = Session.get('selectedLocation');
        console.log("selectedLocation", Session.get('selectedLocation'));

        let selectedLocation = Locations.findOne({_id: Session.get('selectedLocation')});
        console.log("selectedLocation", selectedLocation);

        if (selectedLocation) {
          data.location = selectedLocation;
        }
      } else {
        data.location = defaultLocation;
      }

    }

    return data;
  }


  // this could be a mixin
  changeState(field, event, value){
    let locationUpdate;

    if(process.env.NODE_ENV === "test") console.log("LocationDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new location
    if (Session.get('locationUpsert')) {
      locationUpdate = Session.get('locationUpsert');
    } else {
      locationUpdate = defaultLocation;
    }



    // if there's an existing location, use them
    if (Session.get('selectedLocation')) {
      locationUpdate = this.data.location;
    }

    switch (field) {
      case "locationName":
        locationUpdate.code.text = value;
        break;
      case "manufacturerDisplay":
        locationUpdate.manufacturer.display = value;
        break;
      case "locationForm":
        locationUpdate.product.form.text = value;
        break;
      case "activeIngredient":
        locationUpdate.product.ingredient[0].item.code.text = value;
        break;
      case "activeIngredientQuantity":
        locationUpdate.product.ingredient[0].instance[0].quantity = value;
        break;
      case "activeIngredientDescription":
        locationUpdate.product.ingredient[0].item.description = value;
        break;
      default:

    }


    // locationUpdate[field] = value;
    if(process.env.NODE_ENV === "test") console.log("locationUpdate", locationUpdate);

    Session.set('locationUpsert', locationUpdate);
  }
  openTab(index){
    // set which tab is selected
    let state = Session.get('locationCardState');
    state["index"] = index;
    Session.set('locationCardState', state);
  }


  render() {
    return (
      <div id={this.props.id} className="locationDetail">
        <CardText>
          <TextField
            id='locationNameInput'
            ref='locationName'
            name='locationName'
            floatingLabelText='Location Name'
            value={this.data.location.code.text}
            onChange={ this.changeState.bind(this, 'locationName')}
            fullWidth
            /><br/>
          <TextField
            id='manufacturerDisplayInput'
            ref='manufacturerDisplay'
            name='manufacturerDisplay'
            floatingLabelText='Manufacturer'
            value={this.data.location.manufacturer.display ? this.data.location.manufacturer.display : ''}
            onChange={ this.changeState.bind(this, 'manufacturerDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='locationFormInput'
            ref='locationForm'
            name='locationForm'
            floatingLabelText='Substance Form'
            value={this.data.location.product.form.text}
            onChange={ this.changeState.bind(this, 'locationForm')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientInput'
            ref='activeIngredient'
            name='activeIngredient'
            floatingLabelText='Active Ingredient'
            value={this.data.location.product.ingredient[0].item.code.text}
            onChange={ this.changeState.bind(this, 'activeIngredient')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientQuantityInput'
            ref='activeIngredientQuantity'
            name='activeIngredientQuantity'
            floatingLabelText='Quantity'
            value={this.data.location.product.ingredient[0].instance[0].quantity}
            onChange={ this.changeState.bind(this, 'activeIngredientQuantity')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientDescriptionInput'
            ref='activeIngredientDescription'
            name='activeIngredientDescription'
            floatingLabelText='Active Ingredient Description'
            value={this.data.location.product.ingredient[0].item.description}
            onChange={ this.changeState.bind(this, 'activeIngredientDescription')}
            fullWidth
            /><br/>
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.locationId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(locationId){
    if (locationId) {
      return (
        <div>
          <RaisedButton id="saveLocationButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteLocationButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveLocationButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }


  // this could be a mixin
  handleSaveButton(){
    let locationUpdate = Session.get('locationUpsert', locationUpdate);

    if(process.env.NODE_ENV === "test") console.log("locationUpdate", locationUpdate);


    if (Session.get('selectedLocation')) {
      if(process.env.NODE_ENV === "test") console.log("update practioner");
      delete locationUpdate._id;

      Locations.update(
        {_id: Session.get('selectedLocation')}, {$set: locationUpdate }, function(error) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Location updated!', 'success');
            Session.set('locationPageTabIndex', 1);
            Session.set('selectedLocation', false);
            Session.set('locationUpsert', false);
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new location", locationUpdate);

      Locations.insert(locationUpdate, function(error) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Location added!', 'success');
          Session.set('locationPageTabIndex', 1);
          Session.set('selectedLocation', false);
          Session.set('locationUpsert', false);
        }
      });
    }
  }

  // this could be a mixin
  handleCancelButton(){
    if(process.env.NODE_ENV === "test") console.log("handleCancelButton");
  }

  handleDeleteButton(){
    removeLocationById.call(
      {_id: Session.get('selectedLocation')}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Location deleted!', 'success');
        Session.set('locationPageTabIndex', 1);
        Session.set('selectedLocation', false);
        Session.set('locationUpsert', false);
      }
    });
  }
}


LocationDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(LocationDetail.prototype, ReactMeteorData);

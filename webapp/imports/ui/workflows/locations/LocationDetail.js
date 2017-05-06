import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

let defaultLocation = {
  "resourceType": "Location",
  "status": "active",
  "name": "",
  "position": {
    'latitude': 0,
    'longitude': 0,
    'altitude': 0
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
        locationUpdate.name = value;
        break;
      case "locationLatitude":
        locationUpdate.position.latitude = value;
        break;
      case "locationLongitude":
        locationUpdate.position.longitude = value;
        break;
      case "locationAltitude":
        locationUpdate.position.altitude = value;
        break;
      default:
    }

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
            value={(this.data.location.name) ? this.data.location.name : ''}
            onChange={ this.changeState.bind(this, 'locationName')}
            fullWidth
            /><br/>
          <TextField
            id='latitudeInput'
            ref='latitude'
            name='latitude'
            floatingLabelText='Latitude'
            value={(this.data.location.position) ? this.data.location.position.latitude : ''}
            onChange={ this.changeState.bind(this, 'locationLatitude')}
            fullWidth
            /><br/>
          <TextField
            id='longitudeInput'
            ref='longitude'
            name='longitude'
            floatingLabelText='Longitude'
            value={(this.data.location.position) ? this.data.location.position.longitude : ''}
            onChange={ this.changeState.bind(this, 'locationLongitude')}
            fullWidth
            /><br/>
          <TextField
            id='altitudeInput'
            ref='altitude'
            name='altitude'
            floatingLabelText='Altitude'
            value={(this.data.location.position) ? this.data.location.position.altitude : ''}
            onChange={ this.changeState.bind(this, 'locationAltitude')}
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
          <RaisedButton id="deleteLocationButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} style={{marginLeft: '20px'}} />
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

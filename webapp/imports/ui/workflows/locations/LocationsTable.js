import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';

Session.setDefault('selectedLocations', []);

export default class LocationTable extends React.Component {
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        block: {
          maxWidth: 250
        },
        checkbox: {
          //marginBottom: 16
        }
      },
      selected: [],
      locations: Locations.find().map(function(location){
        let result = {
          _id: '',
          name: '',
          manufacturer: '',
          form: '',
          primaryIngredient: ''
        };

        if (location._id ) {
          result._id = location._id;
        }
        if (location.code && location.code.text ) {
          result.name = location.code.text ;
        }
        if (location.manufacturer && location.manufacturer.display ) {
          result.manufacturer = location.manufacturer.display ;
        }
        if (location.product && location.product.form && location.product.form.text ) {
          result.form = location.product.form.text ;
        }
        if (location.product && location.product.ingredient && location.product.ingredient[0] && location.product.ingredient[0].item && location.product.ingredient[0].item.code && location.product.ingredient[0].item.code.text) {
          result.primaryIngredient = location.product.ingredient[0].item.code.text;
        }

        return result;
      })
    };

    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = 'blur(5px)';
    }

    //console.log("data", data);
    return data;
  }
  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  }

  handleSelect(selected) {
    this.setState({selected});
  }

  rowClick(id){
    Session.set('locationUpsert', false);
    Session.set('selectedLocation', id);
    Session.set('locationPageTabIndex', 2);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.locations.length; i++) {
      tableRows.push(
      <tr className='locationRow' ref='med-{i}' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.locations[i]._id) }>
        <td className="check">
          <Toggle
            ref='med-{i}'
            style={this.data.style.checkbox}
          />
        </td>
        <td className="locationName hidden-on-phone">{this.data.locations[i].name}</td>
        <td className="manufacturerDisplay hidden-on-phone">{this.data.locations[i].manufacturer}</td>
        <td className="locationForm">{this.data.locations[i].form}</td>
        <td className="activeIngredient">{this.data.locations[i].primaryIngredient}</td>
        <td className="barcode hidden-on-phone">{this.data.locations[i]._id}</td>
      </tr>);
    }


    return(
      <Table id="locationsTable" ref='locationsTable' responses hover >
        <thead>
          <tr>
            <th className="check">prescribed</th>
            <th className="locationName hidden-on-phone">name</th>
            <th className="manufacturerDisplay hidden-on-phone">manufacturer</th>
            <th className="locationForm">form</th>
            <th className="activeIngredient">active ingredient</th>
            <th className="id hidden-on-phone">location._id</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(LocationTable.prototype, ReactMeteorData);

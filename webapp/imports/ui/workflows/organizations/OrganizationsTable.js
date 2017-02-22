import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';

Session.setDefault('selectedOrganizations', []);

export default class OrganizationTable extends React.Component {
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
      organizations: Organizations.find().map(function(organization){
        let result = {
          _id: '',
          name: '',
          manufacturer: '',
          form: '',
          primaryIngredient: ''
        };

        if (organization._id ) {
          result._id = organization._id;
        }
        if (organization.code && organization.code.text ) {
          result.name = organization.code.text ;
        }
        if (organization.manufacturer && organization.manufacturer.display ) {
          result.manufacturer = organization.manufacturer.display ;
        }
        if (organization.product && organization.product.form && organization.product.form.text ) {
          result.form = organization.product.form.text ;
        }
        if (organization.product && organization.product.ingredient && organization.product.ingredient[0] && organization.product.ingredient[0].item && organization.product.ingredient[0].item.code && organization.product.ingredient[0].item.code.text) {
          result.primaryIngredient = organization.product.ingredient[0].item.code.text;
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
    Session.set('organizationUpsert', false);
    Session.set('selectedOrganization', id);
    Session.set('organizationPageTabIndex', 2);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.organizations.length; i++) {
      tableRows.push(
      <tr className='organizationRow' ref='med-{i}' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.organizations[i]._id) }>
        <td className="check">
          <Toggle
            ref='med-{i}'
            style={this.data.style.checkbox}
          />
        </td>
        <td className="organizationName hidden-on-phone">{this.data.organizations[i].name}</td>
        <td className="manufacturerDisplay hidden-on-phone">{this.data.organizations[i].manufacturer}</td>
        <td className="organizationForm">{this.data.organizations[i].form}</td>
        <td className="activeIngredient">{this.data.organizations[i].primaryIngredient}</td>
        <td className="barcode hidden-on-phone">{this.data.organizations[i]._id}</td>
      </tr>);
    }


    return(
      <Table id="organizationsTable" ref='organizationsTable' responses hover >
        <thead>
          <tr>
            <th className="check">prescribed</th>
            <th className="organizationName hidden-on-phone">name</th>
            <th className="manufacturerDisplay hidden-on-phone">manufacturer</th>
            <th className="organizationForm">form</th>
            <th className="activeIngredient">active ingredient</th>
            <th className="id hidden-on-phone">organization._id</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(OrganizationTable.prototype, ReactMeteorData);

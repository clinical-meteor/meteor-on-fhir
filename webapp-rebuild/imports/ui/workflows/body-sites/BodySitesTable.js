import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';

Session.setDefault('selectedBodySites', []);

export default class BodySiteTable extends React.Component {
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
      bodySites: BodySites.find().map(function(bodySite){
        let result = {
          _id: '',
          name: '',
          identifier: [],
          phone: '',
          email: ''
        };

        if (bodySite._id ) {
          result._id = bodySite._id;
        }
        if (bodySite.name ) {
          result.name = bodySite.name ;
        }
        if (bodySite.identifier && bodySite.identifier[0] && bodySite.identifier[0].value ) {
          result.identifier = bodySite.identifier;
        }
        if (bodySite.telecom && bodySite.telecom[0] && bodySite.telecom[0].value ) {
          result.phone = bodySite.telecom[0].value ;
        }
        if (bodySite.telecom && bodySite.telecom[1] && bodySite.telecom[1].value ) {
          result.email = bodySite.telecom[1].value;
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
    Session.set('bodySiteUpsert', false);
    Session.set('selectedBodySite', id);
    Session.set('bodySitePageTabIndex', 2);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.bodySites.length; i++) {
      tableRows.push(
      <tr className='bodySiteRow' ref='med-{i}' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.bodySites[i]._id) }>
        <td className="name hidden-on-phone">{this.data.bodySites[i].name}</td>
        <td className="identifier hidden-on-phone">{ ( this.data.bodySites[i].identifier && this.data.bodySites[i].identifier[0]) ? this.data.bodySites[i].identifier[0].value : '' }</td>
        <td className="phone">{this.data.bodySites[i].phone}</td>
        <td className="email">{this.data.bodySites[i].email}</td>
      </tr>);
    }


    return(
      <Table id="bodySitesTable" ref='bodySitesTable' responses hover >
        <thead>
          <tr>
            <th className="name hidden-on-phone">name</th>
            <th className="identifier hidden-on-phone">identifier</th>
            <th className="phone">phone</th>
            <th className="email">email</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(BodySiteTable.prototype, ReactMeteorData);

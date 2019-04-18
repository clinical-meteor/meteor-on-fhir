// base layout
import { CardHeader, CardText, CardTitle } from 'material-ui/Card';
import PropTypes from 'prop-types';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

import { Session } from 'meteor/session';
import Dialog from 'material-ui/Dialog';
import { Container, Col, Row } from 'react-bootstrap';

import { get, has } from 'lodash';

Session.setDefault('securityDialogOpen', false);
Session.setDefault('securityDialogResourceType', '');
Session.setDefault('securityDialogResourceId', '');
Session.setDefault('securityDialogResourceJson', null);
Session.setDefault('securityDialogDisplayRawJson', false);

export class SecurityDialog extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      securityDialog: {
        open: Session.get('securityDialogOpen'),
        resourceType: Session.get('securityDialogResourceType'),
        resourceId: Session.get('securityDialogResourceId'),
        resourceJsonRaw: Session.get('securityDialogResourceJson'),
        resourceJson: JSON.stringify(Session.get('securityDialogResourceJson'), null, 2)
      },
      fields: {
        mongoId: '',
        id: '',
        narrative: '',
        versionId: '',
        lastUpdated: '',
        sourceUrl: '',
        securityTags: [],
        extensions: [],
        tags: [],
        profiles: []
      },
      displayRawJson: Session.get('securityDialogDisplayRawJson')
    };

    if(get(data, 'securityDialog.resourceJsonRaw.text.div')){
      data.fields.narrative = get(data, 'securityDialog.resourceJsonRaw.text.div');
    }

    if(get(data, 'securityDialog.resourceJsonRaw.meta.versionId')){
      data.fields.versionId = get(data, 'securityDialog.resourceJsonRaw.meta.versionId');
    }
    if(get(data, 'securityDialog.resourceJsonRaw.meta.lastUpdated')){
      data.fields.lastUpdated = get(data, 'securityDialog.resourceJsonRaw.meta.lastUpdated');
    }
    if(get(data, 'securityDialog.resourceJsonRaw.meta.source')){
      data.fields.sourceUrl = get(data, 'securityDialog.resourceJsonRaw.meta.source');
    }
    if(get(data, 'securityDialog.resourceJsonRaw.id')){
      data.fields.id = get(data, 'securityDialog.resourceJsonRaw.id');
    }
    if(get(data, 'securityDialog.resourceJsonRaw._id')){
      data.fields.mongoId = get(data, 'securityDialog.resourceJsonRaw._id');
    }

    if(get(data, 'securityDialog.resourceJsonRaw.extension')){
      data.securityDialog.resourceJsonRaw.extension.forEach(function(extension){
        //let parts = extension.url.split("/");
        data.fields.extensions.push(extension.url.split("/")[extension.url.split("/").length - 1])
      })
    }

    if(get(data, 'securityDialog.resourceJsonRaw.meta.security')){
      data.securityDialog.resourceJsonRaw.meta.security.forEach(function(securityTag){
        data.fields.securityTags.push(get(securityTag, 'display'))
      })
    }

    if(get(data, 'securityDialog.resourceJsonRaw.meta.tag')){
      data.securityDialog.resourceJsonRaw.meta.tag.forEach(function(tag){
        data.fields.tags.push(get(tag, 'text'))
      })
    }

    if(get(data, 'securityDialog.resourceJsonRaw.meta.profile')){
      data.securityDialog.resourceJsonRaw.meta.profile.forEach(function(profile){
        data.fields.profiles.push(get(profile, 'url'))
      })
    }


    console.log("SecurityDialog[data]", data);
    return data;
  }
  handleCloseSecurityDialog(){
    Session.set('securityDialogOpen', false);
  }
  toggleRawDataDisplay(){
    Session.toggle('securityDialogDisplayRawJson');
  }
  handleTextareaUpdate(){

  }
  render(){

    let securityTagChips = [];
    this.data.fields.securityTags.forEach(function(tag, index){
      securityTagChips.push(<div key={index}>
        {tag}
      </div>)
    });

    let profileChips = [];
    this.data.fields.profiles.forEach(function(tag, index){
      profileChips.push(<div key={index}>
        <a href={tag} target="_blank">{tag}</a>
      </div>)
    });


    let extensionChips = [];
    this.data.fields.extensions.forEach(function(tag, index){
      extensionChips.push(<div key={index}>
        {tag}
      </div>)
    });

    let tagChips = [];
    this.data.fields.tags.forEach(function(extension, index){
      tagChips.push(<div key={index}>
        {extension}
      </div>)
    });


    let dialogContent;
    let toggleButtonText = "Show Raw Data"

    if(get(this, 'data.displayRawJson')){
      toggleButtonText = "Show Metadata Summary"
      dialogContent = <CardText style={{overflowY: "auto", marginTop: '60px'}}>
        <textarea 
          id='securityDialogJson' 
          onChange= { this.handleTextareaUpdate }
          value={get(this, 'data.securityDialog.resourceJson') }
          style={{width: '100%', position: 'relative', minHeight: '200px', height: '400px', backgroundColor: '#f5f5f5', borderColor: '#ccc', borderRadius: '4px', lineHeight: '16px'}} 
        />
      </CardText>
    } else {
      let dialogSectionStyle = {
        minHeight: '80px'
      }
      dialogContent = <CardText style={{overflowY: "auto", marginTop: '60px'}}>
        {/* <div style={dialogSectionStyle}>
          <Row>
            <Col md={4}>
              <h4>Source Id</h4> 
              {get(this, 'data.fields.id')}
            </Col>
            <Col md={4}>
              <h4>Version</h4> 
              {get(this, 'data.fields.versionId')}
            </Col>
            <Col md={4}>
              <h4>Last Updated</h4> 
              {get(this, 'data.fields.lastUpdated')}
            </Col>
          </Row>
        </div> */}

        <div style={dialogSectionStyle}>
          <h4>Narrative</h4>
          {get(this, 'data.fields.narrative')}
        </div>

        <div style={dialogSectionStyle}>
          <h4>Version: </h4> 
          {get(this, 'data.fields.versionId')}
        </div>

        <div style={dialogSectionStyle}>
          <h4>Last Updated</h4> 
          {get(this, 'data.fields.lastUpdated')}
        </div>

        <div style={dialogSectionStyle}>
          <h4>Source</h4> 
          {get(this, 'data.fields.sourceUrl')}
        </div>

        <div style={dialogSectionStyle}>
          <h4>Source ID</h4> 
          {get(this, 'data.fields.id')}
        </div>

        <div style={dialogSectionStyle}>
          <h4>Extentions</h4>
          {extensionChips}
        </div>

        <div style={dialogSectionStyle}>
          <h4>Profile</h4>
          {profileChips}
        </div>

        <div style={dialogSectionStyle}>
          <h4>Security Tags</h4>
          {securityTagChips}
        </div>

        <div style={dialogSectionStyle}>
          <h4>Tags</h4>
          {tagChips}
        </div>

    </CardText>
    }

    const securityActions = [
      <FlatButton
        label={toggleButtonText}
        primary={true}
        onClick={this.toggleRawDataDisplay}
        style={{float: 'left'}}
      />,
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleCloseSecurityDialog}
      />
    ];

    let cardTitle = "Resource Metadata";

    return (
      <Dialog
        actions={securityActions}
        modal={false}
        open={this.data.securityDialog.open}
        onRequestClose={this.handleCloseSecurityDialog}
        style={{minHeight: '560px'}}
      >
      <Row id='metaDataHeader' style={{height: '80px', position: 'absolute', width: '100%'}}>
        <CardTitle
          title="Metadata"
        />
        <CardTitle
          title={get(this, 'data.fields.mongoId')}
          style={{right: '10px', position: 'absolute', top: '0px'}}
          className="barcode"
        />    
      </Row>
        { dialogContent }
      </Dialog>
    );
  }
}

ReactMixin(SecurityDialog.prototype, ReactMeteorData);
export default SecurityDialog;
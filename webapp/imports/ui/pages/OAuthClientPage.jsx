// Here's the OAuth/protected FHIR server: https://open-ic.epic.com/Argonaut/api/FHIR/Argonaut, 
// Its Conformance statement is here: https://open-ic.epic.com/Argonaut/api/FHIR/Argonaut/metadata 
// And its authorize endpoint: https://open-ic.epic.com/FHIR/oauth2/authorize
// ARGONAUT/ARGONAUT
// https://guide.meteor.com/accounts.html#oauth-calling-api  


//====================================
// Client Config
//
// Epic
// 2098c6e8-57c3-6b87-a5f2-8712d49365f9
// https://open-ic.epic.com/argonaut/api/FHIR/Argonaut/
// https://open-ic.epic.com/FHIR/oauth2/authorize


// Not sure how functional the following sandbox is
// https://open-ic.epic.com/argonaut/api/FHIR/Argonaut/

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { VerticalCanvas, GlassCard, DynamicSpacer } from 'meteor/clinical:glass-ui';
import { CardHeader, CardText, CardTitle, CardActions, TextField, Toggle, Paper, FlatButton, RaisedButton } from 'material-ui';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';

import { get } from 'lodash';



var getUserIdResult = new ReactiveVar(null);
var getUserData = new ReactiveVar(null);
var getPatientData = new ReactiveVar(null);

export class OAuthClientPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        serviceName: '',
        clientId: '',
        secretKey: '',
        targetBaseUrl: '',
        targetLoginUrl: '',
        popup: ''
      },
      autoscan: ''
    };
  }
  componentDidMount() {
      this.setState({
        formData: {
            serviceName: '',
            clientId: '',
            secretKey: '',
            targetBaseUrl: '',
            targetLoginUrl: '',
            popup: ''
          }
      });
  }
  getMeteorData() {

    let data = {
      style: {},
      state: {
          userAccessToken: getUserAccessToken(),
          userIdResult: getUserIdResult.get(),
          userOAuth2Id: null,
          userData: null,
          patientData: null,
          accessToken: null,
          formData: {
            serviceName: '',
            clientId: '',
            secretKey: '',
            targetBaseUrl: '',
            targetLoginUrl: '',
            popup: ''
          }
      },
      services: []
    };

    if(ServiceConfiguration){
        data.services = ServiceConfiguration.configurations.find().fetch()
    }   

    data.state.userOAuth2Id = get(Meteor.user(), 'services.OAuth2Server.id');
    data.state.userData = EJSON.stringify(getUserData.get(), {indent: 2});
    data.state.patientData = EJSON.stringify(getPatientData.get(), {indent: 2});

    return data;
  }
  render(){
    let baseUrl = "http://localhost:3200/";
    let path = "_oauth/" + this.state.formData.serviceName;
    let oAuthPath = baseUrl + path;
    let serviceName = this.state.formData.serviceName;
    let accessToken = this.state.accessToken;
    let tableRows = [];
    let signInWiths = [];

    for (var i = 0; i < this.data.services.length; i++) {
        tableRows.push(
            <tr key={i} className="servicesRow" style={{cursor: "pointer"}}>

              <td className='service' style={{minWidth: '100px', paddingTop: '16px'}}>{this.data.services[i].service }</td>
              <td className='clientId' style={this.data.style.cell}>{this.data.services[i].clientId }</td>
              <td className='secret' style={this.data.style.cell}>{this.data.services[i].secret}</td>
              <td className='baseUrl' style={this.data.style.cell}>{this.data.services[i].baseUrl}</td>
              <td className='loginUrl' style={this.data.style.cell}>{this.data.services[i].loginUrl}</td>
              <td className='pluginStyle' style={this.data.style.cell}>{this.data.services[i].pluginStyle}</td>
            </tr>
            );
    }
    for (var j = 0; j < this.data.services.length; j++) {
        signInWiths.push(
            <div>
              <RaisedButton 
                label={ 'Sign in with ' + this.data.services[j].service } 
                id={ this.data.services[j].service + "Button" }
                primary={true}
                onClick={ this.signInWith.bind(this, this.data.services[j].service) }
                fullWidth
                />    
                <br />
                <br />
            </div>
        );
    }    

    return(
        
      <div id="OAuthClientPage">
        <VerticalCanvas >
           <GlassCard width='768px' zDepth={2} >
                <CardTitle
                    title='0.  Select a Service'

                />
                <CardText>
                    <Grid>
                        <Row>
                            <Col md={4}>
                                <TextField
                                    type="service"
                                    ref="service"
                                    name="service"
                                    floatingLabelText="Service Name"
                                    hintText="epic, facebook, google, twitter, OAuth2Server, etc"
                                    floatingLabelFixed={true}
                                    onChange={ this.editServiceName.bind(this, 'serviceName')}
                                    fullWidth
                                />      
                           </Col>
                        </Row>
                    </Grid>
                </CardText>
            </GlassCard>
            <DynamicSpacer />


          <GlassCard width='768px' zDepth={2}>

            <CardTitle
                title='1. Register the Client' />
            <CardText>
                <p>
                    If you operate the AuthenticationServer, you can add a client by directly editing it's database.  In a production environment, this entry would be generated by an admin console or a client API KeyRequestPage.  If you do not operate the resource owner, then you must contact the service in some way to get the keys.

                    Configure the ClientApplication by entering the ClientID in this form.  The AuthenticationServer will need the following Redirect URI:                    
                </p>
                <h3 style={{width: '100%', textAlign: 'center'}}>{oAuthPath}</h3>
            </CardText>
          </GlassCard>
        <DynamicSpacer />


          <GlassCard width='768px' zDepth={2} >
            <CardTitle
                title='2.  Configure The Client Application' 
                subtitle={<a href="https://github.com/meteor/meteor/wiki/OAuth-for-mobile-Meteor-clients#popup-versus-redirect-flow">OAuth for mobile Meteor clients</a>}
                />
            <CardText>
                    <Row>
                        <Col md={6}>
                            <TextField
                                type="text"
                                ref="serviceName"
                                name="akyKey"
                                floatingLabelText="Service Name"
                                floatingLabelFixed={true}
                                hintText="facebook, github, epic, etc."
                                onChange={ this.editServiceName.bind(this, 'serviceName')}
                                value={ this.state.formData.serviceName }
                                fullWidth
                            />       
                            <TextField
                                type="text"
                                ref="clientId"
                                name="akyKey"
                                floatingLabelText="API Key (ClientID)"
                                floatingLabelFixed={true}
                                hintText="clientApplication"
                                onChange={ this.editclientId.bind(this, 'clientId')}
                                fullWidth
                            />       

                            <TextField
                                type="text"
                                ref="secretKey"
                                name="secretKey"
                                floatingLabelText="Secret Key"
                                floatingLabelFixed={true}
                                hintText="12345"
                                onChange={ this.editSecretKey.bind(this, 'secretKey') }
                                fullWidth
                            />       
                            <br />
                            <br />
                            <Toggle
                                label="Popup"
                                ref="popup"
                                name="popup"
                                labelPosition="right"
                                defaultToggled={true}
                                onChange={ this.editPopup.bind(this, 'popup') }
                                style={{float: 'right'}}
                            />
                        </Col>
                        <Col md={6}>
                            <TextField
                                type="text"
                                ref="targetBaseUrl"
                                name="targetBaseUrl"
                                floatingLabelText="Target Base URL"
                                floatingLabelFixed={true}
                                hintText="http://localhost:3100"
                                onChange={ this.editTargetBaseUrl.bind(this, 'targetBaseUrl') }
                                fullWidth
                            />       
                            <TextField
                                type="text"
                                ref="targetLoginUrl"
                                name="targetLoginUrl"
                                floatingLabelText="Target Login URL"
                                floatingLabelFixed={true}
                                hintText="http://localhost:3100/oauth"
                                onChange={ this.editTargetLoginUrl.bind(this, 'targetLoginUrl') }
                                fullWidth
                            />       
                        </Col>
                    </Row>
                </CardText>
                <CardActions>
                    <FlatButton 
                            label="Save Configuration" 
                            id="saveConfigurationButton" 
                            onClick={ this.saveConfiguration.bind(this) }
                            primary={false} />
                    <FlatButton 
                        label="Reset service configuration" 
                        id="resetServiceConfigurationButton" 
                        primary={false} 
                        style={{float: 'right'}}
                        />

                </CardActions>
            </GlassCard>
            <DynamicSpacer />



            <GlassCard width='768px' zDepth={2} >
                <CardTitle
                    title='3.  Authorization Services'

                />
                <CardText>
                    <Table>
                        <thead>
                            <tr>
                                <th className='service' style={{minWidth: '100px'}}>service</th>
                                <th className='clientId' style={{minWidth: '100px'}}>clientId</th>
                                <th className='secret' style={{minWidth: '100px'}}>secret</th>
                                <th className='baseUrl' style={{minWidth: '100px'}}>baseUrl</th>
                                <th className='loginUrl' style={{minWidth: '100px'}}>loginUrl</th>
                                <th className='style' style={{minWidth: '100px'}}>style</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tableRows }
                        </tbody>
                    </Table>
                </CardText>
            </GlassCard>
            <DynamicSpacer />




            <GlassCard width='768px' zDepth={2} >
                <CardTitle
                    title='4.  Sign In'

                />
                <CardText>
                    <Grid>
                        <Row>
                            <Col md={4}>
                                <TextField
                                    type="username"
                                    ref="username"
                                    name="username"
                                    floatingLabelText="Username"
                                    hintText="janedoe"
                                    floatingLabelFixed={true}
                                    fullWidth
                                />      
                           </Col>
                            <Col md={4}>
                                <TextField
                                    type="password"
                                    ref="password"
                                    name="password"
                                    floatingLabelText="Password"
                                    hintText="********"
                                    floatingLabelFixed={true}
                                    fullWidth
                                />      
                            </Col>
                            <Col md={4}>
                                { signInWiths }
                            </Col>
                        </Row>
                    </Grid>
                </CardText>
            </GlassCard>
            <DynamicSpacer />


            <GlassCard width='768px' zDepth={2} >
                <CardTitle
                    title='5.  Access Token'
                    subtitle='The following button will scan a FHIR Server and autodetect and configure the OAuth connection, based on the FHIR conformance statement located at <code>/metadata</code>' />
                <CardText style={{textAlign: 'center'}}>
                    <h3 style={{width: '100%', textAlign: 'center'}}>{accessToken}</h3>
                </CardText>
            </GlassCard>
            <DynamicSpacer />



            <GlassCard width='768px' zDepth={2} >
                <CardTitle
                    title='6.  Autoscan FHIR Server'
                    subtitle='The following button will scan a FHIR Server and autodetect and configure the OAuth connection, based on the FHIR conformance statement located at <code>/metadata</code>' />
                <CardText>
                    <Grid>
                        <Row>
                            <Col md={6}>
                                <TextField
                                    type="text"
                                    ref="url"
                                    name="url"
                                    floatingLabelText="Url"
                                    hintText="https://open-ic.epic.com/argonaut/api/FHIR/Argonaut/"
                                    floatingLabelFixed={true}
                                    fullWidth
                                />      
                           </Col>
                            {/* <Col md={4}>
                                <TextField
                                    type="text"
                                    ref="secret"
                                    name="secret"
                                    floatingLabelText="Secret"
                                    hintText="918734-98svh8d9v-12ed-89vduhud"
                                    floatingLabelFixed={true}
                                    fullWidth
                                />      
                            </Col>
                            <Col md={2}>
                                <TextField
                                    type="text"
                                    ref="clientApplication"
                                    name="clientApplication"
                                    floatingLabelText="Client Application Name"
                                    hintText="ACME Health App"
                                    floatingLabelFixed={true}
                                    fullWidth
                                />      
                            </Col> */}
                        </Row>
                    </Grid>
                </CardText>
                <CardActions>
                    <FlatButton 
                        label="Autoscan" 
                        id="autoscanButton" 
                        onClick={ this.autoscan.bind(this) }
                        primary={false} />
                </CardActions>
            </GlassCard>
            <DynamicSpacer />








            <GlassCard width='768px' zDepth={2} >
                <CardTitle
                    title='7.  Search Patients'
                    subtitle='The following will search the FHIR server using the REST protocol with an OAuth access token.' />
                <CardText> 
                    <Grid>
                        <Row>
                            <Col md={6}>
                                <TextField
                                    type="text"
                                    ref="name"
                                    name="name"
                                    floatingLabelText="Full Name"
                                    hintText="Jane Doe"
                                    floatingLabelFixed={true}
                                    fullWidth
                                />      
                            </Col>
                            <Col md={2}>
                              <TextField
                                    type="text"
                                    ref="birthdate"
                                    name="birthdate"
                                    floatingLabelText="Birthdate"
                                    hintText="1960-01-01"
                                    floatingLabelFixed={true}
                                    fullWidth
                                />    
                            </Col>                            
                            <Col md={2}>
                                <TextField
                                    type="text"
                                    ref="gender"
                                    name="gender"
                                    floatingLabelText="Gender"
                                    hintText="female"
                                    floatingLabelFixed={true}
                                    fullWidth
                                />      
                            </Col>
                            <Col md={2}>
                                <TextField
                                    type="text"
                                    ref="identifier"
                                    name="identifier"
                                    floatingLabelText="Identifier"
                                    hintText="12345"
                                    floatingLabelFixed={true}
                                    fullWidth
                                />      
                            </Col>                              
                        </Row>
                        <Row>
                            <Col md={3}>
                                <TextField
                                    type="text"
                                    ref="given"
                                    name="given"
                                    floatingLabelText="Given"
                                    hintText="Jane"
                                    floatingLabelFixed={true}
                                    fullWidth
                                />      
                            </Col>
                            <Col md={3}>
                                <TextField
                                    type="text"
                                    ref="family"
                                    name="family"
                                    floatingLabelText="Family"
                                    hintText="Doe"
                                    floatingLabelFixed={true}
                                    fullWidth
                                />      
                            </Col>
                        
                        </Row>
                    </Grid>


                </CardText>
                <CardActions>
                  <FlatButton 
                        label="Search" 
                        id="searchButton" 
                        primary={false} />
                </CardActions>
          </GlassCard>
          <DynamicSpacer />

          <GlassCard width='768px' zDepth={2} >
            <CardTitle
                title='8.  Data!' />
            <CardText>
                    Lorem ipsum...    
            </CardText>
          </GlassCard>
          <DynamicSpacer />
          <DynamicSpacer />
        </VerticalCanvas>
      </div>
    );
  }
  
  editServiceName(field, event, value){
    //console.log('editclientId', value)
    var newFormData = this.state.formData;
    newFormData.serviceName = value;

    this.setState({
        'formData': newFormData
    });
  }
  editclientId(field, event, value){
    //console.log('editclientId', value)
    var newFormData = this.state.formData;
    newFormData.clientId = value;

    this.setState({
        'formData': newFormData
    });
  }
  editSecretKey(field, event, value){
    //console.log('editSecretKey', value)

    var newFormData = this.state.formData;
    newFormData.secretKey = value;
    
    this.setState({
        'formData': newFormData
    });
  }
  editTargetBaseUrl(field, event, value){
    //console.log('editTargetBaseUrl', value)

    var newFormData = this.state.formData;
    newFormData.targetBaseUrl = value;
    
    this.setState({
        'formData': newFormData
    });
  }
  editTargetLoginUrl(field, event, value){
    //console.log('editTargetLoginUrl', value)

    var newFormData = this.state.formData;
    newFormData.targetLoginUrl = value;
    
    this.setState({
        'formData': newFormData
    });
  }
  editPopup(field, event, value){
    //console.log('editPopup - ß', value)
    
    var newFormData = this.state.formData;
    newFormData.popup = value;
    
    this.setState({
        'formData': newFormData
    });
  }
  
  changeState(field, event, value){
    const formData = this.state.formData;
    formData[field] = value;
    this.setState({
        formData: formData
    });
  }
  
  saveConfiguration(){
    console.log('saveConfiguration', this.state);

    Meteor.call('configureOauthService', this.state.formData);
  }
  autoscan(){
      console.log('autoscan')
      var self = this;

      HTTP.get('https://open-ic.epic.com/Argonaut/api/FHIR/Argonaut/metadata', function(error, result){
          if(error){
              console.log('error', error)
          }
          if(result){
              console.log(result.content);
              self.setState({
                autoscan: result.content
              })
          }
      })
  }
  signInWith(service){
    console.log('signInWith', service)
    var options = {
          requestPermissions: [
            'OBSERVATION.READ', 
            'OBSERVATION.SEARCH', 
            'PATIENT.READ', 
            'PATIENT.SEARCH', 
            'PRACTITIONER.READ', 
            'PRACTITIONER.SEARCH'
          ]
        }

    OAuth2.requestCredential(
        options, 
        Accounts.oauth.credentialRequestCompleteHandler(function(){
            console.log('foo?')
        })
    );

    
    // Meteor.loginWithFhirVault({requestPermissions: [ 'email' ]}, function(err){
    //     if(!err) {
    //         Router.go('/');
    //     } else {
    //         console.log(err)
    //     }
        
    // });

  }
  resetServiceConfiguration(){
    console.log('resetServiceConfiguration')
  }
  searchPatients(){
    console.log('searchPatients')
  }
}




/**
 * Determine if a user originates from an oauth2 login.
 * @param user
 * @returns {*}
 */
function isOAuth2User(user) {
    return get(user, 'services.OAuth2Server');
  }
  
/**
 * Get the user access token if it exists.
 * @returns {*}
 */
function getUserAccessToken() {
    var user = Meteor.user();

    if (!isOAuth2User(user)) {
        return;
    }

    return user.services.OAuth2Server.accessToken;
}


ReactMixin(OAuthClientPage.prototype, ReactMeteorData);
export default OAuthClientPage;
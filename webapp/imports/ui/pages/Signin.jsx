import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { MobilePadding } from '/imports/ui/components/MobilePadding';
import RaisedButton from 'material-ui/RaisedButton';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import TextField from 'material-ui/TextField';

import { VerticalCanvas, Theme } from 'meteor/clinical:glass-ui';

import { browserHistory } from 'react-router';
import { Row, Col } from 'react-bootstrap';

import { lightBaseTheme, darkBaseTheme } from 'material-ui/styles';
import { has, get } from 'lodash';

export class Signin extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        textColor: {
          color: lightBaseTheme.palette.textColor
        },
        inputStyle: {
          color: lightBaseTheme.palette.textColor
        },
        errorStyle: {
          color: lightBaseTheme.palette.accent1Color
        },
        hintStyle: {
          color: lightBaseTheme.palette.secondaryTextColor
        },
        underlineStyle: {
          borderColor: lightBaseTheme.palette.textColor
        },
        floatingLabelStyle: {
          color: lightBaseTheme.palette.secondaryTextColor
        },
        floatingLabelFocusStyle: {
          color: lightBaseTheme.palette.secondaryTextColor
        }
      }
    };

    if (get(Meteor, 'settings.theme.darkroomTextEnabled')) {
      data.style.textColor.color = darkBaseTheme.palette.textColor;
      data.style.inputStyle.color = darkBaseTheme.palette.textColor;
      data.style.errorStyle.color = darkBaseTheme.palette.accent1Color;
      data.style.hintStyle.color = darkBaseTheme.palette.secondaryTextColor;
      data.style.underlineStyle.color = darkBaseTheme.palette.textColor;
      data.style.floatingLabelStyle.color = darkBaseTheme.palette.secondaryTextColor;
      data.style.floatingLabelFocusStyle.color = darkBaseTheme.palette.secondaryTextColor;
    }

    if(process.env.NODE_ENV === "test") console.log("Signin[data]", data);
    return data;
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  forgotPasswordRoute(){
    browserHistory.push('/recover-password');
  }
  handleTouchTap(){
    if(process.env.NODE_ENV === "test") console.log("this", this);
    let self = this;

    Meteor.loginWithPassword(
      this.refs.emailAddress.input.value,
      this.refs.password.input.value,
    function(error) {
      if (error) {
        Bert.alert(error.reason, 'warning');
      } else {
        Bert.alert('Logged in!', 'success');

        // we might have received a custom path to route to
        // depending on which signin component we used
        if (self.props.state && self.props.state.nextPathname) {
          browserHistory.push(location.state.nextPathname);
        } else {
          // but normally we just use the default route specified in settings.json
          if(get(Meteor, 'settings.public.defaults.route')){
            browserHistory.push(get(Meteor, 'settings.public.defaults.route', '/'));
          } else {
            // and fall back to the root if not specified
            browserHistory.push('/');      
          }          
        }
      }
    });
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleTouchTap(e);
    }
  }
  render() {
    return (
      <div id="signinPage">
        <MobilePadding>
          <VerticalCanvas>
            <h4 className="page-header" style={this.data.style.underlineStyle}>Sign In</h4>
            <form ref="signin" className="signin" >
              <Row>
                <Col xs={ 6 } sm={ 6 }>
                  <TextField
                    type="email"
                    ref="emailAddress"
                    name="emailAddress"
                    floatingLabelText="Email Address"
                    onKeyPress={this.handleKeyPress.bind(this)}
                    inputStyle={this.data.style.inputStyle}
                    hintStyle={this.data.style.hintStyle}
                    errorStyle={this.data.style.errorStyle}
                    underlineStyle={this.data.style.underlineStyle}
                    floatingLabelStyle={this.data.style.floatingLabelStyle}
                    floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                    fullWidth
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={ 6 } sm={ 6 }>
                  <TextField
                    type="password"
                    ref="password"
                    name="password"
                    floatingLabelText="Password"
                    onKeyPress={this.handleKeyPress.bind(this)}
                    inputStyle={this.data.style.inputStyle}
                    hintStyle={this.data.style.hintStyle}
                    errorStyle={this.data.style.errorStyle}
                    underlineStyle={this.data.style.underlineStyle}
                    floatingLabelStyle={this.data.style.floatingLabelStyle}
                    floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                    fullWidth
                  />
                </Col>
              </Row>
              <br/>
              <br/>
              <br/>
              <br/>
              <RaisedButton id="signinButton" onTouchTap={this.handleTouchTap.bind(this)} label="Signin" primary={true} />
              <RaisedButton id="forgotPasswordButton" onTouchTap={this.forgotPasswordRoute } label="Forgot password?" style={{marginLeft: "20px"}} />
            </form>

          </VerticalCanvas>
        </MobilePadding>
      </div>
    );
  }
}
ReactMixin(Signin.prototype, ReactMeteorData);

export default Signin;
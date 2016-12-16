import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';
import { MobilePadding } from '/imports/ui/components/MobilePadding';

import { browserHistory } from 'react-router';

import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import RaisedButton from 'material-ui/RaisedButton';
import { lightBaseTheme, darkBaseTheme } from 'material-ui/styles';

export class Login extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        textColor: {
          color: darkBaseTheme.palette.textColor
        },
        inputStyle: {
          color: darkBaseTheme.palette.textColor
        },
        errorStyle: {
          color: darkBaseTheme.palette.accent1Color
        },
        hintStyle: {
          color: darkBaseTheme.palette.secondaryTextColor
        },
        underlineStyle: {
          borderColor: darkBaseTheme.palette.secondaryTextColor
        },
        floatingLabelStyle: {
          color: darkBaseTheme.palette.secondaryTextColor
        },
        floatingLabelFocusStyle: {
          color: darkBaseTheme.palette.secondaryTextColor
        }
      }
    };
    if (Meteor.settings && Meteor.settings.theme && Meteor.settings.theme.darkroomTextEnabled ) {
      data.style.textColor.color = lightBaseTheme.palette.textColor;
      data.style.inputStyle.color = lightBaseTheme.palette.textColor;
      data.style.errorStyle.color = lightBaseTheme.palette.accent1Color;
      data.style.hintStyle.color = lightBaseTheme.palette.secondaryTextColor;
      data.style.underlineStyle.color = lightBaseTheme.palette.secondaryTextColor;
      data.style.floatingLabelStyle.color = lightBaseTheme.palette.secondaryTextColor;
      data.style.floatingLabelFocusStyle.color = lightBaseTheme.palette.secondaryTextColor;
    }

    if(process.env.NODE_ENV === "test") console.log("Login[data]", data);

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
    (error) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
      } else {
        Bert.alert('Logged in!', 'success');

        if (self.props.state && self.props.state.nextPathname) {
          browserHistory.push(location.state.nextPathname);
        } else {
          browserHistory.push('/');
        }
      }
    });
  }
  render() {
    return (
      <div id="loginPage">
        <MobilePadding>
          <PhoneContainer>
            <h4 className="page-header" style={this.data.style.textColor}>Login</h4>
            <form ref="login" className="login">
              <TextField
                type="email"
                ref="emailAddress"
                name="emailAddress"
                placeholder="Email Address"
                inputStyle={this.data.style.inputStyle}
                hintStyle={this.data.style.hintStyle}
                errorStyle={this.data.style.errorStyle}
                underlineFocusStyle={this.data.style.underlineFocusStyle}
                floatingLabelStyle={this.data.style.floatingLabelStyle}
                floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
              />
              <br/>
              <TextField
                type="password"
                ref="password"
                name="password"
                placeholder="Password"
                inputStyle={this.data.style.inputStyle}
                hintStyle={this.data.style.hintStyle}
                errorStyle={this.data.style.errorStyle}
                underlineFocusStyle={this.data.style.underlineFocusStyle}
                floatingLabelStyle={this.data.style.floatingLabelStyle}
                floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
              />
              <br/>
              <RaisedButton id="loginButton" onTouchTap={this.handleTouchTap.bind(this)} label="Login" primary={true} />
              <RaisedButton id="forgotPasswordButton" onTouchTap={this.forgotPasswordRoute } label="Forgot password?" style={{marginLeft: "20px"}} />
            </form>

          </PhoneContainer>
        </MobilePadding>
      </div>
    );
  }
}
ReactMixin(Login.prototype, ReactMeteorData);

import { darkBaseTheme, lightBaseTheme } from 'material-ui/styles';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

// In order of precedence:

// 1. Theme stored in a user's profile
// 2. Meteor.settings.theme.darkroomTextEnabled
// 3. Meteor.settings.theme.palette
// 4. System defaults

export default Theme = {
  palette: function(style){
    if (!style) {
      style = {};
    }

    if (Meteor.settings && Meteor.settings.theme && Meteor.settings.theme.darkroomTextEnabled ) {

      style.textColor = {
        color: lightBaseTheme.palette.textColor
      };
      style.inputStyle = {
        color : lightBaseTheme.palette.textColor
      };
      style.errorStyle = {
        color : lightBaseTheme.palette.accent1Color
      };
      style.hintStyle = {
        color : lightBaseTheme.palette.textColor
      };
      style.underlineStyle = {
        color : lightBaseTheme.palette.secondaryTextColor
      };
      style.floatingLabelStyle = {
        color : lightBaseTheme.palette.textColor
      };
      style.floatingLabelFocusStyle = {
        color : lightBaseTheme.palette.textColor
      };
    } else {
      style.textColor = {
        color : darkBaseTheme.palette.textColor
      };
      style.inputStyle = {
        color : darkBaseTheme.palette.textColor
      };
      style.errorStyle = {
        color : darkBaseTheme.palette.accent1Color
      };
      style.hintStyle = {
        color : darkBaseTheme.palette.textColor
      };
      style.underlineStyle = {
        borderColor : darkBaseTheme.palette.secondaryTextColor
      };
      style.floatingLabelStyle = {
        color : darkBaseTheme.palette.textColor
      };
      style.floatingLabelFocusStyle = {
        color : darkBaseTheme.palette.textColor
      };
    }

    return style;
  }
};

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { lightBaseTheme, darkBaseTheme } from 'material-ui/styles';

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
        color : lightBaseTheme.palette.secondaryTextColor
      };
      style.underlineStyle = {
        color : lightBaseTheme.palette.secondaryTextColor
      };
      style.floatingLabelStyle = {
        color : lightBaseTheme.palette.secondaryTextColor
      };
      style.floatingLabelFocusStyle = {
        color : lightBaseTheme.palette.secondaryTextColor
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
        color : darkBaseTheme.palette.secondaryTextColor
      };
      style.underlineStyle = {
        borderColor : darkBaseTheme.palette.secondaryTextColor
      };
      style.floatingLabelStyle = {
        color : darkBaseTheme.palette.secondaryTextColor
      };
      style.floatingLabelFocusStyle = {
        color : darkBaseTheme.palette.secondaryTextColor
      };
    }

    return style;
  }
};

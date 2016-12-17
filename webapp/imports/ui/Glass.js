import { Session } from 'meteor/session';

export default Glass = {
  getOpacity: function(){
    return Session.get('globalOpacity');
  },
  setOpacity: function(opacity){
    return Session.set('globalOpacity', opacity);
  },
  blur: function(style){
    if (style) {
      if (Session.get('glassBlurEnabled')) {
        style.filter = 'blur(3px)';
        style.webkitFilter = 'blur(3px)';
      }
    }
    return style;
  },
  backgroundBlur: function(style){
    if (style) {
      if (Session.get('backgroundBlurEnabled')) {
        style.backdropFilter = 'blur(5px)';
      }
    }
    return style;
  },
  darkroom: function(style){
    if (style) {
      if (Session.get('darkroomEnabled')) {
        style.color = 'black';
        style.background = 'white';
      } else {
        style.color = 'white';
        style.background = 'black';
      }
    }
    return style;
  }
};

import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Tabs, Tab } from 'material-ui/Tabs';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { DynamicSpacer }  from '/imports/ui/components/DynamicSpacer';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { Meteor } from 'meteor/meteor';
import Glass from '/imports/ui/Glass';

Session.setDefault('snipPageTabIndex', 1);
Session.setDefault('snipSearchFilter', '');
Session.setDefault('selectedSnip', false);


export class GenomePage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      state: {
        isLoggedIn: false
      },
      tabIndex: Session.get('snipPageTabIndex'),
      snipSearchFilter: Session.get('snipSearchFilter'),
      currentSnip: Session.get('selectedSnip')
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("GenomePage[data]", data);
    return data;
  }

  // this could be a mixin
  handleTabChange(index){
    Session.set('snipPageTabIndex', index); }

  // this could be a mixin
  onNewTab(){
    console.log("onNewTab; we should clear things...");

    Session.set('selectedSnip', false);
    Session.set('snipDetailState', false);
  }

  render() {
    return (
      <div id="genomePage"> <VerticalCanvas>
          <GlassCard>


          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}



ReactMixin(GenomePage.prototype, ReactMeteorData);

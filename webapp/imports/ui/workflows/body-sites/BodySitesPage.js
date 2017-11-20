import { CardText, CardTitle } from 'material-ui/Card';
import { Tab, Tabs } from 'material-ui/Tabs';

import BodySiteDetail from '/imports/ui/workflows/body-sites/BodySiteDetail';
import BodySiteTable from '/imports/ui/workflows/body-sites/BodySitesTable';
import Glass from '/imports/ui/Glass';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

Session.setDefault('bodySitePageTabIndex', 1); Session.setDefault('bodySiteSearchFilter', ''); Session.setDefault('selectedBodySite', false);


export class BodySitesPage extends React.Component {
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
      tabIndex: Session.get('bodySitePageTabIndex'),
      bodySiteSearchFilter: Session.get('bodySiteSearchFilter'),
      currentBodySite: Session.get('selectedBodySite')
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("BodySitesPage[data]", data);
    return data;
  }

  handleTabChange(index){
    Session.set('bodySitePageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedBodySite', false);
    Session.set('bodySiteUpsert', false);
  }

  render() {
    return (
      <div id="bodySitesPage"> <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle
              title="BodySites"
            />
            <CardText>
              <Tabs id="bodySitesPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}> <Tab className="newBodySiteTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0} >
                  <BodySiteDetail id='newBodySite' />
                </Tab>
                <Tab className="bodySiteListTab" label='BodySites' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                  <BodySiteTable />
                </Tab>
                <Tab className="bodySiteDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                  <BodySiteDetail id='bodySiteDetails' />
                </Tab>
              </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}



ReactMixin(BodySitesPage.prototype, ReactMeteorData);

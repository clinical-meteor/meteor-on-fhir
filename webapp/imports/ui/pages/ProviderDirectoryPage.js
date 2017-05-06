import { CardMedia, CardText, CardTitle } from 'material-ui/Card';

import Glass from '/imports/ui/Glass';
import { GlassCard } from '/imports/ui/components/GlassCard';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import Spacer from '/imports/ui/components/Spacer';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { browserHistory } from 'react-router';

export class ProviderDirectoryPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      style: {
        cards: {
          media: {
            // minHeight: '340px',
            maxHeight: '340px'
          },
          practitioners: {
            cursor: 'pointer',
            // minHeight: '340px',
            maxHeight: '340px'
          },
          organizations: {
            cursor: 'pointer',
            // minHeight: '340px',
            maxHeight: '340px'
          },
          locations: {
            cursor: 'pointer',
            // minHeight: '340px',
            maxHeight: '340px'
          }
        },
        inactiveIndexCard: {
          opacity: .5,
          width: '100%',
          display: 'inline-block',
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingBottom: '20px'
        },
        tile: {
          width: '100%',
          display: 'inline-block',
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingBottom: '20px'
        },
        spacer: {
          display: 'block'
        },
        title: Glass.darkroom(),
        subtitle: Glass.darkroom()
      },
      user: {
        isAdmin: false,
        isPractitioner: false,
        isPatient: true
      },
      counts: {
        practitioners: 0,
        locations: 0,
        organizations: 0
      },
      organizations: {
        // image: "/pages/provider-directory/" + Random.choice(["organizations.jpg", "organizations2.jpg", "organizations3.jpg", "organizations4.jpg", "organizations5.jpg"])
        image: "/pages/provider-directory/organizations.jpg"
      }
    };

    var latestStats = Statistics.getLatest();
    if(latestStats && latestStats.counts){
      data.counts = latestStats.counts;
    }

    data.style.indexCard = Glass.darkroom(data.style.indexCard);

    let user = Meteor.user();
    if (user && user.roles) {
      user.roles.forEach(function(role){
        if (role === "sysadmin") {
          data.user.isAdmin = true;
        } else if (role === "practitioner") {
          data.user.isPractitioner = true;
        } else if (role === "patient") {
          data.user.isPatient = true;
        }
      });
    }

    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.app && Meteor.settings.public.app.showUnderConstruction) {
      data.showUnderConstruction = Meteor.settings.public.app.showUnderConstruction;
    }
    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.app && Meteor.settings.public.app.showExperimental) {
      data.showExperimental = Meteor.settings.public.app.showExperimental;
    }


    if (Session.get('appWidth') < 768) {
      // data.style.indexCardPadding.width = '100%';
      // data.style.indexCardPadding.marginBottom = '10px';
      // data.style.indexCardPadding.paddingBottom = '10px';
      // data.style.indexCardPadding.paddingLeft = '0px';
      // data.style.indexCardPadding.paddingRight = '0px';

      data.style.inactiveIndexCard.width = '100%';
      data.style.inactiveIndexCard.marginBottom = '10px';
      data.style.inactiveIndexCard.paddingBottom = '10px';
      data.style.inactiveIndexCard.paddingLeft = '0px';
      data.style.inactiveIndexCard.paddingRight = '0px';

      data.style.spacer.display = 'none';
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);

    if(process.env.NODE_ENV === "test") console.log("ProviderDirectoryPage[data]", data);
    return data;
  }
  render() {
    return (
      <div id='indexPage'>
        <VerticalCanvas>


          {this.renderPractitioners(this.data.user)}
          {this.renderOrganizations(this.data.user)}
          {this.renderLocations(this.data.user)}

        </VerticalCanvas>
      </div>
    );
  }



  renderPractitioners(user){
    if (Meteor.settings.public.modules.fhir.Practitioners) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id="practitionersTile" style={this.data.style.tile} onClick={ this.openLink.bind(this, '/practitioners') } >
            <GlassCard style={this.data.style.cards.organizations}>              
              <CardMedia
                mediaStyle={this.data.style.cards.media}
                style={this.data.style.cards.media}
                overlayContainerStyle={{height: '100%'}}
                overlay={<CardTitle
                    title={this.data.counts.practitioners + ' Practitioners'} 
                    subtitle='Browse practitioners in system.'
                  />}
                >
                <img src="/pages/provider-directory/practitioners.jpg" />
              </CardMedia>
            </GlassCard>
          </div>
        );
      }
    }
  }

  renderOrganizations(user){
    if (Meteor.settings.public.modules.fhir.Organizations) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='organizationsTile' style={this.data.style.tile} onClick={ this.openLink.bind(this, '/organizations') } >
            <GlassCard style={this.data.style.cards.organizations}>
              <CardMedia
                mediaStyle={this.data.style.cards.media}
                style={this.data.style.cards.media}
                overlayContainerStyle={{height: '100%'}}
                overlay={<CardTitle
                    title={this.data.counts.organizations + ' Organizations'} 
                    subtitle='Browse practitioners in system.'
                  />}
                >
                <img src={this.data.organizations.image} />
              </CardMedia>
            </GlassCard>
          </div>
        );
      }
    }
  }
  renderLocations(user){
    if (Meteor.settings.public.modules.fhir.Organizations) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id="locationsTile" style={this.data.style.tile} onClick={ this.openLink.bind(this, '/locations') } >
            <GlassCard  style={this.data.style.cards.locations}>
              <CardMedia
                mediaStyle={this.data.style.cards.media}
                style={this.data.style.cards.media}
                overlayContainerStyle={{height: '100%'}}
                overlayStyle={{height: '100%'}}
                overlay={<CardTitle
                    title={this.data.counts.locations + ' Locations'} 
                    subtitle='Browse practitioners in system.'
                  />}
                >
                <img src="/pages/provider-directory/locations.jpg" />
              </CardMedia>
            </GlassCard>
          </div>
        );
      }
    }
  }


  openLink(url){
    console.log("openLink", url);
    browserHistory.push(url);
  }
}




ProviderDirectoryPage.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(ProviderDirectoryPage.prototype, ReactMeteorData);
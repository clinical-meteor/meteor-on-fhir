import { CardMedia, CardText, CardTitle, CardHeader } from 'material-ui/Card';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';

import { get, has } from 'lodash';

import { Session } from 'meteor/session';





export class HelloWorldPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {

    let imgHeight = (Session.get('appHeight') - 210) / 3;

    let data = {
      style: {
        page: {},
        coverImg: {
          maxWidth: 'inherit',
          maxHeight: 'inherit',
          height: 'inherit'
        },
        cards: {
          media: {
            height: (imgHeight - 1) + 'px',
            overflowY: 'hidden',
            objectFit: 'cover'
          },
          practitioners: {
            cursor: 'pointescale-downr',
            height: imgHeight + 'px',
            overflowY: 'hidden',
            objectFit: 'cover'
          },
          organizations: {
            cursor: 'pointer',
            height: imgHeight + 'px',
            overflowY: 'hidden',
            objectFit: 'cover'
          },
          locations: {
            cursor: 'pointer',
            height: imgHeight + 'px',
            overflowY: 'hidden',
            objectFit: 'cover'
          }
        },
        inactiveIndexCard: {
          opacity: .5,
          width: '100%',
          display: 'inline-block',
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingBottom: '0px'
        },
        tile: {
          width: '100%',
          display: 'inline-block',
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingBottom: '0px',
          marginBottom: '20px',
          height: imgHeight + 'px'
        },
        spacer: {
          display: 'block'
        },
        title: Glass.darkroom(),
        subtitle: Glass.darkroom()
      },
      organizations: {
        image: "/pages/provider-directory/organizations.jpg"
      }
    };

    data.style.indexCard = Glass.darkroom(data.style.indexCard);

    if (Session.get('appWidth') < 768) {
      data.style.inactiveIndexCard.width = '100%';
      data.style.inactiveIndexCard.marginBottom = '10px';
      data.style.inactiveIndexCard.paddingBottom = '10px';
      data.style.inactiveIndexCard.paddingLeft = '0px';
      data.style.inactiveIndexCard.paddingRight = '0px';

      data.style.spacer.display = 'none';
    }

    if(Session.get('appHeight') > 1200){
      data.style.page = {
        top: '50%',
        transform: 'translateY(-50%)',
        position: 'relative'
      }
    }

    if(process.env.NODE_ENV === "test") console.log("HelloWorldPage[data]", data);
    return data;
  }
  render() {

    return (
      <div id='indexPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle 
              title="Ideogram- Build Your Own Module" 
              subtitle="IMPORT THE IDEOGRAM: Welcome to Meteor on FHIR!  A web framework for building HIPAA secure, FDA ready, and EHR ready applications."
              style={{fontSize: '100%'}} />
            <CardText style={{fontSize: '100%'}}>
             
              <h4>Features</h4>
              <ul>
                <li>Private plugins for your intellectual property datasets, use cases, algorithms</li>              
                <li>Compile to Phones, Tablets, Web, TV, and VideoWalls</li>              
                <li>Fast Healthcare Interoperability Resources (HL7 FHIR) data interoperability layer</li>
                <li>Library of FHIR widgets to build your workflow with.</li>              
                <li>Designed for continuous integration testing and FDA precertification</li>
                <li>Desgined with HIPAA scale out strategy</li>              
                <li>Ready to go to market with Epic, Cerner, and Apple App Stores, or as SaaS or local deploy</li>              
                <li>Open source community base (MIT/GPL) with licensable premium plugins</li>              
                <li>Supports dashboards, advanced visualizations, and real time graphs.</li>              
                <li>Augmented reality interface, with geomapping and camera support for A/R health apps.</li>              
                <li>Themable and brandable</li>              
                <li>Designed by bioinformatics students at UChicago.</li>              
              </ul>
              <br />

              <h4>Getting Started</h4>
              <ul>
                <li>
                  <a href="https://guide.meteor.com/" >Meteor Guide (Tutorials)</a>                              
                </li>                              
                <li>
                  <a href="https://guide.meteor.com/" >Meteor Guide (Tutorials)</a>                              
                </li>                              
                <li>
                  <a href="https://github.com/clinical-meteor/meteor-on-fhir" >Meteor on FHIR Source Code (Github)</a>                              
                </li>              
                <li>
                  <a href="https://github.com/clinical-meteor/software-development-kit/blob/master/cookbook/creating.a.symptomatic.plugin.md" >Creating a Plugin</a>                              
                </li>              
                <li>
                  <a href="https://github.com/clinical-meteor/example-plugin" >Example Plugin</a>                              
                </li>              
                <li>
                  <a href="https://github.com/clinical-meteor" >Clinical Meteor (GitHub)</a>                              
                </li>              
                <li>
                  <a href="https://clinical.meteorapp.com" >Clinical Meteor - Release Track Homepage</a>                              
                </li>              
                <li>
                  <a href="https://github.com/clinical-meteor/software-development-kit" >Clinical Meteor - Software Development Kit</a>                              
                </li>              
                <li>
                  <a href="https://www.hl7.org/fhir/resourcelist.html" >FHIR Resource List (Healthcare API)</a>                              
                </li>              
              </ul> 
              <br />

              <h4>Getting Help</h4>
              <ul>
                <li>
                  <a href="https://github.com/clinical-meteor/meteor-on-fhir/issues" >File a Technical Issue or Bug</a>                              
                </li>              
                <li>
                  <a href="https://www.meetup.com/Javascript-Healthcare-Hackathons/" >Chicago Javascript Healthcare Hackathons</a>
                </li>              
                <li>
                  <a href="http://forums.meteor.com" >Meteor Support Forums</a>
                </li>              
                <li>
                  <a href="http://chat.fhir.org" >FHIR Chat</a>
                </li>              
                <li>
                  <a href="http://http://community.fhir.org/" >FHIR Community Forum</a>
                </li>              
              </ul> 
                                         

            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }




  openLink(url){
    console.log("openLink", url);
    browserHistory.push(url);
  }
}



ReactMixin(HelloWorldPage.prototype, ReactMeteorData);

export default HelloWorldPage;
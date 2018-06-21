import { CardMedia, CardText, CardTitle, CardHeader } from 'material-ui/Card';
import { GlassCard, VerticalCanvas, FullPageCanvas, Glass } from 'meteor/clinical:glass-ui';
import { Col, Grid, Row } from 'react-bootstrap';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';

import { get, has } from 'lodash';

import { Session } from 'meteor/session';



export class SamplePage extends React.Component {
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

    if(process.env.NODE_ENV === "test") console.log("SamplePage[data]", data);
    return data;
  }
  render() {

    return (
      <div id='indexPage'>
        <FullPageCanvas>
          <GlassCard height='auto' >
            <CardTitle 
              title="Rethink what healthcare software can be."
              titleStyle={{fontSize: '240%'}}
              subtitleStyle={{fontSize: '180%'}}
              />
            <CardText style={{fontSize: '180%'}}>
            <Grid fluid style={{marginTop: '40px', marginBottom: '80px'}}>
            
              <Row>
              <Col md={6} style={{textAlign:'justified', paddingLeft: '20px', paddingRight: '30px'}}>
                  <h2>Javascript Healthcare Hackathons</h2>
                  <a href="https://www.meetup.com/Javascript-Healthcare-Hackathons/" >meetup.com/Javascript-Healthcare-Hackathons</a>
                  <p>
                    Thursdays from 5pm till 8pm at the Polsky Center.  Check the meetup page for changes in times and places.
                  </p>
                  <br/>
                  <br/>
                  <h2>HL7 FHIR & Connectathons</h2>
                  <a href="http://chat.fhir.org" >chat.fhir.org</a>
                  <p>
                    Online community help for data modeling and designing your app so it can connect to electronic health systems systems.
                  </p>                              
                  <br/>
                  <br/>
                  <h2>Community Videoconference</h2>
                  <a href="meet.google.com/nww-bhbm-gfq" >meet.google.com/nww-bhbm-gfq</a>
                  <p>
                    Weekly community videocall.  Tuesdays at 10am Central Time.   
                  </p>
                  <br/>
                  <br/>
                  <h2>Premium Features, Licensing, Investing, & Joint Ventures</h2>
                  <a href="www.symptomatic.io" >www.symptomatic.io</a><br/>
                  <a href="www.symptomatic.io" >contact@symptomatic.io</a>
                </Col>
                <Col md={6} style={{textAlign:'justified', paddingLeft: '30px', paddingRight: '20px'}} >
                  <h2>Clinical Meteor</h2>
                  <a href="https://github.com/clinical-meteor" >clinical.meteorapp.com</a>                              
                  <p>
                    A release distro of the Meteor.js web framework, customized to be HIPAA secure, integrate with EHRs, and ready for FDA precertification. 
                  </p>   
                  <br/>
                  <br/>
                  <h2>Meteor on FHIR</h2>
                  <a href="https://github.com/clinical-meteor/meteor-on-fhir/issues" >github.com/clinical-meteor/meteor-on-fhir</a>                              
                  <p>
                    The Meteor on FHIR Interface Engine and Router.  The community version of our software, for you to hack and build on.                   </p>   
                  <br/>
                  <br/>
                  <h2>Issue Tracking</h2>
                  <a href="https://github.com/clinical-meteor/meteor-on-fhir/issues" >github.com/clinical-meteor/meteor-on-fhir/issues</a>                              
                  <p>
                    Found a bug?  Want to suggest a feature?  File an issue!  
                  </p>     
                </Col>
              </Row>
            </Grid>
              {/* <ul>
                <li>Private plugins for your intellectual property datasets, use cases, algorithms</li>              
                <li>Compile to Phones, Tablets, Web, TV, and VideoWalls</li>              
                <li>Fast Healthcare Interoperability Resources (HL7 FHIR) data interoperability layer</li>
                <li>Library of FHIR widgets to build your workflow with.</li>              
                <li>Supported Blockchains:  Ethereum, Bigchain, PokitDok, Hyperledger, IPFS</li>
                <li>FDA precertification ready with continuous validatoin & verification testing</li>
                <li>HIPAA Ready with Business Associate Agreements (BAA)</li>              
                <li>Ready to go to market with Epic, Cerner, and Apple App Stores, or as SaaS or local deploy</li>              
                <li>Open source community base (MIT/GPL) with licensable premium plugins</li>              
                <li>Dashboards, advanced visualizations, and real time graphs.</li>              
                <li>Augmented reality interface, with geomapping and camera support for A/R health apps.</li>              
                <li>Themable and brandable</li>              
                <li>Designed by bioinformatics students at UChicago.</li>              
              </ul> */}
              <img src="/orbital.png" style={{ right: '40px', position: 'absolute', width: '20%', bottom: '100px', width: '200px'}} /> 
            </CardText>
          </GlassCard>
        </FullPageCanvas>
      </div>
    );
  }




  openLink(url){
    console.log("openLink", url);
    browserHistory.push(url);
  }
}



ReactMixin(SamplePage.prototype, ReactMeteorData);

export default SamplePage;
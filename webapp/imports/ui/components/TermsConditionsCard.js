import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardTitle, CardText, CardHeader } from 'material-ui/Card';
import { Link } from 'react-router';
import { Table } from 'react-bootstrap';

import LinearProgress from 'material-ui/LinearProgress';
import {orange500, blue500} from 'material-ui/styles/colors';


export class TermsConditionsCard extends React.Component {
  constructor(props) {
    super(props);
  }
getMeteorData() {
  let data = {
    style: {
      page:{
        minHeight: '0px'
      }
    }
  };

  return data;
}

  render(){
    var style = {
      marketingImage: {
        width: '80%',
        position: 'relative',
        left: '10%'
      },
      sectionHeader: {
        borderTop: '1px solid lightgray',
        width: '100%'
      },
      page: {
        minHeight: '1024px'
      }
    };

    return (
      <div>
        <CardTitle
          title="End User License Agreement"
        />
         <CardText>
          <p>
            The End-User License Agreement (this "EULA") is a legal agreement between you ("Licenssee") and Symptomatic Systems ("Licensor"), the author of Symptomatic Continuity of Care Document Generator, including all HTML files, Javascript files, graphics, animations, data, technology, development tools, scripts and programs, both in object code and source code (the "Software"), the deliverables provided pursuant to this EULA, which may include associated media, printed materials, and "online" or electronic documentation.                
          </p>
          <p>
            By installing this Software, Licensee agrees to be bound by the terms and conditions set forth in this EULA.  If Licenseee does not agree to the terms and conditions set fourth in this EULA, then Licensee may not download, install, or use the Software.
          </p>
          <h4>1.  Grant of License</h4>

          <h5>A) Scope of License</h5> Subject ot the terms of this EULA, Licensor hereby grants to Licensee a royalty-free, non-exclusive license to possess and to use a copy of the Continuity of Care Document Builder for Mac, available via download from the Symptomatic.io website.              
          <h5>B) Installation and Use</h5>  Licensee may install and use a maximum of one (1) copies of the Software and make multiple back-up copies of the Software, solely for Licensee's personal use.                
          <h5>C) Reporudction and Distribution</h5>  Licensee may reproduce and distribute an .                
          <h4>2.  Description of Rights and Limitations</h4>
          <h4>3.  Title to Software</h4> Licensor represents and warrants that it has the legal right to enter into and perform its obligations under this EULA, and that use by the Licensee of the Software, in accordance with the terms of this EULA, will not infrince upon the intellectual property rights of any third parties.
          <h4>4.  Intellectual Property</h4> All now known or hereafter known tangible and intangible rights, title, interest, copyrights and moral rights in and to the Software, including but not limited to all images, photographs, animations, video, audio, music, text, data, computer code, algorithms, and information are owned by Licensor.  The Software is protected by all applicable copyright laws and international treaties.
          <h4>5.  No Support</h4> Licensor has no obligation to provide support services for the Software.
          <h4>6.  Duration</h4> 
          <h4>7.  Jurisdiction</h4> This EULA shall be deemed to have been made in, and shall be construed pursuant to the laws of the State of Illinois, without regard to conflicts of laws provisions thereof.  Any legal action or proceeding relating to this EULA shall be brought exclusively in courts located in Chicago, IL, and each party consents to the jurisdiction thereof.  The prevailing party in any action to enforce this EULA shall be entitled to recover costs and expenses including attorneys' fees.  This EULA is made with the exclusive jurisdiction of the United State, and its jurisdiction shall supersede any other jurisdiction of either party's election.
          <h4>8.  Non-Transferable</h4>  This EULA is not assignable or transferable by Licensee, and any attempt to do so would be void. 
          <h4>9.  Severability</h4> No failure to exercise, and no delay in exercising, on the part of either party, any priviledge, any power or any rights hereunder will operate as a waiver thereof, nor will any single or partial exercise of any right or power hereunder preclude further exercise of any other right hereunder.  If any provision of this EULA shall be adjudged by any court of competent jurisdiction to be unenforceable or invalid, that provision shall be limited or eliminated ot the minimum extent necessary so that this EULA shall otherwise remain in full force and effect and enforceable.
          <h4>10.  WARRANTY DISCLAIMER</h4> LICENSOR, AND AUTHOR OF THE SOFTWARE, HEREBY EXPRESSLY DISCLAIM ANY WARRANTY FOR THE SOFTWARE.  THE SOFTWARE AND ANY RELATED DOCUMENTATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.  LICENSSEE ACCEPTS ANY AND ALL RISK ARISING OUT OF USE OR PERFORMANCE OF THE SOFTWARE.
          <h4>11.  LIMITATION OF LIABILITY</h4>  LICENSOR SHALL NOT BE LIABLE TO LINCENSEE, OR ANY OTHER PERSON OR ENTITY CLAIMING THROUGH LICENSEE ANY LOSS OF PROFITS, INCOME, SAVINGS, OR ANY OTHER CONSEQUENTIAL, INCIDENTAL, SPECIAL, PUNITIVE, DIRECT OR INDIRECT DAMAGE, WHETHER ARISING IN CONTRACT, TORT, WARRANTY, OR OTHERWISE.  THESE LIMITATIONS SHALL APPLY REGARDLESS OF THE ESSENTIAL PURPOSE OF ANY LIMITED REMEDY.  UNDER NO CIRCUMSTANCES SHALL LICENSOR'S AGGREGATE LIABILITY TO LICENSEE, OR ANY OTHER PERSON OR ENTITY CLAIMING THROUGH LICENSEE, EXCEED THE FINANCIAL AMOUNT ACTUALLY PAID BY LICENSEE TO LICENSOR FOR THE SOFTWARE. 
          <h4>12.  Entire Agreement</h4>  This EULA consitutes the entire agreement between Licensor and Licensee and supersedes all prior understandings of Licensor and Licensee, including any prior representation, statement, condition, or warranty with respect to the subject matter of this EULA. 


         </CardText>
      </div>
    );
  }
}
ReactMixin(TermsConditionsCard.prototype, ReactMeteorData);
export default TermsConditionsCard;
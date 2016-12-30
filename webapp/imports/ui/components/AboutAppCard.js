import React from 'react';
import { CardTitle, CardText, CardHeader } from 'material-ui/Card';
import { Link } from 'react-router';
import { Table } from 'react-bootstrap';

import LinearProgress from 'material-ui/LinearProgress';
import {orange500, blue500} from 'material-ui/styles/colors';


export class AboutAppCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <CardTitle
          title="About This App"
        />
         <CardText>
         For my Masters of Science in Biomedical Informatics, one of my electives is Healthcare Interoperability. So I decided to write a FHIR Interface Engine using the Meteor javascript framework.
         <br /><br />

         The technical infrastructure uses MongoDB (a modern hierarchical database, similar to the MUMPS/Cache database what Epic uses), a full-stack isomorphic javascript framework called Meteor, and Facebook's user interface layer React.
         <br /><br />


          FHIR (pronounced as 'fire') refers to the Fast Healthcare Interoperability Resourse standard devopled by Health Level Seven International (HL7), a 35 year old organization that promotes interoperability between healthcare systems.
          <br /><br />

           <h5 style={{borderTop: '1px solid lightgray', width: '100%'}}>Progress</h5><br />

           We've implemented SimpleSchemas for 40 of the 100 defined FHIR Resources, including complete coverage of the ~20 resources that are supported by both Epic and Cerner.  Additionally, we have user interface implemented for 6 of those 17 commonly shared resources.  And we've completed Sprint 2 of the Argonaut Project.  We're also excited to announce that we are currently going into production at one facility, and are working on interoperability testing with the major EMR vendors.

           <br /><br />

           <b>FHIR Resource Schemas</b>
           <LinearProgress mode="determinate" value={40} max={100} color={orange500} />
           <br /><br />

           <b>Epic/Cerner Compatibility</b>
           <LinearProgress mode="determinate" value={20} max={20} color={orange500} />
           <br /><br />

           <b>Epic/Cerner User Interface</b>
           <LinearProgress mode="determinate" value={6} max={20} color={orange500} />
           <br /><br />

           <b>Argonaut</b>
           <LinearProgress mode="determinate" value={2} max={6} color={orange500} />
           <br /><br />



           <h5 style={{borderTop: '1px solid lightgray', width: '100%'}}>Keybindings</h5><br />

           The following keybindings are supported (with many more to come).
           <Table responses hover >
             <tbody>
               <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                 <td>ctrl+cmd+n</td>
                 <td>Hide/Show Navbars</td>
               </tr>
               <tr className='themingRow' style={{cursor: 'pointer'}} >
                 <td>ctrl+cmd+t</td>
                 <td>Theming Controls</td>
               </tr>
               <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                 <td>ctrl+cmd+b</td>
                 <td>Left Offset</td>
               </tr>
               <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                 <td>ctrl+cmd+m</td>
                 <td>Card Spacing</td>
               </tr>
               <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                 <td>ctrl+cmd+p</td>
                 <td>Page Top/Bottom Spacing</td>
               </tr>
               <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                 <td>ctrl+cmd+c</td>
                 <td>Display as Card</td>
               </tr>
               <tr className='keybindingRow' style={{cursor: 'pointer'}} >
                 <td>ctrl+cmd+4</td>
                 <td>Meta/Context Sidebar</td>
               </tr>
             </tbody>
           </Table>

           <h5 style={{borderTop: '1px solid lightgray', width: '100%'}}>Get the Code</h5><br />
           <Link to='http://github.com/clinical-meteor/meteor-on-fhir'>http://github.com/clinical-meteor/meteor-on-fhir</Link>
           <br /><br />

           <h5 style={{borderTop: '1px solid lightgray', width: '100%'}}>Licensing</h5><br />
             This software contains media assets which are licensed directly to Abigail Watson, and therefore may not be redistributed under MIT.  In general, feel free to copy the software itself, and modify it and use it for your own use.  When doing so, swap out all media assets.<br/>
             <CardHeader
               avatar="https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAKeAAAAJDJkM2RmNTMzLWI4OGUtNDZmOC1iNTliLWYwOTc1ZWM0YmIyZg.jpg"
               title="Abigail Watson"
               subtitle="Artistic License 2.0"
               href="http://www.meteor.com"
             />
         </CardText>

      </div>
    );
  }
}

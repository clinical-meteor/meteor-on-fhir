import React from 'react';
import { CardTitle, CardText } from 'react-toolbox/lib/card';
import { Link } from 'react-router';
import { Table } from 'react-bootstrap';

export class AboutAppCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <CardTitle
          title="About This Forum"
        />
         <CardText>
          This is the third major iteration of this bulletin-board-system; having been called 'Groupthink' and 'Clinical Support Forum' in past iterations.  Originally conceived as a modern interpretation of BBEdit written in Meteor.js, the intent behind this software has been to bring a forum software to the Meteor ecosystem, and to 'eat our own dogfood'.  This is a forum for Meteor devs who want to hack on their own forum software.  Along the way, the forum has been heavily influenced by WordPress and Discourse, and is now on it's way to becoming it's own thing.
          <br /><br />
          FHIR (pronounced as 'fire') refers to the Fast Healthcare Interoperability Resourse standard devopled by Health Level Seven International (HL7), a 35 year old organization that promotes interoperability between healthcare systems. FHIR is somewhat comparable in scope to GraphQL.  Meteor on FHIR stands at the intersection of the Meteor community and FHIR community, and is intended to be a forum to promote the general development of healthcare apps using full-stack Javascript.  The maintainers of the Meteor on FHIR Forum are bioinformatists and clinicians working in the healthcare industry and accademia.
          <br /><br />

          Version 4 will probably be released under a different brand name and MIT license compatible media assets.  In the time being, this forum software is simply known as the "Meteor on FHIR Forum", and available only under the Artistic License 2.0.
          <br /><br />

           <h5 style={{borderTop: '1px solid lightgray', width: '100%'}}>Version</h5><br />
           3.0
           <br /><br />

           <h5 style={{borderTop: '1px solid lightgray', width: '100%'}}>Keybindings</h5><br />
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
             </tbody>
           </Table>

           <h5 style={{borderTop: '1px solid lightgray', width: '100%'}}>Get the Code</h5><br />
           <Link to='http://github.com/clinical-meteor/meteor-on-fhir'>http://github.com/clinical-meteor/meteor-on-fhir</Link>
           <br /><br />

           <h5 style={{borderTop: '1px solid lightgray', width: '100%'}}>Licensing</h5><br />
             This software contains media assets which are licensed directly to Abigail Watson, and therefore may not be redistributed under MIT.  In general, feel free to copy the software itself, and modify it and use it for your own use; including commercial purposes.  When doing so, swap out all media assets and rebrand the forum under a different name.<br/>
             <CardTitle
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

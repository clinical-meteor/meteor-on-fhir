import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { CardTitle, CardText } from 'react-toolbox/lib/card';


import QuestionnaireResponseTable from '../workflows/questionnaires/QuestionnaireResponseTable';


export class QuestionnaireResponsesPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      }
    };

    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = "blur(5px)";
    }

    return data;
  }

  // // this could be a mixin
  // handleTabChange(index){
  //   let state = Session.get('patientCardState');
  //   state["index"] = index;
  //   Session.set('patientCardState', state);
  // }

  // // this could be a mixin
  // changeState(field, value){
  //   let state = Session.get('patientCardState');
  //   if(process.env.NODE_ENV === "test") console.log("this", this);
  //   if(process.env.NODE_ENV === "test") console.log("value", value);
  //
  //   state[field] = value;
  //   Session.set('patientCardState', state);
  // }

  // this could be a mixin
  onNewTab(){
    if(process.env.NODE_ENV === "test") console.log("onNewTab");

    Session.set('selectedPatient', false);
    Session.set('patientDetailState', false);
  }

  render() {
    return (
      <div id="documentsPage">
        <PageContainer>
          <GlassCard>
            <CardTitle
              title="Questionnaire Responses"
            />
            <CardText>
              <QuestionnaireResponseTable />
            </CardText>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


// QuestionnaireResponsesPage.propTypes = {
//   hasUser: React.PropTypes.object
// };
ReactMixin(QuestionnaireResponsesPage.prototype, ReactMeteorData);

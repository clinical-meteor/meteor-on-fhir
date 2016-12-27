import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Tabs, Tab } from 'material-ui/Tabs';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import QuestionnaireDetail from '/imports/ui/workflows/questionnaires/QuestionnaireDetail';
import QuestionnaireTable from '/imports/ui/workflows/questionnaires/QuestionnairesTable';
import { Meteor } from 'meteor/meteor';
import Glass from '/imports/ui/Glass';

Session.setDefault('questionnairePageTabIndex', 1); Session.setDefault('questionnaireSearchFilter', ''); Session.setDefault('selectedQuestionnaire', false);


export class QuestionnairesPage extends React.Component {
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
      tabIndex: Session.get('questionnairePageTabIndex'),
      questionnaireSearchFilter: Session.get('questionnaireSearchFilter'),
      currentQuestionnaire: Session.get('selectedQuestionnaire')
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("QuestionnairesPage[data]", data);
    return data;
  }

  handleTabChange(index){
    Session.set('questionnairePageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedQuestionnaire', false);
    Session.set('questionnaireUpsert', false);
  }

  render() {
    return (
      <div id="questionnairesPage"> <VerticalCanvas>
          <GlassCard>
            <CardTitle
              title="Questionnaires"
            />
            <CardText>
              <Tabs id="questionnairesPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}> <Tab className="newQuestionnaireTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0} >
                  <QuestionnaireDetail id='newQuestionnaire' />
                </Tab>
                <Tab className="questionnaireListTab" label='Questionnaires' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                  <QuestionnaireTable />
                </Tab>
                <Tab className="questionnaireDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                  <QuestionnaireDetail id='questionnaireDetails' />
                </Tab>
              </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}



ReactMixin(QuestionnairesPage.prototype, ReactMeteorData);

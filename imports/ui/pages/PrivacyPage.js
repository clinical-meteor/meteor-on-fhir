import React from 'react';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { PageContainer } from '/imports/ui/components/PageContainer';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

export class PrivacyPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    console.log("PrivacyPage");
  }

  render(){
    return(
      <div id="privacyPage">
        <PageContainer>
          <GlassCard>
            <CardTitle
              title="Privacy Policy"
            />
           <CardText>
           Lorem ipsum...
           </CardText>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


// PrivacyPage.propTypes = {
//   children: React.PropTypes.any
// };

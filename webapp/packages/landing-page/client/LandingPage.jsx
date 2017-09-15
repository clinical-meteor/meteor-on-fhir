import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import GlassCard from './GlassCard';
import React from 'react';
import VerticalCanvas from './VerticalCanvas';

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="LandingPage">
        <VerticalCanvas>
          <GlassCard>
            <CardText>
                Booooooo
            </CardText>
          </GlassCard>

          <br />
          <br />

          <GlassCard>
            <CardText>
                Foo
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
export default LandingPage;




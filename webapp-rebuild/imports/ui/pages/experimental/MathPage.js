//  documentation
//  https://www.npmjs.com/package/react-katex

import React from 'react';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { CardTitle, CardText } from 'material-ui/Card';

// var InlineMath = ReactKaTeX.InlineMath;
// var BlockMath = ReactKaTeX.BlockMath;

import { BlockMath } from 'react-katex';
import { InlineMath } from 'react-katex';


export class MathPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="mathPage">
        <VerticalCanvas >
          <GlassCard>
            <CardTitle>
              This is some inline text:  <InlineMath>(3\times 4) \div (5-3)</InlineMath>
              <br />
              <BlockMath>\int_0^\infty x^2 dx</BlockMath>
             </CardTitle>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

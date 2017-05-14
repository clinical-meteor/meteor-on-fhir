//import './App.css';

import { Hex, HexGrid, Hexagon, Layout, Path, Pattern, Text } from 'react-hexgrid';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import {FontAwesome} from 'react-fontawesome';
import { GlassCard } from '/imports/ui/components/GlassCard';
import React from 'react';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { browserHistory } from 'react-router';

var sharedStyles = {
  tile: {
    opacity: .5
  }
};

export class HexGridPage extends React.Component {
  constructor(props) {
    super(props);
    // let boardConfig = {
    //   width: '100%',
    //   height: '100%',
    //   layout: { width: 6, height: 6, flat: true, spacing: 1.1 },
    //   origin: { x: 0, y: 0 },
    //   map: 'hexagon',
    //   mapProps: [ 7 ]
    // };
    // let grid = HexGrid.generate(boardConfig);
    // this.state = { grid, config: boardConfig };

    this.state = {
      style: {
        tile: {
          opacity: .5
        }
      }
    };
  }
  openLink(url){
    console.log("openLink", url);
    browserHistory.push(url);
  }
  render(){
    //let { grid, config } = this.state;
    return(
      <div className="hexGridPage">
        <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
          {/* Grid with manually inserted hexagons */}
          <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
            <Hexagon q={0} r={0} s={0} />
            {/* Using pattern (defined below) to fill the hexagon */}
            <Hexagon q={0} r={-1} s={1} />
            <Hexagon q={0} r={1} s={-1} onClick={ this.openLink.bind(this, '/locations')} >
              <Text>Locations</Text>
            </Hexagon>
            <Hexagon q={1} r={-1} s={0} onClick={ this.openLink.bind(this, '/observations')} >
              <Text>Observations</Text>
            </Hexagon>
            <Hexagon q={1} r={0} s={-1} onClick={ this.openLink.bind(this, '/practitioners')}>
              <Text>Practitioners</Text>
            </Hexagon>
            {/* Pattern and text */}
            <Hexagon q={-1} r={1} s={0} onClick={ this.openLink.bind(this, '/medications')}>
              <Text>Medications</Text>
            </Hexagon>
            <Hexagon q={-1} r={0} s={1} onClick={ this.openLink.bind(this, '/organizations')}>
              <Text>Organizations</Text>
            </Hexagon>
            <Hexagon q={-2} r={0} s={1} onClick={ this.openLink.bind(this, '/patients')}>
              <Text>Patients</Text>
            </Hexagon>
            <Hexagon q={-2} r={2} s={0} onClick={ this.openLink.bind(this, '/checklists')}>
              <Text>Checklists</Text>
            </Hexagon>
            <Hexagon q={2} r={0} s={0} onClick={ this.openLink.bind(this, '/hipaa-log')}>
              <Text>Audit Log</Text>
            </Hexagon>
          </Layout>
          {/*<Pattern id="pat-1" link="http://cat-picture" />
          <Pattern id="pat-2" link="http://cat-picture2" />*/}
        </HexGrid>
      </div>
    );
  }
}

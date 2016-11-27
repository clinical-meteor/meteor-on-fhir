import React from 'react';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';

import { HexGrid } from 'react-hexgrid';

export class HexGridPage extends React.Component {
  constructor(props) {
    super(props);
    let boardConfig = {
      width: 800, height: 800,
      layout: { width: 10, height: 10, flat: true, spacing: 1.1 },
      origin: { x: 0, y: 0 },
      map: 'hexagon',
      mapProps: [ 2 ]
    };
    let grid = HexGrid.generate(boardConfig);
    this.state = { grid, config: boardConfig };
  }

  render(){
    let { grid, config } = this.state;
    return(
      <div id="hexGridPage">
        <PhoneContainer >
          <HexGrid
          width={config.width}
          height={config.height}
          hexagons={grid.hexagons}
          layout={grid.layout} />
        </PhoneContainer>
      </div>
    );
  }
}

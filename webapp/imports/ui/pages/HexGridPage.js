import React from 'react';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';

import { HexGrid } from 'react-hexgrid';

export class HexGridPage extends React.Component {
  constructor(props) {
    super(props);
    let boardConfig = {
      width: '100%',
      height: '100%',
      layout: { width: 6, height: 6, flat: true, spacing: 1.1 },
      origin: { x: 0, y: 0 },
      map: 'hexagon',
      mapProps: [ 7 ]
    };
    let grid = HexGrid.generate(boardConfig);
    this.state = { grid, config: boardConfig };
  }

  render(){
    let { grid, config } = this.state;
    return(
      <div id="hexGridPage">
        <HexGrid
        width={config.width}
        height={config.height}
        hexagons={grid.hexagons}
        layout={grid.layout} />
      </div>
    );
  }
}

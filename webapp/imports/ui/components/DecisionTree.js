//  Sensitivity and Specificity
//  https://en.wikipedia.org/wiki/Sensitivity_and_specificity
//  https://en.wikipedia.org/wiki/Pre-_and_post-test_probability

//  Note: This calculator currently doesn't calculate the number of significant digits correctly
//  and may produce results that are overly precise

import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardHeader, CardText, CardActions, CardTitle } from 'material-ui/Card';

import LinearProgress from 'material-ui/LinearProgress';
import {orange500, blue500} from 'material-ui/styles/colors';

import TextField from 'material-ui/TextField';

import Radium from 'radium';


export class DecisionTree extends React.Component {
  constructor(props) {
    super(props);
  }
  changeInput(variable, event, value){
    Session.set(variable, value);
  }

  getMeteorData() {
    let data = {
      flare: Session.get('flare')
    };

    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  };

  render(){
    return (
      <div>
        <VerticalCanvas>
          <GlassCard>
            <CardTitle
              title="Decision Tree"
            />
            <Tree flare={this.data.flare} />
          </GlassCard>
        </VerticalCanvas>


      </div>
    );
  }
}
ReactMixin(DecisionTree.prototype, ReactMeteorData);


//==============================================================================
export class Node extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <g transform={"translate(" + this.props.y + "," + this.props.x + ")"}>
        <circle r={this.props.hasChildren ? 3 : 1} />
        <text
          dx={this.props.hasChildren ? -8 : 8}
          dy={3}
          style={{"fontFamily": "Helvetica", "fontSize": "10px", "color": "red"}}
          textAnchor={this.props.hasChildren ? "end" : "start"}>
          {this.props.name}
        </text>
      </g>
    );
  }
}

//==============================================================================
export class Link extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    var diagonal = d3.svg.diagonal().projection(function (d) { return [d.y, d.x]; });

    return (
      <path d={diagonal(this.props.datum)} style={{ "fill": "none", "stroke": "darkgrey", "strokeWidth": ".4px"}}></path>
    );
  }
}



//==============================================================================

export class Tree extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    var svgWidth = 1024;
    var svgHeight = 768;
    var d3Tree = d3.layout.tree().size([svgHeight, svgWidth - 300]);
    var nodes = d3Tree.nodes(this.props.flare);
    var links = d3Tree.links(nodes);

    return treeState = {
      svgWidth: svgWidth,
      svgHeight: svgHeight,
      nodes: nodes,
      links: links
    };
  }
  drawLinks () {
    var links = this.data.links.map(function (link, index) {
		  console.log(link)
      return (<Link datum={link} key={index} />)
    })
    return (<g>
      {links}
    </g>)
  }
	drawNodes () {
    var nodes = this.data.nodes.map(function (node, index) {
      return (<Node
      	key={index}
				k={index}
      	hasChildren={node.children ? true : false}
      	name={node.name}
        x={node.x}
      	y={node.y}/>
      ) })
    return nodes;
  }
  render() {
	  return (
      <svg
        width={this.data.svgWidth}
        height={this.data.svgHeight}>
				<g transform={"translate(100,0)"}>
      {this.drawNodes()}
      {this.drawLinks()}
			</g>
      </svg>
    );
  }
}
ReactMixin(Tree.prototype, Radium);
ReactMixin(Tree.prototype, ReactMeteorData);



//==============================================================================

Session.set('flare', {
 "name": "flare",
 "children": [
  {
   "name": "analytics",
   "children": [
    {
     "name": "cluster",
     "children": [
      {"name": "AgglomerativeCluster", "size": 3938},
      {"name": "CommunityStructure", "size": 3812},
      {"name": "HierarchicalCluster", "size": 6714},
      {"name": "MergeEdge", "size": 743}
     ]
    },
    {
     "name": "graph",
     "children": [
      {"name": "BetweennessCentrality", "size": 3534},
      {"name": "LinkDistance", "size": 5731},
      {"name": "MaxFlowMinCut", "size": 7840},
      {"name": "ShortestPaths", "size": 5914},
      {"name": "SpanningTree", "size": 3416}
     ]
    },
    {
     "name": "optimization",
     "children": [
      {"name": "AspectRatioBanker", "size": 7074}
     ]
    }
   ]
  },
  {
   "name": "data",
   "children": [
    {
     "name": "converters",
     "children": [
      {"name": "Converters", "size": 721},
      {"name": "DelimitedTextConverter", "size": 4294},
      {"name": "GraphMLConverter", "size": 9800},
      {"name": "IDataConverter", "size": 1314},
      {"name": "JSONConverter", "size": 2220}
     ]
    },
    {"name": "DataField", "size": 1759},
    {"name": "DataSchema", "size": 2165},
    {"name": "DataSet", "size": 586},
    {"name": "DataSource", "size": 3331},
    {"name": "DataTable", "size": 772},
    {"name": "DataUtil", "size": 3322}
   ]
  }
 ]
})

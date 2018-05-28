// //  Sensitivity and Specificity
// //  https://en.wikipedia.org/wiki/Sensitivity_and_specificity
// //  https://en.wikipedia.org/wiki/Pre-_and_post-test_probability

// //  Note: This calculator currently doesn't calculate the number of significant digits correctly
// //  and may produce results that are overly precise

// import { Button, ButtonGroup } from 'react-bootstrap';
// import { CardActions, CardHeader, CardText, CardTitle, TextField, LinearProgress } from 'material-ui';
// import React, { Component, PropTypes } from 'react';
// import {blue500, orange500} from 'material-ui/styles/colors';
// import { bundle, radialLine } from 'd3-shape';

// import Radium from 'radium';
// import { ReactMeteorData } from 'meteor/react-meteor-data';
// import ReactMixin from 'react-mixin';

// import { VerticalCanvas, GlassCard } from 'meteor/clinical:glass-ui';

// export class EdgeBundlePage extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   changeInput(variable, event, value){
//     Session.set(variable, value);
//   }

//   getMeteorData() {
//     let data = {
//       flare: Session.get('flare'),
//       edgeBundle: Session.get('edgeBundle')
//     };

//     if(process.env.NODE_ENV === "test") console.log("data", data);
//     return data;
//   };

//   render(){
//     // stub
//     if(false){
//       return (
//         <Tree flare={this.data.flare} />
//       );
//     } else {
//       return (
//         <EdgeBundle id='edgeBundleGraph' flare={this.data.edgeBundle} />
//       );      
//     }
//   }
// }
// ReactMixin(EdgeBundlePage.prototype, ReactMeteorData);
// export default EdgeBundlePage;

// //==============================================================================
// export class Node extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render () {
//     return (
//       <g transform={"translate(" + this.props.y + "," + this.props.x + ")"}>
// {/*         <circle r={this.props.hasChildren ? 3 : 1} /> */}        
//         <circle r={3} />
//         <text
//           dx={this.props.hasChildren ? -8 : 8}
//           dy={3}
//           style={{"fontFamily": "Helvetica", "fontSize": "10px", "color": "red"}}
//           textAnchor={this.props.hasChildren ? "end" : "start"}>
//           {this.props.name}
//         </text>
//       </g>
//     );
//   }
// }

// //==============================================================================
// export class Link extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render () {
//     var diagonal = d3.svg.diagonal().projection(function (d) { return [d.y, d.x]; });

//     return (
//       <path d={diagonal(this.props.datum)} style={{ "fill": "none", "stroke": "darkgrey", "strokeWidth": "1px"}}></path>
//     );
//   }
// }



// //==============================================================================

// export class Tree extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   getMeteorData() {
//     var svgWidth = 1024;
//     var svgHeight = 768;
//     var d3Tree = d3.layout.tree().size([svgHeight, svgWidth - 300]);
//     var nodes = d3Tree.nodes(this.props.flare);
//     var links = d3Tree.links(nodes);

//     return treeState = {
//       svgWidth: svgWidth,
//       svgHeight: svgHeight,
//       nodes: nodes,
//       links: links
//     };
//   }
//   drawLinks () {
//     var links = this.data.links.map(function (link, index) {
// 		  console.log(link)
//       return (<Link datum={link} key={index} />)
//     })
//     return (<g>
//       {links}
//     </g>)
//   }
// 	drawNodes () {
//     var nodes = this.data.nodes.map(function (node, index) {
//       return (<Node
//       	key={index}
// 				k={index}
//       	hasChildren={node.children ? true : false}
//       	name={node.name}
//         x={node.x}
//       	y={node.y}/>
//       ) })
//     return nodes;
//   }
//   render() {
// 	  return (
//       <svg
//         width={this.data.svgWidth}
//         height={this.data.svgHeight}>
// 				<g transform={"translate(100,0)"}>
//       {this.drawNodes()}
//       {this.drawLinks()}
// 			</g>
//       </svg>
//     );
//   }
// }
// ReactMixin(Tree.prototype, Radium);
// ReactMixin(Tree.prototype, ReactMeteorData);


// //==============================================================================

// export class EdgeBundle extends Component {
//   constructor() {
//     super();
//     this.state = {
//       tension: 0.85,
//       rotationPlus: 0,
//       activeNode: '',
//       size: 1000,
//       lines: [],
//       nodes: [],
//     };
//   }
//   getMeteorData() {
//     var result = {
//       tension: 0.85,
//       rotationPlus: 0,
//       activeNode: '',
//       size: 1000,
//       lines: [],
//       nodes: [],
//     };

//     return result;
//   }
//   componentDidMount() {
//     // prepare some things before the rendering starts...

//     const { size } = this.state;
//     const radius = size / 2;
//     const innerRadius = radius * 0.75;

//     const myBundle = d3.layout.bundle(); // shamelessly d3.v3
//     const cluster = d3.layout.cluster() // and again, d3.v3
//       .size([360, innerRadius])
//       .sort(null)
//       .value(d => d.size);

//     const nodes = cluster.nodes(packageHierarchy(classes))
//       .filter(n => !n.children);
//     const links = packageImports(nodes);

//     const lines = myBundle(links);

//     lines.map(l => {
//       l.source = l[0]; // UGLY
//       l.target = l[l.length - 1]; // UGLY
//     });

//     this.cdmSetState(lines, nodes);
//   }

//   cdmSetState(lines, nodes) {
//     this.setState({
//       lines,
//       nodes,
//     });
//   }

//   render() {
//     const { tension, activeNode, size, lines, nodes, rotationPlus } = this.state;
//     const radius = size / 2;
//     const lineGenerator = radialLine()
//       .curve(bundle, tension)
//       .radius(d => d.y)
//       .angle(d => (rotationPlus + d.x) / 180 * Math.PI);

//     const tensionButtons = [];
//     const tensions = [0.25, 0.5, 0.75, 0.85, 1];
//     tensions.map(t => {
//       const style = (t === tension ? 'primary' : 'default');
//       tensionButtons.push(
//         <Button
//           key={'tBtn' + t}
//           bsSize={"xsmall"}
//           bsStyle={style}
//           onClick={() => { this.setState({ tension: t }); }}>
//           {t}
//         </Button>);
//     });

//     const rotationButtons = [];
//     const rotations = [0, 45, 90, 180, 270];
//     rotations.map(r => {
//       const style = (r === rotationPlus ? 'primary' : 'default');
//       rotationButtons.push(
//         <Button
//           key={'rBtn' + r}
//           bsSize={"xsmall"}
//           bsStyle={style}
//           onClick={() => { this.setState({ rotationPlus: r }); }}>
//           {r}
//         </Button>);
//     });

//     const sources = new Set();
//     const targets = new Set();

//     return (<div>
//       <CardTitle 
//         title='FHIR Interfaces along Blockchain Network'
//       />

//       Tension: <ButtonGroup>
//       {tensionButtons}
//     </ButtonGroup>
//       <br/>
//       Rotation: <ButtonGroup>{rotationButtons}</ButtonGroup>
//       <hr/>
//       <svg width={size} height={size}>
//         <g transform={'translate(' + radius + ', ' + radius + ')'}>
//           <g>
//             {lines.map((l, i) => {
//               let classy = 'link';
//               if (l.source.name === activeNode) {
//                 targets.add(l.target.name);
//                 classy += ' link--source';
//               } else if (l.target.name === activeNode) {
//                 sources.add(l.source.name);
//                 classy += ' link--target';
//               }
//               return (<LinkPath key={'path' + i}
//                                 classy={classy}
//                                 tension={tension}
//                                 rotationPlus={rotationPlus}
//                                 l={l}
//                                 lineGenerator={lineGenerator}/>);
//             })}
//           </g>
//           <g>
//             {nodes.map((n, i) => {
//               let classy = 'node';
//               if (sources.has(n.name)) {
//                 classy += ' node--source';
//               }
//               if (targets.has(n.name)) {
//                 classy += ' node--target';
//               }
//               return (
//                 <NodeElement key={'txt' + i}
//                              n={n}
//                              classy={classy}
//                              rotationPlus={rotationPlus}
//                              onMouseOver={() => { this.setState({ activeNode: n.name }); }}
//                              onMouseOut={() => { this.setState({ activeNode: '' }); }}
//                 />);
//             })}
//           </g>
//         </g>
//       </svg>
//     </div>);
//   }
// }
// ReactMixin(EdgeBundle.prototype, Radium);
// ReactMixin(EdgeBundle.prototype, ReactMeteorData);



// export class LinkPath extends Component {
//   shouldComponentUpdate(nextProps) {
//     return (nextProps.classy !== 'link' ||
//     this.props.classy !== 'link' ||
//     this.props.tension !== nextProps.tension ||
//     this.props.rotationPlus !== nextProps.rotationPlus);
//   }

//   render() {
//     const { l, lineGenerator, classy } = this.props;
//     return (<path
//       className={classy}
//       d={lineGenerator(l)}/>);
//   }
// }

// LinkPath.propTypes = {
//   classy: PropTypes.string,
//   l: PropTypes.array,
//   lineGenerator: PropTypes.func,
//   rotationPlus: PropTypes.number,
//   tension: PropTypes.number,
// };

// export class NodeElement extends Component {
//   shouldComponentUpdate(nextProps) {
//     return (nextProps.classy !== 'node' ||
//     this.props.classy !== 'node' ||
//     this.props.rotationPlus !== nextProps.rotationPlus);
//   }

//   render() {
//     const { n, onMouseOver, onMouseOut, classy, rotationPlus } = this.props;

//     return (<text
//       className={classy}
//       transform={'rotate(' + (n.x + rotationPlus - 90) + ')translate(' +
//                  (n.y + 8) + ',0)' + ((n.x + rotationPlus) % 360 < 180 ? '' : 'rotate(180)')}
//       dy={'.31em'}
//       textAnchor={(n.x + rotationPlus) % 360 < 180 ? 'start' : 'end'}
//       onMouseOver={() => onMouseOver({ activeNode: n.name })}
//       onMouseOut={() => onMouseOut({ activeNode: '' })}
//     >
//       {n.key}
//     </text>);
//   }
// }

// NodeElement.propTypes = {
//   classy: PropTypes.string,
//   n: PropTypes.object,
//   onMouseOver: PropTypes.func,
//   onMouseOut: PropTypes.func,
//   rotationPlus: PropTypes.number,
// };

// // Lazily construct the package hierarchy from class names.
// function packageHierarchy(classes) {
//   var map = {};

//   function find(name, data) {
//     var node = map[name], i;
//     if (!node) {
//       node = map[name] = data || {name: name, children: []};
//       if (name.length) {
//         node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
//         node.parent.children.push(node);
//         node.key = name.substring(i + 1);
//       }
//     }
//     return node;
//   }

//   classes.forEach(function(d) {
//     find(d.name, d);
//   });

//   return map[""];
// }

// // Return a list of imports for the given array of nodes.
// function packageImports(nodes) {
//   var map = {},
//       imports = [];

//   // Compute a map from name to node.
//   nodes.forEach(function(d) {
//     map[d.name] = d;
//   });

//   // For each import, construct a link from the source to target node.
//   nodes.forEach(function(d) {
//     if (d.imports) d.imports.forEach(function(i) {
//       imports.push({source: map[d.name], target: map[i]});
//     });
//   });

//   return imports;
// }



// //==============================================================================
// // Decision Tree Dataset

// Session.set('flare', {
//  "name": "flare",
//  "children": [
//   {
//    "name": "analytics",
//    "children": [
//     {
//      "name": "cluster",
//      "children": [
//       {"name": "AgglomerativeCluster", "size": 3938},
//       {"name": "CommunityStructure", "size": 3812},
//       {"name": "HierarchicalCluster", "size": 6714},
//       {"name": "MergeEdge", "size": 743}
//      ]
//     },
//     {
//      "name": "graph",
//      "children": [
//       {"name": "BetweennessCentrality", "size": 3534},
//       {"name": "LinkDistance", "size": 5731},
//       {"name": "MaxFlowMinCut", "size": 7840},
//       {"name": "ShortestPaths", "size": 5914},
//       {"name": "SpanningTree", "size": 3416}
//      ]
//     },
//     {
//      "name": "optimization",
//      "children": [
//       {"name": "AspectRatioBanker", "size": 7074}
//      ]
//     }
//    ]
//   },
//   {
//    "name": "data",
//    "children": [
//     {
//      "name": "converters",
//      "children": [
//       {"name": "Converters", "size": 721},
//       {"name": "DelimitedTextConverter", "size": 4294},
//       {"name": "GraphMLConverter", "size": 9800},
//       {"name": "IDataConverter", "size": 1314},
//       {"name": "JSONConverter", "size": 2220}
//      ]
//     },
//     {"name": "DataField", "size": 1759},
//     {"name": "DataSchema", "size": 2165},
//     {"name": "DataSet", "size": 586},
//     {"name": "DataSource", "size": 3331},
//     {"name": "DataTable", "size": 772},
//     {"name": "DataUtil", "size": 3322}
//    ]
//   }
//  ]
// });





// //==============================================================================
// // Edge Bundle Dataset (Original)
// const original = [
// {"name":"flare.analytics.cluster.AgglomerativeCluster","size":3938,"imports":["flare.animate.Transitioner","flare.vis.data.DataList","flare.util.math.IMatrix","flare.analytics.cluster.MergeEdge","flare.analytics.cluster.HierarchicalCluster","flare.vis.data.Data"]},
// {"name":"flare.analytics.cluster.CommunityStructure","size":3812,"imports":["flare.analytics.cluster.HierarchicalCluster","flare.animate.Transitioner","flare.vis.data.DataList","flare.analytics.cluster.MergeEdge","flare.util.math.IMatrix"]},
// {"name":"flare.analytics.cluster.HierarchicalCluster","size":6714,"imports":["flare.vis.data.EdgeSprite","flare.vis.data.NodeSprite","flare.vis.data.DataList","flare.vis.data.Tree","flare.util.Arrays","flare.analytics.cluster.MergeEdge","flare.util.Sort","flare.vis.operator.Operator","flare.util.Property","flare.vis.data.Data"]},
// {"name":"flare.analytics.cluster.MergeEdge","size":743,"imports":[]},
// {"name":"flare.analytics.graph.BetweennessCentrality","size":3534,"imports":["flare.animate.Transitioner","flare.vis.data.NodeSprite","flare.vis.data.DataList","flare.util.Arrays","flare.vis.data.Data","flare.util.Property","flare.vis.operator.Operator"]},
// {"name":"flare.analytics.graph.LinkDistance","size":5731,"imports":["flare.animate.Transitioner","flare.vis.data.NodeSprite","flare.vis.data.EdgeSprite","flare.analytics.graph.ShortestPaths","flare.vis.data.Data","flare.util.Property","flare.vis.operator.Operator"]},
// {"name":"flare.analytics.graph.MaxFlowMinCut","size":7840,"imports":["flare.animate.Transitioner","flare.vis.data.NodeSprite","flare.vis.data.EdgeSprite","flare.vis.data.Data","flare.util.Property","flare.vis.operator.Operator"]},
// {"name":"flare.analytics.graph.ShortestPaths","size":5914,"imports":["flare.vis.data.EdgeSprite","flare.vis.data.NodeSprite","flare.animate.Transitioner","flare.vis.operator.Operator","flare.util.heap.HeapNode","flare.util.heap.FibonacciHeap","flare.util.Property","flare.vis.data.Data"]},
// {"name":"flare.analytics.graph.SpanningTree","size":3416,"imports":["flare.animate.Transitioner","flare.vis.data.NodeSprite","flare.vis.operator.IOperator","flare.vis.Visualization","flare.vis.data.TreeBuilder","flare.vis.operator.Operator"]},
// {"name":"flare.analytics.optimization.AspectRatioBanker","size":7074,"imports":["flare.animate.Transitioner","flare.util.Arrays","flare.vis.data.DataSprite","flare.scale.Scale","flare.vis.axis.CartesianAxes","flare.vis.Visualization","flare.util.Property","flare.vis.operator.Operator"]},
// {"name":"flare.animate.Easing","size":17010,"imports":["flare.animate.Transition"]},
// {"name":"flare.animate.FunctionSequence","size":5842,"imports":["flare.util.Maths","flare.animate.Transition","flare.util.Arrays","flare.animate.Sequence","flare.animate.Transitioner"]},
// {"name":"flare.animate.interpolate.ArrayInterpolator","size":1983,"imports":["flare.util.Arrays","flare.animate.interpolate.Interpolator"]},
// {"name":"flare.animate.interpolate.ColorInterpolator","size":2047,"imports":["flare.animate.interpolate.Interpolator"]},
// {"name":"flare.animate.interpolate.DateInterpolator","size":1375,"imports":["flare.animate.interpolate.Interpolator"]},
// {"name":"flare.animate.interpolate.Interpolator","size":8746,"imports":["flare.animate.interpolate.NumberInterpolator","flare.animate.interpolate.ColorInterpolator","flare.animate.interpolate.PointInterpolator","flare.animate.interpolate.ObjectInterpolator","flare.animate.interpolate.MatrixInterpolator","flare.animate.interpolate.RectangleInterpolator","flare.animate.interpolate.DateInterpolator","flare.util.Property","flare.animate.interpolate.ArrayInterpolator"]},
// {"name":"flare.animate.interpolate.MatrixInterpolator","size":2202,"imports":["flare.animate.interpolate.Interpolator"]},
// {"name":"flare.animate.interpolate.NumberInterpolator","size":1382,"imports":["flare.animate.interpolate.Interpolator"]},
// {"name":"flare.animate.interpolate.ObjectInterpolator","size":1629,"imports":["flare.animate.interpolate.Interpolator"]},
// {"name":"flare.animate.interpolate.PointInterpolator","size":1675,"imports":["flare.animate.interpolate.Interpolator"]},
// {"name":"flare.animate.interpolate.RectangleInterpolator","size":2042,"imports":["flare.animate.interpolate.Interpolator"]},
// {"name":"flare.animate.ISchedulable","size":1041,"imports":["flare.animate.Scheduler"]},
// {"name":"flare.animate.Parallel","size":5176,"imports":["flare.animate.Easing","flare.animate.Transition","flare.util.Arrays"]},
// {"name":"flare.animate.Pause","size":449,"imports":["flare.animate.Transition"]},
// {"name":"flare.animate.Scheduler","size":5593,"imports":["flare.animate.ISchedulable","flare.animate.Pause","flare.animate.Transition"]},
// {"name":"flare.animate.Sequence","size":5534,"imports":["flare.animate.Easing","flare.util.Maths","flare.animate.Transition","flare.util.Arrays"]},
// {"name":"flare.animate.Transition","size":9201,"imports":["flare.animate.Transitioner","flare.animate.TransitionEvent","flare.animate.Scheduler","flare.animate.Pause","flare.animate.Parallel","flare.animate.Easing","flare.animate.Sequence","flare.animate.ISchedulable","flare.util.Maths","flare.animate.Tween"]},
// {"name":"flare.animate.Transitioner","size":19975,"imports":["flare.util.IValueProxy","flare.animate.Parallel","flare.animate.Easing","flare.animate.Sequence","flare.animate.Transition","flare.animate.Tween","flare.util.Property"]},
// {"name":"flare.animate.TransitionEvent","size":1116,"imports":["flare.animate.Transition"]},
// {"name":"flare.animate.Tween","size":6006,"imports":["flare.animate.Transitioner","flare.animate.Transition","flare.animate.interpolate.Interpolator","flare.util.Property"]},
// {"name":"flare.data.converters.Converters","size":721,"imports":["flare.data.converters.IDataConverter","flare.data.converters.GraphMLConverter","flare.data.converters.JSONConverter","flare.data.converters.DelimitedTextConverter"]},
// {"name":"flare.data.converters.DelimitedTextConverter","size":4294,"imports":["flare.data.DataSet","flare.data.DataUtil","flare.data.DataTable","flare.data.converters.IDataConverter","flare.data.DataSchema","flare.data.DataField"]},
// {"name":"flare.data.converters.GraphMLConverter","size":9800,"imports":["flare.data.DataSet","flare.data.DataUtil","flare.data.DataTable","flare.data.converters.IDataConverter","flare.data.DataSchema","flare.data.DataField"]},
// {"name":"flare.data.converters.IDataConverter","size":1314,"imports":["flare.data.DataSet","flare.data.DataSchema"]},
// {"name":"flare.data.converters.JSONConverter","size":2220,"imports":["flare.data.DataSet","flare.data.DataUtil","flare.data.DataTable","flare.data.converters.IDataConverter","flare.data.DataSchema","flare.data.DataField","flare.util.Property"]},
// {"name":"flare.data.DataField","size":1759,"imports":["flare.data.DataUtil"]},
// {"name":"flare.data.DataSchema","size":2165,"imports":["flare.data.DataField","flare.util.Arrays"]},
// {"name":"flare.data.DataSet","size":586,"imports":["flare.data.DataTable"]},
// {"name":"flare.data.DataSource","size":3331,"imports":["flare.data.converters.IDataConverter","flare.data.converters.Converters","flare.data.DataSchema"]},
// {"name":"flare.data.DataTable","size":772,"imports":["flare.data.DataSchema"]},
// {"name":"flare.data.DataUtil","size":3322,"imports":["flare.data.DataField","flare.data.DataSchema"]},
// {"name":"flare.display.DirtySprite","size":8833,"imports":[]},
// {"name":"flare.display.LineSprite","size":1732,"imports":["flare.display.DirtySprite"]},
// {"name":"flare.display.RectSprite","size":3623,"imports":["flare.util.Colors","flare.display.DirtySprite"]},
// {"name":"flare.display.TextSprite","size":10066,"imports":["flare.display.DirtySprite"]},
// {"name":"flare.flex.FlareVis","size":4116,"imports":["flare.display.DirtySprite","flare.data.DataSet","flare.vis.Visualization","flare.vis.axis.CartesianAxes","flare.vis.axis.Axes","flare.vis.data.Data"]},
// {"name":"flare.physics.DragForce","size":1082,"imports":["flare.physics.Simulation","flare.physics.Particle","flare.physics.IForce"]},
// {"name":"flare.physics.GravityForce","size":1336,"imports":["flare.physics.Simulation","flare.physics.Particle","flare.physics.IForce"]},
// {"name":"flare.physics.IForce","size":319,"imports":["flare.physics.Simulation"]},
// {"name":"flare.physics.NBodyForce","size":10498,"imports":["flare.physics.Simulation","flare.physics.Particle","flare.physics.IForce"]},
// {"name":"flare.physics.Particle","size":2822,"imports":[]},
// {"name":"flare.physics.Simulation","size":9983,"imports":["flare.physics.Particle","flare.physics.NBodyForce","flare.physics.DragForce","flare.physics.GravityForce","flare.physics.Spring","flare.physics.SpringForce","flare.physics.IForce"]},
// {"name":"flare.physics.Spring","size":2213,"imports":["flare.physics.Particle"]},
// {"name":"flare.physics.SpringForce","size":1681,"imports":["flare.physics.Simulation","flare.physics.Particle","flare.physics.Spring","flare.physics.IForce"]},
// {"name":"flare.query.AggregateExpression","size":1616,"imports":["flare.query.Expression"]},
// {"name":"flare.query.And","size":1027,"imports":["flare.query.CompositeExpression","flare.query.Expression"]},
// {"name":"flare.query.Arithmetic","size":3891,"imports":["flare.query.BinaryExpression","flare.query.Expression"]},
// {"name":"flare.query.Average","size":891,"imports":["flare.query.Expression","flare.query.AggregateExpression"]},
// {"name":"flare.query.BinaryExpression","size":2893,"imports":["flare.query.Expression"]},
// {"name":"flare.query.Comparison","size":5103,"imports":["flare.query.Not","flare.query.BinaryExpression","flare.query.Expression","flare.query.Or"]},
// {"name":"flare.query.CompositeExpression","size":3677,"imports":["flare.query.Expression","flare.query.If"]},
// {"name":"flare.query.Count","size":781,"imports":["flare.query.Expression","flare.query.AggregateExpression"]},
// {"name":"flare.query.DateUtil","size":4141,"imports":["flare.query.Fn"]},
// {"name":"flare.query.Distinct","size":933,"imports":["flare.query.Expression","flare.query.AggregateExpression"]},
// {"name":"flare.query.Expression","size":5130,"imports":["flare.query.Variable","flare.query.IsA","flare.query.ExpressionIterator","flare.util.IPredicate","flare.query.Literal","flare.util.IEvaluable","flare.query.If"]},
// {"name":"flare.query.ExpressionIterator","size":3617,"imports":["flare.query.Expression"]},
// {"name":"flare.query.Fn","size":3240,"imports":["flare.query.DateUtil","flare.query.CompositeExpression","flare.query.Expression","flare.query.StringUtil"]},
// {"name":"flare.query.If","size":2732,"imports":["flare.query.Expression"]},
// {"name":"flare.query.IsA","size":2039,"imports":["flare.query.Expression","flare.query.If"]},
// {"name":"flare.query.Literal","size":1214,"imports":["flare.query.Expression"]},
// {"name":"flare.query.Match","size":3748,"imports":["flare.query.BinaryExpression","flare.query.Expression","flare.query.StringUtil"]},
// {"name":"flare.query.Maximum","size":843,"imports":["flare.query.Expression","flare.query.AggregateExpression"]},
// {"name":"flare.query.methods.add","size":593,"imports":["flare.query.methods.or","flare.query.Arithmetic"]},
// {"name":"flare.query.methods.and","size":330,"imports":["flare.query.And","flare.query.methods.or"]},
// {"name":"flare.query.methods.average","size":287,"imports":["flare.query.Average","flare.query.methods.or"]},
// {"name":"flare.query.methods.count","size":277,"imports":["flare.query.Count","flare.query.methods.or"]},
// {"name":"flare.query.methods.distinct","size":292,"imports":["flare.query.Distinct","flare.query.methods.or"]},
// {"name":"flare.query.methods.div","size":595,"imports":["flare.query.methods.or","flare.query.Arithmetic"]},
// {"name":"flare.query.methods.eq","size":594,"imports":["flare.query.Comparison","flare.query.methods.or"]},
// {"name":"flare.query.methods.fn","size":460,"imports":["flare.query.methods.or","flare.query.Fn"]},
// {"name":"flare.query.methods.gt","size":603,"imports":["flare.query.Comparison","flare.query.methods.or"]},
// {"name":"flare.query.methods.gte","size":625,"imports":["flare.query.Comparison","flare.query.methods.gt","flare.query.methods.eq","flare.query.methods.or"]},
// {"name":"flare.query.methods.iff","size":748,"imports":["flare.query.methods.or","flare.query.If"]},
// {"name":"flare.query.methods.isa","size":461,"imports":["flare.query.IsA","flare.query.methods.or"]},
// {"name":"flare.query.methods.lt","size":597,"imports":["flare.query.Comparison","flare.query.methods.or"]},
// {"name":"flare.query.methods.lte","size":619,"imports":["flare.query.Comparison","flare.query.methods.lt","flare.query.methods.eq","flare.query.methods.or"]},
// {"name":"flare.query.methods.max","size":283,"imports":["flare.query.Maximum","flare.query.methods.or"]},
// {"name":"flare.query.methods.min","size":283,"imports":["flare.query.Minimum","flare.query.methods.or"]},
// {"name":"flare.query.methods.mod","size":591,"imports":["flare.query.methods.or","flare.query.Arithmetic"]},
// {"name":"flare.query.methods.mul","size":603,"imports":["flare.query.methods.lt","flare.query.methods.or","flare.query.Arithmetic"]},
// {"name":"flare.query.methods.neq","size":599,"imports":["flare.query.Comparison","flare.query.methods.eq","flare.query.methods.or"]},
// {"name":"flare.query.methods.not","size":386,"imports":["flare.query.Not","flare.query.methods.or"]},
// {"name":"flare.query.methods.or","size":323,"imports":["flare.query.Or"]},
// {"name":"flare.query.methods.orderby","size":307,"imports":["flare.query.Query","flare.query.methods.or"]},
// {"name":"flare.query.methods.range","size":772,"imports":["flare.query.methods.max","flare.query.Range","flare.query.methods.or","flare.query.methods.min"]},
// {"name":"flare.query.methods.select","size":296,"imports":["flare.query.Query"]},
// {"name":"flare.query.methods.stddev","size":363,"imports":["flare.query.methods.and","flare.query.Variance","flare.query.methods.or"]},
// {"name":"flare.query.methods.sub","size":600,"imports":["flare.query.methods.or","flare.query.Arithmetic"]},
// {"name":"flare.query.methods.sum","size":280,"imports":["flare.query.Sum","flare.query.methods.or"]},
// {"name":"flare.query.methods.update","size":307,"imports":["flare.query.Query"]},
// {"name":"flare.query.methods.variance","size":335,"imports":["flare.query.Variance","flare.query.methods.or"]},
// {"name":"flare.query.methods.where","size":299,"imports":["flare.query.Query","flare.query.methods.lt","flare.query.methods.lte"]},
// {"name":"flare.query.methods.xor","size":354,"imports":["flare.query.Xor","flare.query.methods.or"]},
// {"name":"flare.query.methods._","size":264,"imports":["flare.query.Literal","flare.query.methods.or"]},
// {"name":"flare.query.Minimum","size":843,"imports":["flare.query.Expression","flare.query.AggregateExpression"]},
// {"name":"flare.query.Not","size":1554,"imports":["flare.query.Expression"]},
// {"name":"flare.query.Or","size":970,"imports":["flare.query.CompositeExpression","flare.query.Expression"]},
// {"name":"flare.query.Query","size":13896,"imports":["flare.query.Variable","flare.query.Sum","flare.query.Expression","flare.util.Sort","flare.query.Not","flare.query.AggregateExpression","flare.query.Literal","flare.util.Filter","flare.util.Property","flare.query.If"]},
// {"name":"flare.query.Range","size":1594,"imports":["flare.query.And","flare.query.Comparison","flare.query.Expression"]},
// {"name":"flare.query.StringUtil","size":4130,"imports":["flare.query.Fn"]},
// {"name":"flare.query.Sum","size":791,"imports":["flare.query.Expression","flare.query.AggregateExpression"]},
// {"name":"flare.query.Variable","size":1124,"imports":["flare.query.Expression","flare.util.Property"]},
// {"name":"flare.query.Variance","size":1876,"imports":["flare.query.Expression","flare.query.AggregateExpression"]},
// {"name":"flare.query.Xor","size":1101,"imports":["flare.query.CompositeExpression","flare.query.Expression"]},
// {"name":"flare.scale.IScaleMap","size":2105,"imports":["flare.scale.Scale"]},
// {"name":"flare.scale.LinearScale","size":1316,"imports":["flare.util.Maths","flare.util.Strings","flare.scale.Scale","flare.scale.QuantitativeScale","flare.scale.ScaleType"]},
// {"name":"flare.scale.LogScale","size":3151,"imports":["flare.util.Maths","flare.util.Strings","flare.scale.Scale","flare.scale.QuantitativeScale","flare.scale.ScaleType"]},
// {"name":"flare.scale.OrdinalScale","size":3770,"imports":["flare.scale.ScaleType","flare.util.Arrays","flare.scale.Scale"]},
// {"name":"flare.scale.QuantileScale","size":2435,"imports":["flare.util.Maths","flare.util.Strings","flare.scale.Scale","flare.scale.ScaleType"]},
// {"name":"flare.scale.QuantitativeScale","size":4839,"imports":["flare.util.Maths","flare.util.Strings","flare.scale.Scale"]},
// {"name":"flare.scale.RootScale","size":1756,"imports":["flare.util.Maths","flare.util.Strings","flare.scale.Scale","flare.scale.QuantitativeScale","flare.scale.ScaleType"]},
// {"name":"flare.scale.Scale","size":4268,"imports":["flare.scale.ScaleType","flare.util.Strings"]},
// {"name":"flare.scale.ScaleType","size":1821,"imports":["flare.scale.Scale"]},
// {"name":"flare.scale.TimeScale","size":5833,"imports":["flare.util.Maths","flare.util.Dates","flare.scale.Scale","flare.scale.ScaleType"]},
// {"name":"flare.util.Arrays","size":8258,"imports":["flare.util.IValueProxy","flare.util.Property","flare.util.IEvaluable"]},
// {"name":"flare.util.Colors","size":10001,"imports":["flare.util.Filter"]},
// {"name":"flare.util.Dates","size":8217,"imports":["flare.util.Maths"]},
// {"name":"flare.util.Displays","size":12555,"imports":["flare.util.IValueProxy","flare.util.Filter","flare.util.Property","flare.util.IEvaluable","flare.util.Sort"]},
// {"name":"flare.util.Filter","size":2324,"imports":["flare.util.IPredicate","flare.util.Property"]},
// {"name":"flare.util.Geometry","size":10993,"imports":[]},
// {"name":"flare.util.heap.FibonacciHeap","size":9354,"imports":["flare.util.heap.HeapNode"]},
// {"name":"flare.util.heap.HeapNode","size":1233,"imports":["flare.util.heap.FibonacciHeap"]},
// {"name":"flare.util.IEvaluable","size":335,"imports":[]},
// {"name":"flare.util.IPredicate","size":383,"imports":[]},
// {"name":"flare.util.IValueProxy","size":874,"imports":[]},
// {"name":"flare.util.math.DenseMatrix","size":3165,"imports":["flare.util.math.IMatrix"]},
// {"name":"flare.util.math.IMatrix","size":2815,"imports":[]},
// {"name":"flare.util.math.SparseMatrix","size":3366,"imports":["flare.util.math.IMatrix"]},
// {"name":"flare.util.Maths","size":17705,"imports":["flare.util.Arrays"]},
// {"name":"flare.util.Orientation","size":1486,"imports":[]},
// {"name":"flare.util.palette.ColorPalette","size":6367,"imports":["flare.util.palette.Palette","flare.util.Colors"]},
// {"name":"flare.util.palette.Palette","size":1229,"imports":[]},
// {"name":"flare.util.palette.ShapePalette","size":2059,"imports":["flare.util.palette.Palette","flare.util.Shapes"]},
// {"name":"flare.util.palette.SizePalette","size":2291,"imports":["flare.util.palette.Palette"]},
// {"name":"flare.util.Property","size":5559,"imports":["flare.util.IPredicate","flare.util.IValueProxy","flare.util.IEvaluable"]},
// {"name":"flare.util.Shapes","size":19118,"imports":["flare.util.Arrays"]},
// {"name":"flare.util.Sort","size":6887,"imports":["flare.util.Arrays","flare.util.Property"]},
// {"name":"flare.util.Stats","size":6557,"imports":["flare.util.Arrays","flare.util.Property"]},
// {"name":"flare.util.Strings","size":22026,"imports":["flare.util.Dates","flare.util.Property"]},
// {"name":"flare.vis.axis.Axes","size":1302,"imports":["flare.animate.Transitioner","flare.vis.Visualization"]},
// {"name":"flare.vis.axis.Axis","size":24593,"imports":["flare.animate.Transitioner","flare.scale.LinearScale","flare.util.Arrays","flare.scale.ScaleType","flare.util.Strings","flare.display.TextSprite","flare.scale.Scale","flare.util.Stats","flare.scale.IScaleMap","flare.vis.axis.AxisLabel","flare.vis.axis.AxisGridLine"]},
// {"name":"flare.vis.axis.AxisGridLine","size":652,"imports":["flare.vis.axis.Axis","flare.display.LineSprite"]},
// {"name":"flare.vis.axis.AxisLabel","size":636,"imports":["flare.vis.axis.Axis","flare.display.TextSprite"]},
// {"name":"flare.vis.axis.CartesianAxes","size":6703,"imports":["flare.animate.Transitioner","flare.display.RectSprite","flare.vis.axis.Axis","flare.display.TextSprite","flare.vis.axis.Axes","flare.vis.Visualization","flare.vis.axis.AxisGridLine"]},
// {"name":"flare.vis.controls.AnchorControl","size":2138,"imports":["flare.vis.controls.Control","flare.vis.Visualization","flare.vis.operator.layout.Layout"]},
// {"name":"flare.vis.controls.ClickControl","size":3824,"imports":["flare.vis.events.SelectionEvent","flare.vis.controls.Control"]},
// {"name":"flare.vis.controls.Control","size":1353,"imports":["flare.vis.controls.IControl","flare.util.Filter"]},
// {"name":"flare.vis.controls.ControlList","size":4665,"imports":["flare.vis.controls.IControl","flare.util.Arrays","flare.vis.Visualization","flare.vis.controls.Control"]},
// {"name":"flare.vis.controls.DragControl","size":2649,"imports":["flare.vis.controls.Control","flare.vis.data.DataSprite"]},
// {"name":"flare.vis.controls.ExpandControl","size":2832,"imports":["flare.animate.Transitioner","flare.vis.data.NodeSprite","flare.vis.controls.Control","flare.vis.Visualization"]},
// {"name":"flare.vis.controls.HoverControl","size":4896,"imports":["flare.vis.events.SelectionEvent","flare.vis.controls.Control"]},
// {"name":"flare.vis.controls.IControl","size":763,"imports":["flare.vis.controls.Control"]},
// {"name":"flare.vis.controls.PanZoomControl","size":5222,"imports":["flare.util.Displays","flare.vis.controls.Control"]},
// {"name":"flare.vis.controls.SelectionControl","size":7862,"imports":["flare.vis.events.SelectionEvent","flare.vis.controls.Control"]},
// {"name":"flare.vis.controls.TooltipControl","size":8435,"imports":["flare.animate.Tween","flare.display.TextSprite","flare.vis.controls.Control","flare.vis.events.TooltipEvent"]},
// {"name":"flare.vis.data.Data","size":20544,"imports":["flare.vis.data.EdgeSprite","flare.vis.data.NodeSprite","flare.util.Arrays","flare.vis.data.DataSprite","flare.vis.data.Tree","flare.vis.events.DataEvent","flare.data.DataSet","flare.vis.data.TreeBuilder","flare.vis.data.DataList","flare.data.DataSchema","flare.util.Sort","flare.data.DataField","flare.util.Property"]},
// {"name":"flare.vis.data.DataList","size":19788,"imports":["flare.animate.Transitioner","flare.vis.data.NodeSprite","flare.util.Arrays","flare.util.math.DenseMatrix","flare.vis.data.DataSprite","flare.vis.data.EdgeSprite","flare.vis.events.DataEvent","flare.util.Stats","flare.util.math.IMatrix","flare.util.Sort","flare.util.Filter","flare.util.Property","flare.util.IEvaluable","flare.vis.data.Data"]},
// {"name":"flare.vis.data.DataSprite","size":10349,"imports":["flare.util.Colors","flare.vis.data.Data","flare.display.DirtySprite","flare.vis.data.render.IRenderer","flare.vis.data.render.ShapeRenderer"]},
// {"name":"flare.vis.data.EdgeSprite","size":3301,"imports":["flare.vis.data.render.EdgeRenderer","flare.vis.data.DataSprite","flare.vis.data.NodeSprite","flare.vis.data.render.ArrowType","flare.vis.data.Data"]},
// {"name":"flare.vis.data.NodeSprite","size":19382,"imports":["flare.animate.Transitioner","flare.util.Arrays","flare.vis.data.DataSprite","flare.vis.data.EdgeSprite","flare.vis.data.Tree","flare.util.Sort","flare.util.Filter","flare.util.IEvaluable","flare.vis.data.Data"]},
// {"name":"flare.vis.data.render.ArrowType","size":698,"imports":[]},
// {"name":"flare.vis.data.render.EdgeRenderer","size":5569,"imports":["flare.vis.data.EdgeSprite","flare.vis.data.NodeSprite","flare.vis.data.DataSprite","flare.vis.data.render.IRenderer","flare.util.Shapes","flare.util.Geometry","flare.vis.data.render.ArrowType"]},
// {"name":"flare.vis.data.render.IRenderer","size":353,"imports":["flare.vis.data.DataSprite"]},
// {"name":"flare.vis.data.render.ShapeRenderer","size":2247,"imports":["flare.util.Shapes","flare.vis.data.render.IRenderer","flare.vis.data.DataSprite"]},
// {"name":"flare.vis.data.ScaleBinding","size":11275,"imports":["flare.scale.TimeScale","flare.scale.ScaleType","flare.scale.LinearScale","flare.scale.LogScale","flare.scale.OrdinalScale","flare.scale.RootScale","flare.scale.Scale","flare.scale.QuantileScale","flare.util.Stats","flare.scale.QuantitativeScale","flare.vis.events.DataEvent","flare.vis.data.Data"]},
// {"name":"flare.vis.data.Tree","size":7147,"imports":["flare.vis.data.EdgeSprite","flare.vis.events.DataEvent","flare.vis.data.NodeSprite","flare.vis.data.Data"]},
// {"name":"flare.vis.data.TreeBuilder","size":9930,"imports":["flare.vis.data.EdgeSprite","flare.vis.data.NodeSprite","flare.vis.data.Tree","flare.util.heap.HeapNode","flare.util.heap.FibonacciHeap","flare.util.Property","flare.util.IEvaluable","flare.vis.data.Data"]},
// {"name":"flare.vis.events.DataEvent","size":2313,"imports":["flare.vis.data.EdgeSprite","flare.vis.data.NodeSprite","flare.vis.data.DataList","flare.vis.data.DataSprite"]},
// {"name":"flare.vis.events.SelectionEvent","size":1880,"imports":["flare.vis.events.DataEvent"]},
// {"name":"flare.vis.events.TooltipEvent","size":1701,"imports":["flare.vis.data.EdgeSprite","flare.vis.data.NodeSprite"]},
// {"name":"flare.vis.events.VisualizationEvent","size":1117,"imports":["flare.animate.Transitioner"]},
// {"name":"flare.vis.legend.Legend","size":20859,"imports":["flare.animate.Transitioner","flare.vis.data.ScaleBinding","flare.util.palette.SizePalette","flare.scale.ScaleType","flare.vis.legend.LegendItem","flare.display.RectSprite","flare.display.TextSprite","flare.scale.Scale","flare.vis.legend.LegendRange","flare.util.Displays","flare.util.Orientation","flare.util.palette.ShapePalette","flare.util.palette.Palette","flare.util.palette.ColorPalette"]},
// {"name":"flare.vis.legend.LegendItem","size":4614,"imports":["flare.util.Shapes","flare.display.TextSprite","flare.vis.legend.Legend","flare.display.RectSprite"]},
// {"name":"flare.vis.legend.LegendRange","size":10530,"imports":["flare.util.Colors","flare.vis.legend.Legend","flare.display.RectSprite","flare.display.TextSprite","flare.scale.Scale","flare.util.Stats","flare.scale.IScaleMap","flare.util.Orientation","flare.util.palette.ColorPalette"]},
// {"name":"flare.vis.operator.distortion.BifocalDistortion","size":4461,"imports":["flare.vis.operator.distortion.Distortion"]},
// {"name":"flare.vis.operator.distortion.Distortion","size":6314,"imports":["flare.animate.Transitioner","flare.vis.data.DataSprite","flare.vis.events.VisualizationEvent","flare.vis.axis.Axis","flare.vis.axis.CartesianAxes","flare.vis.operator.layout.Layout","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.distortion.FisheyeDistortion","size":3444,"imports":["flare.vis.operator.distortion.Distortion"]},
// {"name":"flare.vis.operator.encoder.ColorEncoder","size":3179,"imports":["flare.animate.Transitioner","flare.scale.ScaleType","flare.vis.operator.encoder.Encoder","flare.util.palette.Palette","flare.util.palette.ColorPalette","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.encoder.Encoder","size":4060,"imports":["flare.animate.Transitioner","flare.vis.data.DataSprite","flare.vis.operator.Operator","flare.vis.data.ScaleBinding","flare.util.palette.Palette","flare.util.Filter","flare.util.Property","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.encoder.PropertyEncoder","size":4138,"imports":["flare.animate.Transitioner","flare.vis.data.DataList","flare.vis.data.Data","flare.vis.operator.encoder.Encoder","flare.util.Filter","flare.vis.operator.Operator"]},
// {"name":"flare.vis.operator.encoder.ShapeEncoder","size":1690,"imports":["flare.util.palette.Palette","flare.scale.ScaleType","flare.util.palette.ShapePalette","flare.vis.operator.encoder.Encoder","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.encoder.SizeEncoder","size":1830,"imports":["flare.util.palette.Palette","flare.scale.ScaleType","flare.vis.operator.encoder.Encoder","flare.util.palette.SizePalette","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.filter.FisheyeTreeFilter","size":5219,"imports":["flare.animate.Transitioner","flare.vis.data.NodeSprite","flare.vis.data.DataSprite","flare.vis.data.EdgeSprite","flare.vis.data.Tree","flare.vis.operator.Operator","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.filter.GraphDistanceFilter","size":3165,"imports":["flare.animate.Transitioner","flare.vis.data.NodeSprite","flare.vis.operator.Operator","flare.vis.data.DataSprite","flare.vis.data.EdgeSprite"]},
// {"name":"flare.vis.operator.filter.VisibilityFilter","size":3509,"imports":["flare.vis.operator.Operator","flare.animate.Transitioner","flare.util.Filter","flare.vis.data.DataSprite","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.IOperator","size":1286,"imports":["flare.animate.Transitioner","flare.vis.Visualization","flare.vis.operator.Operator"]},
// {"name":"flare.vis.operator.label.Labeler","size":9956,"imports":["flare.animate.Transitioner","flare.vis.data.DataSprite","flare.display.TextSprite","flare.vis.operator.Operator","flare.util.Shapes","flare.util.Filter","flare.util.Property","flare.util.IEvaluable","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.label.RadialLabeler","size":3899,"imports":["flare.vis.operator.label.Labeler","flare.util.Shapes","flare.display.TextSprite","flare.vis.data.DataSprite","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.label.StackedAreaLabeler","size":3202,"imports":["flare.vis.operator.label.Labeler","flare.display.TextSprite","flare.vis.data.DataSprite","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.layout.AxisLayout","size":6725,"imports":["flare.scale.ScaleType","flare.vis.data.DataSprite","flare.vis.axis.CartesianAxes","flare.vis.data.ScaleBinding","flare.util.Property","flare.vis.operator.layout.Layout","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.layout.BundledEdgeRouter","size":3727,"imports":["flare.animate.Transitioner","flare.vis.data.NodeSprite","flare.util.Arrays","flare.vis.data.DataSprite","flare.vis.data.EdgeSprite","flare.util.Shapes","flare.vis.operator.layout.Layout","flare.vis.operator.Operator"]},
// {"name":"flare.vis.operator.layout.CircleLayout","size":9317,"imports":["flare.vis.data.NodeSprite","flare.vis.data.DataList","flare.vis.data.ScaleBinding","flare.util.Property","flare.vis.operator.layout.Layout","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.layout.CirclePackingLayout","size":12003,"imports":["flare.vis.data.NodeSprite","flare.vis.data.render.ShapeRenderer","flare.util.Shapes","flare.util.Sort","flare.vis.operator.layout.Layout","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.layout.DendrogramLayout","size":4853,"imports":["flare.util.Property","flare.vis.data.NodeSprite","flare.util.Orientation","flare.vis.operator.layout.Layout","flare.vis.data.EdgeSprite"]},
// {"name":"flare.vis.operator.layout.ForceDirectedLayout","size":8411,"imports":["flare.physics.Simulation","flare.animate.Transitioner","flare.vis.data.NodeSprite","flare.vis.data.DataSprite","flare.physics.Particle","flare.physics.Spring","flare.vis.operator.layout.Layout","flare.vis.data.EdgeSprite","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.layout.IcicleTreeLayout","size":4864,"imports":["flare.vis.data.NodeSprite","flare.util.Orientation","flare.vis.operator.layout.Layout"]},
// {"name":"flare.vis.operator.layout.IndentedTreeLayout","size":3174,"imports":["flare.animate.Transitioner","flare.vis.data.NodeSprite","flare.util.Arrays","flare.vis.operator.layout.Layout","flare.vis.data.EdgeSprite"]},
// {"name":"flare.vis.operator.layout.Layout","size":7881,"imports":["flare.animate.Transitioner","flare.vis.data.NodeSprite","flare.vis.data.DataList","flare.vis.data.DataSprite","flare.vis.data.EdgeSprite","flare.vis.Visualization","flare.vis.axis.CartesianAxes","flare.vis.axis.Axes","flare.animate.TransitionEvent","flare.vis.operator.Operator"]},
// {"name":"flare.vis.operator.layout.NodeLinkTreeLayout","size":12870,"imports":["flare.vis.data.NodeSprite","flare.util.Arrays","flare.util.Orientation","flare.vis.operator.layout.Layout"]},
// {"name":"flare.vis.operator.layout.PieLayout","size":2728,"imports":["flare.vis.data.DataList","flare.vis.data.DataSprite","flare.util.Shapes","flare.util.Property","flare.vis.operator.layout.Layout","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.layout.RadialTreeLayout","size":12348,"imports":["flare.vis.data.NodeSprite","flare.util.Arrays","flare.vis.operator.layout.Layout"]},
// {"name":"flare.vis.operator.layout.RandomLayout","size":870,"imports":["flare.vis.operator.layout.Layout","flare.vis.data.DataSprite","flare.vis.data.Data"]},
// {"name":"flare.vis.operator.layout.StackedAreaLayout","size":9121,"imports":["flare.scale.TimeScale","flare.scale.LinearScale","flare.util.Arrays","flare.scale.OrdinalScale","flare.vis.data.NodeSprite","flare.scale.Scale","flare.vis.axis.CartesianAxes","flare.util.Stats","flare.util.Orientation","flare.scale.QuantitativeScale","flare.util.Maths","flare.vis.operator.layout.Layout"]},
// {"name":"flare.vis.operator.layout.TreeMapLayout","size":9191,"imports":["flare.animate.Transitioner","flare.vis.data.NodeSprite","flare.util.Property","flare.vis.operator.layout.Layout"]},
// {"name":"flare.vis.operator.Operator","size":2490,"imports":["flare.animate.Transitioner","flare.vis.operator.IOperator","flare.util.Property","flare.util.IEvaluable","flare.vis.Visualization"]},
// {"name":"flare.vis.operator.OperatorList","size":5248,"imports":["flare.animate.Transitioner","flare.util.Arrays","flare.vis.operator.IOperator","flare.vis.Visualization","flare.vis.operator.Operator"]},
// {"name":"flare.vis.operator.OperatorSequence","size":4190,"imports":["flare.animate.Transitioner","flare.util.Arrays","flare.vis.operator.IOperator","flare.vis.operator.OperatorList","flare.animate.FunctionSequence","flare.vis.operator.Operator"]},
// {"name":"flare.vis.operator.OperatorSwitch","size":2581,"imports":["flare.animate.Transitioner","flare.vis.operator.OperatorList","flare.vis.operator.IOperator","flare.vis.operator.Operator"]},
// {"name":"flare.vis.operator.SortOperator","size":2023,"imports":["flare.vis.operator.Operator","flare.animate.Transitioner","flare.util.Arrays","flare.vis.data.Data"]},
// {"name":"flare.vis.Visualization","size":16540,"imports":["flare.animate.Transitioner","flare.vis.operator.IOperator","flare.animate.Scheduler","flare.vis.events.VisualizationEvent","flare.vis.data.Tree","flare.vis.events.DataEvent","flare.vis.axis.Axes","flare.vis.axis.CartesianAxes","flare.util.Displays","flare.vis.operator.OperatorList","flare.vis.controls.ControlList","flare.animate.ISchedulable","flare.vis.data.Data"]}
// ];




// //==============================================================================
// // Edge Bundle Dataset (Empty)
// const empty = [
//   {"name":"a","size":4116, "imports":[]},
//   {"name":"b","size":4116, "imports":[]},
//   {"name":"c","size":4116, "imports":[]},
//   {"name":"d","size":4116, "imports":[]},
//   {"name":"e","size":4116, "imports":[]},
//   {"name":"f","size":4116, "imports":[]},
//   {"name":"g","size":4116, "imports":[]},
//   {"name":"h","size":4116, "imports":[]},
//   {"name":"i","size":4116, "imports":[]},
//   {"name":"j","size":4116, "imports":[]},
//   {"name":"k","size":4116, "imports":[]},
//   {"name":"l","size":4116, "imports":[]},
//   {"name":"m","size":4116, "imports":[]},
//   {"name":"n","size":4116, "imports":[]},
//   {"name":"o","size":4116, "imports":[]},
//   {"name":"p","size":4116, "imports":[]},
//   {"name":"q","size":4116, "imports":[]},
//   {"name":"r","size":4116, "imports":[]},
//   {"name":"s","size":4116, "imports":[]},
//   {"name":"t","size":4116, "imports":[]},
//   {"name":"u","size":4116, "imports":[]},
//   {"name":"v","size":4116, "imports":[]},
//   {"name":"w","size":4116, "imports":[]},
//   {"name":"x","size":4116, "imports":[]},
//   {"name":"y","size":4116, "imports":[]},
//   {"name":"z","size":4116, "imports":[]},
//   {"name":"aa","size":4116, "imports":[]},
//   {"name":"ab","size":4116, "imports":[]},
//   {"name":"ac","size":4116, "imports":[]},
//   {"name":"ad","size":4116, "imports":[]},
//   {"name":"ae","size":4116, "imports":[]}
// ];



// //==============================================================================
// // Edge Bundle Dataset (Original)
// const classes = [
//   {"name":"a","size":4116, "imports":[]},
//   {"name":"Artis University Medical Center (AUMC)","size":4116, "imports":["Blijdorp Medisch Centrum (BUMC)", "Burgers University Medical Center"]},
//   {"name":"b","size":4116, "imports":[]},
//   {"name":"Burgers University Medical Center","size":4116, "imports":["Burgers UMC Ear,Nose,Throat unit", "Burgers UMC Cardiology unit"]},
//   {"name":"Burgers UMC Cardiology unit","size":4116, "imports":["Burgers UMC Ear,Nose,Throat unit", "Burgers University Medical Center"]},
//   {"name":"Burgers UMC Ear,Nose,Throat unit","size":4116, "imports":["Burgers UMC Cardiology unit", "Burgers University Medical Center"]},
//   {"name":"Blijdorp Medisch Centrum (BUMC)","size":4116, "imports":["Burgers University Medical Center"]},
//   {"name":"c","size":4116, "imports":[]},
//   {"name":"Clinical Lab","size":4116, "imports":["Artis University Medical Center (AUMC)"]},
//   {"name":"d","size":4116, "imports":[]},
//   {"name":"e","size":4116, "imports":[]},
//   {"name":"f","size":4116, "imports":[]},
//   {"name":"g","size":4116, "imports":[]},
//   {"name":"Gastroenterology","size":4116, "imports":["Artis University Medical Center (AUMC)"]},
//   {"name":"Good Health Clinic","size":4116, "imports":["Artis University Medical Center (AUMC)", "Burgers University Medical Center"]},
//   {"name":"h","size":4116, "imports":[]},
//   {"name":"Health Level Seven International","size":4116, "imports":["Blijdorp Medisch Centrum (BUMC)", "Artis University Medical Center (AUMC)", "Burgers University Medical Center"]},
//   {"name":"i","size":4116, "imports":[]},
//   {"name":"j","size":4116, "imports":[]},
//   {"name":"k","size":4116, "imports":[]},
//   {"name":"l","size":4116, "imports":[]},
//   {"name":"m","size":4116, "imports":[]},
//   {"name":"n","size":4116, "imports":[]},
//   {"name":"o","size":4116, "imports":[]},
//   {"name":"p","size":4116, "imports":[]},
//   {"name":"q","size":4116, "imports":[]},
//   {"name":"r","size":4116, "imports":[]},
//   {"name":"s","size":4116, "imports":[]},
//   {"name":"t","size":4116, "imports":[]},
//   {"name":"u","size":4116, "imports":[]},
//   {"name":"v","size":4116, "imports":[]},
//   {"name":"w","size":4116, "imports":[]},
//   {"name":"x","size":4116, "imports":[]},
//   {"name":"XYZ Insurance","size":4116, "imports":["Blijdorp Medisch Centrum (BUMC)", "Artis University Medical Center (AUMC)", "Burgers University Medical Center"]},
//   {"name":"y","size":4116, "imports":[]},
//   {"name":"z","size":4116, "imports":[]},
// ];

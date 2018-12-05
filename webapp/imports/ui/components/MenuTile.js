import React from 'react';
import { CardTitle, Card, CardText, CardActions } from 'material-ui';
import { Glass, GlassCard } from 'meteor/clinical:glass-ui';
import { browserHistory } from 'react-router';

import {FaStreetView} from 'react-icons/fa';
import {IoMdClipboard} from 'react-icons/io';
import {FaHeartbeat} from 'react-icons/fa';
import {FaMobile} from 'react-icons/fa';
import {IoLogoNoSmoking} from 'react-icons/io';
import {FaEyeDropper} from 'react-icons/fa';
import {IoMdNuclear} from 'react-icons/io';
import {FaMapMarker} from 'react-icons/fa';
import {FaFlask} from 'react-icons/fa';
import {GoPulse} from 'react-icons/go';
import {FaBuilding} from 'react-icons/fa';
import {GoPerson} from 'react-icons/go';
import {MdAddAlert} from 'react-icons/md';
import {MdLocalPharmacy} from 'react-icons/md';
import {IoMdRibbon} from 'react-icons/io';
import {MdImportantDevices} from 'react-icons/md';

import MdFingerprint from 'react-icons/md';
import MdList from 'react-icons/md';
import MdHearing from 'react-icons/md';

import FaEye from 'react-icons/fa';
import IoMdErlenmeyerFlask from 'react-icons/io';
import IoMdErlenmeyerFlaskBubbles from 'react-icons/io';
import FaList from 'react-icons/fa';
import FaMedkit from 'react-icons/fa';
import IoMdMedkitNormal from 'react-icons/io';
import IoMdMedkitOutline from 'react-icons/io';
import FaMoon from 'react-icons/fa';
import FaCheck from 'react-icons/fa';
import GoBroadcast from 'react-icons/go';
import GoBug from 'react-icons/go';
import GoOrganization from 'react-icons/go';
import IoMdPulseNormal from 'react-icons/io';
import IoMdPulseStrong from 'react-icons/io';
import IoMdLeaf from 'react-icons/io';
import IoMdNutrition from 'react-icons/io';
import MdDashboard from 'react-icons/md';
import MdDataUsage from 'react-icons/md';

const style = {
  indexCardPadding: {
    width: '100%',
    display: 'inline-block',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '30px'
  },
  indexCard: {
    cursor: 'pointer',
    height: '142px',
    minHeight: '142px'          
  },
  inactiveIndexCard: {
    opacity: .5,
    width: '100%',
    display: 'inline-block',
    paddingBottom: '30px'
  },
  thumbnail: {
    width: '85px',
    minHeight: '142px',
    position: 'absolute',
    left: '15px',
    top: '0px',
    color: 'white',
    backgroundColor: 'lightgray',
    padding: '10px',
    textAlign: 'center'
  },
  title: Glass.darkroom({
    marginTop: '10px',
    textAlign: 'left',
    fontSize: '48px',
    paddingLeft: '85px'
  }),
  subtitle: Glass.darkroom({
    textAlign: 'left',
    marginTop: '20px',
    textAlign: 'left',
    paddingLeft: '85px'
  })
}
export class MenuTile extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){

    var icon;
    switch (this.props.icon) {
        case "GoPulse":
          icon = <GoPulse size={ this.props.iconSize } />;
          break;
          case "MdList":
          icon = <MdList size={this.props.iconSize} />;
          break;
          case "MdFingerprint":
          icon = <MdFingerprint size={this.props.iconSize} />;
          break;
          case "MdImportantDevices":
          icon = <MdImportantDevices size={this.props.iconSize} />;
          break;
          case "FaBuilding":
          icon = <FaBuilding size={this.props.iconSize} />;
          break;
          case "FaMapMarker":
          icon = <FaMapMarker size={this.props.iconSize} />;
          break;
          case "FaFlask":
          icon = <FaFlask size={this.props.iconSize} />;
          break;
          case "FaMobile":
          icon = <FaMobile size={this.props.iconSize} />;
          break;
          case "FaHeartbeat":
          icon = <FaHeartbeat size={this.props.iconSize} />;
          break;          

          case "MdAddAlert":
          icon = <MdAddAlert size={this.props.iconSize} />;
          break;
          case "MdLocalPharmacy":
          icon = <MdLocalPharmacy size={this.props.iconSize} />;
          break;
          case "IoMdClipboard":
          icon = <IoMdClipboard size={this.props.iconSize} />;
          break;
          case "IoLogoNoSmoking":
          icon = <IoLogoNoSmoking size={this.props.iconSize} />;
          break;
          case "FaStreetView":
          icon = <FaStreetView size={this.props.iconSize} />;
          break;
          case "FaEyeDropper":
          icon = <FaEyeDropper size={this.props.iconSize} />;
          break;          
          case "GoPerson":
          icon = <GoPerson size={this.props.iconSize} />;
          break;  
          case "IoMdNuclear":
          icon = <IoMdNuclear size={this.props.iconSize} />;
          break;  
          case "MdHearing":
          icon = <MdHearing size={this.props.iconSize} />;
          break;  
          case "IoMdRibbon":
          icon = <IoMdRibbon size={this.props.iconSize} />;
          break;  

        default:  
      }

    const { active, id, iconSize, title, subtitle, ...otherProps } = this.props;


    return (
        <div id={id} style={ style.indexCardPadding } onClick={ this.openLink.bind(this, this.props.path) } >
            <Card className='thumbnail' style={ style.thumbnail} zDepth={1} >
              { icon }
            </Card>
            <GlassCard className='tile' style={ style.indexCard} >
              <CardTitle
                title={ title  }
                subtitle={ subtitle }
                titleStyle={ style.title}
                subtitleStyle={ style.subtitle}
              />
            </GlassCard>
        </div>
    );
  }
  openLink(url){
    console.log("openLink", url);

    browserHistory.push(url);
  }
}
export default MenuTile;
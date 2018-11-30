import React from 'react';
import { CardTitle, Card, CardText, CardActions } from 'material-ui';
import { Glass, GlassCard } from 'meteor/clinical:glass-ui';
import { browserHistory } from 'react-router';

import FaList from 'react-icons/fa';

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
        case "Pulse":
          icon = <Pulse size={ this.props.iconSize } />;
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
          case "Building":
          icon = <Building size={this.props.iconSize} />;
          break;
          case "MapMarker":
          icon = <MapMarker size={this.props.iconSize} />;
          break;
          case "Flask":
          icon = <Flask size={this.props.iconSize} />;
          break;
          case "Mobile":
          icon = <Mobile size={this.props.iconSize} />;
          break;
          case "Heartbeat":
          icon = <Heartbeat size={this.props.iconSize} />;
          break;          

          case "MdAddAlert":
          icon = <MdAddAlert size={this.props.iconSize} />;
          break;
          case "MdLocalPhramacy":
          icon = <MdLocalPhramacy size={this.props.iconSize} />;
          break;
          case "Clipboard":
          icon = <Clipboard size={this.props.iconSize} />;
          break;
          case "NoSmoking":
          icon = <NoSmoking size={this.props.iconSize} />;
          break;
          case "StreetView":
          icon = <StreetView size={this.props.iconSize} />;
          break;
          case "Immunizations":
          icon = <Immunizations size={this.props.iconSize} />;
          break;          
          case "EyeDropper":
          icon = <EyeDropper size={this.props.iconSize} />;
          break;          
          case "Person":
          icon = <Person size={this.props.iconSize} />;
          break;  
          case "Nuclear":
          icon = <Nuclear size={this.props.iconSize} />;
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
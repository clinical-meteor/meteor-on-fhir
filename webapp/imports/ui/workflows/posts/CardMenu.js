import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Menu from 'react-toolbox/lib/menu';
import { IconButton } from 'react-toolbox/lib/button';

export default class CardMenu extends React.Component {
  // static propTypes = {
  //   children: React.PropTypes.node,
  //   className: React.PropTypes.string,
  //   icon: React.PropTypes.oneOfType([
  //     React.PropTypes.string,
  //     React.PropTypes.element
  //   ]),
  //   iconRipple: React.PropTypes.bool,
  //   menuRipple: React.PropTypes.bool,
  //   onClick: React.PropTypes.func,
  //   onHide: React.PropTypes.func,
  //   onSelect: React.PropTypes.func,
  //   onShow: React.PropTypes.func,
  //   position: React.PropTypes.string,
  //   selectable: React.PropTypes.bool,
  //   selected: React.PropTypes.any
  // };
  //
  // static defaultProps = {
  //   className: '',
  //   icon: 'more_vert',
  //   iconRipple: true,
  //   menuRipple: true,
  //   position: 'auto',
  //   selectable: false
  // };
  //

  getMeteorData() {
    return {};
  };

  handleButtonClick = (event) => {
    this.refs.menu.show();
    if (this.props.onClick) this.props.onClick(event);
  };

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div className={className} style={{position: "absolute", right: "0px"}}>
        <IconButton
          className={style.icon}
          icon={this.props.icon}
          onClick={this.handleButtonClick}
          ripple={this.props.iconRipple}
          style={{cursor: "pointer"}}
        />
        <Menu
          ref='menu'
          onHide={this.props.onHide}
          onSelect={this.props.onSelect}
          onShow={this.props.onShow}
          position={this.props.position}
          ripple={this.props.menuRipple}
          selectable={this.props.selectable}
          selected={this.props.selected}
        >
          {this.props.children}
        </Menu>
      </div>
    );
  }
}

export default CardMenu;

CardMenu.propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    iconRipple: React.PropTypes.bool,
    menuRipple: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onHide: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    onShow: React.PropTypes.func,
    position: React.PropTypes.string,
    selectable: React.PropTypes.bool,
    selected: React.PropTypes.any
};
CardMenu.defaultProps = {
    className: '',
    icon: 'more_vert',
    iconRipple: true,
    menuRipple: true,
    position: 'auto',
    selectable: false
};
ReactMixin(CardMenu.prototype, ReactMeteorData);

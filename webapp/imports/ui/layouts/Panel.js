import React from 'react';
import classnames from 'classnames';
// import style from './style';

const Panel = ({ children, className, scrollY }) => {
  if (typeof style === "undefined") {
    style = {};
  }
  const _className = classnames(style.panel, {
    [style.scrollY]: scrollY
  }, className);

  return (
    <div data-react-toolbox='panel' className={_className} style={{height: "inherit", width: "100%"}}>
      {children}
    </div>
  );
};

Panel.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  scrollY: React.PropTypes.bool
};

Panel.defaultProps = {
  className: '',
  scrollY: false
};

export default Panel;

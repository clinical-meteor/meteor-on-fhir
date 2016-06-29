import React from 'react';
import classnames from 'classnames';
// import style from './style';

const PhoneColumn = ({ children, className, scrollY }) => {
  if (typeof style === "undefined") {
    style = {};
  }
  const _className = classnames(style.panel, {
    [style.scrollY]: scrollY
  }, className);

  return (
    <div data-react-toolbox='panel' className={_className} style={{height: "inherit", width: "100%", left: "0px"}}>
      {children}
    </div>
  );
};

PhoneColumn.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  scrollY: React.PropTypes.bool
};

PhoneColumn.defaultProps = {
  className: '',
  scrollY: false
};

export default PhoneColumn;

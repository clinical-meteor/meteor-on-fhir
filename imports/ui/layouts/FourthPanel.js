import React from 'react';
import classnames from 'classnames';
// import style from './style';

const FourthPanel = ({ children, className, scrollY }) => {
  const _className = classnames(style.panel, {
    [style.scrollY]: scrollY
  }, className);

  return (
    <div data-react-toolbox='panel' className={_className} style={{width: '400px', position: "absolute", left: 400 + 40 + 1024 + 40 + "px", top: "0px", height: "inherit"}}>
      {children}
    </div>
  );
};

FourthPanel.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  scrollY: React.PropTypes.bool
};

FourthPanel.defaultProps = {
  className: '',
  scrollY: false
};

export default FourthPanel;

import React from 'react';
import classnames from 'classnames';
// import style from './style';

const LandscapePanel = ({ children, className, scrollY }) => {
  const _className = classnames(style.panel, {
    [style.scrollY]: scrollY
  }, className);

  return (
    <div data-react-toolbox='panel' className={_className} style={{width: '1024px', position: "absolute", left: "440px", top: "0px", height: "inherit"}}>
      {children}
    </div>
  );
};

LandscapePanel.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  scrollY: React.PropTypes.bool
};

LandscapePanel.defaultProps = {
  className: '',
  scrollY: false
};

export default LandscapePanel;

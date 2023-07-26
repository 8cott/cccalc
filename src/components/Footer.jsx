import React from 'react';

const Footer = ({ style }) => {
  const defaultFooterStyles = {
    padding: '20px',
    textAlign: 'center',
    marginTop: '20px',
    borderTop: '1px solid #fff',
  };

  return (
    <div style={{ ...defaultFooterStyles, ...style }}>
      This calculator is a project intended for development purposes only and should not be used by the public to calculate actual closing costs for real estate transactions. If you are purchasing real estate, please consult your attorney to discuss your closing costs.
    </div>
  );
};

export default Footer;

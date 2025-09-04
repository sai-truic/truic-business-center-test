import React from 'react';

const FixedWidthCell = ({ children, width, isHeader = false }) => (
  <div style={{ 
    width: width, 
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    whiteSpace: isHeader ? 'nowrap' : 'normal',
    wordWrap: 'break-word'
  }}>
    {children}
  </div>
);

export default FixedWidthCell;

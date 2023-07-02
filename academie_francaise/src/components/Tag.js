import React from 'react';
import '../css/Tag.css';

function Tag({ children, className}) {
  const tagClassName = `Tag ${className || ""}`;
  
  return (
    <div className={tagClassName}>
      {children}
    </div>);
}

export default Tag;

import React from 'react';

const Box = (props) => {
  return (
    <div {...props} >
      {props.children}
    </div>
  )
}

export default Box;

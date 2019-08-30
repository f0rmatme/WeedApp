import React from 'react';

const Flex = (props) => {
  return (
    <div style={{
      'display': 'flex',
      'flex': 1,

    }}>
      {props.children}
    </div>
  )
}

export default Flex;

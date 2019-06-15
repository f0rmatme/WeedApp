import React from 'react';

const list_style = {
  'width': '400px',
  'height': '100%',
  'border': '1px solid #fff'
}

class MainPage extends React.Component {

  state = {

  };

  render() {

    return (
      <div style={{'textAlign': 'center'}}>
        <div style={{
          'width': '40%',
          'height': '100vh',
          'margin-right': '25%',
          'margin-top': '25px',
          'margin-bottom': '25px',
          'display': 'inline-block',
          'border': '1px solid #000'
        }}>
          <p>HELLO</p>
        </div>
      </div>

    );
  }
}

export default MainPage;

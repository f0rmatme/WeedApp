import React from 'react';
import axios from 'axios';

const list_style = {
  'width': '400px',
  'height': '100%',
  'border': '1px solid #fff'
}

class MainPage extends React.Component {

  state = {

  };

  componentDidMount() {
    axios.get('/posts').then(res => {
      console.log(res.data);
    });
  }

  render() {

    return (
      <div style={{'textAlign': 'center'}}>
        <div style={{
          'width': '40%',
          'height': '100vh',
          'marginRight': '25%',
          'marginTop': '25px',
          'marginBottom': '25px',
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

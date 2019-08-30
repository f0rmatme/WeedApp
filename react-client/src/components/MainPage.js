import React from 'react';
//import axios from 'axios';
import Card from '@material-ui/core/Card';

class MainPage extends React.Component {

  state = {
    posts: [],
    loading: true,
  };

  /*componentDidMount() {
    axios.get('/posts').then(res => {
      this.setState({
        posts: res.data,
        loading: false,
      })
    });
  }*/

  render() {
    return (
      <div style={{'backgroundColor': 'white', 'minHeight': '75vh', 'position': 'relative'}}>
        <p style={{'textAlign': 'center', 'fontSize':'bold'}}>Welcome to WeedApp</p>
        {!this.state.loading &&
          <div style={{'textAlign': 'center'}}>
            <div style={{
              'width': '40%',
              'height': '100vh',
              'marginRight': '25%',
              'marginTop': '25px',
              'marginBottom': '25px',
              'display': 'inline-block',
              'border': '0.2px solid #000',
              'borderRadius': '3px',
              'boxShadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            }}>
              {this.state.posts.length > 0 && this.state.posts.map((post) => (
                <div>
                  <Card  raised={true}>
                  <p>{post.content}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        }
      </div>

    );
  }
}

export default MainPage;

import React from 'react';
//import axios from 'axios';
import { Fab, Card, /*makeStyles*/ } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Eric from './images/eric.png';

/*const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'white',
    minHeight: '75vh',
    position: 'relative'
  },
  postIcon: {
    position: 'fixed',
    bottom: '75px',
    right: '30px'
  },
  postContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  card: {
    width: '21vw',
    height: '30vh',
    textAlign: 'center',
    margin: '25px',
    position: 'inherit'
  }
}));*/

class Posts extends React.Component {

  render() {
    return (
      <div style={{'backgroundColor': 'white', 'minHeight': '75vh', 'position': 'relative'}}>
        <div style={{
          'position': 'fixed',
          'bottom': '75px',
          'right': '30px'
        }}>
          <Fab variant="extended" color="secondary">
            <AddIcon/>
            Post
          </Fab>
        </div>
        <div style={{
          'display': 'flex',
          'flexWrap': 'wrap',
          'justifyContent': 'space-around'
        }}>
          <Card raised={false} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>big beaner</p>
            <img src={Eric} alt="eric is gay" style={{'margin': 'auto'}}/>
          </Card>
          <Card raised={false} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>hot dog stand</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>makeup models</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>chocolate rain</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>big beaner</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>big beaner</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>big beaner</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>big beaner</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>big beaner</p>
          </Card>
        </div>
      </div>
    );
  }
}

export default Posts

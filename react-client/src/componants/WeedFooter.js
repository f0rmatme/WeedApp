import React from 'react';
import CopyrightIcon from '@material-ui/icons/Copyright';
import Typography from '@material-ui/core/Typography';

class WeedFooter extends React.Component {
  render() {
    return ( 
      <div>
        <footer style={{
          'position': 'relative',
          'marginLeft': 'auto',
          'marginRight': 'auto',
          'marginTop': '10px',
          'height': '40px',
          'width': '60vw',
          'backgroundColor': 'white'
        }}>
          <hr/>
          <div style={{'textAlign': 'center'}}>
            <CopyrightIcon style={{'marginRight': '15px'}}/>
            <Typography color="inherit" variant="overline" style={{'fontSize': '35px'}}>
              WeedApp 2019
            </Typography>
          </div>
        </footer>
      </div>
    );
  }
}

export default WeedFooter;

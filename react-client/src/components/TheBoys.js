import React from 'react';
import './TheBoys.css';
import Eric from './images/eric.png';
import Gershon from './images/gershon.png';
import Anton from './images/anton.png';
import NickNDA from './images/nicknda.png';
import WeedApp from './images/weedapp.png';
import Ashton from './images/ashton.png';


class TheBoys extends React.Component {
  render() {
    return ( 
      <div style={{'backgroundColor': 'white', 'minHeight': '75vh', 'position': 'relative'}}>
        <div className="Eric-Sucks">
          <img src={Eric} className="Eric" alt="eric is gay"/>
          <img src={Gershon} className="Gershon" alt="eric is gay"/>
          <img src={Anton} className="Anton" alt="eric is gay"/>
          <img src={Ashton} className="Ashton" alt="eric is gay"/>
          <a href="/newcharacter/">
            <img src={NickNDA} className="null" alt="eric is gay"/>
          </a>
        </div>
        <div className="Ligma">
          <img src={WeedApp} className="WeedApp" alt="eric is gay"/>
        </div>
      </div>
    );
  }
}

export default TheBoys;

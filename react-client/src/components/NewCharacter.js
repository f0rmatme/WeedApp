import React from 'react';
import NickNDA from './images/nicknda.png';
import './NewCharacter.css';

var countDownDate = new Date("Aug 23, 2019 18:00:00").getTime();


class NewCharacter extends React.Component {

  componentDidMount(){
    var x = setInterval(function() {
  
      var now = new Date().getTime();
  
      var distance = countDownDate - now;
  
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "Character unlocked!";
      }
    }, 1000);
  }

  render() {
    return ( 
      <div style={{'backgroundColor': 'white', 'minHeight': '75vh', 'position': 'relative'}}>
        <div style={{'marginLeft': 'auto', 'marginRight': 'auto', 'width': '50vw'}}>
          <h1>New character unlocks in: </h1><p id="timer" style={{'display': 'block'}}></p>
        </div>
        <div style={{'marginLeft': 'auto', 'marginRight': 'auto', 'width': '50vw'}}>
          <img src={NickNDA} className="Nick" alt="eric is gay" style={{'width': '50vw', 'height': '50vh'}}/>
        </div>
      </div>
    );
  }
}

export default NewCharacter;
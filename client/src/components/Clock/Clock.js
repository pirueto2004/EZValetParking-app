import React from 'react';
import moment from 'moment';
import "./Clock.css";
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: moment().format("dddd").toString(),
      month: moment().format("MMMM").slice(0, 3),  
      date: moment().format("DD").toString(), 
      year: moment().format("YYYY").toString(),      
      hour: moment().format("HH").toString(),
      minute: moment().format("mm").toString(),
      second: moment().format("ss").toString(),
      ampm: moment().format("A").toString(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    this.setState({   
      day: moment().format("dddd").toString(),
      month: moment().format("MMMM").slice(0, 3),
      date: moment().format("DD").toString(),        
      year: moment().format("YYYY").toString(),
      hour: moment().format("hh").toString(),
      minute: moment().format("mm").toString(),
      second: moment().format("ss").toString(),
      ampm: moment().format("a").toString(),
    });
  }

  render() {
    const { day, month, date, year, hour, minute, second, ampm } = this.state;
    return (
      <div className="display">

        <div className="date"> 
          <span>{day}</span>        
          <span>{month}</span>
          <span>{date}</span>
          <span>{year}</span>
        </div>

      
        <div className="clock">        
          <span className="clock-element-main">{hour}</span>
          <span className="clock-element-colon">:</span>
          <span className="clock-element-main">{minute}</span>
          <span className="clock-element-colon">:</span>
          <span className="clock-element-main">{second}</span>
          <span className="clock-element-ampm">{ampm}</span>
        </div>
        {/*<div className="clock-labels">
          <span className="clock-element-main">hr</span>
          <span className="clock-element-main">min</span>
          <span className="clock-element-main">sec</span>
    </div>*/}
      
      </div>

    );
  }
}

export default Clock;
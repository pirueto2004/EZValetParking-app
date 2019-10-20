import React, { Component } from 'react';
import './SMSForm.css';

class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '',
        // body: '' //use this if you want to pick up the value entered by user else use the line below
        body: 'Friendly Reminder- Dear valued guest, your vehicle is ready for pickup. Please see us at the valet desk.'
      },
      submitting: false,
      error: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true });
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.message)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: '',
              body: ''
            }
          });
        } else {
          this.setState({
            error: true,
            submitting: false
          });
        }
      });
      setTimeout(function(){ 
        document.getElementById("successMsg").textContent="✅ Message Sent!";
      }, 200);
      // setTimeout(function(){ 
      //   window.location.reload(); 
      // }, 3000);
  }

  onHandleChange(event) {
    const name = event.target.getAttribute('name');
    this.setState({
      message: { ...this.state.message, [name]: event.target.value }
    });
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className={this.state.error ? 'error sms-form' : 'sms-form'}
      >
        <div className="text-center"><span id="successMsg"></span></div>
        
        <div>
          <label htmlFor="to">To:</label>
          <input className="border border-success rounded"
            type="tel"
            name="to"
            id="to"
            value={this.state.message.to}
            onChange={this.onHandleChange}
          />
        </div>
        <div>
          <label htmlFor="body">Message:</label>
          <textarea className="border border-success rounded p-2"
            disabled
            rows = "3" cols = "40" maxlength = "0"
            name="body"
            id="body"
            value={this.state.message.body}
            onChange={this.onHandleChange}
          />
        </div>
        <button className="btn btn-success mx-0" type="submit" disabled={this.state.submitting}>
          Send message
        </button>
      </form>
    );
  }
}

export default SMSForm;

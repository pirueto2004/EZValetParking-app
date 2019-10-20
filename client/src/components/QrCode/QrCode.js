import React, { Component } from "react";
import ReactDOM from 'react-dom';
import QRCode from 'qrcode.react';
// import Vehicle from './Vehicle';


export class Qrcode extends Component {
     state = { customerId: null }

     formatQrValue() {

          if (!this.state.customerId) {
               return "";
          }
          let { customerId, locname, poc, pocphone, vehicleinfo } = this.state;
          return customerId + "," + locname + "," + poc + "," + pocphone + "," + vehicleinfo;
     }
     componentWillReceiveProps(props) {
          if (props.data) {
               this.setState({
                    ...props.data
               })
          }
     }
     render() {
          return (<QRCode value={this.formatQrValue()} />)
     }
}

export default Qrcode;

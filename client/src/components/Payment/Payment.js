import React, { Component } from "react";
import logo from "./cards.png";
import logo1 from "./apple-pay-android-pay-paypal-logos.jpeg";
import "./Payment.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API";

require('dotenv').config();

class Payment extends Component {

  state = {
    loggedIn: false,
    user: null,
   
    }

  constructor() {
    super();

    this.state = {
      isLoading: false,
      stripeToken: null
    };

    // configure Stripe Checkout
    this.stripeHandler = window.StripeCheckout.configure({
      key: "pk_test_Fvlh9tTAOqPUmkpNnSFz7Jsk00qaIR1ha4",
      image: "/assets/images/car.png",
      locale: "auto",
      token: this.onGetStripeToken.bind(this)
    });
  }

  onGetStripeToken(token) {
    // Got Stripe token. This means user's card is valid!
    // We need to continue the payment process by sending this token to our own server.
    // More info: https://stripe.com/docs/charges
    this.setState({ stripeToken: token });
  }

  onClickPay(e) {
    e.preventDefault();
    this.setState({ isLoading: true 
    });
    const onCheckoutOpened = () => {
      this.setState({ isLoading: false });
      setTimeout(function(){ document.getElementById('dollarInput').value=''; }, 1000);
      
    };

    // open Stripe Checkout
    this.stripeHandler.open({
      name: "EZ Valpark",
      description: "Thank you for parking with us",
      // amount: 1000, // 10 USD -> 1000 cents
      amount: document.getElementById("dollarInput").value.trim() * 100, // 10 USD -> 1000 cents
      currency: "usd",
      opened: onCheckoutOpened.bind(this)
    });
  }

   componentDidMount() {
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user
                });
            }
        }).catch(err => {
            console.log(err);
        });
        //console.log(this.props)
    }

  render() {
    var buttonText = this.state.isLoading ? "Please wait ..." : "Pay Now";
    var buttonClassName =
      "Pay-Now" + (this.state.isLoading ? " Pay-Now-Disabled" : "");
    if (this.state.stripeToken) {
      buttonText = "Make Another Payment";
      buttonClassName = "Pay-Now Pay-Now-Disabled";
      document.getElementById("pmtSuccessMsg").textContent="✅ Payment Successful!";
      //window.location='/dashboard';
    }
    
    return (
      <div className="container Pay dashboardPage">
          {this.state.loggedIn ? (
            <div className="Pay1">
              <div className="Pay-header justify-content-center">
                <h1 className="">Payment Options</h1>
                <img src={logo} className=" Pay-logo" alt="logo" />      
              </div>
              <div className="Pay-header">
                <img src={logo1} className=" Pay-logo border border-primary rounded" alt="logo1" />           
              </div>
              {/* <p className="Pay-intro">
                {
                  "Tap the button below to open Stripe's Checkout overlay. Replace <YOUR_STRIPE_PUBLISHABLE_KEY> in Pay.js with your own key."
                }
              </p> */}
              {/* {this.state.stripeToken ? (
                <p className="Pay-intro">
                  {process.env.SKEY +
                    this.state.stripeToken.id +
                    ". Continue payment process in the server."}
                </p>
              ) : null} */}

              <div>            
                $<input id="dollarInput" class="currency border border-success rounded mx-1" data-symbol="$" type="number" placeholder="0.00" min="0.01" step="0.01" title="Currency" pattern="^\d+(?:\.\d{1,2})?$" />
              </div>

              <button
                className={buttonClassName}
                href="/pay"
                onClick={this.onClickPay.bind(this)}
              >
                {buttonText}
              </button>
              <div className="text-center my-4"><span id="pmtSuccessMsg"></span></div>
              </div>
              

              ) :
                (
                    <div className="noUser">
                      {!this.state.loading ? (
                            <>
                                <h4>Please login to continue...</h4>
                                <Link className="loginLink" to="/login"><Button className="loginBtn" color=".bg-success" block>Login</Button></Link>
                            </>
                        ) : (
                                <img id="loadingIcon" src="./assets/images/loading.gif" alt="loading" />
                            )}
                    </div>
                )}
        </div>
        )
    }
}

export default Payment;


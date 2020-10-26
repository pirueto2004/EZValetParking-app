import React, { Component } from "react";
import "./Notify.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API";
import SMSForm from './SMSForm';
require('dotenv').config();

class Notify extends Component {

	state = {
        loggedIn: false,
        user: null
       
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
		return (
		  <div className="Notify dashboardPage">
			{this.state.loggedIn ? (
			<header className="Notify-header">
			<div className="Pay-header">
                <h1><i className="fas fa-sms mx-3"></i>Notification</h1>
            </div>
			  <SMSForm />
			</header>
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
		<br/><br/><br/><br/><br/>  
		  </div>
		);
	  }
}
export default Notify;
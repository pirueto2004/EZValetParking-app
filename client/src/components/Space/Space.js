import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
import "./Space.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API";

class Space extends Component {
    
    state = {
        loggedIn: false,
        user: null,
        avlSpace:80,
        carsParked:20
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
            <div className="dashboardPage">
                {this.state.loggedIn ? (
                    <center>
                        <div>
                            <Row>
                                <Col className="lg-4">
                                    <h2>Available Space: {this.state.avlSpace}</h2>
                                    <h2> Cars Currently Parked: {this.state.carsParked}</h2>
                                </Col>
                            </Row>  
                        </div>
                    </center>
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

export default Space;
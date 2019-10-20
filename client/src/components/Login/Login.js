import React from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import "./Login.css";
 
 
function Login(props) {
    return (
        <div className="card">
            <div className="card-body">
                <div className="loginBox">
                    <h2 className="card-title text-center">Login</h2>
                    <hr/>
                    {props.message ? (
                        <Alert className="animated fadeIn" color="danger">{props.message}</Alert>
                    ) : (<></>)}
                    <Form>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" placeholder="username" value={props.username} onChange={props.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="password" value={props.password} onChange={props.handleInputChange} />
                        </FormGroup>
                        <Button className="btn btn-md mt-2" id="loginBtn" onClick={props.handleLogin} block>Login</Button>
                        <p className="signupLink mb-0">
                            <Link to="/signup" className="signupLink">Don't have an account?  Sign up here</Link>
                        </p>
                    </Form>
                    <br/><br/>
                </div>
            </div>
        </div>
    );
}
 
export default Login;
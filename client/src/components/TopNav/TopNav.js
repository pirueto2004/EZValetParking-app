import React, { Component } from "react";
import Wrapper from "./Wrapper";
import "./TopNav.scss";
import API from "../../utils/API";
// import logo from "./logo2.png";
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            loggedIn: false
        };
    }
    componentDidMount() {
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }
    logout() {
        API.logout().then((data) => {
            window.location.pathname = "/"
        }).catch((err) => {
            console.log(err)
        })
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar className="navbar navbar-expand-lg blue-gradient py-0 text-white"  light expand="md">
                    <div>
                        <img src="assets/images/ez-valpark3.png" width="300" height="auto" className="animated" alt="Transparent MDB Logo" id="animated-img1"/>
                        {/* <p className="d-inline py-0 mt-4">Parking Made Easy</p> */}
 
                    </div>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/"><i className="fas fa-home text-white"></i></NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle className=" text-white" nav caret>
                                    <i className="fas fa-user text-white"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {this.state.loggedIn ? (
                                        <>
                                            <DropdownItem>
                                                <NavLink href="/dashboard">Dashboard</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink onClick={this.logout}>Logout</NavLink>
                                            </DropdownItem>
                                        </>
                                    ) : (
                                            <>
                                                <DropdownItem>
                                                    <NavLink href="/login">Login</NavLink>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavLink href="/signup">Signup</NavLink>
                                                </DropdownItem>
                                            </>
                                        )}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                {/* <Wrapper>
                        <div className="border border-dark rounded" id="ezlogo">
                        <img width="80%" height="80%" src="assets/images/ez-valpark2.png" className="img-fluid rounded mx-auto d-block" alt="Responsive image"/>
                        <h5 className="bg-success text-center text-white mx-2 p-2">Fully Ticketless Valet Solution</h5> 
                        </div>    
                </Wrapper> */}
                <Wrapper className="view">
                        {/* <div className="border border-success rounded p-2 bg-white" id="parking3">
                        <img width="100%" height="100%" src="assets/images/parkingimg3.png" className="img-fluid rounded mx-auto d-block" alt="Responsive image"/>
                        </div>     */}
                        
                </Wrapper>
            </div>
        );
    }
}
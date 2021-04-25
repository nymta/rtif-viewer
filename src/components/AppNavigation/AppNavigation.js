import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
import logo from "../../logo.svg";

function AppNavigation(props) {
    return <Navbar variant="dark" bg="dark" className="flex-shrink-0">
        <LinkContainer to="/">
            <Navbar.Brand >
                <img alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    style={{filter: "invert(100%)"}}/>{' '}
                RTIF Viewer
            </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <LinkContainer to="/" exact>
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                {
                    props.isLoaded &&
                    <>
                        <NavDropdown title="Geographies" id="geographies-dropdown">
                            <LinkContainer to="/view/geographies/table">
                                <NavDropdown.Item>
                                    Table
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/view/geographies/map">
                                <NavDropdown.Item>
                                    Map
                                </NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        <LinkContainer to="/view/applicabilities">
                            <Nav.Link>Applicability</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/view/trips">
                            <Nav.Link>Trips</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/view/stopGraph">
                            <Nav.Link>Stop Graph</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/view/mareyDiagram">
                            <Nav.Link>Marey Diagram</Nav.Link>
                        </LinkContainer>
                    </>
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}

export default AppNavigation;

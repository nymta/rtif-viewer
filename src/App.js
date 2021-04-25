import "@elastic/eui/dist/eui_theme_light.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {Alert, Col, Container, Row} from "react-bootstrap";
import {Redirect, Route, Switch} from "react-router-dom";
import React, {useState} from "react";
import {
    ApplicabilityViewer,
    AppNavigation,
    GeographyMap,
    GeographyViewer,
    LandingPage,
    MareyDiagram,
    StopGraph,
    TripStopsViewer,
    TripViewer,
} from "./components";
import {ErrorBoundary} from "react-error-boundary";

function ErrorFallback({error, resetErrorBoundary}) {
    return <Alert variant={"danger"}>
        <Alert.Heading>Error</Alert.Heading>
        <p>
            An error occurred: <pre>{error.message}</pre>
        </p>
        <Alert.Link onClick={() => {
            resetErrorBoundary()
        }}>Reset</Alert.Link>
    </Alert>;
}

function App() {
    const [rtif, setRtif] = useState(new Map());

    const isLoaded = !!rtif && rtif.has("timetable");

    return <Container fluid className={"d-flex flex-column vh-100 overflow-hidden"}>
        <AppNavigation isLoaded={isLoaded}/>
        <Row className="flex-grow-1 overflow-hidden" style={{"marginBottom": "10px"}}>
            <Col className="mh-100">
                <ErrorBoundary
                    fallbackRender={ErrorFallback}>
                    <Switch>
                        <Route exact path="/" render={routeProps => (
                            <LandingPage rtif={rtif} setRtif={setRtif} {...routeProps} />
                        )}/>
                        {isLoaded &&
                        <>
                            <Route exact path="/view/applicabilities" render={routeProps => (
                                <ApplicabilityViewer rtif={rtif} {...routeProps} />
                            )}/>
                            <Route exact path="/view/geographies/table" render={routeProps => (
                                <GeographyViewer rtif={rtif} {...routeProps} />
                            )}/>
                            <Route exact path="/view/geographies/map" render={routeProps => (
                                <GeographyMap rtif={rtif} {...routeProps} />
                            )}/>
                            <Route exact path="/view/trips" render={routeProps => (
                                <TripViewer rtif={rtif} {...routeProps} />
                            )}/>
                            <Route path="/view/trips/:tripName" render={routeProps => (
                                <TripStopsViewer rtif={rtif} {...routeProps} />
                            )}/>
                            <Route exact path="/view/stopGraph" render={routeProps => (
                                <StopGraph rtif={rtif} {...routeProps} />
                            )}/>
                            <Route exact path="/view/mareyDiagram" render={routeProps => (
                                <MareyDiagram rtif={rtif} {...routeProps} />
                            )}/>
                        </>
                        }
                        <Route>
                            <Redirect to="/"/>
                        </Route>
                    </Switch>
                </ErrorBoundary>
            </Col>
        </Row>
        {/*            <Row className="flex-shrink-0 bg-light">
                <Col lg="12" className="py-1">
                    <p>Footer ...</p>
                </Col>
            </Row>*/}
    </Container>;
}

export default App;

import "./App.scss";
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
import {EuiErrorBoundary, EuiFlexGroup, EuiFlexItem, EuiSpacer} from "@elastic/eui";

function App() {
    const [rtif, setRtif] = useState(new Map());

    const isLoaded = !!rtif && rtif.has("timetable");

    return <EuiFlexGroup className="appContainer" direction="column" gutterSize="none">
        <EuiFlexItem grow={false}>
            <AppNavigation isLoaded={isLoaded}/>
            <EuiSpacer size={"s"}/>
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiErrorBoundary>
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
            </EuiErrorBoundary>
        </EuiFlexItem>
    </EuiFlexGroup>;
}

export default App;

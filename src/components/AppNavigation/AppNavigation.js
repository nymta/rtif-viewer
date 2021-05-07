import React from "react";
import {
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderLogo,
} from "@elastic/eui";
import LinkContainer from "../../LinkContainer";

function AppNavigation({ isLoaded }) {
  const loadedNavigation = isLoaded && (
    <EuiHeaderLinks>
      <LinkContainer to="/view/geographies/table">
        <EuiHeaderLink>Geographies</EuiHeaderLink>
      </LinkContainer>
      <LinkContainer to="/view/geographies/map">
        <EuiHeaderLink>Map</EuiHeaderLink>
      </LinkContainer>
      <LinkContainer to="/view/applicabilities">
        <EuiHeaderLink>Applicability</EuiHeaderLink>
      </LinkContainer>
      <LinkContainer to="/view/trips">
        <EuiHeaderLink>Trips</EuiHeaderLink>
      </LinkContainer>
      <LinkContainer to="/view/stopGraph">
        <EuiHeaderLink>Stop Graph</EuiHeaderLink>
      </LinkContainer>
      <LinkContainer to="/view/mareyDiagram">
        <EuiHeaderLink>Marey Diagram</EuiHeaderLink>
      </LinkContainer>
    </EuiHeaderLinks>
  );

  return (
    <EuiHeader
      theme={"dark"}
      sections={[
        {
          items: [
            <LinkContainer to={"/"} exact>
              <EuiHeaderLogo iconType={"visTable"} iconTitle={""}>
                RTIF Viewer
              </EuiHeaderLogo>
            </LinkContainer>,
            loadedNavigation,
          ],
          borders: "right",
        },
      ]}
    />
  );
}

export default AppNavigation;

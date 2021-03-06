import React from "react";

import { EuiFlexGroup, EuiFlexItem, EuiPageTemplate } from "@elastic/eui";

import LeftCard from "./LeftCard";
import RightCard from "./RightCard";

import "./LandingPage.css";

function LandingPage({ rtif: theRtif, setRtif }) {
  return (
    <EuiPageTemplate grow={true} direction={"row"} paddingSize={"s"}>
      <EuiFlexGroup direction="column" gutterSize={"none"}>
        <EuiFlexItem grow={false}>
          <EuiFlexGroup direction={"row"}>
            <EuiFlexItem>
              <LeftCard rtif={theRtif} />
            </EuiFlexItem>
            <EuiFlexItem>
              <RightCard rtif={theRtif} setRtif={setRtif} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPageTemplate>
  );
}

export default LandingPage;

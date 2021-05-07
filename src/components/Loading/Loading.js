import React from "react";

import {
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
  EuiPageTemplate,
  EuiPanel,
} from "@elastic/eui";

function Loading() {
  return (
    <EuiPageTemplate
      grow={false}
      direction={"row"}
      paddingSize={"s"}
      restrictWidth={true}
    >
      <EuiFlexGroup direction="column" gutterSize={"none"}>
        <EuiFlexItem>
          <EuiPanel>
            <EuiEmptyPrompt
              title={<EuiLoadingSpinner size="xl" />}
              body={"Loading..."}
            />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPageTemplate>
  );
}

export default Loading;

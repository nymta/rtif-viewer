import {
  EuiFlexItem,
  EuiHealth,
  EuiI18nNumber,
  EuiPanel,
  EuiSpacer,
  EuiStat,
} from "@elastic/eui";
import React from "react";

function RtifStat({ description, countedValue, controlValue }) {
  // eslint-disable-next-line eqeqeq
  const isValid = countedValue == controlValue,
    healthColor = isValid ? "success" : "danger",
    healthText = isValid
      ? "Valid"
      : "Counted " + countedValue + ", expected " + controlValue;

  return (
    <EuiFlexItem className={"rtifStat"}>
      <EuiPanel>
        <EuiStat
          title={<EuiI18nNumber value={countedValue} />}
          description={description}
        >
          <EuiSpacer size={"xs"} />
          <EuiHealth textSize={"xs"} color={healthColor}>
            {healthText}
          </EuiHealth>
        </EuiStat>
      </EuiPanel>
    </EuiFlexItem>
  );
}

export default RtifStat;

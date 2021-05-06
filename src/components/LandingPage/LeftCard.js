import { formatTimetableName } from "../../parser";
import { DateTime } from "luxon";
import React from "react";
import { EuiCard, EuiText, EuiTitle } from "@elastic/eui";

function LeftCard({ rtif: theRtif }) {
  return (
    <EuiCard title={"Timetable Information"}>
      {!theRtif.has("timetable") ? (
        <>
          <EuiTitle className={"eui-textLeft"} size={"xs"}>
            <h2>No timetable loaded</h2>
          </EuiTitle>
          <EuiText textAlign={"left"}>
            Please select a timetable to view.
          </EuiText>
        </>
      ) : (
        <>
          <EuiTitle className={"eui-textLeft"} size={"xs"}>
            <h2>Timetable {formatTimetableName(theRtif.get("timetable"))}</h2>
          </EuiTitle>
          <EuiText textAlign={"left"}>
            RTIF version {theRtif.get("timetable").get("rtifVersionNumber")}
            <br />
            Generated{" "}
            {DateTime.fromFormat(
              theRtif.get("timetable").get("generationDate"),
              "yyyyMMdd"
            ).toLocaleString(DateTime.DATE_HUGE)}
            <br />
            {theRtif.get("geography").size} geographies
            <br />
            {theRtif.get("applicability").get("periods").length} applicability
            periods
            <br />
            {theRtif.get("trip").size} trips
          </EuiText>
        </>
      )}
    </EuiCard>
  );
}

export default LeftCard;

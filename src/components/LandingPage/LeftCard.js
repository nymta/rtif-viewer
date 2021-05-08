import React from "react";

import {
  EuiCard,
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiStat,
} from "@elastic/eui";
import { DateTime } from "luxon";
import spliceString from "splice-string";

import { formatTimetableName } from "../../parser";
import RtifStat from "./RtifStat";

function LeftCard({ rtif: theRtif }) {
  return (
    <EuiCard title={"Timetable Information"} padding={"l"} display="subdued">
      {!theRtif.has("timetable") ? (
        <EuiPanel>
          <EuiEmptyPrompt
            title={<h2>No timetable loaded</h2>}
            body={<p>Please select a timetable to view.</p>}
          />
        </EuiPanel>
      ) : (
        <>
          <EuiFlexGroup direction={"row"} wrap>
            <EuiFlexItem className={"rtifStat"}>
              <EuiPanel>
                <EuiStat
                  title={formatTimetableName(theRtif.get("timetable"))}
                  description="Timetable"
                  titleSize={"s"}
                  textAlign="left"
                >
                  <EuiIcon type="empty" />
                </EuiStat>
              </EuiPanel>
            </EuiFlexItem>

            <EuiFlexItem className={"rtifStat"}>
              <EuiPanel>
                <EuiStat
                  title={DateTime.fromFormat(
                    theRtif.get("timetable").get("generationDate"),
                    "yyyyMMdd"
                  ).toLocaleString(DateTime.DATE_FULL)}
                  description="Generation date"
                  titleSize={"s"}
                  textAlign="left"
                >
                  <EuiIcon type="empty" />
                </EuiStat>
              </EuiPanel>
            </EuiFlexItem>

            <EuiFlexItem className={"rtifStat"}>
              <EuiPanel>
                <EuiStat
                  title={spliceString(
                    theRtif.get("timetable").get("rtifVersionNumber"),
                    1,
                    0,
                    "."
                  )}
                  description="RTIF version"
                  textAlign="left"
                >
                  <EuiIcon type="empty" />
                </EuiStat>
              </EuiPanel>
            </EuiFlexItem>

            <RtifStat
              description={"Geographies"}
              countedValue={theRtif.get("geography").size}
              controlValue={theRtif.get("control").get("geographyControl")}
            />

            <RtifStat
              description={"Applicabilities"}
              countedValue={
                theRtif.get("applicability").get("allDay")
                  ? 1
                  : theRtif.get("applicability").get("periods").length
              }
              controlValue={theRtif.get("control").get("applicabilityControl")}
            />

            <RtifStat
              description={"Trips"}
              countedValue={theRtif.get("trip").size}
              controlValue={theRtif.get("control").get("tripControl")}
            />

            <RtifStat
              description={"Revenue Trips"}
              countedValue={
                Array.from(theRtif.get("trip").values()).filter(
                  (theTrip) => theTrip.get("tripType") === 1
                ).length
              }
              controlValue={theRtif.get("control").get("revenueTripControl")}
            />

            <RtifStat
              description={"Events"}
              countedValue={Array.from(theRtif.get("trip").values())
                .map((theTrip) => theTrip.get("event").length)
                .reduce((x, y) => x + y, 0)}
              controlValue={theRtif.get("control").get("eventControl")}
            />
          </EuiFlexGroup>
        </>
      )}
    </EuiCard>
  );
}

export default LeftCard;

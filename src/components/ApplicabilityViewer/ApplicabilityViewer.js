import React from "react";
import DataTable from "../DataTable";
import {
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageTemplate,
  EuiPanel,
} from "@elastic/eui";

const columns = [
  {
    id: "locationName",
    displayAsText: "Location Name",
    schema: "rtifLocation",
  },
  {
    id: "startingTime",
    displayAsText: "Starting Time",
    schema: "rtifTime",
  },
  {
    id: "endingTime",
    displayAsText: "Ending Time",
    schema: "rtifTime",
  },
  {
    id: "direction",
    displayAsText: "Direction",
    schema: "string",
  },
];

function ApplicabilityViewer({ rtif: theRtif }) {
  const applicability = theRtif.get("applicability");

  return (
    <EuiPageTemplate
      grow={!applicability.get("allDay")}
      direction={"row"}
      paddingSize={"s"}
      restrictWidth={applicability.get("allDay")}
    >
      <EuiFlexGroup direction="column" gutterSize={"none"}>
        <EuiFlexItem>
          {applicability.get("allDay") ? (
            <EuiPanel>
              <EuiEmptyPrompt
                iconType="calendar"
                title={<h2>All-day timetable</h2>}
                body={
                  <p>
                    This is an all-day timetable and has no applicability
                    records.
                  </p>
                }
              />
            </EuiPanel>
          ) : (
            <DataTable
              columns={columns}
              dataRows={applicability.get("periods")}
              renderContext={theRtif}
              initialSort={[
                { id: "direction", direction: "asc" },
                { id: "startingTime", direction: "asc" },
              ]}
            />
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPageTemplate>
  );
}

export default ApplicabilityViewer;

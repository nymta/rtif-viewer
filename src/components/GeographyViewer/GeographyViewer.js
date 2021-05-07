import React from "react";

import { EuiFlexGroup, EuiFlexItem, EuiPageTemplate } from "@elastic/eui";

import DataTable from "../DataTable";

const columns = [
  {
    id: "locationName",
    displayAsText: "Location Name",
    schema: "string",
  },
  {
    id: "shortName",
    displayAsText: "Short Name",
    schema: "string",
  },
  {
    id: "longName",
    displayAsText: "Long Name",
    schema: "string",
  },
  {
    id: "easting",
    displayAsText: "Easting",
    schema: "numeric",
  },
  {
    id: "northing",
    displayAsText: "Northing",
    schema: "numeric",
  },
  {
    id: "latitude",
    displayAsText: "Latitude",
    schema: "numeric",
    defaultDisplay: false,
  },
  {
    id: "longitude",
    displayAsText: "Longitude",
    schema: "numeric",
    defaultDisplay: false,
  },
];

function GeographyViewer({ rtif: theRtif }) {
  const geographies = Array.from(theRtif.get("geography").values());

  return (
    <EuiPageTemplate
      grow={true}
      direction={"row"}
      paddingSize={"s"}
      restrictWidth={false}
    >
      <EuiFlexGroup direction="column" gutterSize={"none"}>
        <EuiFlexItem>
          <DataTable
            columns={columns}
            dataRows={geographies}
            renderContext={theRtif}
            initialSort={[{ id: "locationName", direction: "asc" }]}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPageTemplate>
  );
}

export default GeographyViewer;

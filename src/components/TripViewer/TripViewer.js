import React, { useMemo } from "react";
import DataTable from "../DataTable";
import { EuiFlexGroup, EuiFlexItem, EuiPageTemplate } from "@elastic/eui";

const columns = [
  {
    id: "tripName",
    displayAsText: "Trip",
    schema: "rtifTripName",
    initialWidth: 150,
  },
  {
    id: "originLocation",
    displayAsText: "Origin Location",
    schema: "rtifLocation",
    initialWidth: 150,
  },
  {
    id: "originTime",
    displayAsText: "Origin Departure Time",
    schema: "rtifTime",
    initialWidth: 150,
  },
  {
    id: "direction",
    displayAsText: "Direction",
    schema: "string",
  },
  {
    id: "tripType",
    displayAsText: "Trip Type",
    schema: "rtifTripType",
  },
  {
    id: "destinationLocation",
    displayAsText: "Destination Location",
    schema: "rtifLocation",
    initialWidth: 150,
  },
  {
    id: "destinationTime",
    displayAsText: "Destination Arrival Time",
    schema: "rtifTime",
    initialWidth: 150,
  },
  {
    id: "workProgramId",
    displayAsText: "Work Program ID",
    schema: "string",
    defaultDisplay: false,
  },
  {
    id: "runNumber",
    displayAsText: "Run Number",
    schema: "numeric",
  },
  {
    id: "path",
    displayAsText: "Path",
    schema: "string",
  },
  {
    id: "tripLine",
    displayAsText: "Trip Line",
    schema: "string",
  },
  {
    id: "equipmentType",
    displayAsText: "Equipment Type",
    schema: "string",
  },
  {
    id: "carsRequired",
    displayAsText: "Cars Required",
    schema: "numeric",
  },
  {
    id: "reliefWorkProgramId",
    displayAsText: "Relief Work Program ID",
    schema: "string",
    defaultDisplay: false,
  },
  {
    id: "reliefRunNumber",
    displayAsText: "Relief Run Number",
    schema: "numeric",
    defaultDisplay: false,
  },
  {
    id: "reliefLocation",
    displayAsText: "Relief Location",
    schema: "rtifLocation",
    defaultDisplay: false,
  },
  {
    id: "reliefDepartureTime",
    displayAsText: "Relief Departure Time",
    schema: "rtifTime",
    defaultDisplay: false,
  },
  {
    id: "nextTripType",
    displayAsText: "Next Trip Type",
    schema: "rtifTripType",
  },
  {
    id: "nextTripTime",
    displayAsText: "Next Trip Time",
    schema: "rtifTime",
  },
  {
    id: "crewing",
    displayAsText: "Crewing",
    schema: "rtifCrewing",
  },
];

function TripViewer({ rtif: theRtif }) {
  const trips = useMemo(() => Array.from(theRtif.get("trip").values()), [
    theRtif,
  ]);

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
            dataRows={trips}
            renderContext={theRtif}
            initialSort={[{ id: "originTime", direction: "asc" }]}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPageTemplate>
  );
}

export default TripViewer;

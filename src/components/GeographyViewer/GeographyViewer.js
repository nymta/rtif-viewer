import React from "react";
import {Col, Row} from "react-bootstrap";
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
        defaultDisplay: false
    },
    {
        id: "longitude",
        displayAsText: "Longitude",
        schema: "numeric",
        defaultDisplay: false
    },
];

function GeographyViewer({rtif: theRtif}) {
    const geographies = Array.from(theRtif.get("geography").values());

    return <Row className={"flex-grow-1 h-100 mh-100"}>
        <Col className={"h-100 mh-100"}>
            <DataTable
                columns={columns}
                dataRows={geographies}
                renderContext={theRtif}
                initialSort={[
                    {id: 'locationName', direction: 'asc'},
                ]}
            />
        </Col>
    </Row>;
}

export default GeographyViewer;

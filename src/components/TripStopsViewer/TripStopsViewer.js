import React, {useMemo} from "react";
import {Col, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import DataTable from "../DataTable";

const columns = [
    {
        id: "location",
        displayAsText: "Location",
        schema: "rtifLocation",
    },
    {
        id: "track",
        displayAsText: "Track",
        schema: "string",
    },
    {
        id: "eventTime",
        displayAsText: "Event Time",
        schema: "rtifTime",
    },
    {
        id: "eventType",
        displayAsText: "Event Type",
        schema: "rtifEventType",
    },
    {
        id: "stopFlag",
        displayAsText: "Stop Flag",
        schema: "rtifStopFlag",
    },
    {
        id: "timepointFlag",
        displayAsText: "Timepoint Flag",
        schema: "rtifTimepointFlag",
    },
];

function TripStopsViewer({rtif: theRtif}) {
    const {tripName} = useParams();
    const theTrip = theRtif.get("trip").get(tripName);
    const tripStops = useMemo(() => theTrip.get("event"), [theTrip]);

    return <div className={"mh-100 h-100 d-flex flex-column"}>
        <Row className={"flex-shrink-0"}>
            <Col>
                <h3>Trip {theTrip.get("tripName")}</h3>
            </Col>
        </Row>
        <Row className={"flex-grow-1 h-100 mh-100"}>
            <Col className={"h-100 mh-100"}>
                <DataTable
                    columns={columns}
                    dataRows={tripStops}
                    renderContext={theRtif}
                    initialSort={[
                        {id: 'eventTime', direction: 'asc'}
                    ]}
                />
            </Col>
        </Row>
    </div>;
}

export default TripStopsViewer;

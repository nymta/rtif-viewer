import React from "react";
import {Col, Row} from "react-bootstrap";
import DataTable from "../DataTable";
import {EuiEmptyPrompt} from "@elastic/eui";

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

function ApplicabilityViewer({rtif: theRtif}) {
    const applicability = theRtif.get("applicability");

    return <Row className={"flex-grow-1 h-100 mh-100"}>
        <Col className={"h-100 mh-100"}>
            {
             applicability.get("allDay")
                 ?
                     <EuiEmptyPrompt
                         iconType="calendar"
                         title={<h2>All-day timetable</h2>}
                         body={
                                 <p>
                                     This is an all-day timetable and has no applicability records.
                                 </p>
                         }
                     />
                 : <DataTable
                     columns={columns}
                     dataRows={applicability.get("periods")}
                     renderContext={theRtif}
                     initialSort={[
                         {id: 'direction', direction: 'asc'},
                         {id: 'startingTime', direction: 'asc'}
                     ]}
                 />
            }


        </Col>
    </Row>;
}

export default ApplicabilityViewer;

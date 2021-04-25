import {Card} from "react-bootstrap";
import {formatTimetableName} from "../../parser";
import {DateTime} from "luxon";
import React from "react";


function LeftCard({rtif: theRtif}) {
    return <Card>
        <Card.Header>Timetable Information</Card.Header>
        <Card.Body>
            {
                !theRtif.has("timetable") ?
                    <>
                        <Card.Title>No timetable loaded</Card.Title>
                        <Card.Text>
                            Please select a timetable to view.
                        </Card.Text>
                    </> :
                    <>
                        <Card.Title>Timetable {formatTimetableName(theRtif.get("timetable"))}</Card.Title>
                        <Card.Text>
                            RTIF version {theRtif.get("timetable").get("rtifVersionNumber")}<br/>
                            Generated {DateTime.fromFormat(theRtif.get("timetable").get("generationDate"), "yyyyMMdd").toLocaleString(DateTime.DATE_HUGE)}<br/>
                            {theRtif.get("geography").size} geographies<br/>
                            {theRtif.get("applicability").get("periods").length} applicability periods<br/>
                            {theRtif.get("trip").size} trips

                        </Card.Text>
                    </>
            }
        </Card.Body>
    </Card>;
}

export default LeftCard;

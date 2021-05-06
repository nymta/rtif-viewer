import React, {useMemo} from "react";
import {useParams} from "react-router-dom";
import DataTable from "../DataTable";
import {EuiFlexGroup, EuiFlexItem, EuiPageTemplate} from "@elastic/eui";

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

    return <EuiPageTemplate
        grow={true}
        direction={"row"}
        paddingSize={"s"}
        restrictWidth={false}
        pageHeader={{
            iconType: "calendar",
            pageTitle: "Trip " + theTrip.get("tripName"),
        }}>
        <EuiFlexGroup direction="column" gutterSize={"none"}>
            <EuiFlexItem>
                <DataTable
                    columns={columns}
                    dataRows={tripStops}
                    renderContext={theRtif}
                    initialSort={[
                        {id: "eventTime", direction: "asc"},
                    ]}
                />
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiPageTemplate>;
}

export default TripStopsViewer;

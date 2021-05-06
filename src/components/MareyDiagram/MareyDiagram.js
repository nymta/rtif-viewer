import React from "react";
import Plot from "react-plotly.js";
import {buildSortedStopList} from "../../stopGraph";
import _ from "lodash";
import Plotly from "plotly.js/dist/plotly";
import {formatLocation, formatTime, formatTimetableName} from "../../parser";
import {routeColors} from "../../parser/constants";
import {EuiFlexGroup, EuiFlexItem, EuiPageTemplate} from "@elastic/eui";


//This is awful and ugly and also unavoidable: https://github.com/plotly/plotly.js/issues/1464
const pristineLocale = Plotly.d3.locale;
Plotly.d3.locale = (locale) => {
    const result = pristineLocale(locale);
    const pristineNumberFormat = result.numberFormat;
    result.numberFormat = (format) => {
        switch (format) {
            case "rtifTime":
                return x => formatTime(x);
            default:
                return pristineNumberFormat(format);
        }
    }
    return result;
}

function applicabilityShapesForDirection(theRtif, direction, sortedStopList, namer) {
    return theRtif
        .get("applicability")
        .get("periods")
        .filter(applicability => _.includes(sortedStopList, namer(applicability.get("locationName"))))
        .filter(applicability => applicability.get("direction") === direction)
        .map(applicability => {
            const yIndex = _.indexOf(sortedStopList, namer(applicability.get("locationName")));

            return {
                type: "line",
                layer: "below",
                xref: "x",
                yref: "y",
                x0: applicability.get("startingTime"),
                y0: yIndex,
                x1: applicability.get("endingTime"),
                y1: yIndex,
                opacity: 0.5,
                line: {color: "gray", dash: "solid", width: 5},
            }
        });
}

function colorForTrip(trip, theRtif) {
    const line = _.trimEnd(trip.get("tripLine") || theRtif.get("timetable").get("lineIdentifier"), "X")

    return "#" + (routeColors.get(line) || "0039A6");
}

function MareyDiagram({rtif: theRtif}) {
    const geographies = theRtif.get("geography");

    const counts = _.countBy(Array.from(geographies.values()), stop => {
        return formatLocation(stop.get("locationName"), geographies);
    });

    function namer(stop) {
        return formatLocation(stop, geographies) + (counts[formatLocation(stop, geographies)] > 1 ? ` (${stop})` : "");
    }

    const sortedStopList = _.reverse(
        buildSortedStopList(theRtif)
            .map(location => {
                return namer(location);
            }),
    );

    const revenueTrips = _.sortBy(
        Array.from(theRtif.get("trip").values())
            .filter(trip => trip.get("tripType") === 1),
        (trip) => trip.get("originTime"),
    );

    const data = revenueTrips
        .map(trip => {
                const tripEvents = trip.get("event");
                return {
                    type: "scattergl",
                    mode: "lines+markers",
                    name: trip.get("tripName"),
                    line: {color: colorForTrip(trip, theRtif)},
                    x: tripEvents.map(event => event.get("eventTime")), //times
                    y: tripEvents.map(event => namer(event.get("location"))), //stops
                    //legendgroup: trip.get("path")
                };
            },
        );

    const seriesDirections = revenueTrips.map(trip => trip.get("direction"));

    function seriesVisibility(directions) {
        return seriesDirections.map(e => _.includes(directions, e));
    }

    const northboundApplicabilityShapes = applicabilityShapesForDirection(theRtif, "N", sortedStopList, namer);
    const southboundApplicabilityShapes = applicabilityShapesForDirection(theRtif, "S", sortedStopList, namer);

    const layout = {
        autosize: true,
        dragmode: "pan",
        hovermode: "closest",
        hoverlabel: {namelength: -1},
        title: formatTimetableName(theRtif.get("timetable")),
        xaxis: {
            type: "linear",
            tickformat: "rtifTime",
        },
        yaxis: {
            type: "category",
            categoryorder: "array",
            categoryarray: sortedStopList,
            automargin: true,
        },
        margin: {t: 20, l: 20, b: 20, r: 20},
        font: {
            family: "\"Inter\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
        },
        shapes: [],
        updatemenus: [
            {
                type: "dropdown",
                direction: "down",
                x: 0.1,
                y: 1.1,
                buttons: [
                    {
                        method: "update",
                        label: "All Trips",
                        args: [{visible: seriesVisibility(["N", "S"])}],
                    },
                    {
                        method: "update",
                        label: "Northbound Trips",
                        args: [{visible: seriesVisibility(["N"])}],

                    },
                    {
                        method: "update",
                        label: "Southbound Trips",
                        args: [{visible: seriesVisibility(["S"])}],

                    },
                    {
                        method: "update",
                        label: "No Trips",
                        args: [{visible: seriesVisibility([])}],
                    },
                ],
            },
            {
                type: "dropdown",
                direction: "down",
                x: 0.3,
                y: 1.1,
                active: 3,
                buttons: [
                    {
                        method: "update",
                        label: "All Applicability",
                        args: [{}, {shapes: [...northboundApplicabilityShapes, ...southboundApplicabilityShapes]}],

                    },
                    {
                        method: "update",
                        label: "Northbound Applicability",
                        args: [{}, {shapes: northboundApplicabilityShapes}],
                    },
                    {
                        method: "update",
                        label: "Southbound Applicability",
                        args: [{}, {shapes: southboundApplicabilityShapes}],
                    },
                    {
                        method: "update",
                        label: "No Applicability",
                        args: [{}, {shapes: []}],
                    },
                ],
            },
        ],
    };

    return <EuiPageTemplate
        grow={true}
        direction={"row"}
        paddingSize={"s"}
        restrictWidth={false}>
        <EuiFlexGroup direction="column" gutterSize={"none"}>
            <EuiFlexItem>
                <Plot
                    data={data}
                    layout={layout}
                    config={{responsive: true, scrollZoom: true}}
                    style={{height: "100%", width: "100%"}}
                    useresizehandler={true}
                />
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiPageTemplate>;
}

export default MareyDiagram;

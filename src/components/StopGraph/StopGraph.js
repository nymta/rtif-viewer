import {Col, Row} from "react-bootstrap";
import React from "react";
import CytoscapeComponent from "react-cytoscapejs/src/component";
import CytoscapeDagre from "cytoscape-dagre";
import Cytoscape from "cytoscape";
import {buildStopGraph} from "../../stopGraph";

Cytoscape.use(CytoscapeDagre);

const cytoscapeStyles = [
    {
        selector: "node",
        style: {
            width: 120,
            height: 35,
            shape: "rectangle",
            label: "data(label)",
            color: "black",
            "text-valign": "center",
            "text-halign": "center",
        },
    },
    {
        selector: "edge",
        style: {
            width: 5,
            "target-arrow-shape": "triangle",
            "curve-style": "taxi",

        },
    },
];

function StopGraph({rtif: theRtif}) {
    const cyInput = buildStopGraph(theRtif);

    return <Row className={"flex-grow-1 h-100 mh-100"}>
        <Col className={"h-100 mh-100"}>
            <CytoscapeComponent elements={cyInput}
                                layout={{name: "dagre", nodeDimensionsIncludeLabels: true}}
                                autoungrabify={true}
                                autounselectify={true}
                                style={{width: "100%", height: "100%"}}
                                stylesheet={cytoscapeStyles}
            />
        </Col>
    </Row>;
}

export default StopGraph;

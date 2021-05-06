import React from "react";
import CytoscapeComponent from "react-cytoscapejs/src/component";
import CytoscapeDagre from "cytoscape-dagre";
import Cytoscape from "cytoscape";
import { buildStopGraph } from "../../stopGraph";
import { EuiFlexGroup, EuiFlexItem, EuiPageTemplate } from "@elastic/eui";

Cytoscape.use(CytoscapeDagre);

const cytoscapeStyles = [
  {
    selector: "node",
    style: {
      width: 100,
      height: 35,
      shape: "rectangle",
      label: "data(label)",
      color: "black",
      "text-valign": "center",
      "text-halign": "center",
      //Note BlinkMacSystemFont excluded below due to https://crbug.com/1056386
      "font-family":
        '"Inter", -apple-system, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
  },
  {
    selector: "edge",
    style: {
      width: 3,
      "target-arrow-shape": "triangle",
      "curve-style": "taxi",
    },
  },
];

function StopGraph({ rtif: theRtif }) {
  const cyInput = buildStopGraph(theRtif);

  return (
    <EuiPageTemplate
      grow={true}
      direction={"row"}
      paddingSize={"s"}
      restrictWidth={false}
    >
      <EuiFlexGroup direction="column" gutterSize={"none"}>
        <EuiFlexItem>
          <CytoscapeComponent
            elements={cyInput}
            layout={{ name: "dagre", nodeDimensionsIncludeLabels: true }}
            autoungrabify={true}
            autounselectify={true}
            minZoom={0.5}
            maxZoom={2}
            style={{ width: "100%", height: "100%" }}
            stylesheet={cytoscapeStyles}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPageTemplate>
  );
}

export default StopGraph;

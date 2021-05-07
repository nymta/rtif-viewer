import Cytoscape from "cytoscape";

import topoSort from "../topoSort";
import buildStopGraph from "./stopGraph";

Cytoscape.use(topoSort);

function buildSortedStopList(theRtif) {
  const cy = Cytoscape({
    elements: buildStopGraph(theRtif),
    headless: true,
  });

  return cy.elements().topoSort();
}

export default buildSortedStopList;

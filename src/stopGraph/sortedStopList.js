import Cytoscape from "cytoscape";

import buildStopGraph from "./stopGraph";
import topoSort from "../topoSort";

Cytoscape.use(topoSort);

function buildSortedStopList(theRtif) {
  const cy = Cytoscape({
    elements: buildStopGraph(theRtif),
    headless: true,
  });

  return cy.elements().topoSort();
}

export default buildSortedStopList;

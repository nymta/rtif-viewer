import impl from "./topoSort";

const register = function (cytoscape) {
  if (!cytoscape) {
    return;
  }

  cytoscape("collection", "topoSort", impl);
};

export default register;

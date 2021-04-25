import impl from "./topoSort";
// registers the extension on a cytoscape lib ref
const register = function (cytoscape) {
    if (!cytoscape) {
        return;
    } // can't register if cytoscape unspecified

    cytoscape("collection", "topoSort", impl); // register with cytoscape.js
};

export default register;

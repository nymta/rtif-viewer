import toposort from "toposort";

function topoSort() {
    const eles = this;
    //const cy = this.cy();

    const nodes = eles.nodes().map(node => node.id());
    const edges = eles.edges().map(edge => [edge.source().id(), edge.target().id()]);

    return toposort.array(nodes, edges);
}

export default topoSort;

import _ from "lodash";

//TODO: per-direction graphs
function buildStopGraph(theRtif) {
    const geographies = theRtif.get("geography");
    const revenueTrips = Array.from(theRtif.get("trip").values()).filter(trip => trip.get("tripType") === 1);

    const allEdges = _.uniqWith(revenueTrips.flatMap(trip => {
        const events = trip.get("event");

        const tripLocations = events.map(event => event.get("location"));

        if (trip.get("direction") !== "S") {
            _.reverse(tripLocations);
        }

        const froms = tripLocations;
        const tos = _.slice(tripLocations, 1);

        return _.zip(froms, tos).filter(([from, to]) => !!from && !!to && from !== to);
    }), _.isEqual);

    const allNodes = _.uniq(_.flatten(allEdges));

    const cyInput = _.concat(
        allNodes.map(node => ({data: {id: node, label: geographies.get(node).get("shortName")}})),
        allEdges.map(([from, to]) => ({data: {source: from, target: to}})),
    );

    return cyInput;
}

export default buildStopGraph;

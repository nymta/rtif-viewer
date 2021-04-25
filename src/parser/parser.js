import {formatTripName} from "./utils";

export default function parseRtif(rtifString) {
    const lines = rtifString.match(/[^\r\n]+/g);

    const rtif = new Map();

    rtif.set('timetable', readTimetable(lines));
    rtif.set('geography', readGeography(lines));
    rtif.set('applicability', readApplicability(lines));
    rtif.set('trip', readTrip(lines, rtif.get('timetable')));
    rtif.set('control', readControl(lines));

    return rtif;
}

function readTimetable(lines) {
    const timetableLine = next(lines);

    return parseLine(timetableLine, [
        ['recordType', 1, 2, cleanInt],
        ['lineIdentifier', 3, 6, cleanString],
        ['serviceCode', 7, 8, cleanInt],
        ['fileNumber', 9, 12, cleanInt],
        ['supplementNumber', 13, 15, cleanInt],
        ['rtifVersionNumber', 16, 19, cleanString],
        ['generationDate', 20, 27, cleanString]
    ]);
}

function readGeography(lines) {
    const geographies = new Map();

    while (peek(lines).startsWith('13')) {
        const geographyLine = next(lines);

        const geography = parseLine(geographyLine, [
            ['recordType', 1, 2, cleanInt],
            ['locationName', 3, 10, cleanString],
            ['shortName', 11, 18, cleanString],
            ['longName', 19, 50, cleanString],
            ['coordinates', 52, 63, cleanString],
            ['latitude', 68, 77, cleanFloat],
            ['longitude', 79, 88, cleanFloat]
        ]);

        if (!!geography.get("coordinates")) {
            geography.set("easting", cleanInt(geography.get("coordinates").substring(0, 6)))
            geography.set("northing", cleanInt(geography.get("coordinates").substring(6)))
        }

        geographies.set(geography.get('locationName'), geography);
    }

    return geographies;
}

function readApplicability(lines) {
    const applicability = new Map();

    const rows = [];

    while (peek(lines).startsWith('17')) {
        const applicabilityLine = next(lines);

        const applicability = parseLine(applicabilityLine, [
            ['recordType', 1, 2, cleanInt],
            ['locationName', 3, 10, cleanString],
            ['startingTime', 11, 18, cleanInt],
            ['endingTime', 19, 26, cleanInt],
            ['direction', 28, 28, cleanString]
        ]);

        rows.push(applicability);
    }

    if (rows.length === 1 && rows[0].get('locationName') === "***ALL**") {
        applicability.set('allDay', true);
        applicability.set('periods', []);
    } else {
        applicability.set('allDay', false);
        applicability.set('periods', rows);
    }

    return applicability;
}

function readTrip(lines, timetable) {
    const trips = new Map();

    while (peek(lines).startsWith('20')) {
        const tripLine = next(lines);

        const trip = parseLine(tripLine, [
            ['recordType', 1, 2, cleanInt],
            ['originLocation', 3, 10, cleanString],
            ['originTime', 11, 18, cleanInt],
            ['direction', 19, 20, cleanString],
            ['tripType', 21, 22, cleanInt],
            ['destinationLocation', 23, 30, cleanString],
            ['destinationTime', 31, 38, cleanInt],
            ['workProgramId', 39, 48, cleanString],
            ['runNumber', 49, 54, cleanString],
            ['path', 55, 66, cleanString],
            ['tripLine', 67, 70, cleanString],
            ['equipmentType', 71, 80, cleanString],
            ['carsRequired', 81, 84, cleanInt],
            ['reliefWorkProgramId', 85, 94, cleanString],
            ['reliefRunNumber', 95, 100, cleanString],
            ['reliefLocation', 101, 108, cleanString],
            ['reliefDepartureTime', 109, 116, cleanInt],
            ['nextTripType', 117, 118, cleanInt],
            ['nextTripTime', 119, 126, cleanInt],
            ['crewing', 127, 134, cleanString]
        ]);

        trip.set("tripName", formatTripName(trip, timetable));

        const events = [];

        while (peek(lines).startsWith('30')) {
            const eventLine = next(lines);

            const event = parseLine(eventLine, [
                ['recordType', 1, 2, cleanInt],
                ['location', 3, 10, cleanString],
                ['track', 11, 12, cleanString],
                ['eventTime', 13, 20, cleanInt],
                ['eventType', 21, 22, cleanString],
                ['stopFlag', 23, 23, cleanString],
                ['timepointFlag', 24, 24, cleanString]
            ]);

            events.push(event);
        }

        trip.set('event', events);

        trips.set(trip.get("tripName").replace("/", "-"), trip);
    }

    return trips;
}

function readControl(lines) {
    const timetableLine = next(lines);

    return parseLine(timetableLine, [
        ['recordType', 1, 2, cleanInt],
        ['geographyControl', 3, 7, cleanInt],
        ['applicabilityControl', 8, 12, cleanInt],
        ['tripControl', 13, 17, cleanInt],
        ['revenueTripControl', 18, 22, cleanInt],
        ['eventControl', 23, 27, cleanString]
    ]);
}

function peek(lines) {
    return lines[0];
}

function next(lines) {
    return lines.shift();
}

function parseLine(line, spec) {
    const out = new Map();

    spec.forEach(([propertyName, startPosition, endPosition, filter]) => {
        out.set(propertyName, filter(line.substring(startPosition - 1, endPosition)));
    });

    return out;
}

function cleanString(value) {
    if (value) {
        return value.trim();
    } else {
        return null;
    }
}

function cleanInt(value) {
    value = value.trim();
    if (value) {
        return parseInt(value, 10);
    } else {
        return null;
    }
}

function cleanFloat(value) {
    value = value.trim();
    if (value) {
        return parseFloat(value);
    } else {
        return null;
    }
}

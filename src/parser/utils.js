import {
    crewingTypes,
    directions,
    eventTypes,
    rtifLocationtoAtsAbbreviation,
    stopFlags,
    timepointFlags,
    tripTypes,
    tripTypesToAts,
} from "./constants";

export function formatTimetableName(timetable) {
    return `${timetable.get("lineIdentifier")}-${timetable.get("serviceCode").toString()}${timetable.get("fileNumber").toString().padStart(3, "0")} S-${timetable.get("supplementNumber").toString().padStart(3, "0")}`;
}

function formatLocationAbbreviation(location, tripType) {
    if (!!location) {
        return rtifLocationtoAtsAbbreviation.get(location);
    } else {
        switch (tripType) {
            case 2:
                return "PUT";
            case 3:
                return "LAY";
            default:
                return "UNK";
        }
    }
}

export function formatTripName(trip, timetable) {
    const atsTripType = tripTypesToAts.get(trip.get("tripType"));
    const lineName = trip.get("tripLine") || timetable.get("lineIdentifier")

    const originTime = formatTime(trip.get("originTime"));

    const originTerminal = formatLocationAbbreviation(trip.get("originLocation"), trip.get("tripType"));
    const destinationTerminal = formatLocationAbbreviation(trip.get("destinationLocation"), trip.get("tripType"));

    return `${atsTripType}${lineName} ${originTime} ${originTerminal}/${destinationTerminal}`;
}

const DAY_IN_CENTIMINUTES = 100 * 60 * 24;

export function formatTime(rtifTime) {
    if (!!rtifTime) {
        if (rtifTime >= 0) {
            const fractionalHours = rtifTime / 100 / 60;
            const hours = Math.trunc(fractionalHours);
            const fractionalMinutes = (fractionalHours - hours) * 60;
            const minutes = Math.trunc(fractionalMinutes);

        const seconds = (fractionalMinutes - minutes) * 60;

            return hours.toString().padStart(2, "0") + minutes.toString().padStart(2, "0") + ((seconds === 30) ? "+" : "");
        } else {
            const offsetTime = DAY_IN_CENTIMINUTES - (Math.abs(rtifTime) % DAY_IN_CENTIMINUTES);

            return `[${formatTime(offsetTime)}]`;
        }

    } else {
        return "";
    }
}

export function formatLocation(location, geographies, longName = false) {
    if (!!location) {
        const theGeography = geographies.get(location);

        if (!!theGeography) {
            if (longName) {
                return theGeography.get("longName");
            } else {
                return theGeography.get("shortName");
            }
        } else {
            return location;
        }

    } else {
        return "";
    }
}

export function formatDirection(direction) {
    if (!!direction) {
        return directions[direction];
    } else {
        return "";
    }
}

export function formatTripType(tripType) {
    if (tripType && tripTypes.has(tripType)) {
        return tripTypes.get(tripType);
    } else {
        return "";
    }
}

export function formatEventType(eventType) {
    return eventTypes.get(eventType);
}

export function formatStopFlag(stopFlag) {
    return stopFlags.get(stopFlag);
}

export function formatTimepointFlag(timepointFlag) {
    return timepointFlags.get(timepointFlag);
}

export function formatCrewing(crewing) {
    if (!!crewing) {
        return crewingTypes.get(crewing);
    } else {
        return "";
    }
}

// eslint-disable-next-line import/no-webpack-loader-syntax
import atsAbbreviations from "!csv-loader?header=true!./atsAbbreviations.csv";
// eslint-disable-next-line import/no-webpack-loader-syntax
import colors from "!csv-loader!./colors.csv";

export const serviceCodes = new Map([
  [1, "Daily"],
  [2, "Saturday"],
  [3, "Sunday"],
  [4, "Alternate Daily"],
  [9, "Other"],
]);

export const directions = new Map([
  ["N", "North"],
  ["S", "South"],
]);

export const tripTypes = new Map([
  [0, "Unknown"],
  [1, "Revenue"],
  [2, "Put-in"],
  [3, "Lay-up"],
  [4, "Relay"],
  [5, "Non-revenue"],
]);

export const tripTypesToAts = new Map([
  [0, "U"],
  [1, "0"],
  [2, "P"],
  [3, "L"],
  [4, "R"],
  [5, "U"],
]);

export const rtifLocationtoAtsAbbreviation = atsAbbreviations.reduce(
  (map, element) => {
    map.set(element["RTIF ID"], element["Abbreviation"]);
    return map;
  },
  new Map()
);

export const eventTypes = new Map([
  ["A", "Arrival"],
  ["D", "Departure"],
  ["T", "Transit"],
]);

export const stopFlags = new Map([
  ["S", "Revenue Stop"],
  ["N", "No Revenue Stop"],
]);

export const timepointFlags = new Map([
  ["Y", "Scheduled Timepoint"],
  ["N", "Not Scheduled Timepoint"],
]);

export const crewingTypes = new Map([
  ["11", "Standard operation"],
  ["10", "OPTO service"],
  ["20", "Double-ended OPTO service"],
  ["21", "Double-ended OPTO service with conductor"],
  ["00", "Unattended Train Operation"], //The RTIF spec calls this "Automatic Train Operation", but we already have ATO, and zero train operators and zero conductors would be UTO, not ATO.
]);

export const routeColors = new Map(
  colors
    .filter((row) => row[0] === "NYCT Subway")
    .flatMap((row) => {
      const color = row[2];
      return row[1].split(/[ /]/).map((route) => [route, color]);
    })
);

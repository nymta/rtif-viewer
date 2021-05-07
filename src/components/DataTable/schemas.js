import React from "react";

import { schemaDetectors as defaultSchemaDetectors } from "@elastic/eui/es/components/datagrid/data_grid_schema";
import { Link } from "react-router-dom";

import {
  formatCrewing,
  formatEventType,
  formatLocation,
  formatStopFlag,
  formatTime,
  formatTimepointFlag,
  formatTripType,
} from "../../parser";

function baseComparator(aValue, bValue, direction) {
  if (aValue < bValue) return direction === "asc" ? -1 : 1;
  if (aValue > bValue) return direction === "asc" ? 1 : -1;
  return 0;
}

function makeLookupSchema(schemaType, icon, formatterFunction) {
  return {
    type: schemaType,
    detector(value) {
      return 0;
    },
    comparator(a, b, direction) {
      const aValue = formatterFunction(a);
      const bValue = formatterFunction(b);

      return baseComparator(aValue, bValue, direction);
    },
    sortTextAsc: "A-Z",
    sortTextDesc: "Z-A",
    icon: icon,
    renderer(value) {
      return formatterFunction(value);
    },
  };
}

const schemaDetectors = [
  {
    type: "string",
    detector(value) {
      return 0;
    },
    comparator: baseComparator,
    sortTextAsc: "A-Z",
    sortTextDesc: "Z-A",
    icon: "tokenText",
  },
  {
    type: "rtifTripName",
    detector(value) {
      return 0;
    },
    comparator: baseComparator,
    sortTextAsc: "A-Z",
    sortTextDesc: "Z-A",
    icon: "tokenKey",
    renderer(value) {
      return <Link to={"/view/trips/" + value.replace("/", "-")}>{value}</Link>;
    },
  },
  {
    type: "rtifTime",
    detector(value) {
      return 0;
    },
    comparator: baseComparator,
    sortTextAsc: "Earlier-Later",
    sortTextDesc: "Later-Earlier",
    icon: "tokenDate",
    renderer(value) {
      return formatTime(value);
    },
  },
  {
    type: "rtifLocation",
    detector(value) {
      return 0;
    },
    comparator(a, b, direction, rtif) {
      const geographies = rtif.get("geography");
      const aValue = formatLocation(a, geographies);
      const bValue = formatLocation(b, geographies);

      return baseComparator(aValue, bValue, direction);
    },
    sortTextAsc: "A-Z",
    sortTextDesc: "Z-A",
    icon: "tokenGeo",
    renderer(value, rtif) {
      const geographies = rtif.get("geography");
      return formatLocation(value, geographies);
    },
    detailsRenderer(value, rtif) {
      const geographies = rtif.get("geography");
      return formatLocation(value, geographies, true);
    },
  },
  makeLookupSchema("rtifTripType", "tokenStruct", formatTripType),
  makeLookupSchema("rtifCrewing", "tokenNumber", formatCrewing),
  makeLookupSchema("rtifEventType", "tokenStruct", formatEventType),
  makeLookupSchema("rtifStopFlag", "tokenBoolean", formatStopFlag),
  makeLookupSchema("rtifTimepointFlag", "tokenBoolean", formatTimepointFlag),
];

export const schemaDetectorsByType = []
  .concat(schemaDetectors, defaultSchemaDetectors)
  .reduce((map, element) => {
    map.set(element.type, element);
    return map;
  }, new Map());

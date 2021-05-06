import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import proj4 from "proj4";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./GeographyMap.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { EuiFlexGroup, EuiFlexItem, EuiPageTemplate } from "@elastic/eui";

proj4.defs(
  "EPSG:32015",
  "+proj=tmerc +lat_0=40 +lon_0=-74.33333333333333 +k=0.999966667 +x_0=152400.3048006096 +y_0=0 +datum=NAD27 +units=us-ft +no_defs"
);

function project(inputCoordinates) {
  const [longitude, latitude] = proj4(
    "EPSG:32015",
    "EPSG:4326",
    inputCoordinates
  );

  return [latitude, longitude];
}

function geographyHasStatePlaneCoordinates(geography) {
  return !!geography.get("easting") && !!geography.get("northing");
}

function geographyHasGeodeticCoordinates(geography) {
  return !!geography.get("latitude") && !!geography.get("longitude");
}

function GeographyMap({ rtif: theRtif }) {
  React.useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIconRetina,
      shadowUrl: markerShadow,
    });
  }, []);

  const geographies = Array.from(theRtif.get("geography").values());

  return (
    <EuiPageTemplate
      grow={true}
      direction={"row"}
      paddingSize={"s"}
      restrictWidth={false}
    >
      <EuiFlexGroup direction="column" gutterSize={"none"}>
        <EuiFlexItem>
          <MapContainer
            center={[40.754672, -73.986754]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%" }}
          >
            <TileLayer
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
            />

            {geographies
              .filter(
                (geography) =>
                  geographyHasStatePlaneCoordinates(geography) ||
                  geographyHasGeodeticCoordinates(geography)
              )
              .map((geography) => {
                const position = geographyHasGeodeticCoordinates(geography)
                  ? [geography.get("latitude"), geography.get("longitude")]
                  : project([
                      geography.get("easting"),
                      geography.get("northing"),
                    ]);

                return (
                  <Marker
                    position={position}
                    key={geography.get("locationName")}
                  >
                    <Popup>
                      <b>{geography.get("longName")}</b>
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPageTemplate>
  );
}

export default GeographyMap;

import { useEffect, useState } from "react";
import "../index.css";
import "../App.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-placement";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-compass";
import {
  treeGroupLayer,
  alignmentGroupLayer,
  lotLayer,
  treeCuttingLayer,
  treeCompensationLayer,
  commemorativeTreeLayer,
} from "../layers";
import "@esri/calcite-components/dist/components/calcite-button";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

function MapDisplay() {
  const [mapView, setSceneView] = useState();
  const arcgisMap = document.querySelector("arcgis-map");
  const arcgisSearch = document.querySelector("arcgis-search");

  useEffect(() => {
    if (mapView) {
      arcgisMap.map.add(alignmentGroupLayer);
      arcgisMap.map.add(lotLayer);
      arcgisMap.map.add(treeGroupLayer);

      arcgisSearch.sources = [
        {
          layer: treeCuttingLayer,
          searchFields: ["ID"],
          displayField: "ID",
          exactMatch: false,
          outFields: ["ID"],
          name: "Tree ID",
          zoomScale: 1000,
          placeholder: "example: DP-T-1",
        },
      ];
      arcgisSearch.includeDefaultSourcesDisabled = true;
      arcgisSearch.locationDisabled = true;
    }
  });
  //test
  return (
    <arcgis-map
      // item-id="5ba14f5a7db34710897da0ce2d46d55f"
      basemap="dark-gray-vector"
      ground="world-elevation"
      viewingMode="local"
      zoom="14"
      center="121.0194387, 14.6972616"
      onarcgisViewReadyChange={(event) => {
        setSceneView(event.target);
      }}
    >
      <arcgis-compass position="top-right"></arcgis-compass>
      <arcgis-expand close-on-esc position="top-right" mode="floating">
        <arcgis-search></arcgis-search>
        {/* <arcgis-placement>
          <calcite-button>Placeholder</calcite-button>
        </arcgis-placement> */}
      </arcgis-expand>
      <arcgis-zoom position="bottom-right"></arcgis-zoom>
    </arcgis-map>
  );
}

export default MapDisplay;

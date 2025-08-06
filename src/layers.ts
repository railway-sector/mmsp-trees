import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import FeatureReductionCluster from "@arcgis/core/layers/support/FeatureReductionCluster";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import {
  TextSymbol,
  SimpleMarkerSymbol,
  SimpleFillSymbol,
  SimpleLineSymbol,
} from "@arcgis/core/symbols";

/* Standalone table for Dates */
export const dateTable = new FeatureLayer({
  portalItem: {
    id: "a084d9cae5234d93b7aa50f7eb782aec",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
});

/* Station Layer */
const stationLabels = new LabelClass({
  labelExpressionInfo: { expression: "$feature.Station1" },
  symbol: {
    type: "text",
    color: "black",
    haloColor: "white",
    haloSize: 1,
    font: {
      size: 10,
      weight: "bold",
    },
  },
});

export const stationLayer = new FeatureLayer({
  portalItem: {
    id: "52d4f29105934e3f95f6b39c7e5fba6e",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  labelingInfo: [stationLabels],
  title: "Station",
  definitionExpression: "Project = 'MMSP'",
  //screenSizePerspectiveEnabled: false, // gives constant size regardless of zoom
});

/* Construction Boundary*/
const ConstructionBoundaryFill = new UniqueValueRenderer({
  field: "MappingBoundary",
  uniqueValueInfos: [
    {
      value: 1,
      label: "",
      symbol: new SimpleFillSymbol({
        color: [0, 0, 0, 0],
        outline: {
          width: 2.5,
          color: [255, 255, 255],
          style: "short-dash",
        },
      }),
    },
  ],
});

export const constructionBoundaryLayer = new FeatureLayer({
  portalItem: {
    id: "0c172b82ddab44f2bb439542dd75e8ae",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 4,
  renderer: ConstructionBoundaryFill,
  definitionExpression: "MappingBoundary = 1",
  title: "Construction Boundary",
  elevationInfo: {
    mode: "on-the-ground",
  },
  popupEnabled: false,
});

/* Lot Layer*/
const lotColor = [
  [112, 173, 71],
  [0, 112, 255],
  [255, 255, 0],
  [255, 170, 0],
  [255, 0, 0],
  [0, 115, 76],
];

const defaultSymbolLot = new SimpleFillSymbol({
  color: [0, 0, 0, 0],
  style: "solid",
  outline: new SimpleLineSymbol({
    color: [110, 110, 110],
    width: 0.7,
  }),
});

const lotLayerStatusRenderer = new UniqueValueRenderer({
  field: "StatusNVS3",
  defaultSymbol: defaultSymbolLot,
  uniqueValueInfos: [
    {
      value: 1,
      label: "Paid",
      symbol: new SimpleFillSymbol({
        color: lotColor[0],
      }),
    },
    {
      value: 2,
      label: "For Payment Processing",
      symbol: new SimpleFillSymbol({
        color: lotColor[1],
      }),
    },
    {
      value: 3,
      label: "For Legal Pass",
      symbol: new SimpleFillSymbol({
        color: lotColor[2],
      }),
    },
    {
      value: 4,
      label: "For Appraisal/Offer to Buy",
      symbol: new SimpleFillSymbol({
        color: lotColor[3],
      }),
    },
    {
      value: 5,
      label: "For Expro",
      symbol: new SimpleFillSymbol({
        color: lotColor[4],
      }),
    },
    {
      value: 6,
      label: "with WOP Fully Turned-over",
      symbol: new SimpleFillSymbol({
        color: lotColor[5],
      }),
    },
  ],
});

const lotLabel = new LabelClass({
  symbol: new TextSymbol({
    color: "black",
    font: {
      family: "Gill Sans",
      size: 8,
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "$feature.CN",
  },
});

export const lotLayer = new FeatureLayer({
  portalItem: {
    id: "0c172b82ddab44f2bb439542dd75e8ae",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 8,
  title: "Land Acquisition",
  renderer: lotLayerStatusRenderer,
  popupEnabled: false,
});

/* Tree cutting layer */
export const colorsCutting = [
  "#71ab48",
  "#5e4fa2",
  "#ffff00",
  "#ffaa00",
  "#0073ff",
  "#3288bd",
  "#ff0000",
];

export const cuttingStatus = [
  "For TCP Application",
  "Submitted to DENR",
  "With Permit-Not Yet Cut",
  "With Permit-Not Yet Earthballed",
  "Cut",
  "Earthballed",
  "TCP Expired",
];

export const cuttingStatusChart = [
  {
    category: cuttingStatus[0],
    value: 1,
  },
  {
    category: cuttingStatus[1],
    value: 2,
  },
  {
    category: cuttingStatus[2],
    value: 3,
  },
  {
    category: cuttingStatus[3],
    value: 4,
  },
  {
    category: cuttingStatus[4],
    value: 5,
  },
  {
    category: cuttingStatus[5],
    value: 6,
  },
  {
    category: cuttingStatus[6],
    value: 7,
  },
];
const outlineColor = "gray";

export const treeCuttingRenderer = new UniqueValueRenderer({
  field: "TCP_Proces",
  uniqueValueInfos: [
    {
      value: 1,
      label: cuttingStatus[0],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCutting[0], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 2,
      label: cuttingStatus[1],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCutting[1], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 3,
      label: cuttingStatus[2],
      symbol: new SimpleMarkerSymbol({
        size: 4,
        color: colorsCutting[2], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 4,
      label: cuttingStatus[3],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCutting[3], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 5,
      label: cuttingStatus[4],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCutting[4], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 6,
      label: cuttingStatus[5],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCutting[5], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 7,
      label: cuttingStatus[6],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCutting[6], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
  ],
});

export const treeCuttingLayer = new FeatureLayer({
  portalItem: {
    id: "4475f1bb9ad04dbda552879188ac1b6c",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "on-the-ground",
  },
  layerId: 1,
  title: "Tree Cutting",
  visible: true,
  renderer: treeCuttingRenderer,
  popupTemplate: {
    lastEditInfoEnabled: false,
    // returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Scientific",
            label: "Scientific Name",
          },
          {
            fieldName: "Common_Nam",
            label: "Common Name",
          },
          {
            fieldName: "TreeStatus",
            label: "Tree Status",
          },
          {
            fieldName: "Recom",
            label: "Recommendation",
          },
          {
            fieldName: "City",
          },
          {
            fieldName: "Id",
            label: "Tree ID",
          },
          {
            fieldName: "TCP_Proces",
            label: "Tree Cutting",
          },
          {
            fieldName: "Remarks2",
            label: "Remarks",
          },
        ],
      },
    ],
  },
});

// Commemorative trees
const commemorativeRenderer = new UniqueValueRenderer({
  field: "Remarks1",
  uniqueValueInfos: [
    {
      value: "Existing",
      label: "Existing",
      symbol: new SimpleMarkerSymbol({
        size: 10,
        color: "#FFFF00", // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: "white",
        },
      }),
    },
    {
      value: "Proposed",
      label: "Proposed Location",
      symbol: new SimpleMarkerSymbol({
        size: 10,
        color: "#0073ff", // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: "white",
        },
      }),
    },
  ],
});

const commemorativeLabel = new LabelClass({
  symbol: new TextSymbol({
    color: "white",
    font: {
      size: 12,
      weight: "bold",
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "$feature.Common_Nam",
  },
});

export const commemorativeTreeLayer = new FeatureLayer({
  portalItem: {
    id: "4475f1bb9ad04dbda552879188ac1b6c",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  definitionExpression: "Remarks2 = 'Commemorative'",
  elevationInfo: {
    mode: "on-the-ground",
  },
  layerId: 1,
  title: "Commemorative Trees",
  renderer: commemorativeRenderer,
  labelingInfo: [commemorativeLabel],
  visible: false,
  popupTemplate: {
    title: "Commemorative Tree",
    lastEditInfoEnabled: false,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Common_Nam",
            label: "Common name",
          },
        ],
      },
    ],
  },
});

/* Tree compensation layer */
export const colorsCompen = [
  "#ffff00",
  "#ff5500",
  "#ff73df",
  "#00a884",
  "#0073ff",
  "#ffaa00",
  "#3288bd",
  "#71ab48",
  "#0073ff",
  "#5e4fa2",
  "#ff0000",
  "#e1e1e1",
];

export const compenStatus = [
  "For Appraisal",
  "For Serving of RfD/OtC",
  "Served RfD/OtC",
  "For Legal Pass",
  "For Payment Processing/Obligation/Signing of ACRCT",
  "For Check Issuance",
  "Paid",
  "No Compensation",
  "For Donation",
  "Expro",
  "Right of Way Usage Agreement (ROWUA)",
];

export const compenStatusChart = [
  {
    category: compenStatus[0],
    value: 1,
  },
  {
    category: compenStatus[1],
    value: 2,
  },
  {
    category: compenStatus[2],
    value: 3,
  },
  {
    category: compenStatus[3],
    value: 4,
  },
  {
    category: compenStatus[4],
    value: 5,
  },
  {
    category: compenStatus[5],
    value: 6,
  },
  {
    category: compenStatus[6],
    value: 7,
  },
  {
    category: compenStatus[7],
    value: 8,
  },
  {
    category: compenStatus[8],
    value: 9,
  },
  {
    category: compenStatus[9],
    value: 10,
  },
  {
    category: compenStatus[10],
    value: 11,
  },
];

export const treeCompensationRenderer = new UniqueValueRenderer({
  field: "Tree_Compe",
  uniqueValueInfos: [
    {
      value: 1,
      label: compenStatus[0],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[0], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 2,
      label: compenStatus[1],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[1], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 3,
      label: compenStatus[2],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[2], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 4,
      label: compenStatus[3],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[3], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 5,
      label: compenStatus[4],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[4], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 6,
      label: compenStatus[5],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[5], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 7,
      label: compenStatus[6],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[6], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 8,
      label: compenStatus[7],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[7], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 9,
      label: compenStatus[8],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[8], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 10,
      label: compenStatus[9],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[9], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
    {
      value: 11,
      label: compenStatus[10],
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[10], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    },
  ],
});

export const treeCompensationLayer = new FeatureLayer({
  portalItem: {
    id: "4475f1bb9ad04dbda552879188ac1b6c",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  title: "Tree Compensation",
  renderer: treeCompensationRenderer,
  visible: false,
  popupTemplate: {
    title: "<h5>{Tree_Compe}</h5>",
    lastEditInfoEnabled: false,
    // returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Scientific",
            label: "Scientific Name",
          },
          {
            fieldName: "Common_Nam",
            label: "Common Name",
          },
          {
            fieldName: "TreeStatus",
            label: "Tree Status",
          },
          {
            fieldName: "Recom",
            label: "Recommendation",
          },
          {
            fieldName: "City",
          },
          {
            fieldName: "Id",
            label: "Tree ID",
          },
          {
            fieldName: "Remarks2",
            label: "Remarks",
          },
        ],
      },
    ],
  },
});

/* Group Layer */
export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [constructionBoundaryLayer, stationLayer],
});

export const treeGroupLayer = new GroupLayer({
  title: "Trees",
  visible: true,
  visibilityMode: "exclusive",
  layers: [commemorativeTreeLayer, treeCompensationLayer, treeCuttingLayer],
});

import {
  treeCuttingLayer,
  treeCompensationLayer,
  colorsCutting,
  colorsCompen,
  cuttingStatus,
  compenStatus,
  dateTable,
} from "./layers";
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition";
import * as am5 from "@amcharts/amcharts5";
import Collection from "@arcgis/core/core/Collection";
import ActionButton from "@arcgis/core/support/actions/ActionButton";
// Updat date
export async function dateUpdate() {
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const query = dateTable.createQuery();
  query.where = "category = 'Trees'";

  return dateTable.queryFeatures(query).then((response: any) => {
    const stats = response.features;
    const dates = stats.map((result: any) => {
      const date = new Date(result.attributes.date);
      const year = date.getFullYear();
      const month = monthList[date.getMonth()];
      const day = date.getDate();
      const final = year < 1990 ? "" : `${month} ${day}, ${year}`;
      return final;
    });
    return dates;
  });
}

export async function generateTreeCuttingData() {
  var total_tcp = new StatisticDefinition({
    onStatisticField: "CASE WHEN TCP_Proces = 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_tcp",
    statisticType: "sum",
  });

  var total_denr = new StatisticDefinition({
    onStatisticField: "CASE WHEN TCP_Proces = 2 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_denr",
    statisticType: "sum",
  });

  var total_permitnocut = new StatisticDefinition({
    onStatisticField: "CASE WHEN TCP_Proces = 3 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_permitnocut",
    statisticType: "sum",
  });

  var total_permitnoearth = new StatisticDefinition({
    onStatisticField: "CASE WHEN TCP_Proces = 4 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_permitnoearth",
    statisticType: "sum",
  });

  var total_cut = new StatisticDefinition({
    onStatisticField: "CASE WHEN TCP_Proces = 5 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_cut",
    statisticType: "sum",
  });

  var total_earthballed = new StatisticDefinition({
    onStatisticField: "CASE WHEN TCP_Proces = 6 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_earthballed",
    statisticType: "sum",
  });

  var total_expired = new StatisticDefinition({
    onStatisticField: "CASE WHEN TCP_Proces = 7 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_expired",
    statisticType: "sum",
  });

  var query = treeCuttingLayer.createQuery();
  query.outStatistics = [
    total_tcp,
    total_denr,
    total_permitnocut,
    total_permitnoearth,
    total_cut,
    total_earthballed,
    total_expired,
  ];
  query.returnGeometry = true;

  return treeCuttingLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const tcp = stats.total_tcp;
    const denr = stats.total_denr;
    const permitnocut = stats.total_permitnocut;
    const permitnoearth = stats.total_permitnoearth;
    const cut = stats.total_cut;
    const earthballed = stats.total_earthballed;
    const expired = stats.total_expired;

    const data = [
      {
        category: cuttingStatus[0],
        value: tcp,
        sliceSettings: {
          fill: am5.color(colorsCutting[0]),
        },
      },
      {
        category: cuttingStatus[1],
        value: denr,
        sliceSettings: {
          fill: am5.color(colorsCutting[1]),
        },
      },
      {
        category: cuttingStatus[2],
        value: permitnocut,
        sliceSettings: {
          fill: am5.color(colorsCutting[2]),
        },
      },
      {
        category: cuttingStatus[3],
        value: permitnoearth,
        sliceSettings: {
          fill: am5.color(colorsCutting[3]),
        },
      },
      {
        category: cuttingStatus[4],
        value: cut,
        sliceSettings: {
          fill: am5.color(colorsCutting[4]),
        },
      },
      {
        category: cuttingStatus[5],
        value: earthballed,
        sliceSettings: {
          fill: am5.color(colorsCutting[5]),
        },
      },
      {
        category: cuttingStatus[6],
        value: expired,
        sliceSettings: {
          fill: am5.color(colorsCutting[6]),
        },
      },
    ];
    return data;
  });
}

export async function generateTreeCompensationData() {
  var total_appraisal = new StatisticDefinition({
    onStatisticField: "CASE WHEN Tree_Compe = 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_appraisal",
    statisticType: "sum",
  });

  var total_serving = new StatisticDefinition({
    onStatisticField: "CASE WHEN Tree_Compe = 2 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_serving",
    statisticType: "sum",
  });

  var total_served = new StatisticDefinition({
    onStatisticField: "CASE WHEN Tree_Compe = 3 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_served",
    statisticType: "sum",
  });

  var total_legalpass = new StatisticDefinition({
    onStatisticField: "CASE WHEN Tree_Compe = 4 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_legalpass",
    statisticType: "sum",
  });

  var total_payp = new StatisticDefinition({
    onStatisticField: "CASE WHEN Tree_Compe = 5 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_payp",
    statisticType: "sum",
  });

  var total_check = new StatisticDefinition({
    onStatisticField: "CASE WHEN Tree_Compe = 6 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_check",
    statisticType: "sum",
  });

  var total_paid = new StatisticDefinition({
    onStatisticField: "CASE WHEN Tree_Compe = 7 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_paid",
    statisticType: "sum",
  });

  var total_nocompen = new StatisticDefinition({
    onStatisticField: "CASE WHEN Tree_Compe = 8 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_nocompen",
    statisticType: "sum",
  });

  var total_donation = new StatisticDefinition({
    onStatisticField: "CASE WHEN Tree_Compe = 9 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_donation",
    statisticType: "sum",
  });

  var total_expro = new StatisticDefinition({
    onStatisticField: "CASE WHEN Tree_Compe = 10 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_expro",
    statisticType: "sum",
  });

  var total_row = new StatisticDefinition({
    onStatisticField: "CASE WHEN Tree_Compe = 11 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_row",
    statisticType: "sum",
  });

  var query = treeCompensationLayer.createQuery();
  query.outStatistics = [
    total_appraisal,
    total_serving,
    total_served,
    total_legalpass,
    total_payp,
    total_check,
    total_paid,
    total_nocompen,
    total_donation,
    total_expro,
    total_row,
  ];
  query.returnGeometry = true;

  return treeCompensationLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const appraisal = stats.total_appraisal;
    const serving = stats.total_serving;
    const served = stats.total_served;
    const legalp = stats.total_legalpass;
    const paymentp = stats.total_payp;
    const checkissue = stats.total_checkissue;
    const paid = stats.total_paid;
    const noncompen = stats.total_nocompen;
    const donation = stats.total_donation;
    const expro = stats.total_expro;
    const row = stats.total_row;

    const data = [
      {
        category: compenStatus[0],
        value: appraisal,
        sliceSettings: {
          fill: am5.color(colorsCompen[0]),
        },
      },
      {
        category: compenStatus[1],
        value: serving,
        sliceSettings: {
          fill: am5.color(colorsCompen[1]),
        },
      },
      {
        category: compenStatus[2],
        value: served,
        sliceSettings: {
          fill: am5.color(colorsCompen[2]),
        },
      },
      {
        category: compenStatus[3],
        value: legalp,
        sliceSettings: {
          fill: am5.color(colorsCompen[3]),
        },
      },
      {
        category: compenStatus[4],
        value: paymentp,
        sliceSettings: {
          fill: am5.color(colorsCompen[4]),
        },
      },
      {
        category: compenStatus[5],
        value: checkissue,
        sliceSettings: {
          fill: am5.color(colorsCompen[5]),
        },
      },
      {
        category: compenStatus[6],
        value: paid,
        sliceSettings: {
          fill: am5.color(colorsCompen[6]),
        },
      },
      {
        category: compenStatus[7],
        value: noncompen,
        sliceSettings: {
          fill: am5.color(colorsCompen[7]),
        },
      },
      {
        category: compenStatus[8],
        value: donation,
        sliceSettings: {
          fill: am5.color(colorsCompen[8]),
        },
      },
      {
        category: compenStatus[9],
        value: expro,
        sliceSettings: {
          fill: am5.color(colorsCompen[9]),
        },
      },
      {
        category: compenStatus[10],
        value: row,
        sliceSettings: {
          fill: am5.color(colorsCompen[10]),
        },
      },
    ];
    return data;
  });
}

export async function generateTreesNumber() {
  var total_tobecut_tree = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (TCP_Proces >= 1 AND TCP_Proces <= 7) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_tobecut_tree",
    statisticType: "sum",
  });

  var total_compensation_tree = new StatisticDefinition({
    onStatisticField: "CASE WHEN Tree_Compe >= 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_compensation_tree",
    statisticType: "sum",
  });

  var query = treeCuttingLayer.createQuery();
  query.outStatistics = [total_tobecut_tree, total_compensation_tree];
  query.returnGeometry = true;

  return treeCuttingLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const cut = stats.total_tobecut_tree;
    const compen = stats.total_compensation_tree;
    return [cut, compen];
  });
}

// Thousand separators function
export function thousands_separators(num: any) {
  if (num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
}

export function zoomToLayer(layer: any, view: any) {
  return layer.queryExtent().then((response: any) => {
    view
      ?.goTo(response.extent, {
        //response.extent
        //speedFactor: 2,
      })
      .catch((error: any) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  });
}

export function highlightTrees(layer: any, view: any) {
  let highlight: any;
  view.whenLayerView(layer).then((urgentLayerView: any) => {
    var query = layer.createQuery();
    layer.queryFeatures(query).then((results: any) => {
      const length = results.features.length;
      let objID = [];
      for (var i = 0; i < length; i++) {
        var obj = results.features[i].attributes.OBJECTID;
        objID.push(obj);
      }

      if (highlight) {
        highlight.remove();
      }
      highlight = urgentLayerView.highlight(objID);
    });
  });
}

export async function defineActions(event: any) {
  const { item } = event;
  await item.layer.when();

  if (item.title === "Commemorative Trees") {
    item.actionsSections = new Collection([
      new Collection([
        new ActionButton({
          title: "Zoom to Points",
          icon: "zoom-in-fixed",
          id: "full-extent-commemo-trees",
        }),
        new ActionButton({
          title: "Highlight Points",
          icon: "flash",
          id: "highlight-commemo-trees",
        }),
      ]),
    ]);
  }

  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }

  item.title === "Land Acquisition" ||
  item.title === "Commemorative Trees" ||
  item.title === "Tree Compensation"
    ? (item.visible = false)
    : (item.visible = true);
}

export function processParams(graphic: any, layerView: any) {
  if (!graphic || !layerView) {
    throw new Error("Graphic or layerView not provided.");
  }

  if (!graphic.isAggregate) {
    throw new Error("Graphic must represent a cluster.");
  }
}

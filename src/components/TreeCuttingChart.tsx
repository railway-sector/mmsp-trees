import { useEffect, useRef, useState, use } from "react";
import {
  cuttingStatusChart,
  treeCuttingLayer,
  treeCuttingRenderer,
} from "../layers";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import Query from "@arcgis/core/rest/support/Query";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import {
  generateTreeCuttingData,
  generateTreesNumber,
  thousands_separators,
  zoomToLayer,
} from "../Query";
import "../App.css";
import { CalciteLabel } from "@esri/calcite-components-react";
import { MyContext } from "../App";
import { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import * as convexHullOperator from "@arcgis/core/geometry/operators/convexHullOperator";
import * as symbolUtils from "@arcgis/core/symbols/support/symbolUtils";
import Graphic from "@arcgis/core/Graphic";
import { processParams } from "../Query";
import * as clusterLabelCreator from "@arcgis/core/smartMapping/labels/clusters";
import * as clusterPopupCreator from "@arcgis/core/smartMapping/popup/clusters";

// Dispose function
function maybeDisposeRoot(divId: any) {
  am5.array.each(am5.registry.rootElements, function (root) {
    if (root.dom.id === divId) {
      root.dispose();
    }
  });
}

///*** Others */
/// Draw chart
const TreeCuttingChart = () => {
  const arcgisMap = document.querySelector("arcgis-map") as ArcgisMap;
  const { contractpackages, stations } = use(MyContext);

  // 1. Land Acquisition
  const pieSeriesRef = useRef<unknown | any | undefined>({});
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const [treesData, setTreesData] = useState([
    {
      category: String,
      value: Number,
      sliceSettings: {
        fill: am5.color("#00c5ff"),
      },
    },
  ]);

  const chartID = "pie-cut";
  const [treesNumber, setTreesNumber] = useState([]);

  const queryCpExpression = "Package = '" + contractpackages + "'";
  const queryStationExpression = "Station1 = '" + stations + "'";
  const queryCpStationExpression =
    queryCpExpression + " AND " + queryStationExpression;

  if (!contractpackages) {
    treeCuttingLayer.definitionExpression = "1=1";
  } else if (contractpackages && !stations) {
    treeCuttingLayer.definitionExpression = queryCpExpression;
  } else {
    treeCuttingLayer.definitionExpression = queryCpStationExpression;
  }

  useEffect(() => {
    generateTreeCuttingData().then((result: any) => {
      setTreesData(result);
    });

    generateTreesNumber().then((response: any) => {
      setTreesNumber(response);
    });

    zoomToLayer(treeCuttingLayer, arcgisMap);
  }, [contractpackages, stations]);

  useEffect(() => {
    // Clustering
    let layerView: any;
    treeCuttingLayer
      ?.when()
      .then(generateClusterConfig)
      .then(async (featureReduction: any) => {
        treeCuttingLayer.featureReduction = featureReduction;
        layerView = await arcgisMap?.view.whenLayerView(treeCuttingLayer);
      })
      .catch((error) => {
        console.error(error);
      });
    async function generateClusterConfig(layer: any) {
      const popupTemplate = await clusterPopupCreator
        .getTemplates({
          layer: layer,
          renderer: treeCuttingRenderer,
        })
        .then(
          (popupTemplateResponse: any) =>
            popupTemplateResponse.primaryTemplate.value
        );

      popupTemplate.actions = [
        {
          title: "Convex hull",
          id: "convex-hull",
          className: "esri-icon-polygon",
        },
        {
          title: "Show features",
          id: "show-features",
          className: "esri-icon-maps",
        },
      ];

      // Generate default labelingInfo
      const { labelingInfo, clusterMinSize } = await clusterLabelCreator
        .getLabelSchemes({
          layer: layer,
          view: arcgisMap?.view,
        })
        .then((labelSchemes: any) => labelSchemes.primaryScheme);

      return {
        type: "cluster",
        popupTemplate,
        labelingInfo,
        clusterMinSize,
        maxScale: 5000,
      };
    }
    //
    reactiveUtils.on(
      () => arcgisMap?.view.popup,
      "trigger-action",
      (event: any) => {
        clearViewGraphics();

        const popup: any = arcgisMap?.view.popup;
        const selectedFeature =
          popup.selectedFeature && popup.selectedFeature.isAggregate;
        const id = event.action.id;

        if (id === "convex-hull") {
          displayConvexHull(popup.selectedFeature);
        }
        if (id === "show-features") {
          displayFeatures(popup.selectedFeature);
        }
      }
    );

    reactiveUtils.watch(() => [arcgisMap?.view.scale], clearViewGraphics);

    let convexHullGraphic: any = null;
    let clusterChildGraphics: any = [];

    function clearViewGraphics() {
      arcgisMap?.view.graphics.remove(convexHullGraphic);
      arcgisMap?.view.graphics.removeMany(clusterChildGraphics);
    }

    // displays all features from a given cluster in the view
    async function displayFeatures(graphic: any) {
      processParams(graphic, layerView);

      const query = layerView.createQuery();
      query.aggregateIds = [graphic.getObjectId()];
      const { features } = await layerView.queryFeatures(query);

      features.forEach(async (feature: any) => {
        const symbol = await symbolUtils.getDisplayedSymbol(feature);
        feature.symbol = symbol;
        arcgisMap?.graphics.add(feature);
      });
      clusterChildGraphics = features;
    }

    async function displayConvexHull(graphic: any) {
      processParams(graphic, layerView);

      const query = layerView.createQuery();
      query.aggregateIds = [graphic.getObjectId()];
      const { features } = await layerView.queryFeatures(query);
      const geometries = features.map((feature: any) => feature.geometry);
      const [convexHull] = convexHullOperator.executeMany(geometries, {
        merge: true,
      });

      convexHullGraphic = new Graphic({
        geometry: convexHull,
        symbol: {
          type: "simple-fill",
          outline: {
            width: 1.5,
            color: "#D3D3D3",
          },
          style: "none",
          color: [0, 0, 0, 0.1],
        },
      });
      arcgisMap?.graphics.add(convexHullGraphic);
    }
  });

  useEffect(() => {
    maybeDisposeRoot(chartID);

    var root = am5.Root.new(chartID);
    root.container.children.clear();
    root._logo?.dispose();

    // Set themesf
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
    ]);

    // Create chart
    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );
    chartRef.current = chart;

    // Create series
    var pieSeries = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        categoryField: "category",
        valueField: "value",
        //legendLabelText: "[{fill}]{category}[/]",
        legendValueText: "{valuePercentTotal.formatNumber('#.')}% ({value})",
        radius: am5.percent(45), // outer radius
        innerRadius: am5.percent(20),
        scale: 1.7,
      })
    );
    pieSeriesRef.current = pieSeries;
    chart.series.push(pieSeries);

    // Set slice opacity and stroke color
    pieSeries.slices.template.setAll({
      fillOpacity: 0.9,
      stroke: am5.color("#ffffff"),
      strokeWidth: 0.5,
      strokeOpacity: 1,
      templateField: "sliceSettings",
    });

    // Disabling labels and ticksll
    pieSeries.labels.template.set("visible", false);
    pieSeries.ticks.template.set("visible", false);

    // EventDispatcher is disposed at SpriteEventDispatcher...
    // It looks like this error results from clicking events
    pieSeries.slices.template.events.on("click", (ev) => {
      const selected: any = ev.target.dataItem?.dataContext;
      const categorySelected: string = selected.category;
      const find = cuttingStatusChart.find(
        (emp: any) => emp.category === categorySelected
      );
      const statusSelect = find?.value;

      var highlightSelect: any;

      var query = treeCuttingLayer.createQuery();

      arcgisMap?.whenLayerView(treeCuttingLayer).then((layerView: any) => {
        //chartLayerView = layerView;

        treeCuttingLayer.queryFeatures(query).then((results: any) => {
          const RESULT_LENGTH = results.features;
          const ROW_N = RESULT_LENGTH.length;

          let objID = [];
          for (var i = 0; i < ROW_N; i++) {
            var obj = results.features[i].attributes.OBJECTID;
            objID.push(obj);
          }

          var queryExt = new Query({
            objectIds: objID,
          });

          treeCuttingLayer.queryExtent(queryExt).then((result: any) => {
            if (result.extent) {
              arcgisMap?.view.goTo(result.extent);
            }
          });

          if (highlightSelect) {
            highlightSelect.remove();
          }
          highlightSelect = layerView.highlight(objID);

          arcgisMap?.view.on("click", function () {
            layerView.filter = new FeatureFilter({
              where: undefined,
            });
            highlightSelect.remove();
          });
        }); // End of queryFeatures

        layerView.filter = new FeatureFilter({
          where: "TCP_Proces = " + statusSelect,
        });

        // For initial state, we need to add this
        arcgisMap?.view.on("click", () => {
          layerView.filter = new FeatureFilter({
            where: undefined,
          });
          highlightSelect !== undefined
            ? highlightSelect.remove()
            : console.log("");
        });
      }); // End of view.whenLayerView
    });

    pieSeries.data.setAll(treesData);

    // Legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
      })
    );
    legendRef.current = legend;
    legend.data.setAll(pieSeries.dataItems);

    // Change the size of legend markers
    legend.markers.template.setAll({
      width: 18,
      height: 18,
    });

    // Change the marker shape
    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10,
    });

    // Responsive legend
    // https://www.amcharts.com/docs/v5/tutorials/pie-chart-with-a-legend-with-dynamically-sized-labels/
    // This aligns Legend to Left
    chart.onPrivate("width", function (width: any) {
      const boxWidth = 190; //props.style.width;
      var availableSpace = Math.max(
        width - chart.height() - boxWidth,
        boxWidth
      );
      //var availableSpace = (boxWidth - valueLabelsWidth) * 0.7
      legend.labels.template.setAll({
        width: availableSpace,
        maxWidth: availableSpace,
      });
    });

    // To align legend items: valueLabels right, labels to left
    // 1. fix width of valueLabels
    // 2. dynamically change width of labels by screen size

    // Change legend labelling properties
    // To have responsive font size, do not set font size
    legend.labels.template.setAll({
      oversizedBehavior: "truncate",
      fill: am5.color("#ffffff"),
      scale: 1,
      //textDecoration: "underline"
      //width: am5.percent(200)
      //fontWeight: "300"
    });

    legend.valueLabels.template.setAll({
      textAlign: "right",
      //width: valueLabelsWidth,
      fill: am5.color("#ffffff"),
      scale: 1,
      //fontSize: LEGEND_FONT_SIZE,
    });

    legend.itemContainers.template.setAll({
      // set space between legend items
      paddingTop: 3,
      paddingBottom: 1,
    });

    pieSeries.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartID, treesData]);

  useEffect(() => {
    pieSeriesRef.current?.data.setAll(treesData);
    legendRef.current?.data.setAll(pieSeriesRef.current.dataItems);
  });

  return (
    <>
      <CalciteLabel>TOTAL TREES</CalciteLabel>
      <CalciteLabel layout="inline">
        <b className="totalTreesNumber">
          {thousands_separators(treesNumber[0])}
          <img
            src="https://EijiGorilla.github.io/Symbols/Tree_Cutting_Logo.svg"
            alt="Land Logo"
            height={"60px"}
            width={"60px"}
            style={{
              float: "right",
              marginLeft: "150px",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          />
        </b>
      </CalciteLabel>
      <div
        id={chartID}
        style={{
          width: "24vw",
          height: "53vh",
          backgroundColor: "rgb(0,0,0,0)",
          color: "white",
          marginBottom: "-1.5vh",
        }}
      ></div>
    </>
  );
}; // End of lotChartgs

export default TreeCuttingChart;

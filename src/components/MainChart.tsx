import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import "@esri/calcite-components/dist/calcite/calcite.css";
import {
  CalciteTab,
  CalciteTabs,
  CalciteTabNav,
  CalciteTabTitle,
} from "@esri/calcite-components-react";
import "@arcgis/map-components/dist/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-scene";
import { useEffect, useState } from "react";
import "../index.css";
import "../App.css";
import TreeCuttingChart from "./TreeCuttingChart";
import TreeCompensationChart from "./TreeCompensationChart";
import { treeCompensationLayer, treeCuttingLayer } from "../layers";

function MainChart() {
  const [chartTabName, setChartTabName] = useState("Land");

  useEffect(() => {
    if (chartTabName === "TreeCutting") {
      treeCuttingLayer.visible = true;
      treeCompensationLayer.visible = false;
    } else if (chartTabName === "Compensation") {
      treeCuttingLayer.visible = false;
      treeCompensationLayer.visible = true;
    }
  }, [chartTabName]);
  return (
    <>
      <CalciteTabs
        style={{
          borderStyle: "solid",
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderBottomWidth: 5,
          // borderTopWidth: 5,
          borderColor: "#555555",
        }}
        slot="panel-end"
        layout="center"
        scale="m"
      >
        <CalciteTabNav
          slot="title-group"
          id="thetabs"
          onCalciteTabChange={(event: any) =>
            setChartTabName(event.srcElement.selectedTitle.className)
          }
        >
          <CalciteTabTitle class="TreeCutting">TreeCutting</CalciteTabTitle>
          <CalciteTabTitle class="Compensation">Compensation</CalciteTabTitle>
        </CalciteTabNav>

        {/* CalciteTab: Lot */}
        <CalciteTab>
          <TreeCuttingChart />
        </CalciteTab>

        {/* CalciteTab: Structure */}
        <CalciteTab>
          <TreeCompensationChart />
        </CalciteTab>
      </CalciteTabs>
    </>
  );
}

export default MainChart;

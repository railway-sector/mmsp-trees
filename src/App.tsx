import React, { createContext, useState } from "react";
import "./App.css";
import "./index.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { CalciteShell } from "@esri/calcite-components-react";
import MapDisplay from "./components/MapDisplay";
import ActionPanel from "./components/ActionPanel";
import MainChart from "./components/MainChart";
import Header from "./components/Header";

type MyDropdownContextType = {
  contractpackages: any;
  stations: any;
  updateContractPackages: any;
  updateStations: any;
};

const initialState = {
  contractpackages: undefined,
  stations: undefined,
  updateContractPackages: undefined,
  updateStations: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});

function App() {
  const [contractpackages, setContractPackages] = useState<any>();
  const [stations, setStations] = useState<any>();

  const updateContractPackages = (newContractp: any) => {
    setContractPackages(newContractp);
  };

  const updateStations = (newStation: any) => {
    setStations(newStation);
  };

  return (
    <div>
      <CalciteShell>
        <MyContext
          value={{
            contractpackages,
            stations,
            updateContractPackages,
            updateStations,
          }}
        >
          <ActionPanel />
          <MainChart />
          <MapDisplay />
          <Header />
        </MyContext>
      </CalciteShell>
    </div>
  );
}

export default App;

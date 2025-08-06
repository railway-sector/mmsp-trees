import { useEffect, useState, use } from "react";
import Select from "react-select";
import "../index.css";
import "../App.css";
import { DropDownData } from "../customClass";
import { treeCuttingLayer } from "../layers";
import { MyContext } from "../App";
import { dateUpdate } from "../Query";
import { primaryLabelColor } from "../UniqueValues";

export function DropdownData() {
  const { updateContractPackages, updateStations } = use(MyContext);

  // For dropdown filter
  const [initContractPacakge, setInitContractPacakge] = useState<any>([]);
  const [contractPackage, setContractPackage] = useState<any>(null);
  const [station, setStation] = useState<any>(null);
  const [stationList, setStationList] = useState([]);

  const [asOfDate, setAsOfDate] = useState<undefined | any | unknown>(null);

  useEffect(() => {
    const dropdownData = new DropDownData({
      featureLayers: [treeCuttingLayer],
      fieldNames: ["Package", "Station1"],
    });

    dropdownData.dropDownQuery().then((response: any) => {
      setInitContractPacakge(response);
    });

    dateUpdate().then((response: any) => {
      setAsOfDate(response);
    });
  }, []);

  const handleContractPackageChange = (obj: any) => {
    setContractPackage(obj);
    setStationList(obj.field2);
    setStation(null);
    updateContractPackages(obj.field1);
  };

  const handleStationChange = (obj: any) => {
    setStation(obj);
    updateStations(obj.name);
  };

  return (
    <>
      <DropdownListDisplay
        handleContractPackageChange={handleContractPackageChange}
        handleStationChange={handleStationChange}
        contractPackage={contractPackage}
        initContractPacakge={initContractPacakge}
        station={station}
        stationList={stationList}
      ></DropdownListDisplay>
    </>
  );
}

export function DropdownListDisplay({
  handleContractPackageChange,
  handleStationChange,
  contractPackage,
  initContractPacakge,
  station,
  stationList,
}: any) {
  // Style CSS
  const customstyles = {
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isFocused
          ? "#555555"
          : isSelected
          ? "#2b2b2b"
          : "#2b2b2b",
        color: "#ffffff",
      };
    },

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "#2b2b2b",
      borderColor: "#949494",
      height: 35,
      width: "170px",
      color: "#ffffff",
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#fff" }),
  };

  return (
    <>
      <div className="dropdownFilterLayout">
        <b style={{ color: primaryLabelColor, margin: 10, fontSize: "0.9vw" }}>
          Contract Package
        </b>
        <Select
          placeholder="Select CP"
          value={contractPackage}
          options={initContractPacakge}
          onChange={handleContractPackageChange}
          getOptionLabel={(x: any) => x.field1}
          styles={customstyles}
        />
        <br />
        <b style={{ color: primaryLabelColor, margin: 10, fontSize: "0.9vw" }}>
          Station
        </b>
        <Select
          placeholder="Select Station"
          value={station}
          options={stationList}
          onChange={handleStationChange}
          getOptionLabel={(x: any) => x.name}
          styles={customstyles}
        />
      </div>
    </>
  );
}

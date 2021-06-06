import React, { useEffect, useRef, useState } from "react";
import { initialOptions, axes } from "data/options";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import ChartList from "components/ChartList";
import { colorGroup } from "data/colors";
import ColorItem from "components/ColorItem";
import ListTitle from "components/ListTitle";
import Header from "components/Header";
import { useData } from "hooks/state";
import HC_exporting from "highcharts/modules/exporting";
import Chart_exporting from "highcharts/modules/export-data";
import DownloadBtn from "components/DownloadBtn";
import "styles/app.scss";

HC_exporting(Highcharts);
Chart_exporting(Highcharts);

function App() {
  const [options, setOptions] = useState(initialOptions);
  const [colorPopup, setColorPopup] = useState(false);
  const [currRow, setCurrRow] = useState(null);
  const [newColor, setNewColor] = useState("");
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });

  const { series, setSeries, handleYAxis } = useData();
  useEffect(() => {
    setOptions((prev) => {
      return {
        ...prev,
        ...axes,
        series,
      };
    });
  }, [series]);

  const getCircleColor = (color) => setNewColor(color);
  const getPosition = (target) => {
    const { offsetLeft, offsetTop, clientHeight } = target;
    setPopupPosition({ left: offsetLeft, top: offsetTop + clientHeight });
  };

  const handleClose = () => setColorPopup((prev) => !prev);

  const popupRef = useRef();
  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.style.top = `${popupPosition.top}px`;
    }
  }, [popupPosition]);

  const chartRef = useRef();
  const handleDownload = () => chartRef.current.chart.downloadCSV();

  return (
    <>
      <Header />
      <div className="wrap">
        <div className="chart_area">
          <DownloadBtn handleDownload={handleDownload} />
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartRef}
          />
        </div>
        <div className="chart_list_area">
          <ul className="chart_list">
            <ListTitle options={options} setSeries={setSeries} />
            {series
              .filter((data) => data.name !== "time")
              .map((data) => {
                return (
                  <ChartList
                    key={data.name}
                    info={data}
                    setColorPopup={setColorPopup}
                    setCurrRow={setCurrRow}
                    getPosition={getPosition}
                    setSeries={setSeries}
                    handleYAxis={handleYAxis}
                  />
                );
              })}
          </ul>
        </div>
      </div>
      {colorPopup && (
        <div className="color_list_area" ref={popupRef}>
          <p className="close" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </p>
          <ul className="color_list">
            {colorGroup.map((color, i) => {
              return (
                <ColorItem
                  key={i}
                  color={color}
                  currRow={currRow}
                  setSeries={setSeries}
                  getCircleColor={getCircleColor}
                />
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;

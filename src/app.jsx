import React, { useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import ChartList from "components/ChartList";
import { colorGroup } from "data/colors";
import ColorItem from "components/ColorItem";
import ListTitle from "components/ListTitle";
import { useData } from "hooks/state";
import "styles/app.scss";

import HC_exporting from "highcharts/modules/exporting";
import Chart_exporting from "highcharts/modules/export-data";
HC_exporting(Highcharts);
Chart_exporting(Highcharts);

function App() {
  const initialOptions = {
    title: { text: "" },
    chart: { type: "line" },
    series: [], // 초기 데이터 비어있음.
  };
  const [options, setOptions] = useState(initialOptions);
  const [colorPopup, setColorPopup] = useState(false);
  const [currRow, setCurrRow] = useState(null);
  const [newColor, setNewColor] = useState("");
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });

  const { series, setSeries } = useData();
  useEffect(() => {
    setOptions((prev) => {
      return {
        ...prev,
        xAxis: {
          type: "datetime",
        },
        plotOptions: {
          series: {
            pointStart: Date.UTC(2020, 0, 29),
            pointEnd: Date.UTC(2020, 3, 4),
            pointInterval: 3600 * 1000, // one day
          },
        },

        yAxis: [
          {
            // Primary yAxis
            labels: {
              // format: "{value}",
              step: 1,
            },
            title: {
              text: "Left",
            },
            opposite: false,
          },
          {
            // Secondary yAxis
            labels: {
              format: "{value}",
              step: 0,
            },
            title: {
              text: "Right",
            },
            opposite: true,
          },
        ],
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
      <header className="header">
        <h1 className="title">Chart</h1>
      </header>
      <div className="wrap">
        <div className="chart_area">
          <button className="download_btn" onClick={handleDownload} >
            <i className="fas fa-download"></i>
            <span className="download_text"> Download</span>
          </button>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartRef}
          />
        </div>
        <div className="chart_list_area">
          <ul className="chart_list">
            <ListTitle options={options} />
            {series
              .filter((data) => data.name !== "time")
              .map((data) => {
                return (
                  <ChartList
                    key={data.name}
                    info={data}
                    setOptions={setOptions}
                    options={options}
                    setColorPopup={setColorPopup}
                    currRow={currRow}
                    setCurrRow={setCurrRow}
                    newColor={newColor}
                    getPosition={getPosition}
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
                  setOptions={setOptions}
                  currRow={currRow}
                  getCircleColor={getCircleColor}
                  setSeries={setSeries}
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

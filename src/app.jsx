import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import "./app.css";
import chartData from "data/data-1.json";

function App() {
  const initialOptions = {
    title: { text: "example" },
    chart: { type: "spline", animation: Highcharts.svg },
    series: [], // 데이터가 처음엔 비어았다.
  };
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState({});

  // 데이터 재정렬
  useEffect(() => {
    chartData.dataset.forEach((elm) =>
      Object.keys(elm).forEach((key) => {
        setData((prev) => {
          if (prev[key] === undefined) prev[key] = [elm[key]];
          else prev[key].push(elm[key]);
          return prev;
        });
      })
    );
  }, []);

  const getSeries = () => {
    let result = Object.keys(data)
      .map((elm) => {
        return {
          name: elm,
          data: data[elm],
          pointStart: Date.UTC(2021, 0, 1),
          pointInterval: 3600 * 1000, // one hour
          yAxis: 0,
        };
      })
      .filter((elm) => elm.name !== "time");
    return result;
  };

  useEffect(() => {
    setOptions((prev) => {
      return {
        ...prev,
        xAxis: { type: "datetime" },
        yAxis: [
          {
            // Primary yAxis
            labels: {
              // format: "{value}",
              step:1,
            },
            title: {
              text: "Temperature",
            },
            opposite: false,
          },
          {
            // Secondary yAxis
            labels: {
              format: "{value}",
              step:0
            },
            title: {
              text: "Rainfall",
            },
            opposite: true,
          },
        ],
        series: getSeries(),
      };
    });
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default App;

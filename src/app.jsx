import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import chartData from "data/data-1.json";
import ChartList from "components/ChartList";
import "styles/app.scss";

function App() {
  const initialOptions = {
    title: { text: "example" },
    chart: { type: "spline", animation: Highcharts.svg },
    series: [], // 데이터가 처음엔 비어았다.
  };
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState({});
  const [colors, setColors] = useState([
    "#7CB4EC",
    "#434348",
    "#90ED7D",
    "#F8A35B",
    "#8086E8",
    "#F15D80",
    "#E4D454",
    "#2D908F",
    "#F45B5B",
    "#91E8E0",
    "#FFFFFF",
    "434348",
    "90ED7D",
    "F8A35B",
    "8086E8",
    "F15D80",
  ]);

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
    let result = Object.keys(data).map((elm, i) => {
      return {
        name: elm,
        data: data[elm],
        // pointStart: Date.UTC(2021, 0, 1),
        // pointInterval: 3600 * 1000, // one hour
        // yAxis: 0,
        visible: true,
        color:colors[i]
      };
    });
    return result;
  };

  console.log(getSeries())

  useEffect(() => {
    setOptions((prev) => {
      return {
        ...prev,
        xAxis: {
          type: "datetime",
          // labels: {
          //   formatter: function () {
          //     console.log(this.value);
          //     return `${new Date(this.value).getHours()}:${new Date(
          //       this.value
          //     ).getMinutes()}`;
          //   },
          // },
          // categories: getSeries().filter((elm) => elm.name === "time"),
          // categories:[1,2,3,4,5],
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
        series: getSeries().filter((elm) => elm.name !== "time").slice(0,5),
      };
    });
  }, []);

  return (
    <>
      <header className="header">
        <h1 className="title">Chart</h1>
      </header>
      <div className="wrap">
        <div className="chart_area">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        <div className="chart_list_area">
          <ul className="chart_list">
            <li className="columns title">
              <p className="check check_all">
                <input type="checkbox" className="input_check_all" />
              </p>
              <p className="color">색상</p>
              <p className="content">항목</p>
              <p className="average">평균값</p>
              <p className="deviation">편차</p>
              <p className="min">최소값</p>
              <p className="max">최대값</p>
              <p className="y_axis">Y축 선택</p>
              <p className="color_change">색상 수정</p>
            </li>
            {/* {Object.keys(data)
              .filter((key) => key !== "time")
              .map((key) => {
                return <ChartList key={key} data={data} column={key} />;
              })} */}
              {getSeries().filter(data => data.name !== "time").map(data => {
                return  <ChartList key={data.name} info={data} />;
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;

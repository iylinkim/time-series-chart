import { useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import chartData from "data/data-1.json";
import ChartList from "components/ChartList";
import "styles/app.scss";
import { colorGroup } from "data/colors";

function App() {
  const initialOptions = {
    title: { text: "example" },
    chart: { type: "spline", animation: Highcharts.svg },
    series: [], // 데이터가 처음엔 비어았다.
  };
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState({});
  const [colors, setColors] = useState(colorGroup);

  const inputRef = useRef();

  useEffect(() => {
    const allShowing = options.series.map((option) => {
      if (!option.visible) return false;
      return true;
    });
    if (allShowing.includes(false)) {
      inputRef.current.checked = false;
    } else {
      inputRef.current.checked = true;
    }
  }, [options]);

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
        pointStart: Date.UTC(2020, 3, 29),
        pointInterval: 3600 * 1000,
        yAxis: 0,
        visible: true,
        color: colors[i],
      };
    });
    return result;
  };

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
        series: getSeries()
          .filter((elm) => elm.name !== "time")
          .slice(0, 5),
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
                <input
                  type="checkbox"
                  className="input_check_all"
                  ref={inputRef}
                />
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
            {getSeries()
              .filter((data) => data.name !== "time")
              .map((data) => {
                return (
                  <ChartList
                    key={data.name}
                    info={data}
                    setOptions={setOptions}
                    options={options}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;

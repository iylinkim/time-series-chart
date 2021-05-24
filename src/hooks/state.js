import { colorGroup } from "data/colors";
import chartData from "data/data-1.json";
import { useEffect, useState } from "react";

export const useData = () => {
  const [data, setData] = useState({});
  const [series, setSeries] = useState([]);

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
      if(i < 2){
        return {
          name: elm,
          data: data[elm],
          pointStart: Date.UTC(2020, 2, 1),
          pointInterval: 3600 * 1000,
          visible: true,
          color: colorGroup[i],
          yAxis:0
        };
      }else{
        return {
          name: elm,
          data: data[elm],
          pointStart: Date.UTC(2020, 2, 1),
          pointInterval: 3600 * 1000,
          visible: true,
          color: colorGroup[i],
          yAxis:1
        };
      }
     
    });
    return result;
  };

  useEffect(() => {
    setSeries(
      getSeries()
        .filter((elm) => elm.name !== "time")
        .slice(0, 5)
    );
  }, []);

  return { getSeries, series, setSeries };
};

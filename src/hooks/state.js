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
      const max = Math.max(...data[elm].filter((data) => !isNaN(data)));
      const seriesObject = {
        name: elm,
        data: data[elm].filter((data) => !isNaN(data)),
        pointStart: Date.UTC(2020, 2, 1),
        pointInterval: 3600 * 1000,
        visible: true,
        color: colorGroup[i],
        yAxis: 0,
      };
      if (max > 100) {
        return { ...seriesObject, yAxis: 1 };
      } else {
        return seriesObject;
      }
    });
    return result;
  };

  useEffect(() => {
    setSeries(getSeries().filter((elm) => elm.name !== "time"));
  }, []);

  return { getSeries, series, setSeries };
};

export const useCalculate = (numberData) => {
  const [result, setResult] = useState({
    sum: 0,
    average: 0,
    dispersion: 0,
  });

  const getSum = (numbers) => {
    const sum = numbers.reduce((a, b) => {
      const acc = a === 0 ? 0 : Math.round(a * 100) / 100;
      const curr = Math.round(b * 100) / 100;
      return acc + curr; //합
    }, 0);

    return sum;
  };

  const getDispersion = (numbers, averg) => {
    const dispersion =
      numbers.reduce((a, b) => a + Math.pow(b - averg, 2), 0) / numbers.length; //분산

    return dispersion;
  };

  useEffect(() => {
    setResult({
      sum: getSum(numberData),
      average: result.sum / numberData.length,
      dispersion: getDispersion(numberData, result.average),
    });
  }, []);

  return result;
};

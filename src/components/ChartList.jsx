import React, { useEffect, useRef } from "react";
import "styles/chartList.scss";

const ChartList = ({ info, setOptions, options }) => {
  const { color, name, data } = info;
  const spanRef = useRef();

  useEffect(() => {
    if (spanRef.current) {
      spanRef.current.style.backgroundColor = spanRef.current.className;
    }
  }, []);

  const sum = data.reduce((a, b) => {
    const acc = Math.round(a * 100) / 100;
    const curr = Math.round(b * 100) / 100;
    return acc + curr; //합
  }, 0);

  const average = sum / data.length; // 평균;
  const dispersion =
    data.reduce((a, b) => a + Math.pow(b - average, 2), 0) / data.length; //분산

  const inputRef = useRef();
  useEffect(() => {
    if (info.visible) {
      inputRef.current.checked = true;
    } else {
      inputRef.current.checked = false;
    }
  }, []);

  const handleCheck = () => {
    setOptions((prev) => ({
      ...prev,
      series: options.series.map((elm) => {
        if (elm.name === info.name) {
          return { ...elm, visible: !elm.visible };
        } else {
          return elm;
        }
      }),
    }));
  };

  return (
    <li className="columns chart_list_item">
      <p className="check">
        <input
          type="checkbox"
          className="input_check"
          ref={inputRef}
          onClick={handleCheck}
        />
      </p>
      <p className="color color_circle">
        <span className={color} ref={spanRef}></span>
      </p>
      <p className="content">{name}</p>
      <p className="average">{average.toFixed(2)}</p>
      <p className="deviation">{Math.sqrt(dispersion).toFixed(2)}</p>
      <p className="min">{Math.min(...data).toFixed(2)}</p>
      <p className="max">{Math.max(...data).toFixed(2)}</p>
      <p className="y_axis">
        <input type="radio" name="y_axis_check" className="y_axis_check" />
        <label>왼쪽</label>
        <input type="radio" name="y_axis_check" className="y_axis_check" />
        <label>오른쪽</label>
      </p>
      <div className="color_change"></div>
    </li>
  );
};

export default ChartList;

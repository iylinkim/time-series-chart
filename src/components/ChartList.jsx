import React, { useEffect, useRef } from "react";
import "styles/chartList.scss";

const ChartList = ({ info }) => {
  const { color, name, data } = info;
  const spanRef = useRef();

  useEffect(() => {
    if (spanRef.current) {
      spanRef.current.style.backgroundColor = spanRef.current.className;
    }
  }, []);
  // console.log(info);
  return (
    <li className="columns chart_list_item">
      <p className="check">
        <input type="checkbox" className="input_check" />
      </p>
      <p className="color color_circle">
        <span className={color} ref={spanRef}></span>
      </p>
      <p className="content">{name}</p>
      <p className="average">
        {(data.reduce((a, b) => a + b, 0) / data.length).toFixed(2)}
      </p>
      <p className="deviation"></p>
      <p className="min">{Math.min(...data).toFixed(2)}</p>
      <p className="max">{Math.max(...data).toFixed(2)}</p>
      <p className="y_axis">
        <input type="radio" className="y_axis_check" />
        <label>왼쪽</label>
        <input type="radio" className="y_axis_check" />
        <label>오른쪽</label>
      </p>
      <div className="color_change"></div>
    </li>
  );
};

export default ChartList;

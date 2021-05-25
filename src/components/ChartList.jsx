import { useCalculate } from "hooks/state";
import React, { useEffect, useRef } from "react";
import "styles/chartList.scss";

const ChartList = ({
  info,
  setColorPopup,
  setCurrRow,
  getPosition,
  setSeries,
  handleYAxis,
}) => {
  const { color, name, data, yAxis } = info;
  const inputRef = useRef();
  const spanRef = useRef();
  const leftRadio = useRef();
  const rightRadio = useRef();

  const { average, dispersion } = useCalculate(data);

  const handleCheck = (e) => {
    const {
      parentNode: {
        parentNode: { title },
      },
    } = e.currentTarget;

    setSeries((prev) => {
      return prev.map((data) => {
        if (data.name === title) return { ...data, visible: !data.visible };
        else return data;
      });
    });
  };

  const handleColor = (e) => {
    getPosition(e.currentTarget);
    setCurrRow(name);
    setColorPopup((prev) => !prev);
  };

  useEffect(() => {
    if (info.visible) {
      inputRef.current.checked = true;
    } else {
      inputRef.current.checked = false;
    }
  }, [info]);

  useEffect(() => {
    if (spanRef.current) {
      spanRef.current.style.backgroundColor = color;
    }
  }, [color]);

  useEffect(() => {
    if (yAxis === 0) {
      leftRadio.current.checked = true;
    } else if (yAxis === 1) {
      rightRadio.current.checked = true;
    }
  }, [yAxis]);

  return (
    <li className="columns chart_list_item" title={name}>
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
      <div className="y_axis">
        <p className="y_axis_check">
          <input
            type="radio"
            name={`${name}_y_axis_check`}
            className="left"
            ref={leftRadio}
            onClick={handleYAxis}
          />
          <label>왼쪽</label>
        </p>
        <p className="y_axis_check">
          <input
            type="radio"
            name={`${name}_y_axis_check`}
            className="right"
            ref={rightRadio}
            onClick={handleYAxis}
          />
          <label>오른쪽</label>
        </p>
      </div>
      <div className="color_change" onClick={handleColor}>
        <i className="fas fa-palette"></i>
      </div>
    </li>
  );
};

export default ChartList;

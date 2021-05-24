import React, { useEffect, useRef } from "react";
import "styles/chartList.scss";

const ChartList = ({
  info,
  setOptions,
  options,
  setColorPopup,
  currRow,
  setCurrRow,
  getPosition,
  setSeries,
}) => {
  const { color, name, data, yAxis } = info;
  const spanRef = useRef();
  const leftRadio = useRef();
  const rightRadio = useRef();

  useEffect(() => {
    if (spanRef.current) {
      spanRef.current.style.backgroundColor = color;
    }
  }, [color]);

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
  }, [info.visible]);

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

  const handleColor = (e) => {
    getPosition(e.currentTarget);
    setCurrRow(name);
    setColorPopup((prev) => !prev);
  };

  useEffect(() => {
    if (yAxis === 0) {
      leftRadio.current.checked = true;
    } else if (yAxis === 1) {
      rightRadio.current.checked = true;
    }
  }, [yAxis]);

  useEffect(() => {
    setCurrRow(name);
  }, [currRow]);

  // console.log(currRow, name)

  const handleYAxis = (e) => {
    const {
      className,
      parentNode: {
        parentNode: { title },
      },
    } = e.currentTarget;

    console.dir(className, title);

    if (className.includes("left")) {
      setSeries((prev) =>
        prev.map((data) => {
          if (title === data.name) return { ...data, yAxis: 0 };
          else return data;
        })
      );
    } else if (className.includes("right")) {
      setSeries((prev) =>
        prev.map((data) => {
          if (title === data.name) return { ...data, yAxis: 1 };
          else return data;
        })
      );
    }
  };

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
      <p className="y_axis">
        <input
          type="radio"
          name={`${name}_y_axis_check`}
          className="y_axis_check left"
          ref={leftRadio}
          onClick={handleYAxis}
        />
        <label>왼쪽</label>
        <input
          type="radio"
          name={`${name}_y_axis_check`}
          className="y_axis_check right"
          ref={rightRadio}
          onClick={handleYAxis}
        />
        <label>오른쪽</label>
      </p>
      <div className="color_change" onClick={handleColor}>
        CHANGE
      </div>
    </li>
  );
};

export default ChartList;

import React, { useEffect, useRef } from "react";
import "styles/colors.scss";

const ColorItem = ({ color, currRow, setSeries, getCircleColor }) => {
  const spanRef = useRef();

  useEffect(() => {
    if (spanRef.current) {
      spanRef.current.style.backgroundColor = spanRef.current.className;
    }
  }, []);

  const getColor = (e) => {
    const { className } = e.currentTarget;

    getCircleColor(className);
    setSeries((prev) =>
      prev.map((data) => {
        if (data.name === currRow) return { ...data, color: className };
        else return data;
      })
    );
  };

  return (
    <li className="color_item">
      <span ref={spanRef} className={color} onClick={getColor}></span>
    </li>
  );
};

export default ColorItem;

import React, { useRef, useEffect } from "react";

const ListTitle = ({ options }) => {
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
  
  return (
    <li className="columns title">
      <p className="check check_all">
        <input type="checkbox" className="input_check_all" ref={inputRef} />
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
  );
};

export default ListTitle;

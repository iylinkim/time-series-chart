export const initialOptions = {
  title: { text: "" },
  chart: { type: "line" },
  series: [], // 초기 데이터 비어있음.
};

export const axes = {
  xAxis: {
    type: "datetime",
  },

  yAxis: [
    {
      // Primary yAxis
      labels: {
        format: "{value}",
        step: 1,
      },
      title: {
        text: "",
      },
      opposite: false,
    },
    {
      // Secondary yAxis
      labels: {
        format: "{value}",
      },
      title: {
        text: "",
      },
      opposite: true,
    },
  ],
};

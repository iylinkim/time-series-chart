export const initialOptions = {
    title: { text: "" },
    chart: { type: "line" },
    series: [], // 초기 데이터 비어있음.
  };

export const axes = {
  xAxis: {
    type: "time",
    // tickInterval: 3600 * 1000,
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

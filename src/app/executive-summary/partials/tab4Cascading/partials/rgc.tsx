import React from "react";
import { Chart } from "react-google-charts";

const tooltipHtml =
  '<div style="padding:5px;"><strong>Research</strong><br>Start: 1 Apr<br>End: 5 Apr<br>Complete: 100%</div>'; // Custom tooltip

const data = [
  [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
    { type: "string", role: "tooltip", p: { html: true } }, // Custom tooltip column
  ],
  [
    "2014Spring",
    "Spring 2014",
    "spring",
    new Date(2014, 2, 22),
    new Date(2014, 5, 20),
    null,
    100,
    null,
    tooltipHtml,
  ],
  [
    "2014Summer",
    "Summer 2014",
    "spring",
    new Date(2014, 5, 21),
    new Date(2014, 8, 20),
    null,
    100,
    "2014Spring",
    tooltipHtml,
  ],
  [
    "2014Autumn",
    "Autumn 2014",
    "spring",
    new Date(2014, 8, 21),
    new Date(2014, 11, 20),
    null,
    100,
    null,
    tooltipHtml,
  ],
  [
    "2014Winter",
    "Winter 2014",
    "winter",
    new Date(2014, 11, 21),
    new Date(2015, 2, 21),
    null,
    100,
    null,
    tooltipHtml,
  ],
  [
    "2015Spring",
    "Spring 2015",
    "spring",
    new Date(2015, 2, 22),
    new Date(2015, 5, 20),
    null,
    50,
    null,
    tooltipHtml,
  ],
  [
    "2015Summer",
    "Summer 2015",
    "summer",
    new Date(2015, 5, 21),
    new Date(2015, 8, 20),
    null,
    0,
    "2015Spring,2014Winter",
    tooltipHtml,
  ],
  [
    "2015Autumn",
    "Autumn 2015",
    "autumn",
    new Date(2015, 8, 21),
    new Date(2015, 11, 20),
    null,
    0,
    null,
    tooltipHtml,
  ],
  [
    "2015Winter",
    "Winter 2015",
    "winter",
    new Date(2015, 11, 21),
    new Date(2016, 2, 21),
    null,
    0,
    null,
    tooltipHtml,
  ],
  [
    "Football",
    "Football Season",
    "sports",
    new Date(2014, 8, 4),
    new Date(2015, 1, 1),
    null,
    100,
    null,
    tooltipHtml,
  ],
  [
    "Baseball",
    "Baseball Season",
    "sportss",
    new Date(2015, 2, 31),
    new Date(2015, 9, 20),
    null,
    14,
    null,
    tooltipHtml,
  ],
  [
    "Basketball",
    "Basketball Season",
    "sports",
    new Date(2014, 9, 28),
    new Date(2015, 5, 20),
    null,
    86,
    null,
    tooltipHtml,
  ],
  [
    "Hockey",
    "Hockey Season",
    "sports",
    new Date(2014, 9, 8),
    new Date(2015, 5, 21),
    null,
    89,
    null,
    tooltipHtml,
  ],
];

const options = {
  height: 400,
  gantt: {
    trackHeight: 30,
    labelStyle: { fontSize: 14 },
    chartArea: { top: 20, right: 50, bottom: 0, left: 50 },
    title: "Project Plan",
    // yAxis: { title: "Month" },
    hAxis: { format: "yyyy" },
  },
  tooltip: { isHtml: true },
  // gantt: {
  //   trackHeight: 30,
  //   labelStyle: {
  //     fontSize: 14,
  //   },
  //   chartArea: {
  //     top: 20,
  //     right: 50,
  //     bottom: 0,
  //     left: 50,
  //   },
  //   title: "Project Plan",
  //   hAxis: {
  //     title: "Month",
  //   },
  // },
};

function RGCGanttChart() {
  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

export default RGCGanttChart;

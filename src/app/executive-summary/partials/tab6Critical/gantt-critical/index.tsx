import React from "react";
import {
  Gantt,
  Task,
  ViewMode,
  //   TaskListTable,
  //   TaskListHeader,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import CustomTooltip from "./tooltip";
import { Box } from "@mui/material";
import theme from "@/theme";

const CustomTaskListHeader = ({
  headerHeight,
  rowWidth,
  fontFamily,
  fontSize,
}: {
  headerHeight: any;
  rowWidth: any;
  fontFamily: any;
  fontSize: any;
}) => {
  return (
    <div
      style={{
        height: headerHeight,
        width: rowWidth,
        fontFamily,
        fontSize,
        display: "flex",
        alignItems: "center",
        paddingInline: 16,
        border: "1px solid #e0e0e0",
        backgroundColor: "#f5f5f5",
        fontWeight: 600,
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>Kegiatan</div>
      </div>
    </div>
  );
};

export default function GanttChart({ tasks }: { tasks: Task[] }) {
  React.useEffect(() => {
    // Modify the task name colors after the Gantt chart is rendered
    const taskElements = document.querySelectorAll(".task-name-class"); // Adjust the selector as needed
    taskElements.forEach((element: any) => {
      if (element.innerText === "Idea") {
        element.style.color = "#ff0000";
      } else {
        element.style.color = "#000000";
      }
    });
  }, []);

  return (
    <Box
      sx={{
        "._35nLX": {
          fill: "#f5f5f5",
        },
        "._3zRJQ, ._9w8d5": { fontWeight: 600 },
        "._3zRJQ": { display: "none" },
        "._9w8d5": {
          transform: "translateY(-10px)",
        },
        "._1nBOt": {
          "& > div": {
            "&:nth-of-type(2),&:nth-of-type(3),&:nth-of-type(4),&:nth-of-type(5)":
              {
                display: "none",
              },
          },
        },
        "._34SS0": {
          "& > div": {
            "&:nth-of-type(2),&:nth-of-type(3)": {
              display: "none",
            },
          },
        },
        "._nI1Xw": {
          div: {
            maxWidth: "90%",
            textOverflow: "ellipsis",
            overflow: "hidden",
            "-webkit-line-clamp": "1",
          },
        },
      }}
    >
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Year}
        TooltipContent={CustomTooltip}
        preStepsCount={0}
        // customHeader={customHeader}
        listCellWidth={"400px"}
        // ganttHeight={420}
        columnWidth={120}
        rowHeight={60}
        barCornerRadius={6}
        barBackgroundColor={theme.palette.primary.main}
        barBackgroundSelectedColor={theme.palette.primary.dark}
        // arrowColor={grey[500]}
        // arrowIndent={30}
        fontFamily="'Poppins', sans-serif"
        fontSize="14px"
        // headerHeight={200}
        TaskListHeader={CustomTaskListHeader}
        // TaskListTable={CustomTaskListTable}

        // renderTaskList={(tasks: any) =>
        //   tasks.map((task: any) => <CustomTask key={task.id} task={task} />)
        // }
      />
      {/* <CustomTaskList tasks={tasks} /> */}
    </Box>
  );
}

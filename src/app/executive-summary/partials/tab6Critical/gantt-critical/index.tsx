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
import { alpha, Box, Chip, Stack } from "@mui/material";
import theme from "@/theme";
import { blue, green, orange, red } from "@mui/material/colors";
import {TaskAdditionalData} from "@/app/executive-summary/partials/tab6Critical/cardCriticalModel";

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
    <Box
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
      <Stack>
        <Stack flex={1}>RO/Project Kunci</Stack>
      </Stack>
    </Box>
  );
};

type TaskListTableProps = {
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
};

const CustomTaskListTable = ({
  fontFamily,
  fontSize,
  tasks,
  rowWidth,
  rowHeight,
}: TaskListTableProps) => {

  const getAdditionalData = (item:Task) => {
    let taskProjectTask: TaskAdditionalData = {
      type: "",
      tooltip_type: "parent",
      strategy:[],
      penanggungjawab: "",
      sumber_anggaran: "",
      keterangan_kegiatan: "",
      category: "",
      target: []
    };

    if (item.type == "task" && item.project){
      taskProjectTask = JSON.parse(item.project)
    }
    return taskProjectTask
  }

  return (
    <Box style={{ border: "1px solid #dfe1e5" }}>
      {tasks.map((item, i) => {
        const isProject = item.type === "project";
        const projectCategory = getAdditionalData(item).category;

        return (
          <Box
            key={item.id}
            style={{
              height: rowHeight,
              width: rowWidth,
              display: "flex",
              alignItems: "center",
              fontFamily: fontFamily,
              fontSize: fontSize,
              padding: 10,
              paddingLeft: isProject ? 10 : 40,
            }}
            // onClick={() => console.log(item)}
          >
            <Stack
              m={0}
              width="100%"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <p>{item.name}</p>
              <Chip
                label={projectCategory}
                size="small"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  // bgcolor:
                  //   projectCategory === "BUMN"
                  //     ? red[700]
                  //     : projectCategory === "DAK"
                  //     ? green[700]
                  //     : projectCategory === "KL"
                  //     ? blue[700]
                  //     : orange[700],
                  // color: "white",
                  fontWeight: 500,
                  fontSize: 11,
                  textTransform:"uppercase",
                  height: "auto",
                  cursor: "default",
                  span: {
                    my: 0,
                    py: 0.8,
                    lineHeight: 1,
                  },
                }}
              />
            </Stack>
          </Box>
        );
      })}
    </Box>
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
        preStepsCount={1}
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
        TaskListTable={CustomTaskListTable}

        // renderTaskList={(tasks: any) =>
        //   tasks.map((task: any) => <CustomTask key={task.id} task={task} />)
        // }
      />
      {/* <CustomTaskList tasks={tasks} /> */}
    </Box>
  );
}

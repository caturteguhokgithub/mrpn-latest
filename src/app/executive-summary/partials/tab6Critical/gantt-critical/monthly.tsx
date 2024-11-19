import React, { useEffect } from "react";
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
import { IconFA } from "@/app/components/icons/icon-fa";
import { red } from "@mui/material/colors";
import dayjs from "dayjs";

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
        <div style={{ flex: 1 }}>RO/Project Kunci</div>
      </div>
    </div>
  );
};

const currentDate = new Date();

// const tasksTest: Task[] = [
//   {
//     start: new Date(2024, currentDate.getMonth(), 1),
//     end: new Date(2024, 10, 11),
//     name: "Project Detail 1",
//     id: "projectID",
//     progress: 25,
//     type: "project",
//     hideChildren: false,
//   },
//   {
//     start: new Date(2024, currentDate.getMonth(), 1),
//     end: new Date(2024, 11, 2),
//     name: "Idea",
//     id: "Task 0",
//     progress: 45,
//     type: "task",
//     project: "",
//   },
//   {
//     start: new Date(2024, currentDate.getMonth(), 2),
//     end: new Date(2024, 12, 10),
//     name: "Research",
//     id: "Task 1",
//     progress: 25,
//     dependencies: ["Task 0"],
//     type: "task",
//     project: "",
//   },
//   {
//     start: new Date(2024, currentDate.getMonth(), 4),
//     end: new Date(2024, currentDate.getMonth(), 8, 0, 0),
//     name: "Discussion with team",
//     id: "Task 2",
//     progress: 10,
//     // dependencies: ["projectID"],
//     type: "task",
//     project: "",
//   },
//   //   Parent 2
//   {
//     start: new Date(2025, currentDate.getMonth(), 1),
//     end: new Date(2025, currentDate.getMonth(), 15),
//     name: "Project Detail 2",
//     id: "projectID2",
//     progress: 25,
//     type: "project",
//     hideChildren: false,
//   },
//   {
//     start: new Date(2025, currentDate.getMonth(), 1),
//     end: new Date(2025, currentDate.getMonth(), 2, 12, 28),
//     name: "Idea",
//     id: "Task 0-2",
//     progress: 45,
//     type: "task",
//     project: "projectID2",
//   },
//   {
//     start: new Date(2025, currentDate.getMonth(), 2),
//     end: new Date(2025, currentDate.getMonth(), 4, 0, 0),
//     name: "Research",
//     id: "Task 1-2",
//     progress: 25,
//     // dependencies: ["Task 0"],
//     type: "task",
//     project: "projectID2",
//   },
//   {
//     start: new Date(2025, currentDate.getMonth(), 4),
//     end: new Date(2025, currentDate.getMonth(), 8, 0, 0),
//     name: "Discussion with team",
//     id: "Task 2-2",
//     progress: 10,
//     // dependencies: ["projectID2"],
//     type: "task",
//     project: "projectID2",
//   },
// ];

type TaskListTableProps = {
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
};

const CustomTaskListTable = ({
  fontFamily, 
  fontSize,
  tasks,
  rowWidth,
  rowHeight,
  onExpanderClick,
}: TaskListTableProps) => {
  return (
    <Box style={{ border: "1px solid #dfe1e5" }}>
      {tasks.map((item, i) => {
        const isProject = item.type === "project";
        const isExpanded = !item.hideChildren;
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
              fontWeight: isExpanded ? 600 : "normal",
              cursor: isProject ? "pointer" : "auto",
              background: isExpanded
                ? alpha(theme.palette.primary.main, 0.1)
                : i % 2 === 0
                ? "#ffffff"
                : "#f4f5f7",
              padding: 10,
              paddingLeft: isProject ? 10 : 40,
            }}
          >
            <Stack
              m={0}
              width="100%"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => onExpanderClick(item)}
            >
              <p>
                {isProject ? (
                  <Box
                    component="span"
                    mr={1}
                    sx={{
                      span: {
                        transition: "all 500ms",
                      },
                    }}
                  >
                    <IconFA
                      name={isExpanded ? "chevron-down" : "chevron-right"}
                      size={12}
                    />
                  </Box>
                ) : (
                  ""
                )}
                {item.name}
              </p>
              {/*{isProject && (*/}
              {/*  <Stack*/}
              {/*    justifyContent="center"*/}
              {/*    alignItems="center"*/}
              {/*    bgcolor={red[600]}*/}
              {/*    borderRadius="50%"*/}
              {/*    width={20}*/}
              {/*    height={20}*/}
              {/*  >*/}
              {/*    <IconFA name="arrow-down" size={12} color="white" />*/}
              {/*  </Stack>*/}
              {/*)}*/}
              {/* {!isProject && (
                <Chip
                  label="Finish to Start"
                  size="small"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    bgcolor: red[700],
                    color: "white",
                    fontWeight: 500,
                    fontSize: 11,
                    height: "auto",
                    cursor: "default",
                    span: {
                      my: 0,
                      py: 0.8,
                      lineHeight: 1,
                    },
                  }}
                />
              )} */}
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
};

export default function GanttChartMonthly({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: any;
}) {
  const [tasksState, setTasksState] = React.useState<Task[]>(tasks);

  useEffect(() => {
    setTasksState(tasks);
  }, [tasks]);

  const handleExpanderClick = (task: any) => {
    setTasksState(tasks.map((t) => (t.id === task.id ? task : t)));
  };

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
        "._2k9Ys": {
          "&::-webkit-scrollbar": {
            height: "6px",
            cursor: "pointer",
          },
        },
        "._1eT-t, ._2B2zv": {
          height: "calc(100vh - 620px) !important",
        },
      }}
    >
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Month}
        TooltipContent={CustomTooltip}
        preStepsCount={1}
        listCellWidth={"400px"}
        columnWidth={90}
        rowHeight={50}
        barCornerRadius={6}
        barBackgroundColor={theme.palette.primary.main}
        barBackgroundSelectedColor={theme.palette.primary.dark}
        fontFamily="'Poppins', sans-serif"
        fontSize="14px"
        TaskListHeader={CustomTaskListHeader}
        TaskListTable={(props) => <CustomTaskListTable {...props} />}
        // onExpanderClick={handleExpanderClick}
        ganttHeight={300}
        locale="id"
      />
    </Box>
  );
}

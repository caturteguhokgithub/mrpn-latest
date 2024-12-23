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
import {
  alpha,
  Box,
  Chip,
  Grow,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { IconFA } from "@/app/components/icons/icon-fa";
import { blue, green, orange, red } from "@mui/material/colors";
import dayjs from "dayjs";
import { TaskAdditionalData } from "@/app/executive-summary/partials/tab6Critical/cardCriticalModel";

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
  const getAdditionalData = (item: Task) => {
    let taskProjectTask: TaskAdditionalData = {
      type: "",
      tooltip_type: "parent",
      penanggungjawab: "",
      sumber_anggaran: "",
      keterangan_kegiatan: "",
      category: "",
      target: [],
      strategy: [],
    };

    if (item.project) {
      taskProjectTask = JSON.parse(item.project);
    }

    return taskProjectTask;
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box style={{ border: "1px solid #dfe1e5" }}>
      {tasks.map((item, i) => {
        const isProject = item.type === "project";
        const isExpanded = !item.hideChildren;
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
              <Box
                component="p"
                sx={{
                  maxWidth: "70%",
                  // display: "-webkit-box",
                  // textOverflow: "ellipsis",
                  // overflow: "hidden",
                  // "-webkit-line-clamp": "2",
                  // "-webkit-box-orient": " vertical",
                }}
              >
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
                {item.name.length > 120 ? (
                  <Tooltip
                    title={item.name}
                    followCursor
                    TransitionComponent={Grow}
                  >
                    <Typography
                      aria-owns={open ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                      fontSize={14}
                      sx={{ cursor: "default" }}
                    >
                      {item.name.substring(0, 120) + "..."}
                    </Typography>
                  </Tooltip>
                ) : (
                  item.name
                )}
              </Box>
              {isProject && (
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
                    textTransform: "uppercase",
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
              )}
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
        preStepsCount={2}
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

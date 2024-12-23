import React, { Fragment } from "react";
import dayjs from "dayjs";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { Task } from "gantt-task-react";
import {
  TargetDto,
  TaskAdditionalData,
} from "@/app/executive-summary/partials/tab6Critical/cardCriticalModel";
import theme from "@/theme";
import { GenerateMonthFromInteger } from "@/lib/utils/common";

const CustomTooltip = ({ task }: { task: Task }) => {
  let taskProject: TaskAdditionalData = {
    type: "",
    tooltip_type: "parent",
    penanggungjawab: "",
    sumber_anggaran: "",
    keterangan_kegiatan: "",
    category: "",
    target: [],
    strategy: [],
  };

  if (task.project) {
    taskProject = JSON.parse(task.project);
  }

  const dayjsFormat = taskProject.type == "rpjmn" ? "YYYY" : "DD MMM YYYY";

  if (taskProject.tooltip_type == "parent") {
    return (
      <Box
        bgcolor="white"
        color={grey[800]}
        p={"10px 16px"}
        width={300}
        boxShadow="rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;"
        sx={{
          "strong, span": {
            mt: 0.5,
            fontSize: 13,
            lineHeight: 1.2,
          },
        }}
      >
        <Box
          className="kegiatan"
          sx={{
            "strong, span": {
              display: "block",
            },
          }}
        >
          <Typography component="span" variant="body2">
            RO/Project Kunci:
          </Typography>
          <Typography component="strong" fontWeight={600}>
            {task.name}
          </Typography>
          {taskProject.strategy.length > 0 && (
            <Typography variant="body2" component="span">
              Tagging Roadmap:{" "}
              <Box component="span" display={"flex"} flexDirection={"column"}>
                {taskProject.strategy.map((st, iSt) => (
                  <Typography
                    component="strong"
                    fontWeight={600}
                  >{`- ${st.value}`}</Typography>
                ))}
              </Box>
            </Typography>
          )}
        </Box>
        <Divider sx={{ my: 1 }} />
        <Stack direction="column" gap={0.5}>
          <Typography variant="body2" component="span">
            Penanggungjawab:{" "}
          </Typography>
          <Typography component="strong" fontWeight={600}>
            {taskProject.penanggungjawab}
          </Typography>
          <Typography variant="body2" component="span">
            Sumber Anggaran:{" "}
            <Typography component="strong" fontWeight={600}>
              {taskProject.sumber_anggaran == ""
                ? "-"
                : taskProject.sumber_anggaran}
            </Typography>
          </Typography>
          <Typography variant="body2" component="span">
            Waktu Mulai:{" "}
            <Typography component="strong" fontWeight={600}>
              {dayjs(task.start).format(dayjsFormat)}
            </Typography>
          </Typography>
          <Typography variant="body2" component="span">
            Waktu Selesai:{" "}
            <Typography component="strong" fontWeight={600}>
              {dayjs(task.end).format(dayjsFormat)}
            </Typography>
          </Typography>
          {/*{taskProject.strategy.length > 0 && (*/}
          {/*  <Typography variant="body2" component="span">*/}
          {/*    Tagging Roadmap:{" "}*/}
          {/*    <Box component="span" display={"flex"} flexDirection={"column"}>*/}
          {/*      {taskProject.strategy.map((st, iSt) => (*/}
          {/*        <Typography*/}
          {/*          component="strong"*/}
          {/*          fontWeight={600}*/}
          {/*        >{`- ${st.value}`}</Typography>*/}
          {/*      ))}*/}
          {/*    </Box>*/}
          {/*  </Typography>*/}
          {/*)}*/}
          {taskProject.keterangan_kegiatan && (
            <Typography variant="body2" component="span">
              Status:{" "}
              <Box component="span">
                <Chip
                  label={taskProject.keterangan_kegiatan}
                  size="small"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    bgcolor:
                      taskProject.keterangan_kegiatan === "Finish to Start"
                        ? red[700]
                        : theme.palette.primary.main,
                    color: "white",
                    span: {
                      my: 0,
                      py: 0,
                      lineHeight: 1,
                    },
                  }}
                />
              </Box>
            </Typography>
          )}
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      bgcolor="white"
      color={grey[800]}
      p={"10px 16px"}
      width={300}
      boxShadow="rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;"
      sx={{
        "strong, span": {
          mt: 0.5,
          fontSize: 13,
          lineHeight: 1.2,
        },
      }}
    >
      <Stack direction="column" gap={0.5}>
        <Box
          className="kegiatan"
          sx={{
            "strong, span": {
              display: "block",
            },
          }}
        >
          <Typography component="span" variant="body2">
            RO/Project Kunci:
          </Typography>
          <Typography component="strong" fontWeight={600}>
            {task.name}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        {taskProject.target.length > 0 && (
          <Fragment>
            <Typography component="span" variant="body2">
              Target:
            </Typography>
            {taskProject.target.map((tgt, iTgt) => (
              <Typography variant="body2" component="span">
                {GenerateMonthFromInteger(tgt.bulan)}{" "}
                <Typography component="strong" fontWeight={600}>
                  {`${tgt.target}%`}
                </Typography>
              </Typography>
            ))}
          </Fragment>
        )}
      </Stack>
    </Box>
  );
};

export default CustomTooltip;

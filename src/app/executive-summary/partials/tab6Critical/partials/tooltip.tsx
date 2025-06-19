import React from "react";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ChildData, MonthData } from "../cardCriticalModel";

interface ParentData {
  id: string;
  ro: string;
  tagging: string[];
  category: string;
  responsible: string;
  fundSource: string;
  startYear: string;
  endYear: string;
  children: ChildData[];
}

interface ChildTooltipData {
  months: MonthData[];
  childData: ChildData;
}

interface TooltipCPProps {
  isParent?: boolean;
  data?: ParentData | ChildTooltipData;
  year?: number;
}

const LabelTooltip = ({ label }: { label: string }) => (
  <Typography component="span" variant="body2" color={grey[600]}>
    {label}:
  </Typography>
);

const TooltipCP = ({ isParent, data, year }: TooltipCPProps) => {
  if (isParent) {
    const parentData = data as ParentData;
    return (
      <Box
        bgcolor="white"
        color={grey[800]}
        p={"10px 16px"}
        width={300}
        boxShadow="rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;"
        sx={{
          "strong, span": {
            fontSize: 13,
            lineHeight: 1.2,
          },
        }}
      >
        <Stack gap={1}>
          <Stack gap={0.5}>
            <LabelTooltip label="RO/Project Kunci" />
            <Typography component="strong" fontWeight={600}>
              {parentData.ro}
            </Typography>
          </Stack>
          <Stack gap={0.5}>
            <LabelTooltip label="Tagging Roadmap" />
            <Box
              component="ul"
              display={"flex"}
              flexDirection={"column"}
              sx={{ listStyleType: "disc", ml: 2.4, pl: 0 }}
            >
              {parentData.tagging.map((tag, index) => (
                <Box key={index} component="li">
                  <Typography component="span" fontWeight={600}>
                    {tag}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Stack>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack gap={1}>
          <Stack gap={0.5}>
            <LabelTooltip label="Penanggungjawab" />
            <Typography component="strong" fontWeight={600}>
              {parentData.responsible}
            </Typography>
          </Stack>
          <Stack gap={0.5}>
            <LabelTooltip label="Sumber Anggaran" />
            <Typography component="strong" fontWeight={600}>
              {parentData.fundSource}
            </Typography>
          </Stack>
          {year === 0 && (
            <React.Fragment>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <LabelTooltip label="Waktu Mulai" />
                <Typography component="strong" fontWeight={600}>
                  {parentData.startYear}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <LabelTooltip label="Waktu Selesai" />
                <Typography component="strong" fontWeight={600}>
                  {parentData.endYear}
                </Typography>
              </Stack>
            </React.Fragment>
          )}
        </Stack>
      </Box>
    );
  }

  if (data && "childData" in data) {
    const { months, childData } = data;
    return (
      <Box
        bgcolor="white"
        color={grey[800]}
        p={"10px 16px"}
        width={300}
        boxShadow="rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;"
        sx={{
          "strong, span": {
            fontSize: 13,
            lineHeight: 1.2,
          },
        }}
      >
        <Stack direction="column" gap={0.5}>
          <Stack gap={1}>
            <Stack gap={0.5}>
              <LabelTooltip label="Kegiatan" />
              <Typography component="strong" fontWeight={600}>
                {childData?.kegiatan || "-"}
              </Typography>
            </Stack>
            <Divider />
            <Stack gap={0.5}>
              <LabelTooltip label="Target" />
              <Stack gap={0.5}>
                {months
                  .filter((month: any): month is MonthData => month !== null)
                  .map((month: any, index: any) => (
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="center"
                      gap={1}
                    >
                      <Box width={40} flex={0}>
                        <Chip
                          size="small"
                          label={month.name}
                          color="primary"
                          sx={{
                            width: 40,
                            textTransform: "uppercase",
                            span: { fontSize: 10 },
                          }}
                        />
                      </Box>
                      <Typography component="strong" fontWeight={600}>
                        {month.aktivitas} ({month.target} {month.satuan})
                      </Typography>
                    </Stack>
                  ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    );
  }

  return null;
};

export default TooltipCP;

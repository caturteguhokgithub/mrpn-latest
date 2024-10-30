"use client";

import ContentPage from "@/app/components/contents";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Grow,
  Stack,
  Tabs,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import theme from "@/theme";
import { IconFA } from "@/components/icons/icon-fa";
import { CustomTab, styleDownload } from "./style";
import { useExsumContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import PageExecutiveSummaryContent from "@/app/executive-summary/pageViewContent";

export default function PageExecutiveSummary({}) {
  const { rkpState, rpjmn, setYear, year } = useRKPContext((state) => state);

  const [valueTab, setValueTab] = React.useState(rpjmn?.start);
  const [toogleShowTab, setToogleShowTab] = React.useState(true);
  const [btnShowTab, setBtnShowTab] = React.useState(false);
  const [rpjmnState, setRpjmnState] = React.useState<number[]>([]);

  useEffect(() => {
    if (rpjmn != undefined) {
      let rpjmnData: number[] = [0];
      for (let i = rpjmn.start; i <= rpjmn.end; i++) {
        rpjmnData.push(i);
      }
      setRpjmnState(rpjmnData);
    }
  }, [rpjmn]);

  useEffect(() => {
    setValueTab(year);
  }, [year]);

  const handleChangeTab = (event: any, newValue: any) => {
    // if (newValue == 0) {
    //   return;
    // } else {
      setYear(newValue);
    // }
  };

  const handleToggleTab = () => {
    setToogleShowTab(false);
    setBtnShowTab(true);
  };

  const handleShowTab = () => {
    setBtnShowTab(false);
    setToogleShowTab(true);
  };

  const usetheme = useTheme();
  const breakpointDownMd = useMediaQuery(usetheme.breakpoints.down("md"));

  const downloadAttachment = (
    <Chip
      color="primary"
      variant="outlined"
      label={
        <Stack direction="row" gap={1}>
          <IconFA
            size={14}
            name="download"
            color={theme.palette.primary.main}
          />
          {breakpointDownMd ? null : "Download Lampiran"}
        </Stack>
      }
      sx={styleDownload}
    />
  );

  return (
    <ContentPage
      title="Executive Summary"
      overflowHidden
      chooseProject={rkpState !== undefined}
      dowloadAttachmentFile={
        rkpState !== undefined && (
          <>
            {breakpointDownMd ? (
              <Tooltip
                title="Download Lampiran"
                followCursor
                TransitionComponent={Grow}
              >
                {downloadAttachment}
              </Tooltip>
            ) : (
              downloadAttachment
            )}
          </>
        )
      }
      tabArrow={
        <Collapse in={btnShowTab}>
          <Chip
            color="primary"
            variant="outlined"
            label={
              <Stack direction="row" gap={1}>
                <IconFA
                  size={14}
                  name="chevron-down"
                  color={theme.palette.primary.main}
                />
                {breakpointDownMd ? null : "Tab History"}
              </Stack>
            }
            sx={styleDownload}
            onClick={handleShowTab}
          />
        </Collapse>
      }
    >
      <Box mb={2} p={1}>
        {toogleShowTab && (
          <Stack direction="row" alignItems="center" mb={2}>
            <Box flexGrow={1}>
              <Tabs
                variant="fullWidth"
                value={valueTab}
                onChange={handleChangeTab}
                sx={{ borderRadius: 2.5 }}
              >
                <CustomTab label="RPJMN" value={0} />
                {rpjmnState.map(
                  (r, i) =>
                    i > 0 && <CustomTab label={`RKP ${r}`} value={r} key={i} />
                )}
              </Tabs>
            </Box>
            {!(rkpState === undefined) && (
              <Box>
                <Tooltip
                  title="Sembunyikan"
                  followCursor
                  TransitionComponent={Grow}
                >
                  <Button onClick={handleToggleTab}>
                    <IconFA name="chevron-up" size={20} />
                  </Button>
                </Tooltip>
              </Box>
            )}
          </Stack>
        )}
        <PageExecutiveSummaryContent toggleShowTab={toogleShowTab} />
      </Box>
    </ContentPage>
  );
}

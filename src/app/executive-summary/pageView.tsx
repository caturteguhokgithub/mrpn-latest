"use client";

import ContentPage from "@/app/components/contents";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  ChipPropsColorOverrides,
  Collapse,
  DialogActions,
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
import DialogComponent from "@/components/dialog";
import useApprovalVM from "@/app/executive-summary/approvalVM";
import { grey } from "@mui/material/colors";
import { ApprovalDto } from "@/lib/core/context/exsumContext";
import { OverridableStringUnion } from "@mui/types";

export default function PageExecutiveSummary({}) {
  const { rkpState, rpjmn, setYear, year, setRkpState } = useRKPContext((state) => state);

  const {
    exsum,
    modalApprove,
    setModalApprove,
    doApproval,
    canApprove,
    canSubmit,
  } = useApprovalVM();

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
    setRkpState(undefined)
    setYear(newValue);
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

  const approvalAction = (approval: ApprovalDto | undefined) => {
    if (approval != undefined && approval.status == "review") {
      return (
        <Chip
          color="primary"
          variant="outlined"
          label={
            <Stack direction="row" gap={1}>
              {breakpointDownMd ? null : "Approval"}
            </Stack>
          }
          sx={styleDownload}
          onClick={() => setModalApprove({ action: "approval", isOpen: true })}
        />
      );
    }

    return (
      <Chip
        color="primary"
        variant="outlined"
        label={
          <Stack direction="row" gap={1}>
            Ajukan Approval
          </Stack>
        }
        sx={styleDownload}
        onClick={() => setModalApprove({ action: "review", isOpen: true })}
      />
    );
  };

  const approvalStatus = (approval:ApprovalDto|undefined) => {
    if (exsum.id == 0){
      return undefined
    }

    let label: string = "Draft";
    let color:
      | OverridableStringUnion<
          | "default"
          | "primary"
          | "secondary"
          | "error"
          | "info"
          | "success"
          | "warning",
          ChipPropsColorOverrides
        >
      | undefined = "default";
    let sx: any = { bgcolor: grey[600], color: "white", px: 1 };

    if (approval != undefined){
      if (approval.status == "rejected"){
        label = "Rejected"
        color = "error"
        sx = {px: 1}
      }
      if (approval.status == "review"){
        label = "Review"
        color = "warning"
        sx = {px: 1}
      }
      if (approval.status == "approved"){
        label = "Approved"
        color = "success"
        sx = {px: 1}
      }
    }

    return <Chip size="small" color={color} label={label} sx={sx} />;
  };

  return (
    <ContentPage
      title="Executive Summary"
      overflowHidden
      chooseProject={rkpState !== undefined}
      dowloadAttachmentFile={
        rkpState !== undefined && approvalAction(exsum.approval)
      }
      titleChild={approvalStatus(exsum.approval)}
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

        <DialogComponent
          width={320}
          dialogOpen={modalApprove.isOpen}
          dialogClose={() => setModalApprove({ action: "", isOpen: false })}
          title="Approval"
          dialogFooter={
            modalApprove.action == "review" && (
              <DialogActions sx={{ p: 2, px: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => setModalApprove({ action: "", isOpen: false })}
                >
                  Batal
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => doApproval("review")}
                >
                  Ya
                </Button>
              </DialogActions>
            )
          }
        >
          {modalApprove.action == "approval" && (
            <Stack display={"flex"} justifyContent={"space-between"} gap={2}>
              <Button
                variant="contained"
                color={"error"}
                type="submit"
                onClick={() => doApproval("rejected")}
              >
                Reject
              </Button>
              <Button
                variant="contained"
                type="submit"
                onClick={() => doApproval("approved")}
              >
                Approve
              </Button>
            </Stack>
          )}

          {modalApprove.action == "review" && (
            <>Apakah Anda yakin untuk mengajukan approval ?</>
          )}
        </DialogComponent>
      </Box>
    </ContentPage>
  );
}

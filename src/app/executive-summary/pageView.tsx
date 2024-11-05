"use client";

import ContentPage from "@/app/components/contents";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  Collapse, DialogActions,
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
import FormCritical from "@/app/executive-summary/partials/tab6Critical/form";
import DialogComponent from "@/components/dialog";
import useApprovalVM from "@/app/executive-summary/approvalVM";

export default function PageExecutiveSummary({}) {
  const { rkpState, rpjmn, setYear, year } = useRKPContext((state) => state);

  const {
    exsum,
    modalApprove,
    setModalApprove,
    doApproval,
    canApprove,
    canSubmit
  } = useApprovalVM()

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

  return (
    <ContentPage
      title="Executive Summary"
      overflowHidden
      chooseProject={rkpState !== undefined}
      dowloadAttachmentFile={
        rkpState !== undefined && exsum.id > 0 && (canSubmit || canApprove) && (
          <>

            {canSubmit && (exsum.approval == undefined || exsum.approval.status == "rejected") &&
                <Button
                    onClick={() => setModalApprove({action: "review", isOpen: true})}
                >
                    <Chip
                        color="primary"
                        variant="outlined"
                        label={
                          <Stack direction="row" gap={1}>
                            Ajukan Approval
                          </Stack>
                        }
                        sx={styleDownload}
                    />
                </Button>
            }

            {canApprove && exsum.approval && exsum.approval.status == "review" &&
                <Button
                    onClick={() => setModalApprove({action: "approval", isOpen: true})}
                >
                    <Chip
                        color="primary"
                        variant="outlined"
                        label={
                          <Stack direction="row" gap={1}>
                            {breakpointDownMd ? null : "Approval"}
                          </Stack>
                        }
                        sx={styleDownload}
                    />
                </Button>
            }

            {exsum.approval && exsum.approval.status == "review" &&
                  <Chip
                      color="warning"
                      variant={"outlined"}
                      label={
                        <Stack direction="row" gap={1}>
                          status:
                          <IconFA
                              size={14}
                              name="spinner"
                              color={theme.palette.success.main}
                            />
                          On Review
                        </Stack>
                      }
                      sx={styleDownload}
                  />
            }

            {exsum.approval && exsum.approval.status == "approved" &&
                <Chip
                    color="success"
                    variant={"outlined"}
                    label={
                      <Stack direction="row" gap={1}>
                        status:
                        <IconFA
                          size={14}
                          name="check"
                          color={theme.palette.error.main}
                        />
                        Approved
                      </Stack>
                    }
                    sx={styleDownload}
                />
            }

            {exsum.approval && exsum.approval.status == "rejected" &&
                <Chip
                    color={"error"}
                    variant={"outlined"}
                    label={
                      <Stack direction="row" gap={1}>
                        status:
                        <IconFA
                          size={14}
                          name="times"
                          color={theme.palette.error.main}
                        />
                        Rejected
                      </Stack>
                    }
                    sx={styleDownload}
                />
            }

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

        <DialogComponent
          width={320}
          dialogOpen={modalApprove.isOpen}
          dialogClose={() => setModalApprove({action: "", isOpen: false})}
          title="Approval"
          dialogFooter={modalApprove.action == "review" &&
            <DialogActions sx={{ p: 2, px: 3 }}>
              <Button variant="outlined" onClick={() => setModalApprove({action: "", isOpen: false})}>
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
          }
        >
          {modalApprove.action == "approval" &&
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
          }

          {modalApprove.action == "review" &&
              <>
                  Apakah Anda yakin untuk mengajukan approval ?
              </>
          }

        </DialogComponent>

      </Box>
    </ContentPage>
  );
}

"use client";

import ContentPage from "@/components/contents";
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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import theme from "@/theme";
import { CustomTab, styleDownload } from "./style";
import {
  useAuthContext,
  useLockContext,
  useRKPContext,
} from "@/lib/core/hooks/useHooks";
import PageExecutiveSummaryContent from "@/app/executive-summary/pageViewContent";
import DialogComponent from "@/components/dialog";
import useApprovalVM from "@/app/executive-summary/approvalVM";
import { grey } from "@mui/material/colors";
import { ApprovalDto } from "@/lib/core/context/exsumContext";
import { OverridableStringUnion } from "@mui/types";
import { InfoTooltip } from "@/components/InfoTooltip";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import Iconify from "@/components/icons/iconify";

export default function PageExecutiveSummary({}) {
  const { permission, user } = useAuthContext((state) => state);
  const pathname = usePathname();

  const { rkpState, rpjmn, setYear, year, setRkpState } = useRKPContext(
    (state) => state
  );

  const { isLocked } = useLockContext((state) => ({
    isLocked: state.isLocked,
  }));

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
  const LOCAL_STORAGE_KEY = "selectedRKP";

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
    setRkpState(undefined);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
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

  // const downloadAttachment = (
  //   <AddButton
  //     url="#"
  //     filled
  //     errorColor
  //     title="Download PDF"
  //     startIcon={
  //       breakpointDownMd ? null : (
  //         <Icon
  //           baseClassName="fas"
  //           className={`fa-file-pdf`}
  //           sx={{
  //             fontSize: "16px !important",
  //           }}
  //         />
  //       )
  //     }
  //     sx={{ height: 38 }}
  //   />
  // );

  const approvalAction = (approval: ApprovalDto | undefined) => {
    if (
      approval != undefined &&
      hasPrivilege(permission, pathname, "approve") &&
      approval.status == "review"
    ) {
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

    if (user && (user.role_id == 4 || user.role_id == 1)) {
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
    }
  };

  const approvalStatus = (approval: ApprovalDto | undefined) => {
    if (exsum.id == 0) {
      return undefined;
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

    if (approval != undefined) {
      if (approval.status == "rejected") {
        label = "Rejected";
        color = "error";
        sx = { px: 1 };
      }
      if (approval.status == "review") {
        label = "Review";
        color = "warning";
        sx = { px: 1 };
      }
      if (approval.status == "approved") {
        label = "Approved";
        color = "success";
        sx = { px: 1 };
      }
    }

    return <Chip size="small" color={color} label={label} sx={sx} />;
  };

  return (
    <ContentPage
      noMinusMargin
      title="Executive Summary"
      overflowHidden
      chooseProject={rkpState !== undefined}
      dowloadAttachmentFile={
        rkpState !== undefined && (
          <Stack direction="row" alignItems="center" gap={0.5}>
            {/* {downloadAttachment} */}
            {approvalAction(exsum.approval)}
          </Stack>
        )
      }
      titleChild={
        rkpState !== undefined && (
          <Stack direction="row" alignItems="center" gap={1}>
            {approvalStatus(exsum.approval)}
          </Stack>
        )
      }
      tabArrow={
        <Collapse in={btnShowTab}>
          <Chip
            color="primary"
            variant="outlined"
            label={
              <Stack direction="row" alignItems="center" gap={1}>
                {/* <IconFA
                  size={14}
                  name="chevron-down"
                  color={theme.palette.primary.main}
                /> */}
                <Iconify
                  name="mdi:chevron-down"
                  size={16}
                  color={theme.palette.primary.main}
                />
                {breakpointDownMd ? null : "Tab RPJMN RKP"}
              </Stack>
            }
            sx={styleDownload}
            onClick={handleShowTab}
          />
        </Collapse>
      }
    >
      <Box mb={2} p={0}>
        {toogleShowTab && (
          <Stack direction="row" alignItems="center" mb={2}>
            <Box flexGrow={1}>
              <Tabs
                variant="fullWidth"
                value={valueTab}
                onChange={handleChangeTab}
                sx={{
                  borderRadius: 2.5,
                  "& .MuiTabs-indicator": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <CustomTab
                  label={
                    <Stack direction="row" alignItems="center" gap={0.5}>
                      {isLocked("RPJMN") && (
                        <InfoTooltip
                          icon={<Iconify name="mdi:lock" />}
                          title={
                            <Stack spacing={2}>
                              <div>
                                <strong>RPJMN sedang dikunci</strong>
                                <p>Silahkan hubungi administrator</p>
                              </div>
                            </Stack>
                          }
                        />
                      )}
                      <Typography>RPJMN</Typography>
                      <InfoTooltip
                        title={
                          <Stack spacing={2}>
                            <div>
                              <strong>
                                Rencana Pembangunan Jangka Menengah Nasional
                                (RPJMN)
                              </strong>
                              <p>
                                Dokumen perencanaan Pembangunan Nasional untuk
                                periode 5 (lima) tahun.
                              </p>
                            </div>
                          </Stack>
                        }
                      />
                    </Stack>
                  }
                  value={0}
                  isLocked={isLocked("RPJMN")}
                />
                {rpjmnState.map(
                  (r, i) =>
                    i > 0 && (
                      <CustomTab
                        label={
                          <Stack direction="row" alignItems="center" gap={0.5}>
                            {isLocked(`RKP ${r}`) && (
                              <InfoTooltip
                                icon={<Iconify name="mdi:lock" />}
                                title={
                                  <Stack spacing={2}>
                                    <div>
                                      <strong>
                                        {`RKP ${r}`} sedang dikunci
                                      </strong>
                                      <p>Silahkan hubungi administrator</p>
                                    </div>
                                  </Stack>
                                }
                              />
                            )}
                            <Typography>RKP {r}</Typography>
                            {i == 1 && (
                              <InfoTooltip
                                title={
                                  <Stack spacing={2}>
                                    <div>
                                      <strong>
                                        Rencana Kerja Pemerintah (RKP)
                                      </strong>
                                      <p>
                                        Dokumen perencanaan yang memuat
                                        pokok-pokok kebijakan pembangunan
                                        pemerintah dan menuntun ke arah tujuan
                                        pencapaian visi dan misi pemerintah
                                        untuk periode tahunan.
                                      </p>
                                    </div>
                                  </Stack>
                                }
                              />
                            )}
                          </Stack>
                        }
                        value={r}
                        key={i}
                        isLocked={isLocked(`RKP ${r}`)}
                      />
                    )
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
                    <Iconify name="mdi:chevron-up" size={24} />
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
            <>Apakah Anda yakin ingin mengajukan approval?</>
          )}
        </DialogComponent>
      </Box>
    </ContentPage>
  );
}

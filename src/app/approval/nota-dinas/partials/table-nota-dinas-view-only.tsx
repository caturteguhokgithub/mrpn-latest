import React, { Fragment, SetStateAction, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { blue, green, grey, orange, red } from "@mui/material/colors";
import Image from "next/image";
import { PenetapanObjectNotaDto } from "@/lib/core/context/penetapanTopicContext";
import { bgColorTh } from "@/utils/color";
import Iconify from "@/components/icons/iconify";
import DialogComponent from "@/components/dialog";
import FormNote from "./form-note";
import AddButton from "@/components/buttonAdd";
import { VisuallyHiddenInput } from "@/utils/constant";
import { IconFA } from "@/components/icons/icon-fa";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import DraggableScroll from "@/components/cardStakeholder/draggableScroll";
import { styleOrgChart } from "@/app/executive-summary/style";
import { SxParams } from "@/app/executive-summary/types";
import useNotaDinasVM from "../notaDinasVM";
import { useAuthContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import DialogDelete from "@/components/dialogDelete";
import { useToast } from "@/lib/core/context/toastContext";
import { dtoGetApproval } from "@/app/penetapan/objek/pageModel";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";

type Row = {
  object: string;
  sasaran: string;
  indicator: string[];
  target: string[];
  coordinator: string[];
  main: string[];
  support: string[];
};

export default function TableNotaDinasViewOnly({
  notaDinas,
  actionApprove,
  pageApproval,
  stateApproval,
  setStateApproval,
  handleUploadBuktiDukung,
  refreshBuktiDukungTable,
  imageProps,
  modalDelete,
  setModalDelete,
  deleteNodin,
  // APPROVAL
  modalConfirm,
  setModalConfirm,
  isReview,
  modalReject,
  setModalReject,
  isReject,
  modalApproval,
  setModalApproval,
  isApproval,
}: {
  notaDinas: PenetapanObjectNotaDto;
  actionApprove?: React.ReactNode;
  pageApproval?: boolean;
  stateApproval?: dtoGetApproval;
  setStateApproval?: (value: SetStateAction<dtoGetApproval>) => void;
  handleUploadBuktiDukung?: () => void;
  refreshBuktiDukungTable?: () => void;
  imageProps?: any;
  modalDelete?: any;
  setModalDelete?: any;
  deleteNodin?: any;
  // APPROVAL
  modalConfirm?: boolean;
  setModalConfirm?: (value: boolean) => void;
  isReview?: boolean;
  modalReject?: boolean;
  setModalReject?: (value: boolean) => void;
  isReject?: boolean;
  modalApproval?: boolean;
  setModalApproval?: (value: boolean) => void;
  isApproval?: boolean;
}) {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalViewImage, setModalViewImage] = React.useState(false);
  const [thisGambar, setThisGambar] = React.useState("");
  const [deleteID, setDeleteID] = useState(0);

  const { rpjmn, year } = useRKPContext((state) => state);
  const { permission } = useAuthContext((state) => state);

  const {
    getPenetapanObjectShortList,
    updateApproval,
    objectState,
    useEffectObjectState,
    stateUpr,
  } = usePenetapanObjectVM();

  const {
    gambar,
    uploadImage,
    // modalDelete,
    // setModalDelete,
    // deleteNodin,
    // modalConfirm,
    // setModalConfirm,
    // isReview,
    // setIsReview,
    // modalReject,
    // setModalReject,
    // isReject,
    // setIsReject,
    // modalApproval,
    // setModalApproval,
    // isApproval,
    // setIsApproval,
  } = useNotaDinasVM();

  const { showToast } = useToast();

  const handleDeleteListData = async () => {
    deleteNodin(deleteID);
    setModalDelete(false);
  };

  const handleBtnDelete = async (id: number) => {
    // console.log(id);

    setDeleteID(id);
    setModalDelete(true);
  };

  useEffect(() => {
    if (objectState !== undefined) {
      getPenetapanObjectShortList();
    }
  }, [objectState]);

  useEffect(useEffectObjectState, [year, objectState]);

  const generateRows = () => {
    let index = 0;

    if (rpjmn != undefined) {
      for (let i = rpjmn.start; i <= rpjmn.end; i++) {
        if (i !== year && i <= year) {
          index++;
        }
      }
    }

    let rows: Row[] = [];
    stateUpr.map((data) => {
      let row: Row = {
        object: data.rkp,
        sasaran: "",
        indicator: [],
        target: [],
        coordinator: [],
        main: [],
        support: [],
      };

      if (data.usulan_upr_linsek.length > 0) {
        let coordinator: string[] = [];
        let main: string[] = [];
        let support: string[] = [];
        data.usulan_upr_linsek.map((kl) => {
          if (kl.type == "Koordinator") {
            coordinator.push(kl.entitas.value);
          }
          if (kl.type == "Utama") {
            main.push(kl.entitas.value);
          }
          if (kl.type == "Pendukung") {
            support.push(kl.entitas.value);
          }
        });

        row.coordinator = coordinator;
        row.main = main;
        row.support = support;
      }
      rows.push(row);
    });

    return rows;
  };

  const handleUpdateStatus = async (status: string, msg = "") => {
    if (stateApproval) {
      const param: dtoGetApproval = {
        ...stateApproval,
        id: objectState?.id ?? 0,
        status: status,
        message: msg,
      };

      updateApproval(param);
    }
  };

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={() => setModalOpenAdd(false)}>Batal</Button>
      <Button variant="contained" type="submit">
        Simpan
      </Button>
    </DialogActions>
  );

  const sxParamsFull: SxParams = { variant: "full" };

  // const handleUnggahBuktiDukung = async (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const files = e.target.files?.[0];

  //   if (files) {
  //     const fileName = files.name;
  //     const reader = new FileReader();

  //     reader.readAsDataURL(files);
  //     reader.onload = () => {
  //       const res = reader.result as string;

  //       uploadImage(res, fileName);
  //     };

  //     reader.onerror = (error) => {
  //       console.error("Error: ", error);
  //     };

  //     showToast("Data berhasil disimpan", "success");
  //   }
  // };

  const buttonStatusReview = (
    <Fragment>
      <AddButton
        errorColor
        title="Tolak Pengesahan"
        filled
        noMargin
        startIcon={<Iconify name="mdi:close-circle" size={16} />}
        onclick={() => setModalReject?.(true)}
      />
      <AddButton
        color="success"
        title="Terima Pengesahan"
        filled
        noMargin
        startIcon={<Iconify name="mdi:check-circle" size={16} />}
        onclick={() => setModalApproval?.(true)}
      />
    </Fragment>
  );

  const statusReviewM = (
    <Fragment>
      <Chip
        color="warning"
        label="Review"
        variant="outlined"
        sx={{
          px: 1,
          fontWeight: 600,
          bgcolor: orange[100],
          textTransform: "uppercase",
        }}
      />
    </Fragment>
  );

  const statusReviewMApproval = (
    <Fragment>
      <Chip
        color="warning"
        label="Review"
        variant="outlined"
        sx={{
          px: 1,
          fontWeight: 600,
          bgcolor: orange[100],
          textTransform: "uppercase",
        }}
      />
      {buttonStatusReview}
    </Fragment>
  );

  const statusRejectM = (
    <Fragment>
      <Chip
        color="error"
        label="Ditolak"
        variant="outlined"
        sx={{
          px: 1,
          fontWeight: 600,
          bgcolor: red[100],
          textTransform: "uppercase",
        }}
      />
      {!pageApproval && (
        <Typography color={red[800]} fontSize={14}>
          Ditolak tanggal{" "}
          <strong>
            {stateApproval
              ? new Date(stateApproval.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "-"}
          </strong>
        </Typography>
      )}
      {hasPrivilege(permission, "/penetapan/objectUpr", "approve") ? (
        <>
          {!pageApproval && (
            <AddButton
              color="success"
              title="Ajukan Pengesahan"
              filled
              noMargin
              startIcon={<Iconify name="mdi:check-circle" size={16} />}
              onclick={() => setModalConfirm?.(true)}
            />
          )}
        </>
      ) : (
        ""
      )}
    </Fragment>
  );

  const statusApprovalM = (
    <Fragment>
      <Chip
        color="success"
        label="Disetujui"
        variant="outlined"
        sx={{
          px: 1,
          fontWeight: 600,
          bgcolor: green[100],
          textTransform: "uppercase",
        }}
      />
      {!pageApproval && (
        <Typography color={green[800]} fontSize={14}>
          Disahkan tanggal{" "}
          <strong>
            {stateApproval
              ? new Date(stateApproval.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "-"}
          </strong>
        </Typography>
      )}
    </Fragment>
  );

  const statusDraftM = (
    <Fragment>
      <Chip
        color="default"
        label="Draf"
        variant="outlined"
        sx={{
          px: 1,
          fontWeight: 600,
          bgcolor: grey[100],
          textTransform: "uppercase",
        }}
      />
      <AddButton
        color="success"
        title="Ajukan Pengesahan"
        filled
        noMargin
        startIcon={<Iconify name="mdi:check-circle" size={16} />}
        onclick={() => setModalConfirm?.(true)}
      />
    </Fragment>
  );

  const statusPengesahan =
    stateApproval?.status == "" || stateApproval?.status == "draft" ? (
      <Fragment>
        <Chip
          color="default"
          label="Draf"
          variant="outlined"
          sx={{
            px: 1,
            fontWeight: 600,
            bgcolor: grey[100],
            textTransform: "uppercase",
          }}
        />
        {hasPrivilege(permission, "/penetapan/objectUpr", "approve") ? (
          <>
            <AddButton
              color="success"
              title="Ajukan Pengesahan"
              filled
              noMargin
              startIcon={<Iconify name="mdi:check-circle" size={16} />}
              onclick={() => setModalConfirm?.(true)}
            />
          </>
        ) : (
          ""
        )}
      </Fragment>
    ) : stateApproval?.status === "review" ? (
      statusReviewMApproval
    ) : stateApproval?.status == "rejected" ? (
      statusRejectM
    ) : stateApproval?.status == "approved" ? (
      statusApprovalM
    ) : (
      statusDraftM
    );

  const statusReviewRejectApproval =
    stateApproval?.status === "review" || isReview
      ? statusReviewM
      : stateApproval?.status == "rejected" || isReject
      ? statusRejectM
      : stateApproval?.status == "approved" || isApproval
      ? statusApprovalM
      : statusDraftM;

  const conditionDraftReject =
    stateApproval?.status === "draft" || stateApproval?.status === "rejected";

  return (
    <Fragment>
      <Stack gap={2}>
        <Paper elevation={0} variant="outlined">
          <TableContainer sx={{ py: 1 }}>
            <Table sx={{ minWidth: 650, td: { border: 0 } }} size="small">
              <TableBody>
                <TableRow>
                  <TableCell width={300}>
                    <Typography color={grey[600]}>Topik</Typography>
                  </TableCell>
                  <TableCell width={2} sx={{ px: 0 }}>
                    :
                  </TableCell>
                  <TableCell>
                    <Typography>{notaDinas.topik}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color={grey[600]}>Periode</Typography>
                  </TableCell>
                  <TableCell width={2} sx={{ px: 0 }}>
                    :
                  </TableCell>
                  <TableCell>
                    <Typography>{notaDinas.periode}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color={grey[600]}>Status Pengesahan</Typography>
                  </TableCell>
                  <TableCell width={2} sx={{ px: 0 }}>
                    :
                  </TableCell>
                  <TableCell>
                    {/* {stateApproval?.status} */}
                    <Stack direction="row" alignItems="center" gap={1}>
                      {pageApproval
                        ? statusPengesahan
                        : statusReviewRejectApproval}
                    </Stack>
                    {/* )} */}
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Typography color={grey[600]}>
                      Usulan Objek MRPN Lintas Sektor
                    </Typography>
                  </TableCell>
                  <TableCell width={2} sx={{ verticalAlign: "top", px: 0 }}>
                    :
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Typography>
                      {notaDinas.usulan_objek_ls.length > 1 ? (
                        <List sx={{ p: 0 }}>
                          {notaDinas.usulan_objek_ls.map((x, index) => (
                            <ListItem sx={{ padding: 0, margin: 0 }}>{`${
                              index + 1
                            }. ${x}`}</ListItem>
                          ))}
                        </List>
                      ) : (
                        notaDinas.usulan_objek_ls[0]
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Typography gutterBottom color={grey[600]}>
                      Justifikasi & Penjelasan
                    </Typography>
                  </TableCell>
                  <TableCell width={2} sx={{ px: 0, verticalAlign: "top" }}>
                    :
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Typography>{notaDinas.penjelasan_objek_mrpn}</Typography>
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* OBJEK UPR */}
        <Stack gap={1}>
          <Typography fontWeight={600}>Objek MRPN LS</Typography>
          {generateRows().length == 0 ? (
            <Paper elevation={0} variant="outlined">
              <EmptyState
                dense
                icon={<IconEmptyData width={100} />}
                title="Objek & UPR LS Kosong"
              />
            </Paper>
          ) : (
            <TableContainer component={Paper} elevation={0} variant="outlined">
              <Table
                sx={{
                  minWidth: 650,
                  "tbody, thead": {
                    "td, th": {
                      borderRight: `1px solid ${grey[300]} !important`,
                      "&:last-of-type": {
                        borderRight: `0 !important`,
                      },
                    },
                  },
                }}
                size="small"
              >
                <TableHead sx={{ bgcolor: bgColorTh }}>
                  <TableRow>
                    <TableCell
                      rowSpan={2}
                      width={70}
                      sx={{ textAlign: "center" }}
                    >
                      No.
                    </TableCell>
                    <TableCell
                      width={400}
                      rowSpan={2}
                      sx={{ textAlign: "center" }}
                    >
                      Objek MRPN LS
                    </TableCell>
                    <TableCell colSpan={3} align="center">
                      {/* Unit Pengelola Risiko */}
                      Unit Pemilik Risiko Lintas Sektor
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="20%" align="center">
                      Koordinator
                    </TableCell>
                    <TableCell width="20%" align="center">
                      Utama
                    </TableCell>
                    <TableCell width="20%" align="center">
                      Pendukung
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      ".MuiTableCell-stickyHeader": {
                        top: 37,
                      },
                    }}
                  >
                    {[...new Array(5)].map((_, i) => (
                      <TableCell sx={{ bgcolor: grey[100] }}>
                        <Typography
                          color={`${grey[500]} !important`}
                          fontSize={14}
                          textAlign="center"
                        >
                          {i + 1}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {generateRows().map((row, rowIndex) => {
                    return (
                      <TableRow>
                        <TableCell align="center" sx={{ verticalAlign: "top" }}>
                          {++rowIndex}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: "top" }}>
                          {row.object}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: "top" }}>
                          {row.coordinator.length === 0 ? (
                            "-"
                          ) : (
                            <Stack
                              display="inline-flex"
                              alignItems="center"
                              direction="row"
                              gap={0.5}
                              flexWrap="wrap"
                            >
                              {row.coordinator.map((item, index) => (
                                <Box component="div" key={index}>
                                  <Chip
                                    label={item}
                                    size="small"
                                    sx={{
                                      height: "auto",
                                      ".MuiChip-label": {
                                        whiteSpace: "wrap",
                                        lineHeight: 1.2,
                                        py: 0.6,
                                      },
                                    }}
                                  />
                                </Box>
                              ))}
                            </Stack>
                          )}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: "top" }}>
                          {row.main.length === 0 ? (
                            "-"
                          ) : (
                            <Stack
                              display="inline-flex"
                              alignItems="center"
                              direction="row"
                              gap={0.5}
                              flexWrap="wrap"
                            >
                              {row.main.map((item, index) => (
                                <Box component="div" key={index}>
                                  <Chip
                                    label={item}
                                    size="small"
                                    sx={{
                                      height: "auto",
                                      ".MuiChip-label": {
                                        whiteSpace: "wrap",
                                        lineHeight: 1.2,
                                        py: 0.6,
                                      },
                                    }}
                                  />
                                </Box>
                              ))}
                            </Stack>
                          )}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: "top" }}>
                          {row.support.length === 0 ? (
                            "-"
                          ) : (
                            <Stack
                              display="inline-flex"
                              alignItems="center"
                              direction="row"
                              gap={0.5}
                              flexWrap="wrap"
                            >
                              {row.support.map((item, index) => (
                                <Box component="div" key={index}>
                                  <Chip
                                    label={item}
                                    size="small"
                                    sx={{
                                      height: "auto",
                                      ".MuiChip-label": {
                                        whiteSpace: "wrap",
                                        lineHeight: 1.2,
                                        py: 0.6,
                                      },
                                    }}
                                  />
                                </Box>
                              ))}
                            </Stack>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {/* <TableRow>
                  <TableCell align="center">1</TableCell>
                  <TableCell>
                    Pengembangan Kawasan Sentra Produksi Pangan (KSPP)/Lumbung
                    Pangan Kalimantan Tengah
                  </TableCell>
                  <TableCell width={300}>
                    <Stack
                      display="inline-flex"
                      alignItems="center"
                      direction="row"
                      gap={0.5}
                      flexWrap="wrap"
                    >
                      {dataUPR.map((item) => (
                        <Box component="div">
                          <Chip
                            label={item}
                            size="small"
                            sx={{
                              height: "auto",
                              ".MuiChip-label": {
                                whiteSpace: "wrap",
                                lineHeight: 1.2,
                                py: 0.6,
                              },
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell width={300}>
                    <Stack
                      display="inline-flex"
                      alignItems="center"
                      direction="row"
                      gap={0.5}
                      flexWrap="wrap"
                    >
                      {dataUPR.map((item) => (
                        <Box component="div">
                          <Chip
                            label={item}
                            size="small"
                            sx={{
                              height: "auto",
                              ".MuiChip-label": {
                                whiteSpace: "wrap",
                                lineHeight: 1.2,
                                py: 0.6,
                              },
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell width={300}>
                    <Stack
                      display="inline-flex"
                      alignItems="center"
                      direction="row"
                      gap={0.5}
                      flexWrap="wrap"
                    >
                      {dataUPR.map((item) => (
                        <Box component="div">
                          <Chip
                            label={item}
                            size="small"
                            sx={{
                              height: "auto",
                              ".MuiChip-label": {
                                whiteSpace: "wrap",
                                lineHeight: 1.2,
                                py: 0.6,
                              },
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </TableCell>
                </TableRow> */}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
        {/* Bukti Dukung */}
        <Stack gap={1}>
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontWeight={600}>Bukti Dukung</Typography>
            {!pageApproval && conditionDraftReject && (
              <Button
                size="small"
                // component="label"
                // role={undefined}
                variant="contained"
                // tabIndex={-1}
                startIcon={<Iconify name="mdi:upload" size={16} />}
                sx={{
                  borderRadius: 50,
                  textTransform: "capitalize",
                }}
                onClick={handleUploadBuktiDukung}
              >
                Unggah Bukti Dukung
                {/* <VisuallyHiddenInput
                  type="file"
                  onChange={(event: any) => handleUnggahBuktiDukung(event)}
                  multiple
                /> */}
              </Button>
            )}
          </Stack>
          {imageProps?.length == 0 ? (
            // {imageProps?.length == 0 ? (}
            <Paper elevation={0} variant="outlined">
              <EmptyState
                dense
                icon={<IconEmptyData width={100} />}
                title="Bukti Dukung Kosong"
              />
            </Paper>
          ) : (
            <TableContainer component={Paper} elevation={0} variant="outlined">
              <Table
                sx={{
                  minWidth: 650,
                  "tbody, thead": {
                    "td, th": {
                      borderRight: `1px solid ${grey[300]} !important`,
                      "&:last-of-type": {
                        borderRight: `0 !important`,
                      },
                    },
                  },
                }}
                size="small"
              >
                <TableHead sx={{ bgcolor: bgColorTh }}>
                  <TableRow>
                    <TableCell width={70} align="center">
                      No.
                    </TableCell>
                    <TableCell align="center">File Bukti Dukung</TableCell>
                    {stateApproval &&
                      !["approved", "review"].includes(
                        stateApproval?.status
                      ) && <TableCell align="center">Aksi</TableCell>}
                  </TableRow>
                  <TableRow
                    sx={{
                      ".MuiTableCell-stickyHeader": {
                        top: 37,
                      },
                    }}
                  >
                    {[...new Array(3)].map((_, i) => (
                      <TableCell sx={{ bgcolor: grey[100] }}>
                        <Typography
                          color={`${grey[500]} !important`}
                          fontSize={14}
                          textAlign="center"
                        >
                          {i + 1}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {imageProps.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" gap={1}>
                          {item.file.toLowerCase().endsWith(".pdf") ? (
                            <a
                              href={`${process.env.NEXT_PUBLIC_BASE_URL_FILES}bukti_dukung/${item.file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button color="primary" sx={{ gap: 1 }}>
                                <Iconify
                                  name="mdi:file-pdf"
                                  color="red"
                                  size={16}
                                />
                                <Typography
                                  component="span"
                                  fontSize={14}
                                  textTransform="lowercase"
                                >
                                  {item.file}
                                </Typography>
                              </Button>
                            </a>
                          ) : (
                            <Button
                              color="primary"
                              onClick={() => {
                                setModalViewImage(true);
                                setThisGambar(item.file);
                              }}
                              sx={{ gap: 1 }}
                            >
                              <Iconify
                                name="mdi:file-image"
                                color={grey[800]}
                                size={16}
                              />
                              <Typography
                                component="span"
                                fontSize={14}
                                textTransform="lowercase"
                              >
                                {item.file}
                              </Typography>
                            </Button>
                          )}
                        </Stack>
                      </TableCell>
                      {stateApproval &&
                        !["approved", "review"].includes(
                          stateApproval?.status
                        ) && (
                          <TableCell align="center">
                            <IconButton
                              color="error"
                              onClick={() => handleBtnDelete(item.id)}
                            >
                              <Iconify name="mdi:trash" color="red" size={16} />
                            </IconButton>
                          </TableCell>
                        )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
        {/* {pageApproval && ( */}
        <Fragment>
          {/* Pengajuan Pengesahan */}
          <Stack gap={1}>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontWeight={600}>Pengajuan Pengesahan</Typography>
              {/* {pageApproval && ( */}
              {/* <Fragment>
                {(stateApproval?.status === "rejected" ||
                  stateApproval?.status == "approved") && (
                  <AddButton
                    title="Tambah Catatan"
                    filled
                    noMargin
                    startIcon={<Iconify name="mdi:plus-circle" size={16} />}
                    onclick={() => setModalOpenAdd(true)}
                  />
                )}
              </Fragment> */}
              {/* )} */}
            </Stack>
            <Typography>{stateApproval?.message}</Typography>
            {/* <Box>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setModalOpenAdd(true)}
            >
              Catatan
            </Button>
          </Box> */}
          </Stack>
          {/*<Typography fontWeight={600} mt={1}>*/}
          {/*  Usulan UPR Lintas Sektor*/}
          {/*</Typography>*/}
          {/*<Paper elevation={0} variant="outlined">*/}
          {/*  <TableContainer sx={{ py: 1 }}>*/}
          {/*    <Table sx={{ minWidth: 650, td: { border: 0 } }} size="small">*/}
          {/*      <TableBody>*/}
          {/*        <TableRow>*/}
          {/*          <TableCell width={300} sx={{ verticalAlign: "top" }}>*/}
          {/*            <Typography color={grey[600]}>*/}
          {/*              1. Kementerian Koordinasi*/}
          {/*            </Typography>*/}
          {/*          </TableCell>*/}
          {/*          <TableCell width={2} sx={{ verticalAlign: "top", px: 0 }}>*/}
          {/*            :*/}
          {/*          </TableCell>*/}
          {/*          <TableCell sx={{ verticalAlign: "top" }}>*/}
          {/*            <Typography component="div">*/}
          {/*              {notaDinas.kementerian_koordinasi.length > 1 ? (*/}
          {/*                <List sx={{ p: 0, pl: "0 !important" }}>*/}
          {/*                  {notaDinas.kementerian_koordinasi.map((x, index) => (*/}
          {/*                    <ListItem sx={{ padding: 0, margin: 0 }}>{`${*/}
          {/*                      index + 1*/}
          {/*                    }. ${x}`}</ListItem>*/}
          {/*                  ))}*/}
          {/*                </List>*/}
          {/*              ) : (*/}
          {/*                notaDinas.kementerian_koordinasi[0]*/}
          {/*              )}*/}
          {/*            </Typography>*/}
          {/*          </TableCell>*/}
          {/*        </TableRow>*/}
          {/*        <TableRow>*/}
          {/*          <TableCell sx={{ verticalAlign: "top" }}>*/}
          {/*            <Typography color={grey[600]}>*/}
          {/*              2. Entitas MRPN Sektor Utama*/}
          {/*            </Typography>*/}
          {/*          </TableCell>*/}
          {/*          <TableCell width={2} sx={{ px: 0, verticalAlign: "top" }}>*/}
          {/*            :*/}
          {/*          </TableCell>*/}
          {/*          <TableCell sx={{ verticalAlign: "top" }}>*/}
          {/*            <Typography component="div">*/}
          {/*              {notaDinas.entitas_sektor_utama.length > 1 ? (*/}
          {/*                <List sx={{ p: 0, pl: "0 !important" }}>*/}
          {/*                  {notaDinas.entitas_sektor_utama.map((x, index) => (*/}
          {/*                    <ListItem sx={{ padding: 0, margin: 0 }}>{`${*/}
          {/*                      index + 1*/}
          {/*                    }. ${x}`}</ListItem>*/}
          {/*                  ))}*/}
          {/*                </List>*/}
          {/*              ) : (*/}
          {/*                notaDinas.entitas_sektor_utama[0]*/}
          {/*              )}*/}
          {/*            </Typography>*/}
          {/*          </TableCell>*/}
          {/*        </TableRow>*/}
          {/*        <TableRow>*/}
          {/*          <TableCell sx={{ verticalAlign: "top" }}>*/}
          {/*            <Typography color={grey[600]}>*/}
          {/*              3. Entitas MRPN Pendukung*/}
          {/*            </Typography>*/}
          {/*          </TableCell>*/}
          {/*          <TableCell width={2} sx={{ px: 0, verticalAlign: "top" }}>*/}
          {/*            :*/}
          {/*          </TableCell>*/}
          {/*          <TableCell>*/}
          {/*            <Typography component="div">*/}
          {/*              {notaDinas.entitas_pendukung.length > 1 ? (*/}
          {/*                <List sx={{ p: 0, pl: "0 !important" }}>*/}
          {/*                  {notaDinas.entitas_pendukung.map((x, index) => (*/}
          {/*                    <ListItem sx={{ padding: 0, margin: 0 }}>{`${*/}
          {/*                      index + 1*/}
          {/*                    }. ${x}`}</ListItem>*/}
          {/*                  ))}*/}
          {/*                </List>*/}
          {/*              ) : (*/}
          {/*                notaDinas.entitas_pendukung[0]*/}
          {/*              )}*/}
          {/*            </Typography>*/}
          {/*          </TableCell>*/}
          {/*        </TableRow>*/}
          {/*        <TableRow>*/}
          {/*          <TableCell sx={{ verticalAlign: "top" }}>*/}
          {/*            <Typography gutterBottom color={grey[600]}>*/}
          {/*              Justifikasi & Penjelasan*/}
          {/*            </Typography>*/}
          {/*          </TableCell>*/}
          {/*          <TableCell width={2} sx={{ px: 0, verticalAlign: "top" }}>*/}
          {/*            :*/}
          {/*          </TableCell>*/}
          {/*          <TableCell sx={{ verticalAlign: "top" }}>*/}
          {/*            <Typography>{notaDinas.penjelasan_usulan_upr}</Typography>*/}
          {/*          </TableCell>*/}
          {/*        </TableRow>*/}
          {/*      </TableBody>*/}
          {/*    </Table>*/}
          {/*  </TableContainer>*/}
          {/*</Paper>*/}
          <Paper elevation={0} variant="outlined">
            <TableContainer sx={{ py: 1 }}>
              <Table sx={{ minWidth: 650, td: { border: 0 } }} size="small">
                <TableBody>
                  {/* <TableRow>
                    <TableCell colSpan={2} sx={{ pb: 4 }}>
                      <Typography textAlign="center">{`${notaDinas.lokasi}, ${notaDinas.tanggal}`}</Typography>
                      <Typography textAlign="center">
                        {notaDinas.direktorat}
                      </Typography>
                    </TableCell>
                  </TableRow> */}
                  <TableRow>
                    {/* <TableCell>
                  <Typography textAlign="center">Dibuat oleh,</Typography>
                </TableCell> */}
                    <TableCell>
                      <Typography textAlign="center">
                        Disetujui oleh,
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <TableCell align="center">
                  <Box position="relative" width="auto" display="inline-block">
                    <Box position="relative" zIndex={1}>
                      {notaDinas.ttd_pembuat && (
                        <Image
                          alt="Dibuat oleh"
                          src={
                            process.env.NEXT_PUBLIC_BASE_URL_FILES +
                            notaDinas.ttd_pembuat
                          }
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "auto", height: "100px" }}
                        />
                      )}
                    </Box>
                    <Box position="absolute" top={-70} left={-70} zIndex={0}>
                      {notaDinas.alasan_ttd_pembuat &&
                        !notaDinas.approve_ttd_pembuat && (
                          <Image
                            alt="Dibuat oleh"
                            src="https://res.cloudinary.com/caturteguh/image/upload/v1721703228/mrpn/ttd/stamp-rejected_gdzucv.png"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                              width: "auto",
                              height: "200px",
                              opacity: 0.3,
                            }}
                          />
                        )}
                      {notaDinas.approve_ttd_pembuat && (
                        <Image
                          alt="Dibuat oleh"
                          src="https://res.cloudinary.com/caturteguh/image/upload/v1721703223/mrpn/ttd/stamp-approved_dduusw.png"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{
                            width: "auto",
                            height: "200px",
                            opacity: 0.3,
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </TableCell> */}
                    <TableCell align="center">
                      <Box
                        position="relative"
                        width="auto"
                        display="inline-block"
                      >
                        <Box position="relative" zIndex={1}>
                          {notaDinas.ttd_penyetuju && (
                            <Image
                              alt="Disetujui oleh"
                              src={
                                process.env.NEXT_PUBLIC_BASE_URL_FILES +
                                notaDinas.ttd_pembuat
                              }
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: "auto", height: "120px" }}
                            />
                          )}
                        </Box>
                        <Box
                          // position="absolute"
                          // top={-70}
                          // left={-70}
                          zIndex={0}
                        >
                          {stateApproval &&
                            stateApproval.status == "rejected" && (
                              <Image
                                alt="Disetujui oleh"
                                src="https://res.cloudinary.com/caturteguh/image/upload/v1721703228/mrpn/ttd/stamp-rejected_gdzucv.png"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{
                                  width: "auto",
                                  height: "200px",
                                  opacity: 0.3,
                                }}
                              />
                            )}
                          {stateApproval?.status == "approved" && (
                            <Image
                              alt="Disetujui oleh"
                              src="https://res.cloudinary.com/caturteguh/image/upload/v1721703223/mrpn/ttd/stamp-approved_dduusw.png"
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{
                                width: "auto",
                                height: "200px",
                                opacity: 0.3,
                              }}
                            />
                          )}
                        </Box>
                        <Typography fontWeight={600}>Komite MRPN</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <TableCell sx={{ verticalAlign: "top" }}>
                  <Stack gap="4px" maxWidth={300} m="0 auto">
                    <Typography textAlign="center" fontWeight={500}>
                      {notaDinas.dibuat}
                    </Typography>
                  </Stack>
                </TableCell> */}
                    <TableCell sx={{ verticalAlign: "top" }}>
                      <Stack gap="4px" maxWidth={300} m="0 auto">
                        <Typography textAlign="center" fontWeight={500}>
                          {notaDinas.disetujui}
                        </Typography>
                        {/*<Divider />*/}
                        {/*<Typography*/}
                        {/*  textAlign="center"*/}
                        {/*  fontSize={14}*/}
                        {/*  color={grey[700]}*/}
                        {/*>*/}
                        {/*  Kepala Pusat Data dan Informasi Perencanaan Pembangunan*/}
                        {/*</Typography>*/}
                      </Stack>
                    </TableCell>
                  </TableRow>

                  {actionApprove}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Fragment>
        {/* )} */}
      </Stack>
      <DialogComponent
        dialogOpen={modalOpenAdd}
        dialogClose={() => setModalOpenAdd(false)}
        title="Catatan Pengajuan Pengesahan"
        dialogFooter={dialogActionFooter}
      >
        <FormNote mode="add" />
      </DialogComponent>
      <DialogComponent
        width="100%"
        maxHeight="100vh"
        dialogOpen={modalViewImage}
        dialogClose={() => setModalViewImage(false)}
        sx={{
          ".transform-component-module_wrapper__SPB86": {
            width: "100%",
            height: "100vh",
          },
          ".MuiDialogContent-root": {
            p: 0,
          },
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10, zIndex: 9999 }}
          onClick={() => setModalViewImage(false)}
        >
          <IconFA name="circle-xmark" color="red" size={32} />
        </IconButton>
        <TransformWrapper
          initialScale={0.5}
          minScale={0.1}
          maxScale={3}
          limitToBounds={true}
          doubleClick={{ disabled: false }}
          wheel={{ disabled: false }}
          panning={{ disabled: false }}
        >
          <TransformComponent>
            <Box sx={styleOrgChart(sxParamsFull)} mt={4}>
              <DraggableScroll
                sx={{
                  display: "flex",
                  gap: 1,
                  paddingBottom: 1,
                  "&::-webkit-scrollbar": {
                    height: "3px",
                  },
                }}
              >
                <Image
                  alt="Bukti Dukung"
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL_FILES +
                    "bukti_dukung/" +
                    thisGambar
                  }
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </DraggableScroll>
            </Box>
          </TransformComponent>
        </TransformWrapper>
      </DialogComponent>
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => {
          handleDeleteListData();
          showToast("Data berhasil dihapus", "error");
        }}
      />
      {/* <DialogComponent
        width={360}
        dialogOpen={modalConfirm ?? false}
        dialogClose={() => setModalConfirm?.(false)}
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button color="error" onClick={() => setModalConfirm?.(false)}>
              Tidak
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                handleUpdateStatus("review");
                setModalConfirm?.(false);
                // setIsReject(false);
                // setIsApproval(false);
                // setIsReview(true);
                // showToast("Berhasil mengajukan pengesahan", "success");
              }}
            >
              Ya
            </Button>
          </DialogActions>
        }
      >
        Apakah Anda yakin ingin <strong>MENGAJUKAN PENGESAHAN</strong>?
      </DialogComponent>
      <DialogComponent
        width={480}
        title="Catatan Penolakan"
        dialogOpen={modalReject ?? false}
        dialogClose={() => setModalReject?.(false)}
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button color="error" onClick={() => setModalReject?.(false)}>
              Tidak
            </Button>
            <Button
              color="error"
              variant="contained"
              type="submit"
              onClick={() => {
                setModalReject?.(false);
                handleUpdateStatus("rejected", stateApproval?.message);
                // setIsReview(false);
                // setIsApproval(false);
                // setIsReject(true);
                // showToast("Berhasil menolak pengesahan", "error");
              }}
            >
              Tolak
            </Button>
          </DialogActions>
        }
      >
        <Stack gap={1}>
          <Typography>
            Apakah Anda yakin ingin <strong>MENOLAK PENGESAHAN</strong>?<br />
            Tuliskan catatan penolakan
          </Typography>

          <FormNote
            state={stateApproval}
            setState={setStateApproval}
            mode="add"
          />
        </Stack>
      </DialogComponent>
      <DialogComponent
        width={360}
        dialogOpen={modalApproval ?? false}
        dialogClose={() => setModalApproval?.(false)}
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button color="error" onClick={() => setModalApproval?.(false)}>
              Tidak
            </Button>
            <Button
              color="success"
              variant="contained"
              type="submit"
              onClick={() => {
                setModalApproval?.(false);
                handleUpdateStatus("approved", stateApproval?.message);
                // setIsReview(false);
                // setIsReject(false);
                // setIsApproval(true);
                // showToast("Berhasil mengajukan approval", "success");
              }}
            >
              Terima
            </Button>
          </DialogActions>
        }
      >
        Apakah Anda yakin ingin <strong>MENERIMA PENGESAHAN</strong>?
      </DialogComponent> */}
    </Fragment>
  );
}

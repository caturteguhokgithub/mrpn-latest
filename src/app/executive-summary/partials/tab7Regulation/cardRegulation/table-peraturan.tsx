import React, { SetStateAction, Fragment } from "react";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  Icon,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import theme from "@/theme";
import { AddCircle } from "@mui/icons-material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import DialogComponent from "@/components/dialog";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import FormPeraturan from "./form-peraturan";
import {
  ExsumRegulationDto,
  ExsumRegulationResDto,
} from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationModel";
import DialogDelete from "@/app/components/dialogDelete";
import { useAuthContext } from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import { bgColorTh } from "@/utils/color";
import useCardRegulationVM from "./cardRegulationVM";
import Iconify from "@/app/components/icons/iconify";
import { blue, grey, red } from "@mui/material/colors";
import useCardRegulasi from "@/app/penetapan/konteks-strategis/cardRegulasi/vm";
import { doRequestRegulasiDto } from "@/app/penetapan/konteks-strategis/cardRegulasi/model";

export default function TablePeraturan({
  data,
  deleteData,
  penetapan,
  setModal,
  setModalDelete,
  intExt,
  setState,
}: {
  data: ExsumRegulationResDto[];
  deleteData: any;
  penetapan?: boolean;
  setModal?: () => void;
  setModalDelete?: () => void;
  intExt?: boolean;
  setState?: (value: SetStateAction<ExsumRegulationDto>) => void;
}) {
  const { permission } = useAuthContext((state) => state);
  const pathname = usePathname();

  const { conditionEditing } = useCardRegulationVM();

  const handleBtnEdit = async (params: ExsumRegulationResDto, act: string) => {
    if (intExt) {
      setState?.((prevState) => ({
        ...prevState,
        id: params.id,
        amanat: params.amanat,
        stakeholder: params.entitas,
        stakeholder_id: Array.isArray(params.entitas)
          ? params.entitas.map((e) => e.id)
          : [],
        entitas_id: Array.isArray(params.entitas)
          ? params.entitas.map((e) => e.id)
          : [],
        perpres: Array.isArray(params.perpres)
          ? params.perpres.map((p) => p.id).join(",")
          : params.perpres,
      }));
    }

    if (act == "delete") {
      setModalDelete?.();
    } else {
      setModal?.();
    }
  };

  return (
    <Fragment>
      <Stack
        mb={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        color={conditionEditing}
      >
        <FieldLabelInfo
          titleSection
          title="Daftar Peraturan Perundang-Undangan yang Terkait"
        />
      </Stack>
      {data.length === 0 ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <TableContainer component={Paper} elevation={0} variant="outlined">
          <Table size="small">
            <TableHead sx={{ bgcolor: bgColorTh }}>
              <TableRow>
                {/* <TableCell width={500}>Entitas</TableCell> */}
                <TableCell width={500}>Nomor Regulasi</TableCell>
                {/* <TableCell width={240}>Peraturan Terkait</TableCell> */}
                <TableCell width={240}>Tentang</TableCell>
                {/* <TableCell>Amanat Peraturan yang Terkait</TableCell> */}
                <TableCell>Keterangan</TableCell>
                {penetapan && (
                  <TableCell align="center" width={120}>
                    Aksi
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/*{(hasPrivilege(permission, pathname, "update") ||*/}
                  {/*  hasPrivilege(permission, pathname, "delete")) && (*/}
                  {/*  <TableCell*/}
                  {/*    sx={{ textAlign: "center", verticalAlign: "top" }}*/}
                  {/*  >*/}
                  {/*    <Tooltip title="Delete" placement="top">*/}
                  {/*      <IconButton*/}
                  {/*        aria-label="delete"*/}
                  {/*        color="error"*/}
                  {/*        onClick={() => deleteData(row.id)}*/}
                  {/*        // disabled={*/}
                  {/*        //   hasPrivilege(permission, pathname, "update") ||*/}
                  {/*        //   hasPrivilege(permission, pathname, "delete")*/}
                  {/*        // }*/}
                  {/*      >*/}
                  {/*        <Icon*/}
                  {/*          baseClassName="fas"*/}
                  {/*          className={`fa-trash-alt`}*/}
                  {/*          sx={{*/}
                  {/*            fontSize: "14px",*/}
                  {/*          }}*/}
                  {/*        />*/}
                  {/*      </IconButton>*/}
                  {/*    </Tooltip>*/}
                  {/*  </TableCell>*/}
                  {/*)}*/}
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Stack
                      display="inline-flex"
                      alignItems="center"
                      direction="row"
                      gap={0.5}
                      flexWrap="wrap"
                    >
                      {Array.isArray(row.entitas) &&
                        row.entitas.map((e, idx) => {
                          if (
                            typeof e === "object" &&
                            e !== null &&
                            "value" in e
                          ) {
                            // Jika entitas bertipe object
                            return (
                              <Box key={e.id} component="span">
                                <Chip
                                  label={e.value}
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
                            );
                          } else {
                            // Jika entitas berupa number (ID), fallback ditampilkan sebagai angka
                            return (
                              <Box key={idx} component="span">
                                <Chip
                                  label={`Entitas ID: ${e}`}
                                  size="small"
                                  color="default"
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
                            );
                          }
                        })}
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    {
                      intExt && typeof row.perpres === "string"
                        ? row.perpres // perpres bertipe string
                        : Array.isArray(row.perpres)
                        ? row.perpres.map((y, index2) => (
                            <Chip
                              key={index2}
                              size="small"
                              label={y.title}
                              sx={
                                y.flag != null
                                  ? {
                                      background: "#EA6228",
                                      color: "white",
                                      height: "auto",
                                      ".MuiChip-label": {
                                        whiteSpace: "wrap",
                                        lineHeight: 1.2,
                                        paddingTop: "4.8px",
                                        paddingBottom: "4.8px",
                                      },
                                    }
                                  : undefined
                              }
                            />
                          ))
                        : "-" // fallback kalau bukan array
                    }
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    {row.amanat}
                  </TableCell>
                  {penetapan && (
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: grey[50],
                      }}
                    >
                      <Stack direction="row">
                        <IconButton onClick={() => handleBtnEdit(row, "edit")}>
                          <Iconify name="mdi:pencil" color={blue[500]} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleBtnEdit(row, "delete")}
                        >
                          <Iconify name="mdi:trash" color={red[500]} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Fragment>
  );
}

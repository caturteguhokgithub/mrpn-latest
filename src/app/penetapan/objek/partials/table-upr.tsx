import React, { Fragment, useEffect } from "react";
import {
  Box,
  Button,
  Collapse,
  DialogActions,
  FormControl,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import {
  dtoUraian,
  dtoUsulanUprLs,
  UnitPengelolaRisikoEntity,
} from "@/app/penetapan/objek/pageModel";
import { InfoTooltip } from "@/app/components/InfoTooltip";
import { blue, grey, red } from "@mui/material/colors";
import { bgColorTh } from "@/app/utils/color";
import Iconify from "@/app/components/icons/iconify";
import usePenetapanObjectVM from "../pageVM";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import {
  usePenetapanTopicContext,
  useRKPContext,
} from "@/lib/core/hooks/useHooks";
import DialogComponent from "@/app/components/dialog";

function createData(name: string) {
  return {
    name,
  };
}

function Row(props: {
  row: dtoUraian;
  mode?: string;
  uprData: dtoUsulanUprLs[];
  setModalObjek?: any;
  handleModalDeleteObject: () => void;
  handleModalEditEntitas: () => void;
  handleModalDeleteEntitas: () => void;
}) {
  const {
    row,
    mode,
    uprData,
    setModalObjek,
    handleModalDeleteObject,
    handleModalEditEntitas,
    handleModalDeleteEntitas,
  } = props;
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width={70}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Iconify name="mdi:chevron-up" />
            ) : (
              <Iconify name="mdi:chevron-down" />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography component="span" color={grey[600]}>
                Objek Shortlist:
              </Typography>{" "}
              <Typography component="span" fontWeight={500}>
                {row.rkp}
              </Typography>
            </Stack>
            <Button
              color="error"
              size="small"
              variant="outlined"
              onClick={handleModalDeleteObject}
              sx={{ borderRadius: 2, px: 2, minWidth: 0 }}
            >
              <Iconify name="mdi:trash" color={red[500]} />
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box p={1} bgcolor={grey[50]}>
              <TableContainer
                component={Paper}
                elevation={0}
                variant="outlined"
              >
                <Table
                  sx={{
                    minWidth: 650,
                    "tbody, thead": {
                      "td, th": {
                        borderRight: `1px solid ${grey[300]} !important`,
                        "&:last-of-type": {
                          borderRight: `1px solid ${grey[300]} !important`,
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
                      <TableCell>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                          gap={0.5}
                        >
                          Entitas MRPN
                          <InfoTooltip title="Kementerian negara, lembaga, pemerintah daerah, pemerintah desa, badan usaha, dan badan lainnya" />
                        </Stack>
                      </TableCell>
                      <TableCell align="center" width="50%">
                        Ruang Lingkup
                      </TableCell>
                      {/* <TableCell colSpan={3} align="center">
                        Unit Pengelola Risiko
                      </TableCell> */}
                      <TableCell align="center" width={200}>
                        Keterangan
                      </TableCell>
                      <TableCell
                        width={110}
                        align="center"
                        sx={{ bgcolor: bgColorTh }}
                      >
                        Aksi
                      </TableCell>
                    </TableRow>
                    {/* <TableRow>
                      {UnitPengelolaRisikoEntity.map((uprItem, indexUpr) => (
                        <TableCell
                          width="16%"
                          align="center"
                          key={`${indexUpr}`}
                        >
                          {uprItem.value}
                        </TableCell>
                      ))}
                    </TableRow> */}
                  </TableHead>
                  <TableBody>
                    {uprData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <EmptyState
                            icon={<IconEmptyData />}
                            title="Data Kosong"
                            description="Silahkan isi konten tabel ini"
                          />
                        </TableCell>
                      </TableRow>
                    ) : (
                      uprData.map((entity, i) => (
                        <TableRow key={entity.id}>
                          <TableCell
                            align="center"
                            sx={{ verticalAlign: "top" }}
                          >
                            {i + 1}
                          </TableCell>
                          <TableCell sx={{ verticalAlign: "top" }}>
                            {entity.entitas.value}
                          </TableCell>
                          <TableCell sx={{ verticalAlign: "top" }}>
                            {entity.ruang_lingkup}
                          </TableCell>
                          {/* {UnitPengelolaRisikoEntity.map((uprItem) => (
                            <TableCell align="center" key={uprItem.id}>
                              <Stack direction="row" justifyContent="center">
                                {entity.type === uprItem.value ? (
                                  <Iconify
                                    name="mdi:check-circle-outline"
                                    size={20}
                                    color={blue[600]}
                                  />
                                ) : null}
                              </Stack>
                            </TableCell>
                          ))} */}
                          <TableCell sx={{ verticalAlign: "top" }}>
                            Entitas MRPN {entity.type}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ verticalAlign: "top" }}
                          >
                            <Stack direction="row" justifyContent="center">
                              <IconButton onClick={handleModalEditEntitas}>
                                <Iconify name="mdi:pencil" color={blue[500]} />
                              </IconButton>
                              <IconButton onClick={handleModalDeleteEntitas}>
                                <Iconify name="mdi:trash" color={red[500]} />
                              </IconButton>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTableUpr({
  useEffectObjectState,
  showSave,
  stateUpr,
  setModalObjek,
  handleModalDeleteObject,
  handleModalEditEntitas,
  handleModalDeleteEntitas,
}: {
  useEffectObjectState?: any;
  showSave?: boolean;
  stateUpr?: dtoUraian[];
  setModalObjek?: (value: boolean) => void;
  handleModalDeleteObject: any;
  handleModalEditEntitas: any;
  handleModalDeleteEntitas: any;
}) {
  const { year } = useRKPContext((state) => state);
  const { objectState } = usePenetapanTopicContext((state) => state);

  useEffect(useEffectObjectState, [year, objectState]);

  return (
    <Fragment>
      <TableContainer
        component={Paper}
        elevation={0}
        variant="outlined"
        sx={{
          pointerEvents: showSave ? "none" : "auto",
          opacity: showSave ? 0.7 : 1,
        }}
      >
        <Table>
          <TableBody>
            {stateUpr &&
              stateUpr.map((item) => {
                return (
                  <Row
                    key={item.id}
                    row={item}
                    uprData={item.usulan_upr_linsek}
                    setModalObjek={setModalObjek}
                    handleModalDeleteObject={handleModalDeleteObject}
                    handleModalEditEntitas={handleModalEditEntitas}
                    handleModalDeleteEntitas={handleModalDeleteEntitas}
                  />
                );
              })}
            {/* {listObject.map((object) => {
              const uprData = listUpr.filter(
                (upr) => upr.object_id === object.id
              );
              return (
                <Row
                  key={object.id}
                  row={createData(object.value)}
                  uprData={uprData}
                  setModalObjek={setModalObjek}
                />
              );
            })} */}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {!showSave && (
        <Stack direction="row" justifyContent="flex-end">
          <Box mt={2}>
            <Button
              variant="contained"
              sx={{ borderRadius: 24, px: 4 }}
              onClick={setShowSave}
            // onClick={() => {
            //   updateOrCreateEntity();
            // }}
            >
              Simpan
            </Button>
          </Box>
        </Stack>
      )} */}
    </Fragment>
  );
}

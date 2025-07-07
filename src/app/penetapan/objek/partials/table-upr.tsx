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
import { blue, grey } from "@mui/material/colors";
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
}) {
  const { row, mode, uprData, setModalObjek } = props;
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
            {/* <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={() => setModalObjek(true)}
              sx={{ gap: 0.5, borderRadius: 24 }}
            >
              <Iconify name="mdi:edit" size={16} /> Ubah Objek
            </Button> */}
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
                          borderRight: `0 !important`,
                        },
                      },
                    },
                  }}
                  size="small"
                >
                  <TableHead sx={{ bgcolor: bgColorTh }}>
                    <TableRow>
                      <TableCell rowSpan={2} width={70} align="center">
                        No.
                      </TableCell>
                      <TableCell rowSpan={2}>
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
                      <TableCell rowSpan={2} align="center">
                        Ruang Lingkup
                      </TableCell>
                      <TableCell colSpan={5} align="center">
                        Unit Pengelola Risiko
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {UnitPengelolaRisikoEntity.map((uprItem, indexUpr) => (
                        <TableCell
                          width="16%"
                          align="center"
                          key={`${indexUpr}`}
                        >
                          {uprItem.value}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {uprData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7}>
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
                          <TableCell align="center">{i + 1}</TableCell>
                          <TableCell>{entity.entitas.value}</TableCell>
                          <TableCell>{entity.ruang_lingkup}</TableCell>
                          {UnitPengelolaRisikoEntity.map((uprItem) => (
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
                          ))}
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
}: {
  useEffectObjectState?: any;
  showSave?: boolean;
  stateUpr?: dtoUraian[];
  setModalObjek?: (value: boolean) => void;
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

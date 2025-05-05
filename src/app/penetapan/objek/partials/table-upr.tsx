import React, { Fragment } from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Radio,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import { UnitPengelolaRisikoEntity } from "@/app/penetapan/objek/pageModel";
import { InfoTooltip } from "@/app/components/InfoTooltip";
import { grey } from "@mui/material/colors";
import { bgColorTh } from "@/app/utils/color";
import { listUpr, listObject } from "../data"; // Import listObject and listUpr
import Iconify from "@/app/components/icons/iconify";

function createData(name: string) {
  return {
    name,
  };
}

function Row(props: {
  row: ReturnType<typeof createData>;
  mode?: string;
  uprData: any[];
}) {
  const { row, mode, uprData } = props;
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
          <Typography component="span" color={grey[600]}>
            Objek Shortlist:
          </Typography>{" "}
          <Typography component="span" fontWeight={500}>
            {row.name}
          </Typography>
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
                          <TableCell>{entity.value}</TableCell>
                          {UnitPengelolaRisikoEntity.map((uprItem) => (
                            <TableCell align="center" key={uprItem.id}>
                              <Radio
                                name={`radio-${i}`}
                                value={uprItem.id}
                                checked={entity.upr === uprItem.id}
                                onChange={() => {}}
                              />
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

export default function CollapsibleTableUpr() {
  return (
    <Fragment>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table>
          <TableBody>
            {listObject.map((object) => {
              const uprData = listUpr.filter(
                (upr) => upr.object_id === object.id
              );
              return (
                <Row
                  key={object.id}
                  row={createData(object.value)}
                  uprData={uprData}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="flex-end">
        <Box mt={2}>
          <Button
            variant="contained"
            sx={{ borderRadius: 24, px: 4 }}
            // onClick={() => updateOrCreateEntity()}
          >
            Simpan
          </Button>
        </Box>
      </Stack>
    </Fragment>
  );
}

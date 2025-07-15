import React, { useEffect } from "react";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import { bgColorTh } from "@/utils/color";
import Iconify from "@/components/icons/iconify";
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { create } from "lodash";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";

export default function TableLog() {
  const { rkp, year, rpjmn } = useRKPContext((state) => state);

  const { useEffectLogActivity, getStateLogActivity } = usePenetapanObjectVM();

  useEffect(useEffectLogActivity, [year]);

  const data = getStateLogActivity.map((item) => ({
    object: item.topik,
    create: true,
    shortlist: item.shortlist,
    approve: item.approval,
  }));

  const checkIcon = (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Iconify name="mdi:check-circle" color={green[500]} size={24} />
    </Stack>
  );

  const closeIcon = (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Iconify name="mdi:close-circle-outline" color={red[500]} size={24} />
    </Stack>
  );

  return (
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
            <TableCell align="center">Objek</TableCell>
            <TableCell align="center">Create</TableCell>
            <TableCell align="center">Shortlist</TableCell>
            <TableCell align="center">Approve</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length ? (
            <React.Fragment>
              {data.map((item) => (
                <TableRow>
                  <TableCell>{item.object}</TableCell>
                  <TableCell>{item.create ? checkIcon : closeIcon}</TableCell>
                  <TableCell align="center">
                    {item.shortlist ? checkIcon : closeIcon}
                  </TableCell>
                  <TableCell align="center">
                    {item.approve ? checkIcon : closeIcon}
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <EmptyState
                  icon={<IconEmptyData />}
                  title="Data Kosong"
                  description="Silahkan isi konten tabel ini"
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

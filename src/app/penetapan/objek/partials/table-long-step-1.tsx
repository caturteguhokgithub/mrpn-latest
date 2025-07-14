import React, { useEffect, useState } from "react";
import {
  alpha,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import {
  useAuthContext,
  usePenetapanTopicContext,
} from "@/lib/core/hooks/useHooks";
import {
  PenetapanObjectPrioritas,
  PenetapanObjectUraianDto,
} from "@/lib/core/context/penetapanTopicContext";
import { DasarPemilihan } from "@/app/penetapan/objek/pageModel";
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import { grey } from "@mui/material/colors";
import { bgColorTh } from "@/app/utils/color";

export default function TableLonglistStepOne({ mode }: { mode?: string }) {
  const { uraianState, setUraianState } = usePenetapanTopicContext(
    (state) => state
  );

  const { permission } = useAuthContext((state) => state);
  let pathname = usePathname();

  const getIsChecked = (data: PenetapanObjectPrioritas[], id: number) => {
    const getIndex = data.findIndex((x) => x.value == id.toString());
    return getIndex > -1;
  };

  function handleChecked(checked: boolean, i: number, id: number) {
    const curUraian: PenetapanObjectUraianDto[] = uraianState;
    const curPrioritas = curUraian[i].prioritas;
    if (checked) {
      const newRow: PenetapanObjectPrioritas = {
        id: 0,
        uraian_penetapan_objek_id: 0,
        value: id.toString(),
      };
      curPrioritas.push(newRow);
    } else {
      const getIndex = curPrioritas.findIndex((x) => x.value == id.toString());
      if (getIndex > -1) {
        curPrioritas.splice(getIndex, 1);
      }
    }

    if (curPrioritas.length == 0) {
      curUraian[i].objek = false;
    }

    setUraianState(curUraian);
  }

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
            <TableCell rowSpan={2} width={70} sx={{ textAlign: "center" }}>
              No.
            </TableCell>
            <TableCell rowSpan={2} sx={{ textAlign: "center" }}>
              Uraian Objek MRPN LS
            </TableCell>
            <TableCell colSpan={4} align="center">
              Dasar Pemilihan Prioritas Objek MRPN LS
            </TableCell>
          </TableRow>
          <TableRow>
            {DasarPemilihan.map((x, index) => (
              <TableCell width="16%" sx={{ textAlign: "center" }}>
                {x.value}
              </TableCell>
            ))}
          </TableRow>
          <TableRow
            sx={{
              ".MuiTableCell-stickyHeader": {
                top: 37,
              },
            }}
          >
            {[...new Array(6)].map((_, i) => (
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
          {mode === "add" ? (
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
            <>
              {uraianState.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{row.rkp.value}</TableCell>
                  {DasarPemilihan.map((x, index) => (
                    <TableCell align="center">
                      <Checkbox
                        value={x.id}
                        // disabled={
                        //   !(
                        //     hasPrivilege(permission, pathname, "add") ||
                        //     hasPrivilege(permission, pathname, "update") ||
                        //     hasPrivilege(permission, pathname, "delete")
                        //   )
                        // }
                        checked={getIsChecked(row.prioritas, x.id)}
                        onChange={(e) =>
                          handleChecked(e.target.checked, i, x.id)
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

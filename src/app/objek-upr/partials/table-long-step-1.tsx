import React, {useEffect, useState} from "react";
import {
 Checkbox,
 Paper,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
} from "@mui/material";
import theme from "@/theme";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import {useAuthContext, usePenetapanTopicContext} from "@/lib/core/hooks/useHooks";
import {PenetapanObjectPrioritas, PenetapanObjectUraianDto} from "@/lib/core/context/penetapanTopicContext";
import {DasarPemilihan} from "@/app/penetapan/objek/pageModel";
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
import {usePathname} from "next/navigation";
import {hasPrivilege} from "@/lib/core/helpers/authHelpers";

export default function TableLonglistStepOne({ mode }: { mode?: string }) {

 const {
   uraianState,
   setUraianState,
 } = usePenetapanTopicContext(state => state)

 const { permission } = useAuthContext((state) => state);
 let pathname = usePathname();

 const getIsChecked = (data:PenetapanObjectPrioritas[], id:number) => {
  const getIndex = data.findIndex(x => x.value == id.toString())
  return getIndex > -1;
 }

 function handleChecked(checked: boolean, i: number, id: number) {

  const curUraian:PenetapanObjectUraianDto[] = uraianState
  const curPrioritas = curUraian[i].prioritas
  if (checked){
   const newRow:PenetapanObjectPrioritas = {
    id: 0,
    uraian_penetapan_objek_id: 0,
    value: id.toString()
   }
   curPrioritas.push(newRow)
  } else {
   const getIndex = curPrioritas.findIndex(x => x.value == id.toString())
   if (getIndex > -1){
    curPrioritas.splice(getIndex, 1)
   }
  }

  if (curPrioritas.length == 0){
   curUraian[i].objek = false
  }

  setUraianState(curUraian)
 }

 return (
  <>
   <TableContainer component={Paper} elevation={0} variant="outlined">
    <Table sx={{ minWidth: 650 }} size="small">
     <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
      <TableRow>
       <TableCell rowSpan={2} width={70}>
        No.
       </TableCell>
       <TableCell rowSpan={2}>Uraian Objek MRPN Linsek</TableCell>
       <TableCell colSpan={4} align="center">
        Dasar Pemilihan Prioritas Objek MRPN Linsek
       </TableCell>
      </TableRow>
      <TableRow>
       {DasarPemilihan.map((x,index) =>
        <TableCell width="16%">{x.value}</TableCell>
       )}
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
          {DasarPemilihan.map((x,index) =>
           <TableCell align="center">
            <Checkbox
              value={x.id}
              disabled={!(hasPrivilege(permission, pathname, "add") || hasPrivilege(permission, pathname, "update") || hasPrivilege(permission, pathname, "delete"))}
              checked={getIsChecked(row.prioritas, x.id)}
              onChange={(e) => handleChecked(e.target.checked, i, x.id)}
            />
           </TableCell>
          )}
         </TableRow>
        ))}
       </>
      )}
     </TableBody>
    </Table>
   </TableContainer>
  </>
 );
}

import React, { useEffect } from "react";
import {
 Box,
 Button,
 Checkbox,
 Paper,
 Stack,
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
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
import { usePenetapanTopicContext } from "@/lib/core/hooks/useHooks";
import {
 KriteriaPemilihanEntity,
 PenetapanObjectEntityItemDto,
 PenetapanObjectStateEntityDto,
} from "@/app/penetapan/objek/pageModel";
import { PenetapanObjectPrioritas } from "@/lib/core/context/penetapanTopicContext";
import { InfoTooltip } from "@/app/components/InfoTooltip";

export default function TableProposal({ mode }: { mode?: string }) {
 const {
  stateEntity,
  setStateEntity,
  getPenetapanObjectEntity,
  updateOrCreateEntity,
 } = usePenetapanObjectVM();

 const { objectState } = usePenetapanTopicContext((state) => state);

 useEffect(() => {
  if (objectState !== undefined) {
   getPenetapanObjectEntity();
  }
 }, [objectState]);

 const getIsChecked = (index: number, id: number) => {
  const dt = stateEntity[index].items;
  const getIndex = dt.findIndex((x) => x.value == id.toString());
  return getIndex > -1;
 };

 function handleChecked(checked: boolean, i: number, id: number) {
  const curEntity: PenetapanObjectStateEntityDto[] = [...stateEntity];
  const curItem = curEntity[i].items;
  if (checked) {
   const newRow: PenetapanObjectEntityItemDto = {
    id: 0,
    value: id.toString(),
   };
   curItem.push(newRow);
  } else {
   const getIndex = curItem.findIndex((x) => x.value == id.toString());
   if (getIndex > -1) {
    curItem.splice(getIndex, 1);
   }
  }
  setStateEntity(curEntity);
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
       <TableCell rowSpan={2}>
        <Stack direction="row" alignItems="center" gap={0.5}>
         Entitas MRPN
         <InfoTooltip
          title="Kementerian negara, lembaga, pemerintah daerah, pemerintah desa, badan usaha, dan badan
lainnya"
         />
        </Stack>
       </TableCell>
       <TableCell colSpan={5} align="center">
        Kriteria Pemilihan Prioritas UPR Linsek
       </TableCell>
      </TableRow>
      <TableRow>
       {KriteriaPemilihanEntity.map((k, indexK) => (
        <TableCell width="16%">{k.value}</TableCell>
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
        {stateEntity.map((entity, i) => (
         <TableRow key={i}>
          <TableCell>{i + 1}</TableCell>
          <TableCell>{entity.value}</TableCell>
          {KriteriaPemilihanEntity.map((k, indexK) => (
           <TableCell align="center" key={`${i}${indexK}`}>
            <Checkbox
             value={k.id}
             checked={getIsChecked(i, k.id)}
             onChange={(e) => handleChecked(e.target.checked, i, k.id)}
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
   <Stack direction="row" justifyContent="flex-end">
    <Box mt={2}>
     <Button
      variant="contained"
      sx={{ borderRadius: 24, px: 4 }}
      onClick={() => updateOrCreateEntity()}
     >
      Simpan
     </Button>
    </Box>
   </Stack>
  </>
 );
}

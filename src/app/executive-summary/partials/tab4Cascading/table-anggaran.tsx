import React, {SetStateAction, useEffect, useState} from "react";
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography,} from "@mui/material";
import theme from "@/theme";
import {MiscMasterRPJMNRes} from "@/app/misc/master/masterServiceModel";
import {
  ExsumInterventionState,
  ProjectTargetAnggaranDto
} from "@/app/executive-summary/partials/tab4Cascading/cardIntervensi/cardIntervensiModel";
import {FormatCurrency} from "@/lib/utils/currency";
import {useRKPContext} from "@/lib/core/hooks/useHooks";

function GetTableRow(
  {
    tahun,
    state,
    setState
  } : {
    tahun: number|string
    state:ExsumInterventionState,
    setState: (value: SetStateAction<ExsumInterventionState>) => void
  }
) {

  const data = state.list.find(x => x.tahun == tahun)
  const handleStateChange = (value:string, type:keyof ProjectTargetAnggaranDto) => {

    setState(prevState => {
      let prev = {...prevState}
      const indexData = prev.list.findIndex(x => x.tahun == tahun)
      if (indexData > -1) {
        if (type == "target"){
          prev.list[indexData].target = value
        }
        if (type == "satuan"){
          prev.list[indexData].satuan = value
        }
        if (type == "anggaranString"){
          prev.list[indexData].anggaranString = FormatCurrency(value)
          prev.list[indexData].anggaran = parseInt(value.replace(/[^,\d]/g, '').toString());
        }
        if (type == "sumber_anggaran"){
          prev.list[indexData].sumber_anggaran = value
        }
      }
      return prev
    })


  }


  return (data == undefined) ? null : (<TableRow
    sx={{"&:last-child td, &:last-child th": {border: 0}}}
  >
    <TableCell>{tahun}</TableCell>
    <TableCell>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            value={data.target}
            onChange={(e) => handleStateChange(e.target.value, "target")}
            variant="outlined"
            size="small"
            placeholder="Nilai"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            value={data.satuan}
            onChange={(e) => handleStateChange(e.target.value, "satuan")}
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Satuan"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </TableCell>
    <TableCell>
      <TextField
        value={data.anggaranString}
        onChange={(e) => handleStateChange(e.target.value, "anggaranString")}
        variant="outlined"
        size="small"
        placeholder="Anggaran"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{input: {textAlign: "right"}}}
      />
    </TableCell>
    <TableCell>
      <TextField
        value={data.sumber_anggaran}
        onChange={(e) => handleStateChange(e.target.value, "sumber_anggaran")}
        variant="outlined"
        size="small"
        placeholder="Sumber Anggaran"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </TableCell>
  </TableRow>);
}

export default function TableAnggaran(
  {
    state,
    setState,
  }: {
    state:ExsumInterventionState,
    setState: (value: SetStateAction<ExsumInterventionState>) => void
  }
) {

  return (
    <Table sx={{minWidth: 650}} size="small">
      <TableHead sx={{bgcolor: theme.palette.primary.light}}>
        <TableRow>
          <TableCell>
            <Typography variant="body1" fontWeight={600}>
              Tahun
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1" fontWeight={600}>
              Target
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1" fontWeight={600}>
              Pembiayaan
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1" fontWeight={600}>
              Sumber Pembiayaan
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {state.list.map((row, index) =>
          <GetTableRow key={index} tahun={row.tahun} state={state} setState={setState}/>
        )}
      </TableBody>
    </Table>
  );
}

import React, {Fragment, SetStateAction} from "react";
import {
 FormControl,
 Grid,
 Paper,
 TextField,
 Typography,
} from "@mui/material";
import {PenetapanObjectVMState} from "@/app/penetapan/objek/pageModel";
import {ProjectDefaultDto} from "@/lib/core/context/rkpContext";
import {AutocompleteSelectMultiple} from "@/components/autocomplete";

export default function FormTable(
  {
   state,
   setState,
   optionPN,
  } : {
   state:PenetapanObjectVMState
   setState:(value:(SetStateAction<PenetapanObjectVMState>)) => void,
   optionPN:ProjectDefaultDto[]
  }
) {

 return (
  <>
   <Grid container spacing={2}>
    <Grid item lg={4}>
     <FormControl fullWidth>
      <Typography gutterBottom>Kode Topik</Typography>
      <TextField
       variant="outlined"
       size="small"
       placeholder="Kode Topik"
       InputLabelProps={{
        shrink: true,
       }}
       value={state.code}
       onChange={(e) => setState(prevState => {
         return {
           ...prevState,
           code:e.target.value
         }
       })}
      />
     </FormControl>
    </Grid>
    <Grid item lg={8}>
     <FormControl fullWidth>
      <Typography gutterBottom>Topik</Typography>
      <TextField
       variant="outlined"
       size="small"
       placeholder="Topik"
       InputLabelProps={{
        shrink: true,
       }}
       value={state.topik}
       onChange={(e) => setState(prevState => {
         return {
           ...prevState,
           topik:e.target.value
         }
       })}
      />
     </FormControl>
    </Grid>
    <Grid item lg={12}>
      <FormControl fullWidth>
        <Typography gutterBottom>Prioritas Nasional</Typography>
        <AutocompleteSelectMultiple
          key={optionPN.length}
          value={state.values}
          options={optionPN}
          getOptionLabel={(opt) => `${opt.code} - ${opt.value}`}
          handleChange={(val:ProjectDefaultDto[]) => setState(prevState => {
            return {
              ...prevState,
              values:val
            }
          })}
          placeHolder={"Pilih PN"}
          labelSelectAll={"Pilih semua PN"}
        />
      </FormControl>
    </Grid>
   </Grid>
  </>
 );
}

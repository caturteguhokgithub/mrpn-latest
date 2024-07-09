import React from "react";
import {
 Autocomplete,
 Box,
 Button,
 Card,
 CardActions,
 CardContent,
 Checkbox,
 Chip,
 Divider,
 FormControl,
 FormControlLabel,
 FormGroup,
 FormHelperText,
 FormLabel,
 Grid,
 List,
 ListItem,
 Paper,
 Stack,
 TextField,
 Typography,
} from "@mui/material";
import TextareaComponent from "@/app/components/textarea";
import dynamic from "next/dynamic";
import { OptionKebijakan, listKebijakan } from "@/app/utils/data";
import AutocompleteSelect from "@/app/components/autocomplete";
import {
 SxAutocompleteTextField,
 SxAutocomplete,
} from "@/app/components/dropdownKp";

const MultiCheckbox = ({
 title,
 children,
 maxHeight,
}: {
 title: string;
 children: React.ReactNode;
 maxHeight?: number;
}) => {
 return (
  <Card variant="outlined">
   <CardContent sx={{ pb: "16px !important" }}>
    <FormControl
     component="fieldset"
     variant="standard"
     sx={{ gap: 2, width: "100%" }}
    >
     <FormLabel component="legend">{title}</FormLabel>
     <FormGroup
      sx={{
       mt: 2,
       maxHeight: maxHeight ? maxHeight : 150,
       ".MuiCheckbox-root": {
        p: "2px 10px",
       },
      }}
     >
      {children}
     </FormGroup>
    </FormControl>
   </CardContent>
  </Card>
 );
};

export default function FormRelated({ mode }: { mode?: string }) {
 const [value, setValue] = React.useState("");

 const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

 const [selectedOptions, setSelectedOptions] = React.useState<
  OptionKebijakan[]
 >([]);

 const handleChange = (
  event: React.ChangeEvent<{}>,
  value: OptionKebijakan[] | null
 ) => {
  setSelectedOptions(value ?? []);
 };

 const quickWins = (
  <>
   {[...new Array(8)].map((_, i) => (
    <FormControlLabel
     key={i}
     control={<Checkbox name="gilad" />}
     label={`${i} Quick Wins`}
    />
   ))}
  </>
 );

 const gameChangers = (
  <>
   {[...new Array(10)].map((_, i) => (
    <FormControlLabel
     key={i}
     control={<Checkbox name="gilad" />}
     label={`${i} Game Changers`}
    />
   ))}
  </>
 );

 const ffIndicator = (
  <>
   {[...new Array(45)].map((_, i) => (
    <FormControlLabel
     key={i}
     control={<Checkbox name="gilad" />}
     label={`${i} FF Indicator`}
    />
   ))}
  </>
 );

 return (
  <>
   <Grid container spacing={2}>
    <Grid item lg={12}>
     <FormControl fullWidth>
      <Typography gutterBottom>Kebijakan</Typography>
      {mode === "add" || mode === "edit" ? (
       <Autocomplete
        size="small"
        multiple
        disableCloseOnSelect
        options={listKebijakan}
        getOptionLabel={(option: OptionKebijakan) => option.label}
        renderInput={(params) => (
         <TextField
          {...params}
          InputLabelProps={{
           shrink: true,
          }}
          placeholder="Pilih kebijakan"
          sx={SxAutocompleteTextField}
         />
        )}
        renderTags={(value: OptionKebijakan[], getTagProps) => {
         return value.map((option: OptionKebijakan, index: number) => {
          const { key, ...restProps } = getTagProps({ index });
          return (
           <Chip
            key={option.id}
            size="small"
            label={option.label}
            {...restProps}
           />
          );
         });
        }}
        value={selectedOptions}
        onChange={handleChange}
        sx={{
         ...SxAutocomplete,
         ".MuiInputBase-root": {
          borderRadius: 1,
         },
        }}
       />
      ) : (
       <Typography fontWeight={600}>-</Typography>
      )}
     </FormControl>
    </Grid>
    <Grid item lg={12}>
     <FormControl fullWidth>
      <Typography gutterBottom>Keterangan</Typography>
      {mode === "add" ? (
       <Stack
        gap={2}
        sx={{
         ".MuiPaper-root": {
          minWidth: "0 !important",
         },
        }}
       >
        <ReactQuill
         theme="snow"
         value={value}
         onChange={setValue}
         style={{ maxHeight: "300px" }}
        />
        {selectedOptions.map((option: OptionKebijakan, index: number) => (
         <Box key={index}>
          {option.value === "13" ? (
           <MultiCheckbox title="8 Quick Wins">{quickWins}</MultiCheckbox>
          ) : option.value === "14" ? (
           <MultiCheckbox title="10 Game Changer" maxHeight={200}>
            {gameChangers}
           </MultiCheckbox>
          ) : option.value === "15" ? (
           <MultiCheckbox
            title="45 Indikator Utama Pembangunan"
            maxHeight={350}
           >
            {ffIndicator}
           </MultiCheckbox>
          ) : null}
         </Box>
        ))}
       </Stack>
      ) : mode === "edit" ? (
       <TextareaComponent
        label="Keterangan"
        placeholder="Keterangan"
        value="-"
       />
      ) : (
       <Typography fontWeight={600}>-</Typography>
      )}
     </FormControl>
    </Grid>
   </Grid>
  </>
 );
}

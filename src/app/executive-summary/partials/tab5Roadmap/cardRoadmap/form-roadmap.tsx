import React from "react";
import {
  Divider,
  FormControl,
  Grid,
  Grow,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import TextareaComponent, { TextareaStyled } from "@/components/textarea";
import dynamic from "next/dynamic";
import SelectCustomTheme from "@/components/select";
import { listTahun } from "@/utils/data";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { MiscMasterRPJMNRes } from "@/app/misc/master/masterServiceModel";
import { ExsumRoadmapDto } from "@/app/executive-summary/partials/tab5Roadmap/cardRoadmap/cardRoadmapModel";
import { grey } from "@mui/material/colors";
import {AutocompleteSelectMultiple} from "@/components/autocomplete";

export default function FormRoadmap({
  rpjmn,
  request,
  setRequest,
}: {
  rpjmn: MiscMasterRPJMNRes;
  request: ExsumRoadmapDto;
  setRequest: any;
}) {
  const listYearRPjmn = () => {
    let listYear = [];
    for (let i = rpjmn.start; i <= rpjmn.end; i++) {
      listYear.push(i);
    }
    return listYear;
  };

  const handleChange = (e: any) => {
    setRequest((prev: ExsumRoadmapDto) => {
      return {
        ...prev,
        year: e.target.value,
      };
    });
  };

  const [value, setValue] = React.useState("");
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Tahun" />
            {/*<SelectCustomTheme*/}
            {/*  defaultStyle*/}
            {/*  small*/}
            {/*  value={request.year}*/}
            {/*  onChange={handleChange}*/}
            {/*>*/}
            {/*  <MenuItem value="none" disabled>*/}
            {/*    <Typography fontSize={14} fontStyle="italic" color={grey[700]}>*/}
            {/*      Pilih tahun*/}
            {/*    </Typography>*/}
            {/*  </MenuItem>*/}
            {/*  {listYearRPjmn().map((tahunLabel, index) => (*/}
            {/*    <MenuItem key={index} value={tahunLabel}>*/}
            {/*      <Typography aria-haspopup="true" sx={{ fontSize: 14 }}>*/}
            {/*        {tahunLabel}*/}
            {/*      </Typography>*/}
            {/*    </MenuItem>*/}
            {/*  ))}*/}
            {/*</SelectCustomTheme>*/}
            <AutocompleteSelectMultiple
              value={request.year}
              options={listYearRPjmn()}
              getOptionLabel={option => option.toString()}
              handleChange={(newVal:number[]) => setRequest((prev: ExsumRoadmapDto) => {
                return {
                  ...prev,
                  year: newVal
                };
              })}
              placeHolder={"Pilih tahun"}
              labelSelectAll={"Pilih semua tahun"}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Output" />
            {/*<ReactQuill theme="snow" value={value} onChange={setValue} />*/}
            <TextareaStyled
              aria-label={"Output"}
              placeholder={"Output"}
              minRows={3}
              value={request.output}
              onChange={(e) =>
                setRequest((prev: ExsumRoadmapDto) => {
                  return {
                    ...prev,
                    output: e.target.value,
                  };
                })
              }
            />
          </FormControl>
        </Grid>

        {/*<Grid item lg={6}>*/}
        {/* <FormControl fullWidth sx={{ mb: 3 }}>*/}
        {/*  <FieldLabelInfo title="RO Pendukung" information="RO Pendukung" />*/}
        {/*  {mode === "add" ? (*/}
        {/*   <ReactQuill*/}
        {/*    theme="snow"*/}
        {/*    value={value}*/}
        {/*    onChange={setValue}*/}
        {/*    style={{ maxHeight: "300px" }}*/}
        {/*   />*/}
        {/*  ) : mode === "edit" ? (*/}
        {/*   <TextareaComponent*/}
        {/*    label="Keterangan"*/}
        {/*    placeholder="Keterangan"*/}
        {/*    value="-"*/}
        {/*   />*/}
        {/*  ) : (*/}
        {/*   <Typography fontWeight={600}>-</Typography>*/}
        {/*  )}*/}
        {/* </FormControl>*/}
        {/*</Grid>*/}
        {/*<Grid item lg={6}>*/}
        {/* <FormControl fullWidth>*/}
        {/*  <FieldLabelInfo title="Catatan Lain" information="Catatan Lain" />*/}
        {/*  {mode === "add" ? (*/}
        {/*   <ReactQuill*/}
        {/*    theme="snow"*/}
        {/*    value={value}*/}
        {/*    onChange={setValue}*/}
        {/*    style={{ maxHeight: "300px" }}*/}
        {/*   />*/}
        {/*  ) : mode === "edit" ? (*/}
        {/*   <TextareaComponent*/}
        {/*    label="Keterangan"*/}
        {/*    placeholder="Keterangan"*/}
        {/*    value="-"*/}
        {/*   />*/}
        {/*  ) : (*/}
        {/*   <Typography fontWeight={600}>-</Typography>*/}
        {/*  )}*/}
        {/* </FormControl>*/}
        {/*</Grid>*/}
      </Grid>
    </>
  );
}

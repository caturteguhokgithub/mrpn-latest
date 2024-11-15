import React, { SetStateAction, useState } from "react";
import {
  Box,
  Chip,
  Divider,
  FormControl,
  Grid,
  Typography,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import Matriks from "./matriks";
import { RiskAnalysisAddStateDto } from "@/app/profil-risiko/analisis-evaluasi/pageModel";
import { MasterRiskMatrixRes } from "@/app/misc/master/masterServiceModel";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { ProfileRiskDto } from "@/app/profil-risiko/identifikasi/pageModel";

export default function FormTable({
  mode,
  state,
  setState,
  optionsRiskMatrix,
  optionsRiskProfile,
}: {
  mode?: string;
  state: RiskAnalysisAddStateDto;
  setState: (value: SetStateAction<RiskAnalysisAddStateDto>) => void;
  optionsRiskMatrix: MasterRiskMatrixRes[];
  optionsRiskProfile: ProfileRiskDto[];
}) {
  const [clickedCell, setClickedCell] = useState({
    rowIndex: null,
    colIndex: null,
    value: null,
  });

  const handleClick = (rowIndex: any, colIndex: any, value: any) => {
    const getIndex = optionsRiskMatrix.findIndex((x) => x.nilai == value);
    if (getIndex > -1) {
      setState((prevState) => {
        return {
          ...prevState,
          src_matriks_risiko: optionsRiskMatrix[getIndex],
        };
      });
      setClickedCell({ rowIndex, colIndex, value });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Divider>
          <Chip label="Identifikasi Risiko" size="small" />
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo
            title="Peristiwa Risiko Strategis MRPN Linsek"
            titleField
            information={
              <>
                <strong>Risiko Strategis</strong>
                <p>
                  Risiko yang terkait dengan kebijakan publik atau keputusan
                  bisnis jangka panjang akibat dari penetapan dan penerapan
                  strategi yang kurang tepat, ketidaktepatan dalam perencanaan
                  strategis dan pengambilan suatu keputusan strategis dan
                  kegagalan dalam menghadapi perubahan-perubahan di lingkungan
                  eksternal, termasuk dan/atau pengembangan baru yang dapat
                  dilihat pada saat pengambilan keputusan yang buruk, dan
                  alokasi sumber daya yang tidak memadai
                </p>
              </>
            }
          />
          {mode == "create" ? (
            <AutocompleteSelectSingle
              key={optionsRiskProfile.length}
              value={state.profil_risiko}
              options={optionsRiskProfile}
              getOptionLabel={(opt) => opt.peristiwa_risiko}
              handleChange={(e: ProfileRiskDto) =>
                setState((prevState) => {
                  return {
                    ...prevState,
                    profil_risiko: e,
                  };
                })
              }
              placeHolder={"Pilih peristiwa risiko"}
            />
          ) : (
            <Typography fontWeight={600}>
              {state.profil_risiko?.peristiwa_risiko ?? "-"}
            </Typography>
          )}
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Divider>
          <Chip label="Analisis & Evaluasi Risiko" size="small" />
        </Divider>
      </Grid>

      <Grid item xs={12}>
        <FormControl>
          <Typography fontStyle="italic" variant="overline" color={grey[600]}>
            Klik kotak berwarna untuk menampilkan nilai LK & LD
          </Typography>
        </FormControl>
        <Matriks
          key={"risk-analysis"}
          levelId={5}
          handleClick={handleClick}
          clickedCell={clickedCell}
          noClick={mode === "read" ? true : false}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Level Kemungkinan (LK)" />
          <Typography fontWeight={600}>
            {state.src_matriks_risiko?.kemungkinan ?? "-"}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Level Dampak (LD)" />
          <Typography fontWeight={600}>
            {state.src_matriks_risiko?.dampak ?? "-"}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Besaran Risiko (BR)" />
          <Typography fontWeight={600}>
            {state.src_matriks_risiko?.nilai ?? "-"}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Level Risiko" />
          {/*<Box>*/}
          {/*  <Chip*/}
          {/*    color={"error"}*/}
          {/*    sx={{*/}
          {/*      minWidth: 80,*/}
          {/*      borderWidth: "2px",*/}
          {/*      borderStyle: "solid",*/}
          {/*      "& .MuiChip-label": {*/}
          {/*        fontWeight: 600,*/}
          {/*      },*/}
          {/*      "&.MuiChip-colorError": {*/}
          {/*        bgcolor: red[100],*/}
          {/*        borderColor: red[400],*/}
          {/*        color: red[900],*/}
          {/*      },*/}
          {/*    }}*/}
          {/*    label={state.src_matriks_risiko?.level ?? "-"}*/}
          {/*  />*/}
          {/*</Box>*/}
          <Typography fontWeight={600}>
            {state.src_matriks_risiko?.level ?? "-"}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Prioritas Risiko" />
          <Typography fontWeight={600}>
            {state.src_matriks_risiko
              ? state.src_matriks_risiko.level.replace(/\D/g, "")
              : "-"}
          </Typography>
        </FormControl>
      </Grid>
    </Grid>
  );
}

import React, { SetStateAction } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { TextareaStyled } from "@/app/components/textarea";
import { grey, red } from "@mui/material/colors";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import HeaderIdentifikasi from "./header";
import {
  IdentificationRiskAddReqDto,
  IdentificationRiskResDto,
} from "@/app/profil-risiko/identifikasi/pageModel";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { IndikatorDto } from "@/app/misc/rkp/rkpServiceModel";
import AddButton from "@/components/buttonAdd";
import { IconFA } from "@/components/icons/icon-fa";
import { GetTarget } from "@/lib/utils/common";
import Iconify from "@/app/components/icons/iconify";

export default function FormTable({
  mode,
  data,
  request,
  setRequest,
  optionPeristiwaRisiko,
  optionRiskType,
  optionImpactArea,
  setModalPeristiwa,
}: {
  mode?: string;
  data: IdentificationRiskResDto | undefined;
  request: IdentificationRiskAddReqDto;
  setRequest: (value: SetStateAction<IdentificationRiskAddReqDto>) => void;
  optionPeristiwaRisiko: string[],
  optionRiskType: string[];
  optionImpactArea: string[];
  setModalPeristiwa: (value: boolean) => void;
}) {
  const { rpjmn, year } = useRKPContext((store) => store);

  const getTarget = (indikator: IndikatorDto) => {
    return GetTarget(rpjmn, year, indikator);
  };

  return (
    <Stack gap={2}>
      <HeaderIdentifikasi noPadding noPaddingChip asTable isModal data={data} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Kategori Risiko MRPN LS"
              titleField
              information={
                <>
                  <strong>Kategori Risiko</strong>
                  <p>
                    Pengelompokan risiko misalnya berdasarkan sumber risiko
                    (melalui metode <em>Risk Breakdown Structure</em>), area
                    yang terkena dampak (melalui metode{" "}
                    <em>Work Breakdown Structure</em>), atau kategori lainnya.
                    Kategorisasi risiko pada umumnya dilakukan untuk membantu
                    proses analisis dan evaluasi risiko serta membantu proses
                    perumusan strategi penanganannya{" "}
                  </p>
                </>
              }
            />

            {mode !== "read" && (
              <AutocompleteSelectSingle
                value={request.kategori_risiko}
                options={optionRiskType}
                getOptionLabel={(opt) => opt}
                handleChange={(e: string) =>
                  setRequest((prevState) => {
                    return {
                      ...prevState,
                      kategori_risiko: e,
                    };
                  })
                }
                placeHolder={"Pilih kategori risiko"}
              />
            )}

            {mode === "read" && (
              <Typography fontWeight={500}>
                {request.kategori_risiko}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Insidentil"
              titleField
              information={
                <Stack spacing={2}>
                  <div>
                    <strong>Risiko Insidentil</strong>
                    <p>
                      Risiko yang sudah ditetapkan oleh UPR Lintas Sektor (LS)
                      tetapi setelah perlakuan risiko masih berada dalam level
                      tingkat tinggi sehingga tidak dapat ditangani lagi oleh
                      UPR LS.
                    </p>
                  </div>
                </Stack>
              }
            />
            {mode === "read" && !request.insidentil ? (
              "-"
            ) : (
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={mode === "read"}
                    checked={request.insidentil}
                    value={request.insidentil}
                    onChange={(e) =>
                      setRequest((prevState) => {
                        return {
                          ...prevState,
                          insidentil: e.target.checked,
                        };
                      })
                    }
                    sx={{
                      color: red[600],
                      "&.Mui-checked": {
                        color: red[600],
                      },
                      ...(mode === "read" && {
                        py: 0,
                      }),
                    }}
                  />
                }
                label={
                  <Typography fontWeight={500} color={red[600]}>
                    Insidentil
                  </Typography>
                }
              />
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Peristiwa Risiko Strategis MRPN LS" />
            {mode === "read" ? (
              <Typography fontWeight={500}>
                {request.peristiwa_risiko}
              </Typography>
            ) : (
              <>
                {/* <TextareaStyled
                  aria-label="Peristiwa Risiko Strategis MRPN LS"
                  placeholder="Peristiwa Risiko Strategis MRPN LS"
                  value={request.peristiwa_risiko}
                  onChange={(e) =>
                    setRequest((prevState) => {
                      return {
                        ...prevState,
                        peristiwa_risiko: e.target.value,
                      };
                    })
                  }
                /> */}
                {/* <AutocompleteSelectSingle<doMasterKategori>
                  value={listMasterCategory.find(
                    (category) => category.id === state?.src_kategori_id
                  )}
                  options={listMasterCategory}
                  getOptionLabel={(option) => option.value}
                  handleChange={(newValue: doMasterKategori) =>
                    setState
                      ? setState((prevState) => ({
                          ...prevState,
                          src_kategori_id: newValue.id,
                        }))
                      : ""
                  }
                  placeHolder={"Pilih kategori"}
                /> */}
                <AutocompleteSelectSingle
                  value={request.peristiwa_risiko}
                  options={optionPeristiwaRisiko}
                  getOptionLabel={(opt) => opt}
                  handleChange={(e: string) =>
                    setRequest((prevState) => {
                      return {
                        ...prevState,
                        peristiwa_risiko: e,
                      };
                    })
                  }
                  placeHolder={"Pilih peristiwa risiko"}
                  actionButton={
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      startIcon={<Iconify name="mdi:plus-circle" />}
                      onMouseDown={() => setModalPeristiwa(true)}
                    >
                      Tambah Peristiwa Risiko
                    </Button>
                  }
                />
              </>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Stack
              direction={"row"}
              gap={2}
              justifyContent={"space-between"}
              marginY={1}
            >
              <FieldLabelInfo
                title="Penyebab/Faktor Risiko Strategis MRPN LS"
                titleField
                information={
                  <>
                    <strong>Risiko Strategis</strong>
                    <p>
                      Risiko yang terkait dengan kebijakan publik atau keputusan
                      bisnis jangka panjang akibat dari penetapan dan penerapan
                      strategi yang kurang tepat, ketidaktepatan dalam
                      perencanaan strategis dan pengambilan suatu keputusan
                      strategis dan kegagalan dalam menghadapi
                      perubahan-perubahan di lingkungan eksternal, termasuk
                      dan/atau pengembangan baru yang dapat dilihat pada saat
                      pengambilan keputusan yang buruk, dan alokasi sumber daya
                      yang tidak memadai
                    </p>
                  </>
                }
              />
              {mode !== "read" && (
                <AddButton
                  title={`Tambah`}
                  filled
                  noMargin
                  onclick={() =>
                    setRequest((prevState) => {
                      let p = prevState.penyebab;
                      p.push("");
                      return {
                        ...prevState,
                        penyebab: p,
                      };
                    })
                  }
                />
              )}
            </Stack>

            <Stack direction={"column"} gap={1}>
              {request.penyebab.map((p, pi) => (
                <Stack direction={"column"} gap={1}>
                  <Stack direction={"row"} gap={1}>
                    {mode === "read" ? (
                      <Typography fontWeight={500}>{p}</Typography>
                    ) : (
                      <TextareaStyled
                        key={`ip-${pi}`}
                        aria-label="Penyebab/Faktor Risiko Strategis MRPN LS"
                        placeholder="Penyebab/Faktor Risiko Strategis MRPN LS"
                        value={p}
                        onChange={(e) =>
                          setRequest((prevState) => {
                            let dt = prevState.penyebab;
                            dt[pi] = e.target.value;
                            return {
                              ...prevState,
                              penyebab: dt,
                            };
                          })
                        }
                      />
                    )}

                    {pi > 0 && (
                      <Stack minWidth={"50px"} justifyContent={"center"}>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() =>
                            setRequest((prevState) => {
                              let dt = prevState.penyebab;
                              dt.splice(pi, 1);
                              return {
                                ...prevState,
                                penyebab: dt,
                              };
                            })
                          }
                          sx={{ p: 0 }}
                        >
                          <IconFA size={18} name="trash-can" />
                        </IconButton>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Area Dampak" />
            {mode === "read" ? (
              <Typography fontWeight={500}>{request.area_dampak}</Typography>
            ) : (
              <AutocompleteSelectSingle
                value={request.area_dampak}
                options={optionImpactArea}
                getOptionLabel={(opt) => opt}
                handleChange={(e: string) =>
                  setRequest((prevState) => {
                    return {
                      ...prevState,
                      area_dampak: e,
                    };
                  })
                }
                placeHolder={"Pilih area dampak"}
              />
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Stack
              direction={"row"}
              gap={2}
              justifyContent={"space-between"}
              marginY={1}
            >
              <FieldLabelInfo
                title="Dampak Strategis MRPN LS"
                titleField
                information={
                  <>
                    <strong>MRPN Lintas Sektor</strong>
                    <p>
                      Kegiatan terkoordinasi untuk mengarahkan dan mengendalikan
                      Entitas MRPN sehubungan dengan adanya risiko Pembangunan
                      Nasional atas program, kegiatan, proyek, prioritas
                      pembangunan, dan risiko tertentu yang melibatkan dua atau
                      lebih Entitas MRPN pengelola keuangan negara.
                    </p>
                  </>
                }
              />
              {mode !== "read" && (
                <AddButton
                  title={`Tambah`}
                  filled
                  noMargin
                  onclick={() =>
                    setRequest((prevState) => {
                      let p = prevState.dampak;
                      p.push("");
                      return {
                        ...prevState,
                        dampak: p,
                      };
                    })
                  }
                />
              )}
            </Stack>

            <Stack direction={"column"} gap={1}>
              {request.dampak.map((p, pi) => (
                <Stack direction={"column"} gap={1}>
                  <Stack direction={"row"} gap={1}>
                    {mode === "read" ? (
                      <Typography fontWeight={500}>{p}</Typography>
                    ) : (
                      <TextareaStyled
                        key={`ip-${pi}`}
                        aria-label="Dampak Strategis MRPN LS"
                        placeholder="Dampak Strategis MRPN LS"
                        value={p}
                        onChange={(e) =>
                          setRequest((prevState) => {
                            let dt = prevState.dampak;
                            dt[pi] = e.target.value;
                            return {
                              ...prevState,
                              dampak: dt,
                            };
                          })
                        }
                      />
                    )}

                    {pi > 0 && (
                      <Stack minWidth={"50px"} justifyContent={"center"}>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() =>
                            setRequest((prevState) => {
                              let dt = prevState.dampak;
                              dt.splice(pi, 1);
                              return {
                                ...prevState,
                                dampak: dt,
                              };
                            })
                          }
                          sx={{ p: 0 }}
                        >
                          <IconFA size={18} name="trash-can" />
                        </IconButton>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </FormControl>
        </Grid>
      </Grid>
    </Stack>
  );
}

import React, { Fragment, SetStateAction } from "react";
import {
  Box,
  Button,
  Collapse,
  ListItem,
  Stack,
  TextField,
  ToggleButtonGroup,
  Typography,
  alpha,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import theme from "@/theme";
import CustomToggleButton from "@/app/components/toggleButton";
import TextareaComponent, { TextareaStyled } from "@/app/components/textarea";
import FormatBP from "./formatBp";
import FormatKL from "./formatKl";
import { LabelRadio } from "@/app/components/labelRadio";
import { useAuthContext } from "@/lib/core/hooks/useHooks";
import { InfoTooltip } from "@/app/components/InfoTooltip";
import SeleraMatriks from "../../kriteria/partials/tab4Selera/matriks";
import TableRas from "./table-ras";
import { doReqSeleraDto } from "../../kriteria/partials/tab4Selera/hooks/model";

export default function RiskContent({
  handleSaveButton,
  state,
  setState
}: {
  handleSaveButton?: () => void;
  state: doReqSeleraDto;
  setState: (value: SetStateAction<doReqSeleraDto>) => void;
}) {
  const { user } = useAuthContext((state) => state);

  const userLv = user?.type === "BAPPENAS" ? "bappenas" : "kl";
  const [valueTheme, setValueTheme] = React.useState<string | null>("");
  const [userLevel, setUserLevel] = React.useState<string | null>(userLv);
  const [modalOpenRef, setModalOpenRef] = React.useState(false);

  const handleUserLevel = (
    event: React.MouseEvent<HTMLElement>,
    newUserLevel: string | null
  ) => {
    setUserLevel(newUserLevel);
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setValueTheme(newAlignment);
    var type_nilai = ""

    switch (newAlignment) {
      case "1":
        type_nilai = "Rendah"
        break;
      case "2":
        type_nilai = "Konservatif"
        break;
      case "3":
        type_nilai = "Moderat"
        break;
      case "4":
        type_nilai = "Tinggi"
        break;

      default:
        type_nilai = ""
        break;
    }

    setState((prevState) => ({
      ...prevState,
      type_nilai: type_nilai
    }))

  };

  const handleModalOpenRef = () => {
    setModalOpenRef(true);
  };

  const handleModalClose = () => {
    setModalOpenRef(false);
  };

  const saveButton = (
    <Button
      variant="contained"
      onClick={handleSaveButton}
      sx={{
        minWidth: 160,
        mt: 2,
        borderRadius: 50,
        color: "white !important",
      }}
    >
      Simpan
    </Button>
  );

  return (
    <Fragment>
      <Box mb={2} p={2} bgcolor={theme.palette.primary.light} borderRadius={3}>
        <Typography component="p">
          Selera risiko adalah jenis/jumlah (nilai absolut) dari risiko yang
          siap diambil dalam proses pencapaian sasaran PKPPR, dengan pilihan
          sebagai berikut.
        </Typography>
      </Box>

      {/*<ToggleButtonGroup*/}
      {/*  value={userLevel}*/}
      {/*  exclusive*/}
      {/*  onChange={handleUserLevel}*/}
      {/*  sx={{*/}
      {/*    mb: 2,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <ToggleButton value="bappenas">User Bappenas</ToggleButton>*/}
      {/*  <ToggleButton value="kl">User KL</ToggleButton>*/}
      {/*</ToggleButtonGroup>*/}
      <Stack gap={2}>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <Typography fontSize={18} fontWeight={600}>
            Risk Appetite Statement (RAS)/Pernyataan Selera Risiko
          </Typography>
          <InfoTooltip
            title="Pernyataan formal yang menentukan sejauh mana perusahaan bersedia mengambil risiko dalam
mencapai tujuan bisnisnya. Hal ini penting dalam membimbing pengambilan keputusan dan
menetapkan batasan yang diterima oleh perusahaan dalam menghadapi risiko. Selera risiko RPJMN
dan RKP ditentukan oleh Kementerian yang menyelenggarakan urusan pemerintahan di bidang
perencanaan pembangunan nasional"
          />
        </Stack>
        <TableRas />
        <Stack gap={1}>
          <Typography fontStyle="italic" fontSize={14} color={grey[600]}>
            Tuliskan pernyataan selera risiko{" "}
            {valueTheme == "1"
              ? "Rendah"
              : valueTheme == "2"
                ? "Konservatif"
                : valueTheme == "3"
                  ? "Moderat"
                  : "Tinggi"}
          </Typography>

          <TextareaStyled
            aria-label="Deskripsi"
            minRows={3}
            onChange={(e) => {
              setState((prevState) => ({
                ...prevState,
                pernyataan: e.target.value,
              }))
            }}
            placeholder={`Deskripsi ${valueTheme == "1"
              ? "Rendah"
              : valueTheme == "2"
                ? "Konservatif"
                : valueTheme == "3"
                  ? "Moderat"
                  : "Tinggi"
              }`}
          // width="100%"
          />
        </Stack>
      </Stack>
      <Stack gap={2} mt={3}>
        <Typography color={grey[600]} fontSize={14} fontStyle="italic">
          Pilih salah satu untuk memberikan{" "}
          {userLevel === "bappenas" ? "deskripsi" : "nilai"}
        </Typography>
        <ToggleButtonGroup
          value={valueTheme}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            [theme.breakpoints.down("md")]: {
              gridTemplateColumns: "1fr 1fr",
            },
            [theme.breakpoints.down("sm")]: {
              gridTemplateColumns: "1fr",
            },
            gap: 2,
            button: {
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              },
              "&.Mui-selected": {
                bgcolor: theme.palette.primary.main,
                color: "white",
                ".MuiBox-root": {
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                  borderRight: "1px solid white",
                },
                "&:hover": {
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                },
              },
            },
          }}
        >
          <CustomToggleButton
            //    variant="danger"
            code={userLevel === "bappenas" ? "Nilai" : null}
            value="1"
            //    valueLabel="1-6"
            label="Rendah"
            minheight={60}
          />
          <CustomToggleButton
            //    variant="warning"
            code={userLevel === "bappenas" ? "Nilai" : null}
            value="2"
            //    valueLabel="7-12"
            label="Konservatif"
            minheight={60}
          />
          <CustomToggleButton
            //    variant="success"
            code={userLevel === "bappenas" ? "Nilai" : null}
            value="3"
            //    valueLabel="13-18"
            label="Moderat"
            minheight={60}
          />
          <CustomToggleButton
            //    variant="primary"
            code={userLevel === "bappenas" ? "Nilai" : null}
            value="4"
            //    valueLabel="19-25"
            label="Tinggi"
            minheight={60}
          />
        </ToggleButtonGroup>
      </Stack>
      <Collapse in={valueTheme === "1"}>
        <Box mb={2}>
          <LabelRadio
            heading="RENDAH"
            rangeValue={userLevel === "bappenas" ? "1-5" : "1-6"}
            description={
              <Stack gap={1}>
                {userLevel === "bappenas" ? (
                  <Stack gap={1}>
                    <FormatBP
                      levelId={1}
                      // form={
                      //   <TextareaComponent
                      //     label="Deskripsi"
                      //     placeholder="Deskripsi rendah"
                      //     width="100%"
                      //   />
                      // }
                      target="Sama atau meningkat ≤ 5%"
                      kapasitas="Rendah/tetap/sebanding dengan peningkatan target"
                      inherent="Sangat Rendah"
                      note="Sering tidak ingin risiko terjadi"
                    />
                    <SeleraMatriks levelId={1} levelDampak="rendah" />
                  </Stack>
                ) : (
                  <FormatKL
                    listItem={
                      <>
                        <ListItem sx={{ display: "list-item" }}>
                          Sangat berhati-hati dalam mengambil risiko dan lebih
                          memilih menjaga stabilitas dan konsistensi dalam
                          Pembangunan Nasional.
                        </ListItem>
                        <ListItem sx={{ display: "list-item" }}>
                          Sangat tidak ingin risiko ini terjadi, cenderung
                          memilih opsi teraman untuk menghindari dampak kritikal
                          dan melaksanakan perlakuan risiko untuk mempertahankan
                          keberlangsungan Pembangunan Nasional.
                        </ListItem>
                      </>
                    }
                    form={
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        placeholder="Isi nilai rendah"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText="Isi dengan angka"
                      />
                    }
                  />
                )}
              </Stack>
            }
          />
        </Box>
        {/* {saveButton} */}
      </Collapse>
      <Collapse in={valueTheme === "2"}>
        <Box mb={2}>
          <LabelRadio
            heading="KONSERVATIF"
            rangeValue={userLevel === "bappenas" ? "1-10" : "7-12"}
            // value={userLevel === "bappenas" ? 8 : null}
            description={
              <Stack gap={1}>
                {userLevel === "bappenas" ? (
                  <Stack gap={1}>
                    <FormatBP
                      levelId={2}
                      // form={
                      //   <TextareaComponent
                      //     label="Deskripsi"
                      //     placeholder="Deskripsi konservatif"
                      //     width="100%"
                      //   />
                      // }
                      target="Meningkat 5% < x ≤ 10%"
                      kapasitas="Rendah/tetap/sebanding dengan peningkatan target"
                      inherent="Rendah"
                      note="Terdapat gap ketercapaian target yang dapat diterima"
                    />
                    {/* <Box>
                      <AddButton
                        startIcon={<Iconify name="mdi:search" />}
                        title="Lihat Referensi Matriks"
                        onclick={handleModalOpenRef}
                        filled
                      />
                    </Box> */}
                    <SeleraMatriks levelId={1} levelDampak="konservatif" />
                  </Stack>
                ) : (
                  <FormatKL
                    listItem={
                      <>
                        <ListItem sx={{ display: "list-item" }}>
                          Toleransi terbatas atas hasil yang tidak pasti dalam
                          pencapaian visi, misi, atau tujuan strategis
                          Pembangunan Nasional.
                        </ListItem>
                        <ListItem sx={{ display: "list-item" }}>
                          Akan menerima risiko jika pencapaian hasil sangat
                          penting untuk visi, misi, atau tujuan strategis
                          Pembangunan Nasional.
                        </ListItem>
                      </>
                    }
                    form={
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        placeholder="Isi nilai konservatif"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText="Isi dengan angka"
                      />
                    }
                  />
                )}
              </Stack>
            }
          />
        </Box>
        {/* {saveButton} */}
      </Collapse>
      <Collapse in={valueTheme === "3"}>
        <Box mb={2}>
          <LabelRadio
            heading="MODERAT"
            rangeValue={userLevel === "bappenas" ? "1-15" : "13-18"}
            // value={userLevel === "bappenas" ? 15 : null}
            description={
              <Stack gap={1}>
                {userLevel === "bappenas" ? (
                  <Stack gap={1}>
                    <FormatBP
                      levelId={3}
                      // form={
                      //   <TextareaComponent
                      //     label="Deskripsi"
                      //     placeholder="Deskripsi moderat"
                      //     width="100%"
                      //   />
                      // }
                      target="Meningkat 10% < x < 50%"
                      kapasitas="Rendah/tetap/meningkat tetapi tidak sebanding dengan peningkatan target"
                      inherent="Sedang"
                      note="Mempertimbangkan Cost & Benefit"
                    />
                    {/* <Box>
                      <AddButton
                        startIcon={<Iconify name="mdi:search" />}
                        title="Lihat Referensi Matriks"
                        onclick={handleModalOpenRef}
                        filled
                      />
                    </Box> */}
                    <SeleraMatriks levelId={1} levelDampak="moderat" />
                  </Stack>
                ) : (
                  <FormatKL
                    listItem={
                      <>
                        <ListItem sx={{ display: "list-item" }}>
                          Bersedia mengambil risiko dalam batas tertentu untuk
                          mencapai sasaran, tetapi tetap memperhatikan
                          perlindungan terhadap risiko.
                        </ListItem>
                        <ListItem sx={{ display: "list-item" }}>
                          Perlakuan risiko dengan mempertimbangkan cost dan
                          benefit.
                        </ListItem>
                        <ListItem sx={{ display: "list-item" }}>
                          Tingkat toleransi atas hasil yang tidak pasti bersifat
                          relatif terhadap visi, misi, atau tujuan Pembangunan
                          Nasional.
                        </ListItem>
                      </>
                    }
                    form={
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        placeholder="Isi nilai moderat"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText="Isi dengan angka"
                      />
                    }
                  />
                )}
              </Stack>
            }
          />
        </Box>
        {/* {saveButton} */}
      </Collapse>
      <Collapse in={valueTheme === "4"}>
        <Box mb={2}>
          <LabelRadio
            heading="TINGGI"
            rangeValue={userLevel === "bappenas" ? "1-20" : "19-25"}
            // value={userLevel === "bappenas" ? 25 : null}
            description={
              <Stack gap={1}>
                {userLevel === "bappenas" ? (
                  <Stack gap={1}>
                    <FormatBP
                      levelId={4}
                      // form={
                      //   <TextareaComponent
                      //     label="Deskripsi"
                      //     placeholder="Deskripsi tinggi"
                      //     width="100%"
                      //   />
                      // }
                      target="Meningkat sangat signifikan > 50%"
                      kapasitas="Rendah/tetap/meningkat tetapi tidak sebanding dengan peningkatan target"
                      inherent="Tinggi"
                      note="Diperlukan banyak program inovasi untuk mengambil peluang & mencapai target kinerja dengan difasilitasi RO/Komponen (agar tersedia anggaran)"
                    />
                    {/* <Box>
                      <AddButton
                        startIcon={<Iconify name="mdi:search" />}
                        title="Lihat Referensi Matriks"
                        onclick={handleModalOpenRef}
                        filled
                      />
                    </Box> */}
                    <SeleraMatriks levelId={1} levelDampak="tinggi" />
                  </Stack>
                ) : (
                  <FormatKL
                    listItem={
                      <ListItem sx={{ display: "list-item" }}>
                        Secara aktif menerapkan strategi yang melibatkan
                        pengelolaan risiko sebagai bagian integral dari rencana
                        kegiatan, mengambil risiko lebih tinggi dalam rangka
                        mencapai peluang dan inovasi yang lebih besar
                      </ListItem>
                    }
                    form={
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        placeholder="Isi nilai tinggi"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText="Isi dengan angka"
                      />
                    }
                  />
                )}
              </Stack>
            }
          />
        </Box>
        {/* {saveButton} */}
      </Collapse>
      {saveButton}
    </Fragment>
  );
}

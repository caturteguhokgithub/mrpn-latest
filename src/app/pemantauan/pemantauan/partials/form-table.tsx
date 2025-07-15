import React from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  SelectChangeEvent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { IconFA } from "@/components/icons/icon-fa";
import { VisuallyHiddenInput } from "@/utils/constant";

export default function FormTable({ mode }: { mode?: string }) {
  const [project, setProject] = React.useState("");
  const [progressStatus, setProgressStatus] = React.useState<string | null>(
    "left"
  );

  const handleChangeProject = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  const handleUserLevel = (
    event: React.MouseEvent<HTMLElement>,
    newUserLevel: string | null
  ) => {
    setProgressStatus(newUserLevel);
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
            title="Peristiwa Risiko Strategis MRPN LS"
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
          <Typography fontWeight={600}>
            Rendahnya pengawasan dan penegakan hukum terhadap penyelenggaraan
            pengelolaan sampah
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo
            title="Kategori Risiko MRPN LS"
            titleField
            information={
              <>
                <strong>Kategori Risiko</strong>
                <p>
                  Pengelompokan risiko misalnya berdasarkan sumber risiko
                  (melalui metode <em>Risk Breakdown Structure</em>), area yang
                  terkena dampak (melalui metode{" "}
                  <em>Work Breakdown Structure</em>), atau kategori lainnya.
                  Kategorisasi risiko pada umumnya dilakukan untuk membantu
                  proses analisis dan evaluasi risiko serta membantu proses
                  perumusan strategi penanganannya{" "}
                </p>
              </>
            }
          />
          <Typography fontWeight={600}>Risiko Tata Kelola</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Divider>
          <Chip label="Analisis & Evaluasi Risiko" size="small" />
        </Divider>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Level Dampak (LD)" />
          <Typography fontWeight={600}>5</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Level Kemungkinan (LK)" />
          <Typography fontWeight={600}>4</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Besaran Risiko (BR)" />
          <Typography fontWeight={600}>19</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Level Risiko" />
          <Box>
            <Chip
              color="error"
              sx={{
                minWidth: 80,
                borderWidth: "2px",
                borderStyle: "solid",
                "& .MuiChip-label": {
                  fontWeight: 600,
                },
                "&.MuiChip-colorError": {
                  bgcolor: red[100],
                  borderColor: red[400],
                  color: red[900],
                },
              }}
              label="Sangat Tinggi"
            />
          </Box>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Prioritas Risiko" />
          <Typography fontWeight={600}>3</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Divider>
          <Chip label="Perlakuan Risiko" size="small" />
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Keputusan" />
          <Typography fontWeight={600}>
            Mengurangi kemungkinan terjadinya risiko
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Waktu Rencana" />
          <Typography fontWeight={600}>2025</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Penanggungjawab" />
          <Typography fontWeight={600}>KLHK</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Divider>
          <Chip label="Risiko Residual Harapan" size="small" />
        </Divider>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Level Kemungkinan (LK)" />
          <Typography fontWeight={600}>4</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Level Dampak (LD)" />
          <Typography fontWeight={600}>4</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Besaran Risiko (BR)" />
          <Stack sx={{ height: 40 }} direction="row" alignItems="center">
            <Typography fontWeight={600}>22</Typography>
          </Stack>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={8}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Status Pelaksanaan" />
          <ToggleButtonGroup
            value={progressStatus}
            exclusive
            onChange={handleUserLevel}
          >
            <ToggleButton value="belum" sx={{ px: 3 }} color="primary">
              <Stack direction="row" alignItems="center" gap={1}>
                <IconFA name="xmark" size={12} />
                <Typography>Belum</Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton value="proses" sx={{ px: 3 }} color="warning">
              <Stack direction="row" alignItems="center" gap={1}>
                <IconFA name="hourglass-start" size={12} />
                <Typography>Proses</Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton value="selesai" sx={{ px: 3 }} color="success">
              <Stack direction="row" alignItems="center" gap={1}>
                <IconFA name="check" size={12} />
                <Typography>Selesai</Typography>
              </Stack>
            </ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
      </Grid>
      {progressStatus === "selesai" ? (
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Bukti Dukung" />
            <Box>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<IconFA name="upload" size={14} />}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
            </Box>
          </FormControl>
        </Grid>
      ) : null}
    </Grid>
  );
}

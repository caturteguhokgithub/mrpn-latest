import React, { Fragment } from "react";
import {
  alpha,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  DialogActions,
  Grid,
  Icon,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import theme from "@/theme";
import { grey, red } from "@mui/material/colors";
import DialogComponent from "@/app/components/dialog";
import useCardSWOTVM from "./cardSwotVM";
import {
  ExsumSWOTRequestDto,
  ExsumSWOTValuesDto,
  LISTSWOT,
} from "./cardSwotModel";
import { TextareaStyled } from "@/app/components/textarea";
import AddButton from "@/components/buttonAdd";
import { IconFA } from "@/components/icons/icon-fa";
import DialogDelete from "@/app/components/dialogDelete";
import { InfoTooltip } from "@/app/components/InfoTooltip";
import useCardLocationVM from "../../tab2Profile/cardLocation/cardLocationVM";
import useUrgensiVM from "@/app/penetapan/internal-eksternal/pageVM";
import { doRequestSwotDto } from "@/app/penetapan/internal-eksternal/pageModel";
import { DividerIntExt } from "../cardUrgent/cardUrgent";

export default function CardSwot({
  project,
  activeSetting,
  penetapan,
}: {
  project?: string;
  activeSetting?: boolean;
  penetapan?: boolean;
}) {
  const {
    data,
    modal,
    setModal,
    updateData,
    deleteData,
    request,
    setRequest,
    modalDelete,
    setModalDelete,
    handleModalDelete,
    deleteDataRow,
    handleEdited,
    conditionEditing,
  } = useCardSWOTVM();

  const { requestSwot, setRequestSwot, uriRequestSwot, dataSwot } =
    useUrgensiVM();

  return (
    <>
      <CardItem
        title="Kondisi Saat Ini/Latar Belakang Proyek (SWOT)"
        infoTooltip={
          <div>
            <p>
              <strong>SWOT</strong>: Analisis lingkungan eksternal dan internal
              pada bagian ini menggunakan metode SWOT. Hal ini bertujuan untuk
              menyajikan informasi yang akurat tentang potensi dari implementasi
              KP melalui identifikasi lingkungan internal dan eksternal. Lingkup
              analisis dipertajam pada sisi penilaian sumber daya (seperti SDM,
              SDA, fiskal, dan teknologi) dengan mempertimbangkan evaluasi
              terhadap ketercapaian periode sebelumnya. Analisis SWOT perlu
              dilengkapi dengan data kuantitatif.
            </p>
          </div>
        }
        setting={activeSetting}
        // settingDeleteOnclick={() => deleteData()}
        settingDeleteOnclick={handleModalDelete}
        settingEditOnclick={() => setModal(true)}
      >
        {penetapan ? (
          dataSwot?.values.length == 0 ? (
            <EmptyState
              dense
              icon={<IconEmptyData width={100} />}
              title="Data Kosong"
              description="Silahkan isi konten halaman ini"
            />
          ) : (
            <Stack direction="column" gap={2}>
              <Stack
                direction="row"
                gap={2}
                width={"100%"}
                sx={{
                  opacity: 0.6,
                }}
              >
                <GenerateCard
                  title="Faktor Internal"
                  sub1="strength"
                  sub2="weakness"
                  data={data.values}
                  conditionEditing={conditionEditing}
                />
                <GenerateCard
                  title="Faktor Eksternal"
                  sub1="opportunity"
                  sub2="threat"
                  data={data.values}
                  conditionEditing={conditionEditing}
                />
              </Stack>
              {dataSwot?.values.length == 0 ? null : (
                <>
                  <DividerIntExt />
                  <Stack direction="row" gap={2} width={"100%"}>
                    <GenerateCard
                      title="Faktor Internal"
                      sub1="strength"
                      sub2="weakness"
                      data={dataSwot?.values ?? []}
                      conditionEditing={"inherit"}
                    />
                    <GenerateCard
                      title="Faktor Eksternal"
                      sub1="opportunity"
                      sub2="threat"
                      data={dataSwot?.values ?? []}
                      conditionEditing={"inherit"}
                    />
                  </Stack>
                </>
              )}
            </Stack>
          )
        ) : data.values.length == 0 ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Data Kosong"
            description="Silahkan isi konten halaman ini"
          />
        ) : (
          <Stack direction="row" gap={2} width={"100%"}>
            <GenerateCard
              title="Faktor Internal"
              sub1="strength"
              sub2="weakness"
              data={data.values}
              conditionEditing={conditionEditing}
            />
            <GenerateCard
              title="Faktor Eksternal"
              sub1="opportunity"
              sub2="threat"
              data={data.values}
              conditionEditing={conditionEditing}
            />
          </Stack>
        )}
      </CardItem>
      <DialogComponent
        width={"80%"}
        dialogOpen={modal}
        dialogClose={() => setModal(false)}
        title="Kondisi Saat Ini/Latar Belakang Proyek (SWOT)"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={() => setModal(false)}>
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                if (penetapan) {
                  uriRequestSwot(), handleEdited();
                } else {
                  updateData(), handleEdited();
                }
              }}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={2}>
          {LISTSWOT.map((x, index) => (
            <GetGrid
              deleteDataRow={deleteDataRow}
              request={penetapan ? requestSwot : request}
              setRequest={penetapan ? setRequestSwot : setRequest}
              title={x}
              key={index}
            />
          ))}
        </Grid>
      </DialogComponent>
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => deleteData()}
        question={
          <>
            <Stack>
              <Typography>Anda yakin akan menghapus data* ini?</Typography>
              <Typography fontSize={14} color={grey[600]}>
                * Penghapusan data ini akan berdampak pada data{" "}
                <strong>Matriks TOWS</strong> & <strong>Critical Path</strong>
              </Typography>
            </Stack>
          </>
        }
      />
    </>
  );
}

const GenerateCard = ({
  title,
  sub1,
  sub2,
  data,
  conditionEditing,
}: {
  title: string;
  sub1: string;
  sub2: string;
  data: ExsumSWOTValuesDto[];
  conditionEditing: string;
}) => {
  const filterSub1 = data.filter((x) => x.type == sub1.toUpperCase());
  const filterSub2 = data.filter((x) => x.type == sub2.toUpperCase());

  // const { conditionEditing } = useCardLocationVM();

  return (
    <Stack
      direction="column"
      border={`1px solid ${grey[300]}`}
      borderRadius={2}
      flex={1}
    >
      <Box
        bgcolor={alpha(theme.palette.primary.main, 0.1)}
        textAlign="center"
        p={1.5}
        borderRadius={2}
        borderBottom={`1px solid ${grey[300]}`}
        sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      >
        <Typography fontSize={16} fontWeight={500} color={conditionEditing}>
          {title}
        </Typography>
      </Box>
      <Stack
        direction="row"
        height="100%"
        sx={{
          "& > div": {
            "& + div": {
              borderLeft: `1px solid ${grey[300]}`,
            },
          },
        }}
      >
        <Card
          sx={{
            border: 0,
            maxWidth: 345,
            bgcolor: "transparent",
            flex: "0 0 50%",
            [theme.breakpoints.down("lg")]: {
              flex: "0 0 calc(50% - 12px)",
            },
            [theme.breakpoints.down("sm")]: {
              flex: "0 0 100%",
              maxWidth: "100%",
            },
          }}
          variant="outlined"
        >
          <CardContent>
            <Typography
              gutterBottom
              fontSize={16}
              fontWeight={500}
              component="div"
              lineHeight={1.3}
              textTransform="capitalize"
              color={conditionEditing}
            >
              {sub1}
            </Typography>
          </CardContent>
          <CardContent sx={{ pt: 0 }}>
            <ul>
              {filterSub1.map((x) => (
                <li>
                  <Typography variant="body1" color={conditionEditing}>
                    {x.desc}
                  </Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card
          sx={{
            border: 0,
            maxWidth: 345,
            bgcolor: "transparent",
            flex: "0 0 50%",
            [theme.breakpoints.down("lg")]: {
              flex: "0 0 calc(50% - 12px)",
            },
            [theme.breakpoints.down("sm")]: {
              flex: "0 0 100%",
              maxWidth: "100%",
            },
          }}
          variant="outlined"
        >
          <CardContent>
            <Typography
              gutterBottom
              fontSize={16}
              fontWeight={500}
              component="div"
              lineHeight={1.3}
              textTransform="capitalize"
              color={conditionEditing}
            >
              {sub2}
            </Typography>
          </CardContent>
          <CardContent sx={{ pt: 0 }}>
            <ul>
              {filterSub2.map((x) => (
                <li>
                  <Typography variant="body1" color={conditionEditing}>
                    {x.desc}
                  </Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};

const GetGrid = ({
  request,
  setRequest,
  title,
  deleteDataRow,
}: {
  request: ExsumSWOTRequestDto | doRequestSwotDto;
  setRequest: any;
  title: string;
  deleteDataRow: any;
}) => {
  const addNewRow = (type: string) => {
    setRequest((prev: ExsumSWOTRequestDto | doRequestSwotDto) => {
      const row = {
        id: 0,
        type: type,
        value: "",
        desc: "",
      };
      const values = [...prev.values];
      values.push(row);
      return {
        ...prev,
        values: values,
      };
    });
  };

  const handleChangeKeyword = (newValue: string, index: number) => {
    setRequest((prev: ExsumSWOTRequestDto | doRequestSwotDto) => {
      if (!prev.values || !Array.isArray(prev.values)) {
        console.error("Values tidak terdefinisi atau bukan array");
        return prev;
      }

      const values = [...prev.values];

      if (index < 0 || index >= values.length) {
        console.error(`Index ${index} di luar batas array values`);
        return prev;
      }

      values[index] = { ...values[index], value: newValue };

      return { ...prev, values };
    });
  };

  const handleChangeDesc = (e: string, index: number) => {
    setRequest((prev: ExsumSWOTRequestDto | doRequestSwotDto) => {
      if (!prev.values || !Array.isArray(prev.values)) {
        console.error("Values tidak terdefinisi atau bukan array");
        return prev;
      }

      const values = [...prev.values];

      if (index < 0 || index >= values.length) {
        console.error(`Index ${index} di luar batas array values`);
        return prev;
      }

      values[index] = { ...values[index], desc: e }; // Aman untuk diubah

      return { ...prev, values };
    });
  };

  const handleDelete = (index: number) => {
    setRequest((prev: ExsumSWOTRequestDto | doRequestSwotDto) => {
      const values = [...prev.values];

      deleteDataRow(values[index].id);

      values.splice(index, 1);
      return {
        ...prev,
        values: values,
      };
    });
  };

  return (
    <Grid item lg={12}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ minWidth: "0 !important", p: 2, height: "100%" }}
      >
        <Stack direction="column" gap={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              lineHeight={1.3}
              sx={{ textTransform: "capitalize" }}
            >
              {title}
            </Typography>
            <AddButton
              title={`Tambah`}
              small
              noMargin
              onclick={() => addNewRow(title.toUpperCase())}
            />
          </Stack>
          <Grid container spacing={1}>
            <Grid item xs={12} md={5}>
              <Typography fontSize={14} fontWeight={500} color={grey[500]}>
                Deskripsi
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Typography fontSize={14} fontWeight={500} color={grey[500]}>
                  Kata Kunci
                </Typography>
                <InfoTooltip
                  title={
                    <>
                      <strong>Kata kunci SWOT</strong>: dilengkapi dengan kata
                      kunci/keyword sebagai highlight utama dari SWOT
                    </>
                  }
                />
              </Stack>
            </Grid>
            {request.values.map(
              (row, index) =>
                row.type == title.toUpperCase() && (
                  <>
                    <Grid item xs={12} md={5}>
                      <TextareaStyled
                        key={title}
                        aria-label={`Deskripsi ${title}`}
                        placeholder={`Deskripsi ${title}`}
                        value={row.desc}
                        onChange={(e) => {
                          handleChangeDesc(e.target.value, index);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextareaStyled
                        key={title}
                        aria-label={`Tambah Kata Kunci ${title}`}
                        placeholder={`Tambah Kata Kunci ${title}`}
                        value={row.value}
                        onChange={(e) => {
                          const newVal = e.target.value;
                          const x = newVal.split(" ");
                          const finalNewVal =
                            x.length > 4
                              ? x[0] + " " + x[1] + " " + x[2] + " " + x[3]
                              : newVal;
                          handleChangeKeyword(finalNewVal, index);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        height="40px"
                      >
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDelete(index)}
                          sx={{ p: 0 }}
                        >
                          <IconFA size={18} name="trash-can" />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </>
                )
            )}
          </Grid>
        </Stack>
      </Paper>
    </Grid>
  );
};

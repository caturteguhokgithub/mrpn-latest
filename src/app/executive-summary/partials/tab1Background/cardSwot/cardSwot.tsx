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

export default function CardSwot({ project }: { project: string }) {
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
    deleteDataRow
  } = useCardSWOTVM();

  return (
    <>
      <CardItem
        title="Kondisi Saat Ini/Latar Belakang Proyek (SWOT)"
        setting
        // settingDeleteOnclick={() => deleteData()}
        settingDeleteOnclick={handleModalDelete}
        settingEditOnclick={() => setModal(true)}
      >
        {data.values.length == 0 ? (
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
            />
            <GenerateCard
              title="Faktor Eksternal"
              sub1="opportunity"
              sub2="threat"
              data={data.values}
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
              onClick={() => updateData()}
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
              request={request}
              setRequest={setRequest}
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
}: {
  title: string;
  sub1: string;
  sub2: string;
  data: ExsumSWOTValuesDto[];
}) => {
  const filterSub1 = data.filter((x) => x.type == sub1.toUpperCase());
  const filterSub2 = data.filter((x) => x.type == sub2.toUpperCase());

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
        <Typography fontSize={16} fontWeight={500}>
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
            >
              {sub1}
            </Typography>
          </CardContent>
          <CardContent sx={{ pt: 0 }}>
            <ul>
              {filterSub1.map((x) => (
                <li>
                  <Typography variant="body1">{x.desc}</Typography>
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
            >
              {sub2}
            </Typography>
          </CardContent>
          <CardContent sx={{ pt: 0 }}>
            <ul>
              {filterSub2.map((x) => (
                <li>
                  <Typography variant="body1">{x.desc}</Typography>
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
  request: ExsumSWOTRequestDto;
  setRequest: any;
  title: string;
  deleteDataRow:any
}) => {
  const addNewRow = (type: string) => {
    setRequest((prev: ExsumSWOTRequestDto) => {
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
    setRequest((prev: ExsumSWOTRequestDto) => {
      const values = [...prev.values];
      values[index].value = newValue;
      return {
        ...prev,
        values: values,
      };
    });
  };

  const handleChangeDesc = (e: string, index: number) => {
    setRequest((prev: ExsumSWOTRequestDto) => {
      const values = [...prev.values];
      values[index].desc = e;
      return {
        ...prev,
        values: values,
      };
    });
  };

  const handleDelete = (index: number) => {
    setRequest((prev: ExsumSWOTRequestDto) => {
      const values = [...prev.values];

      deleteDataRow(values[index].id)

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
              <Typography fontSize={14} fontWeight={500} color={grey[500]}>
                Kata Kunci
              </Typography>
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
                          const newVal = e.target.value
                          const x = newVal.split(" ");
                          const finalNewVal = x.length > 4 ? x[0]+" "+x[1]+" "+x[2]+" "+x[3] : newVal
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

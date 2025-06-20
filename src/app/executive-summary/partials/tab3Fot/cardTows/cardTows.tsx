import React, { SetStateAction } from "react";
import {
  Button,
  DialogActions,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import DialogComponent from "@/components/dialog";
import TableTows from "./table";
import useCardTOWSVM from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsVM";
import useCardSWOTVM from "@/app/executive-summary/partials/tab1Background/cardSwot/cardSwotVM";
import { IconFA } from "@/components/icons/icon-fa";
import {
  ExsumKeyword,
  ExsumTWOSDto,
  ExsumTWOSOptions,
  ExsumTWOSReqDto,
} from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsModel";
import AddButton from "@/components/buttonAdd";
import { AutocompleteSelectMultiple } from "@/components/autocomplete";
import useCardLocationVM from "../../tab2Profile/cardLocation/cardLocationVM";
import Iconify from "@/app/components/icons/iconify";
import { blue } from "@mui/material/colors";

export default function CardTows({ project }: { project: string }) {
  const useCardSWOT = useCardSWOTVM();

  const {
    options,
    data,
    request,
    setRequest,
    modalOpen,
    setModalOpen,
    updateData,
    handleEdited,
    conditionEditing,
  } = useCardTOWSVM();

  // const { handleEdited, conditionEditing } = useCardLocationVM();

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <CardItem
        title="Matriks TOWS"
        setting={useCardSWOT.data.id == 0 ? undefined : true}
        settingEditOnclick={handleModalOpen}
        addButton={
          <AddButton
            noMargin
            filled
            title="Ubah"
            color="primary"
            startIcon={<Iconify name="mdi:pencil" size={14} />}
            onclick={handleModalOpen}
          />
        }
      >
        {data == undefined || data.tows.length == 0 ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Data Kosong"
            description={
              useCardSWOT.data.id == 0
                ? "Silahkan isi SWOT terlebih dahulu"
                : "Silahkan isi konten halaman ini"
            }
          />
        ) : (
          <TableTows data={data} conditionEditing={conditionEditing} />
        )}
      </CardItem>
      <DialogComponent
        width={"90%"}
        dialogOpen={modalOpen}
        dialogClose={handleModalClose}
        title="Ubah Matriks TOWS"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={handleModalClose}>
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                updateData(), handleEdited();
              }}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={2}>
          <CardFormTWOS
            setRequest={setRequest}
            title={"Strategi Strength Opportunity (SO)"}
            type={"SO"}
            request={request}
            optionsKeyword={options}
          />

          <CardFormTWOS
            setRequest={setRequest}
            title={"Strategi Weakness Opportunity (WO)"}
            type={"WO"}
            request={request}
            optionsKeyword={options}
          />

          <CardFormTWOS
            setRequest={setRequest}
            title={"Strategi Strength Threats (ST)"}
            type={"ST"}
            request={request}
            optionsKeyword={options}
          />

          <CardFormTWOS
            setRequest={setRequest}
            title={"Strategi Weakness Threats (WT)"}
            type={"WT"}
            request={request}
            optionsKeyword={options}
          />
        </Grid>
      </DialogComponent>
    </>
  );
}

function CardFormTWOS(props: {
  title: string;
  type: string;
  request: ExsumTWOSReqDto;
  setRequest: (value: SetStateAction<ExsumTWOSReqDto>) => void;
  optionsKeyword?: ExsumTWOSOptions;
}) {
  const options = () => {
    if (props.optionsKeyword == undefined) {
      return [];
    }
    switch (props.type) {
      case "SO":
        return props.optionsKeyword.so;
      case "WO":
        return props.optionsKeyword.wo;
      case "ST":
        return props.optionsKeyword.st;
      case "WT":
        return props.optionsKeyword.wt;
      default:
        return [];
    }
  };

  const addNewRow = () => {
    props.setRequest((prevState) => {
      const values = [...prevState.values];
      const newRow: ExsumTWOSDto = {
        id: values.length,
        type: props.type,
        value: "",
        keywords: [],
      };
      values.push(newRow);
      return {
        ...prevState,
        values: values,
      };
    });
  };

  const deleteRow = (index: number) => {
    props.setRequest((prevState) => {
      const values = [...prevState.values];
      values.splice(index, 1);
      return {
        ...prevState,
        values: values,
      };
    });
  };

  const handleChangeDesc = (newVal: string, index: number) => {
    props.setRequest((prevState) => {
      const values = [...prevState.values];
      values[index].value = newVal;
      return {
        ...prevState,
        values: values,
      };
    });
  };

  const handleChangeKeyword = (newVal: ExsumKeyword[], index: number) => {
    props.setRequest((prevState) => {
      const values = [...prevState.values];
      values[index].keywords = newVal;
      return {
        ...prevState,
        values: values,
      };
    });
  };

  return (
    <Grid item xs={12}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ minWidth: "0 !important", p: 2, height: "100%" }}
      >
        <Stack direction="column">
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              lineHeight={1.3}
              sx={{ textTransform: "capitalize" }}
            >
              {props.title}
            </Typography>
            <AddButton
              title={`Tambah ${props.type}`}
              small
              noMargin
              onclick={() => addNewRow()}
            />
          </Stack>
          <Grid container spacing={1}>
            {props.request.values.map(
              (v, index) =>
                v.type == props.type && (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        size="small"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder={`Deskripsi ${v.type.toUpperCase()}`}
                        value={v.value}
                        onChange={(e) =>
                          handleChangeDesc(e.target.value, index)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <AutocompleteSelectMultiple
                        value={v.keywords}
                        options={options()}
                        getOptionLabel={(opt) => opt.value}
                        handleChange={(newVal: ExsumKeyword[]) =>
                          handleChangeKeyword(newVal, index)
                        }
                        placeHolder={`Kata kunci ${v.type.toUpperCase()}`}
                        labelSelectAll={`Pilih semua kata kunci ${v.type.toUpperCase()}`}
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
                          onClick={() => deleteRow(index)}
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
}

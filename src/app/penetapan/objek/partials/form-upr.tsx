import SearchField from "./search-bar";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchResult from "./search-result";
import TreeView from "./tree-view";
import { Fragment, SetStateAction, useEffect, useState } from "react";
import {
  AutocompleteSelectSingle,
  AutoCompleteSingleProp,
} from "@/app/components/autocomplete";
import usePenetapanObjectVM from "../pageVM";
import AddButton from "@/app/components/buttonAdd";
import {
  dtoUraian,
  PenetapanObjectEntityReqDto,
  PenetapanObjectEntityValueReqDto,
} from "../pageModel";
import { MiscMasterListStakeholderRes } from "@/app/misc/master/masterServiceModel";
import TextareaComponent from "@/app/components/textarea";

export default function FormUPR({
  optionSL,
  state,
  setState,
  listStakeholder,
  stateUprSingle,
  setStateUprSingle,
}: {
  optionSL: dtoUraian[];
  state: PenetapanObjectEntityReqDto;
  setState: (value: SetStateAction<PenetapanObjectEntityReqDto>) => void;
  listStakeholder: MiscMasterListStakeholderRes[];
  stateUprSingle: dtoUraian;
  setStateUprSingle: (value: SetStateAction<dtoUraian>) => void;
}) {
  const initReqStakeholder: MiscMasterListStakeholderRes = {
    id: 0,
    short: "",
    code: "",
    value: "",
    icon: "",
    type: "",
  };

  useEffect(() => {
    if (state.values && state.values.length > 0 && listStakeholder.length > 0) {
      const loadedItems = state.values.map((val, index) => {
        const matchedStakeholder = listStakeholder.find(
          (s) => s.id === val.entitas
        ) || {
          id: val.entitas,
          short: "",
          code: "",
          value: "",
          icon: "",
          type: "",
        };

        return {
          id: index + 1,
          stakeholder: matchedStakeholder,
          type: val.type,
        };
      });

      setItems(loadedItems);
    }
  }, [state.values, listStakeholder]);

  // const { setStateTopic } = usePenetapanObjectVM();

  // const [items, setItem] = useState([{ id: 1 }]);
  const [items, setItems] = useState<
    { id: number; stakeholder: MiscMasterListStakeholderRes; type: string }[]
  >([{ id: 1, stakeholder: initReqStakeholder, type: "" }]);

  const add = () => {
    if (items.length >= 10) return;

    const newItem = {
      id: Math.floor(Math.random() * 1000),
      stakeholder: initReqStakeholder,
      type: "",
    };

    const newItems = [...items, newItem];
    setItems(newItems);

    // Sinkron ke state utama
    setState((prev) => ({
      ...prev,
      values: newItems.map((item) => ({
        entitas: item.stakeholder.id,
        type: item.type,
      })),
    }));
  };

  const minus = (nowId: number) => {
    const newItems = items.filter((item) => item.id !== nowId);
    setItems(newItems);

    setState((prev) => ({
      ...prev,
      values: newItems.map((item) => ({
        entitas: item.stakeholder.id,
        type: item.type,
      })),
    }));
  };

  const handleSubChange = (
    id: number,
    field: "stakeholder" | "type",
    value: MiscMasterListStakeholderRes | string
  ) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]: value,
          }
        : item
    );
    setItems(updatedItems);

    // Sinkron ke state utama
    setState((prev) => ({
      ...prev,
      values: updatedItems.map((item) => ({
        entitas: item.stakeholder.id,
        type: item.type,
      })),
    }));
  };

  const changeObjectShortlist = async (params: dtoUraian) => {
    setStateUprSingle(params);

    // Set id_objek
    setState((prevState) => ({
      ...prevState,
      id_objek: params?.id ?? 0,
    }));

    // Jika `params.values` tersedia, maka isi `items` dan `state.values`
    if (
      params?.usulan_upr_linsek &&
      params?.usulan_upr_linsek.length > 0 &&
      listStakeholder.length > 0
    ) {
      const mappedItems = params.usulan_upr_linsek.map((val, idx) => {
        const stakeholder = listStakeholder.find(
          (s) => s.id === val.entitas_id
        ) || {
          id: val.entitas_id,
          short: "",
          code: "",
          value: "",
          icon: "",
          type: "",
        };

        return {
          id: idx + 1,
          stakeholder,
          type: val.type,
        };
      });

      setItems(mappedItems);

      setState((prevState) => ({
        ...prevState,
        values: mappedItems.map((item) => ({
          entitas: item.stakeholder.id,
          type: item.type,
        })),
      }));
    } else {
      setItems([{ id: 1, stakeholder: initReqStakeholder, type: "" }]);
      setState((prevState) => ({
        ...prevState,
        values: [],
      }));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>Objek Shortlist</Typography>
          <AutocompleteSelectSingle
            value={stateUprSingle}
            options={optionSL}
            getOptionLabel={(opt) => opt.rkp}
            handleChange={(newValue: dtoUraian) =>
              changeObjectShortlist(newValue)
            }
            placeHolder={"Pilih objek shortlist"}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>Ruang Lingkup</Typography>
          <TextareaComponent placeholder="Ruang lingkup" row={3} />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight={600}>Entitas MRPN</Typography>
          <Box>
            <AddButton title="Tambah Entitas" small noMargin onclick={add} />
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} maxHeight="40vh" overflow="auto">
          {items.map((tags, key) => (
            <Grid item xs={12} key={`${tags.id}`}>
              <Paper
                variant="outlined"
                elevation={0}
                sx={{ p: 2, minWidth: "0 !important" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Stack
                        justifyContent="space-between"
                        direction="row"
                        mb={1}
                      >
                        <Typography gutterBottom>Entitas MRPN</Typography>
                        {key > 0 && (
                          <AddButton
                            small
                            errorColor
                            title="Hapus"
                            noMargin
                            onclick={() => minus(tags.id)}
                          />
                        )}
                      </Stack>
                      <AutocompleteSelectSingle
                        // value={stateStakeholder}
                        value={tags.stakeholder}
                        options={listStakeholder}
                        getOptionLabel={(option) => option.value}
                        handleChange={(
                          newValue: MiscMasterListStakeholderRes
                        ) => handleSubChange(tags.id, "stakeholder", newValue)}
                        placeHolder={"Pilih entitas MRPN"}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Typography gutterBottom>UPR</Typography>
                      <Stack>
                        <RadioGroup
                          row
                          value={tags.type}
                          onChange={(e) =>
                            handleSubChange(tags.id, "type", e.target.value)
                          }
                          sx={{ justifyContent: "space-between" }}
                        >
                          <FormControlLabel
                            value="Koordinator"
                            control={<Radio />}
                            label="Koordinator"
                          />
                          <FormControlLabel
                            value="Utama"
                            control={<Radio />}
                            label="Utama"
                          />
                          <FormControlLabel
                            value="Pendukung"
                            control={<Radio />}
                            label="Pendukung"
                          />
                        </RadioGroup>
                      </Stack>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

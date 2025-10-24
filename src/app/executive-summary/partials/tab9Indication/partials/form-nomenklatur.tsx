import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { TextareaStyled } from "@/components/textarea";
import { ProjectReqDto } from "../../tab4Cascading/cardIntervensi/cardIntervensiModel";
import { SetStateAction } from "react";
import {
  AutocompleteSelectMultiple,
  AutocompleteSelectSingle,
  AutoCompleteSingleProp,
} from "@/components/autocomplete";
import {
  MiscMasterListProvinsiRes,
  MiscMasterListStakeholderRes,
} from "@/app/misc/master/masterServiceModel";
import { ProPDto } from "@/app/misc/rkp/rkpServiceModel";
import { IconFA } from "@/components/icons/icon-fa";

export default function FormNomenklatur({
  selectLocation = [],
  listProP,
  listStakeholder,
  reqNonRo,
  setReqNonRo,
  setModalEntitas,
}: {
  selectLocation?: MiscMasterListProvinsiRes[];
  listProP?: ProPDto[];
  listStakeholder?: MiscMasterListStakeholderRes[];
  reqNonRo?: ProjectReqDto;
  setReqNonRo?: (value: SetStateAction<ProjectReqDto>) => void;
  setModalEntitas?: (
    id: number,
    action: boolean,
    type: string,
    source?: string
  ) => void;
}) {
  const selectStakeholder: AutoCompleteSingleProp<MiscMasterListStakeholderRes> =
    {
      // value: reqNonRo?.kementrian_id,
      value:
        (listStakeholder ?? []).find((p) => p.id === reqNonRo?.kementrian_id) ??
        undefined,
      options: listStakeholder ?? [],
      getOptionLabel: (opt) => opt.value,
      handleChange: (value: MiscMasterListStakeholderRes | undefined) => {
        handleChange("kementrian_id", value ? value.id : 0);
      },
      placeHolder: "Pilih Penanggungjawab",
    };

  const handleChange = (field: keyof ProjectReqDto, value: any) => {
    setReqNonRo?.((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // handler
  const handleLokasiChange = (selectedOptions: MiscMasterListProvinsiRes[]) => {
    const lokasiArray = selectedOptions.map((opt) => ({
      src_provinsi_id: opt.id,
    }));

    setReqNonRo?.((prev) => ({
      ...prev,
      lokasi: lokasiArray,
    }));
  };

  // mapping value agar cocok ke bentuk options
  const selectedLokasiObjects: MiscMasterListProvinsiRes[] =
    (reqNonRo?.lokasi && Array.isArray(reqNonRo.lokasi)
      ? reqNonRo.lokasi
          .map((l) =>
            (selectLocation ?? []).find((prov) => prov.id === l.src_provinsi_id)
          )
          .filter((x): x is MiscMasterListProvinsiRes => Boolean(x))
      : []) || [];

  return (
    <Grid container spacing={2}>
      {/* Nomenklatur */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Nomenklatur Non-RO/Project" />
          <TextareaStyled
            aria-label="Nomenklatur Non-RO/Project"
            placeholder="Nomenklatur Non-RO/Project"
            value={reqNonRo?.nomenklatur || ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange("nomenklatur", e.target.value)
            }
            minRows={2}
          />
        </FormControl>
      </Grid>

      {/* Format Kode */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Format Kode" />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Format Kode"
            value={reqNonRo?.code || ""}
            onChange={(e) => handleChange("code", e.target.value)}
          />
        </FormControl>
      </Grid>

      {/* Tagging ProP */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Tagging ProP" />
          <AutocompleteSelectSingle<ProPDto>
            value={
              (listProP ?? []).find((p) => p.id === reqNonRo?.prop) ?? undefined
            }
            options={listProP ?? []}
            getOptionLabel={(opt) => opt.code + " - " + opt.value}
            handleChange={(value: ProPDto | undefined) => {
              handleChange("prop", value ? value.id : 0);
            }}
            placeHolder="Pilih tagging ProP"
          />
        </FormControl>
      </Grid>

      {/* Penanggungjawab */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Penanggungjawab" />
          <AutocompleteSelectSingle<MiscMasterListStakeholderRes>
            value={
              (listStakeholder ?? []).find(
                (p) => p.id === reqNonRo?.kementrian_id
              ) ?? undefined
            }
            options={listStakeholder ?? []}
            getOptionLabel={(opt) => opt.value}
            handleChange={(value: MiscMasterListStakeholderRes | undefined) => {
              handleChange("kementrian_id", value ? value.id : 0);
            }}
            placeHolder="Pilih Penanggungjawab"
            actionButton={
              <Box onMouseDown={(e: any) => e.preventDefault()}>
                <Button
                  startIcon={<IconFA name="circle-plus" size={14} />}
                  fullWidth
                  onClick={(e: any) => {
                    e.preventDefault();
                    setModalEntitas?.(-1, true, "update", "nomenklatur");
                  }}
                >
                  Tambah Penanggungjawab
                </Button>
              </Box>
            }
          />
        </FormControl>
      </Grid>

      {/* Lokasi */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Lokasi" />
          <AutocompleteSelectMultiple<MiscMasterListProvinsiRes>
            value={selectedLokasiObjects}
            options={selectLocation ?? []}
            getOptionLabel={(option) => option.name}
            handleChange={handleLokasiChange}
            placeHolder="Pilih Lokasi Provinsi"
            labelSelectAll="Pilih semua Provinsi"
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

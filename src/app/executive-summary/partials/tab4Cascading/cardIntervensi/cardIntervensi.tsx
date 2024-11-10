import React, { useEffect } from "react";
import {
  Typography,
  Stack,
  Button,
  DialogActions,
  MenuItem,
  SelectChangeEvent,
  Grow,
  Tooltip,
} from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import DialogComponent from "@/components/dialog";
import AddButton from "@/components/buttonAdd";
import TableProfilIntervensi from "../table-profil-intervensi";
import TableProfilRoKunci from "../table-profil-ro-kunci";
import FormProfilRoProject from "../form-profil-ro-project";
import useCardIntervensiVM from "@/app/executive-summary/partials/tab4Cascading/cardIntervensi/cardIntervensiVM";
import { ProPDto } from "@/app/misc/rkp/rkpServiceModel";
import {
  AutoCompleteMultipleProp,
  AutoCompleteSingleProp,
} from "@/components/autocomplete";
import { MiscMasterListStakeholderRes } from "@/app/misc/master/masterServiceModel";
import {
  ExsumInterventionState,
  ProjectTargetAnggaranDto,
} from "@/app/executive-summary/partials/tab4Cascading/cardIntervensi/cardIntervensiModel";
import { grey } from "@mui/material/colors";
import DialogDelete from "@/components/dialogDelete";

export default function CardIntervensi({
  project,
  toggleShowTab,
}: {
  project: string;
  toggleShowTab?: boolean;
}) {
  const {
    year,
    rpjmn,
    state,
    setState,
    handleChangeState,
    data,
    listProP,
    listStakeholder,
    modal,
    setModal,
    handleSubmit,
    getRpjmn,
    getListProP,
    getListSumberPendanaan,
    getListStakeholder,
    getData,
    exsum,
    listSof,
    modalDelete,
    setModalDelete,
    handleModalDelete,
  } = useCardIntervensiVM();

  useEffect(() => {
    if (rpjmn == undefined) getRpjmn();
    if (listSof.length == 0) getListSumberPendanaan();
    if (listStakeholder.length == 0) getListStakeholder();

    if (exsum.id != 0) {
      getData()
      getListProP()
    }

  }, [exsum]);

  const handleProjectOpenModal = (action:boolean,type:string) => {

    let tahun:number|string = rpjmn?.start+"-"+rpjmn?.end

    if (year > 0){
      tahun = year
    }

    setState(prevState => {
      const thisState = { ...prevState };
      const dataAnggaran: ProjectTargetAnggaranDto = {
        tahun: tahun,
        target: "",
        satuan: "",
        anggaranString: "",
        anggaran: 0,
        sumber_anggaran: "",
      }
      thisState.list = [dataAnggaran]
      return {
        ...thisState
      }
    })

    setModal({ action: action, type: type })
  }

  const selectProP: AutoCompleteSingleProp<ProPDto> = {
    value: state.prop,
    options: listProP,
    getOptionLabel: (opt) => opt.code+" - "+opt.value,
    handleChange: (value: ProPDto) => handleChangeState<ProPDto>(value),
    placeHolder: "Pilih tagging ProP",
  };

  const selectStakeholder: AutoCompleteSingleProp<MiscMasterListStakeholderRes> =
    {
      value: state.kementrian,
      options: listStakeholder,
      getOptionLabel: (opt) => opt.value,
      handleChange: (value: MiscMasterListStakeholderRes) =>
        setState((prev) => {
          return {
            ...prev,
            kementrian: value,
          };
        }),
      placeHolder: "Pilih Penanggungjawab",
    };

  return (
    <CardItem
      //  contentNoPadding
      title="Profil Intervensi Kunci"
      addButton={
        <>
          <AddButton
            filled
            small
            title="Tambah Project"
            onclick={() => handleProjectOpenModal(true,"NON_RO")}
          />
          <AddButton
            filled
            small
            title="Tambah Profil RO"
            onclick={() => setModal({ action: true, type: "RO" })}
          />
        </>
      }
    >
      {data.length == 0 ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <TableProfilIntervensi
          toggleShowTab={toggleShowTab}
          data={data}
          deleteData={(id: number) => {
            setState((prevState) => {
              return {
                ...prevState,
                id: id,
              };
            });
            setModalDelete(true);
          }}
          updateData={(id: number) => {
            const getIndex = data.findIndex((x) => x.id == id);
            if (getIndex > -1) {
              const thisData = data[getIndex];

              let propData = undefined;
              const getPropIndex = listProP.findIndex(
                (y) => y.id == thisData.src_rkp_prop_id
              );
              if (getPropIndex > -1) {
                propData = listProP[getPropIndex];
              }
              const st: ExsumInterventionState = {
                id: thisData.id,
                exsum_id: 0,
                type: thisData.type,
                code: thisData.code,
                kementrian: thisData.kementrian,
                nomenklatur: thisData.value,
                indikator: thisData.pkkr,
                list: [
                  {
                    tahun: thisData.tahun,
                    target: thisData.target,
                    satuan: thisData.satuan,
                    anggaran: thisData.anggaran,
                    anggaranString: thisData.anggaran.toString(),
                    sumber_anggaran: thisData.sumber_anggaran,
                  },
                ],
                intervensi: thisData.intervention,
                prop: propData,
                ro: [],
              };
              setState(st);
              setModal({ action: true, type: "NON_RO_UPDATE" });
            }
          }}
        />
      )}

      <DialogComponent
        tableMode
        width={"90%"}
        dialogOpen={modal.type == "RO" && modal.action}
        dialogClose={() => setModal({ action: false, type: "RO" })}
        title="Tambah Profil RO Kunci"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setModal({ action: false, type: "RO" })}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <TableProfilRoKunci data={state.ro} setState={setState} />
      </DialogComponent>

      <DialogComponent
        width={"90%"}
        dialogOpen={
          (modal.type == "NON_RO" || modal.type == "NON_RO_UPDATE") &&
          modal.action
        }
        dialogClose={() => setModal({ action: false, type: "NON_RO" })}
        title="Tambah Nomenklatur RO/Project"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setModal({ action: false, type: "NON_RO" })}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormProfilRoProject
          selectProP={selectProP}
          selectStakeholder={selectStakeholder}
          state={state}
          setState={setState}
          rpjmn={rpjmn}
          type={modal.type}
        />
      </DialogComponent>

      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => handleModalDelete()}
      />
    </CardItem>
  );
}

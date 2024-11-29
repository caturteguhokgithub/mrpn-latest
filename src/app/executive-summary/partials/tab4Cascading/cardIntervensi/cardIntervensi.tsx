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
import {
  MiscMasterListProvinsiRes,
  MiscMasterListStakeholderRes,
} from "@/app/misc/master/masterServiceModel";
import {
  ExsumInterventionState,
  ProjectTargetAnggaranDto,
} from "@/app/executive-summary/partials/tab4Cascading/cardIntervensi/cardIntervensiModel";
import DialogDelete from "@/components/dialogDelete";
import { GenerateRpjmnYear } from "@/lib/utils/common";

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
    dataTable,
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
    listLocation,
    getListLocation,
  } = useCardIntervensiVM();

  useEffect(() => {
    if (rpjmn == undefined) getRpjmn();
    if (listLocation.length == 0) getListLocation();
    if (listSof.length == 0) getListSumberPendanaan();
    if (listStakeholder.length == 0) getListStakeholder();

    if (exsum.id != 0) {
      getData();
      getListProP();
    }
  }, [exsum]);

  const handleProjectOpenModal = (action: boolean, type: string) => {
    setState((prevState) => {
      const thisState = { ...prevState };

      let list: ProjectTargetAnggaranDto[] = [];
      if (year == 0) {
        GenerateRpjmnYear(rpjmn).map((t) => {
          const dataAnggaran: ProjectTargetAnggaranDto = {
            tahun: t,
            target: "",
            satuan: "",
            anggaranString: "",
            anggaran: 0,
            sumber_anggaran: "",
          };
          list.push(dataAnggaran);
        });
      } else {
        const dataAnggaran: ProjectTargetAnggaranDto = {
          tahun: year,
          target: "",
          satuan: "",
          anggaranString: "",
          anggaran: 0,
          sumber_anggaran: "",
        };
        list.push(dataAnggaran);
      }

      thisState.list = list;
      return {
        ...thisState,
      };
    });

    setModal({ action: action, type: type });
  };

  const selectLocation: AutoCompleteMultipleProp<MiscMasterListProvinsiRes> = {
    value: state.location,
    options: listLocation,
    getOptionLabel: (opt) => opt.name,
    handleChange: (value: MiscMasterListProvinsiRes[]) =>
      setState((prev) => {
        return {
          ...prev,
          location: value,
        };
      }),
    placeHolder: "Pilih Lokasi",
    labelSelectAll: "Pilih semua lokasi",
  };

  const selectProP: AutoCompleteSingleProp<ProPDto> = {
    value: state.prop,
    options: listProP,
    getOptionLabel: (opt) => opt.code + " - " + opt.value,
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
      infoTooltip={
        <div>
          <p>
            Proyek/RO yang disusun harus merujuk pada strategi hasil matriks
            TOWS. Dalam penentuan proyek/RO kunci perlu memerhatikan:
          </p>
          <ol type="1" style={{ paddingLeft: "2em" }}>
            <li>Merupakan proyek/RO penentu ketercapaian KP.</li>
            <li>Memiliki keterkaitan indikator dengan IKU KP.</li>
            <li>
              Memiliki pengaruh/keterkaitan terhadap pelaksanaan proyek/RO
              lainnya.
            </li>
            <li>Memiliki jumlah anggaran yang signifikan.</li>
            <li>Merupakan proyek/RO yang dapat memitigasi risiko.</li>
            <li>Memiliki angka target yang stabil.</li>
            <li>Memperhatikan kesesuaian komponen RO dengan RO.</li>
          </ol>
        </div>
      }
      addButton={
        <>
          <AddButton
            filled
            small
            title="Tambah Project"
            onclick={() => handleProjectOpenModal(true, "NON_RO")}
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
          data={dataTable}
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
                list: [],
                intervensi: thisData.intervention,
                prop: propData,
                ro: [],
                location: thisData.lokasi,
                tahun: year,
              };

              thisData.detail.map((d, i) => {
                const listItem = {
                  tahun: d.tahun,
                  target: d.target,
                  satuan: d.satuan,
                  anggaran: d.anggaran,
                  anggaranString: d.anggaran.toString(),
                  sumber_anggaran: d.sumber_anggaran,
                };
                st.list.push(listItem);
              });

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
          selectLocation={selectLocation}
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

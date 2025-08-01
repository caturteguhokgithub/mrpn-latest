"use client";

import ContentPage from "@/components/contents";
import React, { Fragment, useEffect, useState } from "react";
import EmptyState from "@/components/empty";
import { IconEmptyPage } from "@/components/icons";
import {
  ToggleButtonGroup,
  Typography,
  alpha,
  Box,
  Button,
  DialogActions,
  Collapse,
  Chip,
  Stack,
} from "@mui/material";
import theme from "@/theme";
import { grey } from "@mui/material/colors";
import AddButton from "@/components/buttonAdd";
import DialogComponent from "@/components/dialog";
import FormTable from "./partials/form-table";
import ThemeToggleButton from "@/components/toggleButton/theme";
import TabObject from "./partials/tab";
import { IconFA } from "@/components/icons/icon-fa";
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
import {
  useAuthContext,
  usePenetapanTopicContext,
  useRKPContext,
} from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import { PenetapanObjectDto } from "@/lib/core/context/penetapanTopicContext";
import DialogDelete from "@/components/dialogDelete";
import { PenetapanObjectVMState } from "@/app/penetapan/objek/pageModel";
import { ProjectDefaultDto } from "@/lib/core/context/rkpContext";
import Iconify from "@/components/icons/iconify";
import TableLog from "./partials/table-log";
import FormUPR from "./partials/form-upr";
import useCardIndicationVM from "@/app/executive-summary/partials/tab9Indication/cardIndicationVM";
import FormBuktiDukung from "./partials/form-bukti-dukung";
import { useToast } from "@/lib/core/context/toastContext";
import useNotaDinasVM from "@/app/approval/nota-dinas/notaDinasVM";

const styleToggleButton = [
  {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 1,
    mt: 2,
    mb: 2,
    p: "1px",
    maxHeight: "calc(100vh - 302px)",
    button: {
      //  bgcolor: "white",
      transition: "all 500ms ease-in-out",
      border: `1px solid ${theme.palette.primary.main}`,
      span: {
        //   lineHeight: 1.2,
        py: 2,
        height: "100%",
        //   display: "inline-flex",
        //   alignItems: "center",
      },
      "&:hover": {
        //   bgcolor: alpha(theme.palette.primary.main, 0.1),
        color: alpha(theme.palette.secondary.dark, 0.8),
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.3
        )} 100%, rgba(255, 255, 255, 0.2) 100%),url(https://res.cloudinary.com/caturteguh/image/upload/v1715510168/mrpn/bg-button-theme_cxwxph.jpg)`,
        //   backgroundSize: "140%",
        //   backgroundPosition: "-240px -125px",
        backgroundSize: "100%",
        backgroundPosition: "right 45.5%",
      },
      "&.Mui-selected": {
        // bgcolor: theme.palette.primary.main,
        // color: "white",
        color: "white",
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          1
        )} 40%, rgba(255, 255, 255, 0.2) 100%),url(https://res.cloudinary.com/caturteguh/image/upload/v1715510168/mrpn/bg-button-theme_cxwxph.jpg)`,
        backgroundSize: "120%",
        backgroundPosition: "right center",
        border: `1px solid ${theme.palette.primary.main}`,
        borderLeftColor: `${theme.palette.primary.main} !important`,
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
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr 1fr",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },
];

export default function PageTemaView() {
  const [modalDeleteTopic, setModalDeleteTopic] = useState(false);

  const { permission } = useAuthContext((state) => state);
  const pathname = usePathname();

  const { rkp, year, rpjmn } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState } = usePenetapanTopicContext(
    (state) => state
  );

  const [stateDelete, setStateDelete] = useState<{
    id: number;
    module: string;
  }>({
    id: 0,
    module: "",
  });

  const {
    useEffectGenerateOption,
    useEffectObjectState,
    modalAdd,
    setModalAdd,
    optionPN,
    stateTopic,
    setStateTopic,
    updateOrCreateTopic,
    deleteTopic,
    generateOptionPN,
    modalLog,
    setModalLog,
    useEffectLogActivity,
    getStateLogActivity,
    modalUpr,
    setModalUpr,
    stateUpr,
    stateCreateUpr,
    setStateCreateUpr,
    updateOrCreateEntity,
    DeleteEntity,
    stateUprSingle,
    setStateUprSingle,
    updateOrCreateLongList,
    setShowSave,
    showSave,
    getRanking,
    modalBuktiDukung,
    setModalBuktiDukung,
    handleUnggahBuktiDukung,
    stateApproval,
    reqBuktiDukungPengesahan,
    setReqBuktiDukungPengesahan,
    setModalObjek,
    modalDeleteObject,
    setModalDeleteObject,
    modalEditEntitas,
    setModalEditEntitas,
    modalDeleteEntitas,
    setModalDeleteEntitas,
    setUploadedFileName,
    uploadImage,
    modalDeleteObjectTopik,
    setModalDeleteObjectTopik,
    selectedTopic,
    setSelectedTopic,
    dataLogActivity,
    resetTopicState,
    handleResetUploadedFileName,
    uploadedFileName,
  } = usePenetapanObjectVM();

  const { showToast } = useToast();

  const { optionStakeholder } = useCardIndicationVM();

  useEffect(useEffectGenerateOption, [year]);
  useEffect(useEffectObjectState, [year, objectState]);

  useEffect(() => {
    if (objectState !== undefined) {
      getDataImage();
    }
  }, [objectState]);

  useEffect(() => {
    generateOptionPN();
  }, [rkp]);

  // const selectStakeholder: AutoCompleteSingleProp<MiscMasterListStakeholderRes> =
  // {
  //   value: state.non_rincian_output.kementrian,
  //   options: listStakeholder,
  //   getOptionLabel: (opt) => opt.value,
  //   handleChange: (value: MiscMasterListStakeholderRes) =>
  //     setState((prev) => {
  //       const nonRO = state.non_rincian_output;
  //       nonRO.kementrian = value;
  //       return {
  //         ...prev,
  //         non_rincian_output: nonRO,
  //       };
  //     }),
  //   placeHolder: "Pilih Penanggungjawab",
  // };

  const handleCreateUpr = async () => {
    // console.log(stateCreateUpr);

    // showToast("Data UPR berhasil disimpan", "success");
    updateOrCreateEntity(stateCreateUpr);
    // setModalUpr(false);
  };

  const handleDeleteObjectUpr = (id: number, module: string) => {
    // DeleteEntity(id, module);
    setStateDelete({ id: id, module: module });
    if (module == "Object") {
      setModalDeleteObject(true);
    } else {
      setModalDeleteEntitas(true);
    }
  };

  const handleSimpanDeleteObjectUpr = async () => {
    DeleteEntity(stateDelete.id, stateDelete.module);
    setStateDelete({ id: 0, module: "" });
  };

  const handleEditTopic = (x: PenetapanObjectDto) => {
    let optState: ProjectDefaultDto[] = [];
    optionPN.map((f) => {
      x.penetapan_object_list.map((ty) => {
        if (f.id == ty.ref_id && f.level == ty.level) {
          optState.push(f);
        }
      });
    });

    const state: PenetapanObjectVMState = {
      id: x.id,
      code: x.code,
      topik: x.topik,
      tahun: x.tahun,
      values: optState,
    };
    setStateTopic(state);
    setModalAdd(true);
  };

  const handleDeleteTopic = (x: PenetapanObjectDto) => {
    let optState: ProjectDefaultDto[] = [];
    optionPN.map((f) => {
      x.penetapan_object_list.map((ty) => {
        if (f.id == ty.ref_id && f.level == ty.level) {
          optState.push(f);
        }
      });
    });

    const state: PenetapanObjectVMState = {
      id: x.id,
      code: x.code,
      topik: x.topik,
      tahun: x.tahun,
      values: optState,
    };
    setStateTopic(state);
    setModalDeleteTopic(true);
  };

  const dialogActionFooterAdd = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button
        onClick={() => {
          setModalAdd(false);
          resetTopicState();
        }}
      >
        Batal
      </Button>
      <Button
        variant="contained"
        onClick={() => updateOrCreateTopic()}
        sx={{
          color: "white !important",
        }}
      >
        Simpan
      </Button>
    </DialogActions>
  );

  const { getDataImage, gambar, modalDelete, setModalDelete, deleteNodin } =
    useNotaDinasVM();

  // const handleSimpanBuktiDukung = async () => {
  //   setModalBuktiDukung(false);
  //   await handleUnggahBuktiDukung(reqBuktiDukungPengesahan);
  //   refreshNotaDinasGambar(); // Call the getDataImage from useNotaDinasVM directly
  // };

  const handleSaveBuktiDukung = async () => {
    await uploadImage(
      reqBuktiDukungPengesahan.file,
      reqBuktiDukungPengesahan.filename
    );

    await getDataImage();
  };

  const handleOpenBuktiDukungModal = () => {
    // Open modal
    setModalBuktiDukung(true);
  };

  return (
    <>
      <ContentPage
        title={`Objek MRPN & UPR LS ${
          year == 0
            ? "RPJMN " + rpjmn?.start + "-" + rpjmn?.end
            : "Tahun " + year
        }`}
        infoToolTip={
          <Stack spacing={2}>
            <div>
              <strong>Objek MRPN Lintas Sektor</strong>
              <p>
                PKPPR yang dikategorikan lintas sektor yang menjadi objek
                penerapan MRPN LS, melalui penetapan oleh Komite MRPN.
              </p>
            </div>
            <div>
              <strong>Unit Pemilik Risiko (UPR) Lintas Sektor</strong>
              <p>
                Entitas MRPN yang secara bersama-sama sebagai pemilik risiko
                lintas sektor yang ditetapkan oleh Komite MRPN untuk
                menyelenggarakan tugas sesuai dengan ketentuan peraturan
                perundang-undangan.
              </p>
            </div>
          </Stack>
        }
        noMinusMargin
        heightNoSet
        withCard={objects.length == 0 || year == 0}
        selectedTopic={
          <Collapse in={objectState !== undefined}>
            <Chip
              size="small"
              variant="outlined"
              label={
                <Stack direction="row" alignItems="center">
                  <Stack
                    direction="row"
                    bgcolor={theme.palette.primary.main}
                    px={2}
                    py={1}
                    alignItems="center"
                    height="32px"
                    sx={{
                      borderTopLeftRadius: 24,
                      borderBottomLeftRadius: 24,
                      [theme.breakpoints.down("sm")]: {
                        minWidth: 133,
                      },
                    }}
                  >
                    <Typography
                      fontSize={14}
                      color="white"
                      fontWeight={600}
                      lineHeight={1}
                    >
                      Topik Terpilih
                    </Typography>
                  </Stack>
                  <Typography px={2} fontSize={14} fontWeight={600}>
                    {objectState?.topik}
                  </Typography>
                </Stack>
              }
              sx={{
                height: "34px",
                bgcolor: "white",
                fontWeight: 600,
                lineHeight: 1,
                cursor: "default",
                ".MuiChip-label": {
                  px: 0,
                },
              }}
            />
          </Collapse>
        }
        addButton={
          <Stack direction="row" spacing={1}>
            <Collapse in={objectState !== undefined}>
              <AddButton
                title="Ganti Topik"
                filled
                noMargin
                startIcon={<IconFA name="refresh" size={16} />}
                onclick={() => setObjectState(undefined)}
              />
            </Collapse>
            {/* {year > 0 && ( */}
            <Fragment>
              <AddButton
                title="Log Activity"
                noMargin
                startIcon={<Iconify name="mdi:update" size={18} />}
                onclick={() => setModalLog(true)}
              />
              {objectState == undefined &&
                hasPrivilege(
                  permission,
                  pathname,
                  "add",
                  "penetapan.objectUpr"
                ) && (
                  <AddButton
                    title="Tambah Topik"
                    filled
                    noMargin
                    onclick={() => setModalAdd(true)}
                  />
                )}
            </Fragment>
            {/* )} */}
          </Stack>
        }
      >
        {/* {objects.length == 0 || year == 0 ? ( */}
        {objects.length == 0 ? (
          <EmptyState
            icon={<IconEmptyPage />}
            // title={
            //   year == 0
            //     ? "Tidak ada data yang ditampilkan"
            //     : "Halaman Topik Kosong"
            // }
            // description={
            //   year == 0
            //     ? "Silahkan pilih RKP terlebih dulu"
            //     : "Silahkan isi konten halaman ini"
            // }
            title="Tidak ada data yang ditampilkan"
            description="Silahkan pilih RPJMN/RKP terlebih dulu"
          />
        ) : (
          <Fragment>
            {objectState === undefined && (
              <Fragment>
                <Typography color={grey[600]} fontSize={14} fontStyle="italic">
                  Pilih salah satu objek
                </Typography>
                <Box>
                  <ToggleButtonGroup
                    value={objectState}
                    exclusive
                    onChange={(
                      event: React.MouseEvent<HTMLElement>,
                      value: PenetapanObjectDto | undefined
                    ) => {
                      if (value !== undefined) setObjectState(value);
                    }}
                    aria-label="text alignment"
                    sx={styleToggleButton}
                  >
                    {objects.map((x, indexPntp) => (
                      <>
                        <ThemeToggleButton
                          key={indexPntp}
                          value={x}
                          label={x.topik}
                          handleEdit={() => handleEditTopic(x)}
                          handleDelete={() => {
                            setSelectedTopic(x);
                            setModalDeleteObjectTopik(true);
                          }}
                        />
                      </>
                    ))}
                  </ToggleButtonGroup>
                </Box>
              </Fragment>
            )}
            <Collapse in={objectState !== undefined}>
              <TabObject
                setModalUpr={setModalUpr}
                useEffectObjectState={useEffectObjectState}
                getRanking={getRanking}
                updateOrCreateLongList={updateOrCreateLongList}
                showSave={showSave}
                setShowSave={setShowSave}
                stateUpr={stateUpr}
                handleUploadBuktiDukung={handleOpenBuktiDukungModal}
                stateApproval={stateApproval}
                setModalObjek={setModalObjek}
                handleModalDeleteObject={(id: number) => {
                  handleDeleteObjectUpr(id, "Object");
                }}
                handleModalEditEntitas={() => setModalEditEntitas(true)}
                handleModalDeleteEntitas={(id: number) => {
                  handleDeleteObjectUpr(id, "Entitas");
                }}
                gambar={gambar}
                modalDelete={modalDelete}
                setModalDelete={setModalDelete}
                deleteNodin={deleteNodin}
              />
            </Collapse>
          </Fragment>
        )}
      </ContentPage>
      <DialogComponent
        width={1000}
        dialogOpen={modalAdd}
        dialogClose={() => setModalAdd(false)}
        title="Tambah Topik"
        dialogFooter={dialogActionFooterAdd}
      >
        <FormTable
          key={optionPN.length}
          state={stateTopic}
          setState={setStateTopic}
          optionPN={optionPN}
        />
      </DialogComponent>
      <DialogDelete
        title="Hapus Topik"
        handleOpenModal={modalDeleteTopic}
        handleCloseModal={() => setModalDeleteTopic(false)}
        handleDelete={() => {
          deleteTopic();
          setModalDeleteTopic(false);
          showToast("Data berhasil dihapus", "error");
        }}
      />
      <DialogComponent
        title="Log Activity"
        tableMode
        dialogOpen={modalLog}
        dialogClose={() => setModalLog(false)}
        dialogFooter={false}
      >
        <TableLog
          data={dataLogActivity}
          useEffectLogActivity={useEffectLogActivity}
        />
      </DialogComponent>
      <DialogComponent
        title="Tambah UPR"
        width={600}
        dialogOpen={modalUpr}
        dialogClose={() => setModalUpr(false)}
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => setModalUpr(false)}>Batal</Button>
            <Button
              variant="contained"
              onClick={() => {
                handleCreateUpr();
                // setModalUpr(false);
              }}
              sx={{
                color: "white !important",
              }}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormUPR
          optionSL={stateUpr}
          state={stateCreateUpr}
          setState={setStateCreateUpr}
          listStakeholder={optionStakeholder}
          stateUprSingle={stateUprSingle}
          setStateUprSingle={setStateUprSingle}
        />
      </DialogComponent>
      <DialogComponent
        title="Edit UPR"
        width={600}
        dialogOpen={modalEditEntitas}
        dialogClose={() => setModalEditEntitas(false)}
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => setModalEditEntitas(false)}>Batal</Button>
            <Button
              variant="contained"
              onClick={() => {
                // handleCreateUpr();
                setModalEditEntitas(false);
              }}
              sx={{
                color: "white !important",
              }}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormUPR
          mode="edit"
          optionSL={stateUpr}
          state={stateCreateUpr}
          setState={setStateCreateUpr}
          listStakeholder={optionStakeholder}
          stateUprSingle={stateUprSingle}
          setStateUprSingle={setStateUprSingle}
        />
      </DialogComponent>
      <DialogComponent
        title="Tambah Bukti Dukung"
        width={600}
        dialogOpen={modalBuktiDukung}
        dialogClose={() => setModalBuktiDukung(false)}
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={handleResetUploadedFileName}>Batal</Button>
            <Button
              variant="contained"
              onClick={handleSaveBuktiDukung}
              sx={{
                color: "white !important",
              }}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormBuktiDukung
          // handleUnggahBuktiDukung={handleUnggahBuktiDukung}
          reqBuktiDukungPengesahan={reqBuktiDukungPengesahan}
          setReqBuktiDukungPengesahan={setReqBuktiDukungPengesahan}
          uploadedFileName={uploadedFileName}
          setUploadedFileName={setUploadedFileName}
        />
      </DialogComponent>
      {/*<DialogComponent*/}
      {/* noDivider={true}*/}
      {/* width={1000}*/}
      {/* dialogOpen={modalOpenCollapse}*/}
      {/* dialogClose={handleModalClose}*/}
      {/* dialogFooter={dialogActionFooter}*/}
      {/*>*/}
      {/* <SearchKP*/}
      {/*  activeTab={activeTab}*/}
      {/*  listData={listData}*/}
      {/*  handleSearchTermUpdate={handleSearchTermUpdate}*/}
      {/*  searchTerm={searchTab}*/}
      {/* />*/}
      {/*</DialogComponent>*/}
      <DialogDelete
        title="Hapus Data Objek"
        handleOpenModal={modalDeleteObject}
        handleCloseModal={() => setModalDeleteObject(false)}
        handleDelete={() => {
          handleSimpanDeleteObjectUpr();
          // showToast("Data berhasil dihapus", "error");
        }}
      />
      <DialogDelete
        title="Hapus Data Entitas"
        handleOpenModal={modalDeleteEntitas}
        handleCloseModal={() => setModalDeleteEntitas(false)}
        handleDelete={() => {
          handleSimpanDeleteObjectUpr();
          showToast("Data berhasil dihapus", "error");
        }}
      />
      <DialogDelete
        title="Hapus Data Objek"
        question="Jika objek ini dihapus, akan berpengaruh ke banyak proses lain. Apakah Anda yakin akan menghapus data ini?"
        handleOpenModal={modalDeleteObjectTopik}
        handleCloseModal={() => setModalDeleteObjectTopik(false)}
        handleDelete={() => {
          handleDeleteTopic(selectedTopic!);
          setModalDeleteObjectTopik(false);
        }}
      />
    </>
  );
}

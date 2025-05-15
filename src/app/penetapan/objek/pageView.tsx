"use client";

import ContentPage from "@/app/components/contents";
import React, { Fragment, useEffect, useState } from "react";
import DashboardLayout from "@/app/components/layouts/layout";
import EmptyState from "@/app/components/empty";
import { IconEmptyPage } from "@/app/components/icons";
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
import { green, grey, orange, red } from "@mui/material/colors";
import AddButton from "@/app/components/buttonAdd";
import DialogComponent from "@/app/components/dialog";
import FormTable from "./partials/form-table";
import SearchKP from "./partials/search";
import useThemes from "./hooks/useTheme";
import LoadingPage from "@/app/components/loadingPage";
import ThemeToggleButton from "@/app/components/toggleButton/theme";
import TabObject from "./partials/tab";
import { IconFA } from "@/app/components/icons/icon-fa";
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
import {
  useAuthContext,
  usePenetapanTopicContext,
  useRKPContext,
} from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import {
  PenetapanObjectDto,
  PenetapanObjectState,
} from "@/lib/core/context/penetapanTopicContext";
import useRkpVM from "@/components/dropdown/rkpVM";
import DialogDelete from "@/app/components/dialogDelete";
import { PenetapanObjectVMState } from "@/app/penetapan/objek/pageModel";
import { ProjectDefaultDto } from "@/lib/core/context/rkpContext";
import { forEach } from "lodash";
import Iconify from "@/app/components/icons/iconify";
import TableLog from "./partials/table-log";
import { AutocompleteSelectSingle } from "@/app/components/autocomplete";
import FormUPR from "./partials/form-upr";

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

export default function PageTemaView({}) {
  const [modalDeleteTopic, setModalDeleteTopic] = useState(false);

  const { permission } = useAuthContext((state) => state);
  const pathname = usePathname();

  const { rkp, year, rpjmn } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState } = usePenetapanTopicContext(
    (state) => state
  );

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
  } = usePenetapanObjectVM();

  useEffect(useEffectGenerateOption, [year]);

  useEffect(useEffectObjectState, [year, objectState]);

  useEffect(() => {
    generateOptionPN();
  }, [rkp]);

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
      <Button onClick={() => setModalAdd(false)}>Batal</Button>
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
                      <ThemeToggleButton
                        key={indexPntp}
                        value={x}
                        label={x.topik}
                        handleEdit={() => handleEditTopic(x)}
                        handleDelete={() => handleDeleteTopic(x)}
                      />
                    ))}
                  </ToggleButtonGroup>
                </Box>
              </Fragment>
            )}
            <Collapse in={objectState !== undefined}>
              <TabObject setModalUpr={setModalUpr} />
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
        }}
      />

      <DialogComponent
        title="Log Activity"
        tableMode
        // width={800}
        dialogOpen={modalLog}
        dialogClose={() => setModalLog(false)}
        dialogFooter={false}
      >
        <TableLog />
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
              // onClick={() => updateOrCreateTopic()}
              sx={{
                color: "white !important",
              }}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormUPR />
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
    </>
  );
}

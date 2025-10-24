import {
  Button,
  DialogActions,
  FormControl,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  TextField,
} from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import DialogComponent from "@/components/dialog";
import AddButton from "@/components/buttonAdd";
import TableIndication from "./partials/table";
import FormIndication from "./partials/form";
import useCardIndicationVM from "@/app/executive-summary/partials/tab9Indication/cardIndicationVM";
import { useAuthContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import DialogDelete from "@/components/dialogDelete";
import FormPerlakuanRisiko from "@/app/executive-summary/partials/tab9Indication/partials/formPerlakuanRisiko";
import FormRegulation from "@/app/executive-summary/partials/tab9Indication/partials/formRegulation";
import { TextareaStyled } from "@/components/textarea";
import theme from "@/theme";
import { API_CONSTANT } from "@/lib/core/api/apiModel";
import Iconify from "@/components/icons/iconify";
import FormNomenklatur from "./partials/form-nomenklatur";
import TableReference from "./partials/table-reference";
import { AutocompleteSelectSingle } from "@/components/autocomplete";

export default function CardIndication({ project }: { project: string }) {
  const { year, rpjmn } = useRKPContext((store) => store);

  const {
    data,
    state,
    setState,
    dataTable,
    optionRiskType,
    optionStakeholder,
    modalOpen,
    setModalOpen,
    handleModalOpen,
    handleModalOpenSubmit,
    modalOutput,
    handleModalOutputOpen,
    handleModalOutputSubmit,
    modalRegulation,
    handleModalRegulationOpen,
    handleModalRegulationSubmit,
    modalNewRegulation,
    handleModalNewRegulationOpen,
    handleModalNewRegulationSubmit,
    deleteData,
    dataTOWS,
    stateValue,
    setStateValue,
    stateNewRegulation,
    setStateNewRegulation,
    listLocation,
    listProP,
    stateRegulation,
    setStateRegulation,
    listPerpres,
    exsum,
    conditionEditing,
    conditionEditingPointerEvent,
    modalNomenklatur,
    setModalNomenklatur,
    reqNonRo,
    setReqNonRo,
    handleModalAddNonRoSubmit,
    dataTableNonRO,
    modalReference,
    setModalReference,
    dataProfilOverview,
    modalEntitas,
    handleModalEntitasOpen,
  } = useCardIndicationVM();

  const { permission } = useAuthContext((state) => state);
  const pathname = usePathname();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const optionTypeEntity = [
    {
      id: 1,
      name: "BUMN",
    },
    {
      id: 2,
      name: "BUMD",
    },
    {
      id: 3,
      name: "BLUD",
    },
    {
      id: 4,
      name: "Swasta",
    },
    {
      id: 5,
      name: "Lembaga",
    },
  ];

  return (
    <>
      <Stack gap={1}>
        <CardItem
          title={`Indikasi Profil Risiko ${
            year == 0 ? "Objek MRPN LS" : "RKP Tahun " + year
          }`}
          infoTooltip={
            <Stack spacing={2}>
              <div>
                {/* <strong>Indikasi Profil Risiko Objek MRPN Lintas Sektor</strong>
                <p>
                  Kementerian PPN/Bappenas dalam melakukan proses Rancangan Awal
                  (Ranwal) RKP bersama dengan Kementerian Keuangan dan
                  K/L/P/BU/BL terkait, telah menggunakan prinsip perencanaan
                  berbasis risiko, yang menyertakan pembahasan terkait Indikasi
                  Profil Risiko Objek MRPN Lintas Sektor yang berisikan
                  penilaian dan perlakuan risiko.
                </p>
              </div>
              <div>
                <strong>Indikasi Risiko RPJMN</strong>
                <p>
                  Risiko makro dan strategis yang disusun oleh Kementerian yang
                  menyelenggarakan urusan pemerintahan di bidang perencanaan
                  pembangunan nasional mencakup risiko global yang meliputi
                  risiko ekonomi, teknologi, geopolitik, sosial, lingkungan,
                  reputasi dan tata kelola.
                </p> */}
                Indikasi Risiko: Sumber-sumber risiko pada penyusunan kebijakan
                perlakuan risiko dapat berasal dari strategi-strategi yang
                dihasilkan dari matriks TOWS. Risiko tersebut melekat pada
                kegiatan prioritas yang dipilih dan berpotensi menghambat atau
                menyebabkan tidak optimalnya pencapaian sasaran kegiatan
                prioritas.
              </div>
            </Stack>
          }
          downloadButton={
            <Stack spacing={2}>
              <AddButton
                fullWidth={onlySmallScreen}
                noMargin
                filled
                title="Download Excel"
                color="success"
                startIcon={<Iconify name="mdi:file-excel" />}
                onclick={() => {
                  const uri =
                    process.env.NEXT_PUBLIC_BASE_URL_API +
                    "export/exsum/indikasi/excel";
                  const token = sessionStorage.getItem(API_CONSTANT.token);
                  const exsum_id = exsum.id;
                  const params = "token=" + token + "&exsum_id=" + exsum_id;

                  window.open(uri + "?" + params, "_blank")?.focus();
                }}
              />
            </Stack>
          }
          addButton={
            <Stack direction="row" alignItems="center">
              {/* {project == "all" && ( */}
              {/* <AddButton
                fullWidth={onlySmallScreen}
                noMargin
                filled
                title="Download Excel"
                color="success"
                startIcon={
                  <Icon
                    baseClassName="fas"
                    className={`fa-file-excel`}
                    sx={{
                      fontSize: "16px !important",
                    }}
                  />
                }
                onclick={() => {
                  const uri =
                    process.env.NEXT_PUBLIC_BASE_URL_API +
                    "export/exsum/indikasi/excel";
                  const token = sessionStorage.getItem(API_CONSTANT.token);
                  const exsum_id = exsum.id;
                  const params = "token=" + token + "&exsum_id=" + exsum_id;

                  window.open(uri + "?" + params, "_blank")?.focus();
                }}
              /> */}
              {/* )} */}
              {hasPrivilege(permission, pathname, "add") && (
                <AddButton
                  noMargin
                  filled
                  small
                  title="Tambah Indikasi"
                  onclick={() => handleModalOpen(0, true, "update")}
                />
              )}
            </Stack>
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
            <TableIndication
              data={data}
              handleModalOpen={handleModalOpen}
              conditionEditing={conditionEditing}
              conditionEditingPointerEvent={conditionEditingPointerEvent}
            />
          )}
        </CardItem>
      </Stack>

      <DialogComponent
        width={"80%"}
        dialogOpen={modalOpen.action && modalOpen.type == "update"}
        // dialogClose={() => handleModalOpen(0, false, "")}
        title={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            width="100%"
          >
            <Typography fontSize={20} fontWeight={500}>
              Form Indikasi Risiko Objek MRPN {year == 0 ? "5 Tahunan" : year}
            </Typography>
            <AddButton
              title="Referensi"
              onclick={() => setModalReference(true)}
              startIcon={<Iconify name="mdi:book-search-outline" />}
            />
          </Stack>
        }
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button
              variant="outlined"
              onClick={() => handleModalOpen(0, false, "")}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => handleModalOpenSubmit()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormIndication
          state={state}
          setState={setState}
          handleModalOutputOpen={handleModalOutputOpen}
          handleModalRegulationOpen={handleModalRegulationOpen}
          optionRiskType={optionRiskType}
          optionTOWS={dataTOWS}
        />
      </DialogComponent>

      <DialogComponent
        tableMode
        width={year == 0 ? "80%" : 860}
        // width={"80%"}
        dialogOpen={modalOutput.type != "delete" && modalOutput.action}
        dialogClose={() => handleModalOutputOpen(-1, false, "")}
        title={`Tambah ${
          modalOutput.type == "NON_RO" ? "Project" : "Rincian Output"
        }`}
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button
              variant="outlined"
              onClick={() => handleModalOutputOpen(-1, false, "")}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => handleModalOutputSubmit()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormPerlakuanRisiko
          optionRO={dataTable}
          optionNonRO={dataTableNonRO}
          state={stateValue}
          setState={setStateValue}
          handleAddNomenklatur={() => setModalNomenklatur(true)}
        />
      </DialogComponent>

      <DialogComponent
        width={520}
        dialogOpen={modalRegulation.type == "update" && modalRegulation.action}
        dialogClose={() => handleModalRegulationOpen(-1, false, "")}
        title="Tambah Regulasi/Kelembagaan"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => handleModalRegulationOpen(-1, false, "")}>
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => handleModalRegulationSubmit()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormRegulation
          state={stateRegulation}
          setState={setStateRegulation}
          options={listPerpres}
          optionStakeholder={optionStakeholder}
          setModalPeraturan={handleModalNewRegulationOpen}
          setModalEntitas={handleModalEntitasOpen}
        />
      </DialogComponent>

      <DialogComponent
        width={480}
        dialogOpen={
          modalNewRegulation.action && modalNewRegulation.type == "update"
        }
        dialogClose={() => handleModalNewRegulationOpen(-1, false, "")}
        title="Tambah Peraturan"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => handleModalNewRegulationOpen(-1, false, "")}>
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={() => handleModalNewRegulationSubmit()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextareaStyled
                placeholder="Peraturan"
                minRows={2}
                value={stateNewRegulation.title}
                onChange={(e: any) => {
                  setStateNewRegulation((prevState) => {
                    return {
                      ...prevState,
                      title: e.target.value,
                    };
                  });
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextareaStyled
                placeholder="Keterangan Peraturan"
                minRows={3}
                value={stateNewRegulation.value}
                onChange={(e: any) => {
                  setStateNewRegulation((prevState) => {
                    return {
                      ...prevState,
                      value: e.target.value,
                    };
                  });
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogComponent>

      <DialogComponent
        width={520}
        dialogOpen={modalNomenklatur}
        dialogClose={() => setModalNomenklatur(false)}
        title="Tambah Nomenklatur Non-RO/Project"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => setModalNomenklatur(false)}>Batal</Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => handleModalAddNonRoSubmit()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormNomenklatur
          reqNonRo={reqNonRo}
          setReqNonRo={setReqNonRo}
          selectLocation={listLocation}
          listProP={listProP}
          listStakeholder={optionStakeholder}
          setModalEntitas={handleModalEntitasOpen}
        />
      </DialogComponent>

      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalOpen.action && modalOpen.type == "delete"}
        handleCloseModal={() =>
          setModalOpen({ index: -1, action: false, type: "" })
        }
        handleDelete={() => deleteData()}
      />

      <DialogComponent
        width={480}
        dialogOpen={modalEntitas.action && modalEntitas.type == "update"}
        dialogClose={() => handleModalEntitasOpen(-1, false, "")}
        title={
          modalEntitas.source === "nomenklatur"
            ? "Tambah Penanggungjawab"
            : "Tambah Entitas"
        }
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => handleModalEntitasOpen(-1, false, "")}>
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              // onClick={() => handleModalEntitasSubmit()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                size="small"
                placeholder={
                  modalEntitas.source === "nomenklatur"
                    ? "Nama Penanggungjawab"
                    : "Nama Entitas"
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <AutocompleteSelectSingle
                key={optionTypeEntity.length}
                value={undefined}
                options={optionTypeEntity}
                getOptionLabel={(option) => option.name}
                handleChange={() => {}}
                placeHolder={
                  modalEntitas.source === "nomenklatur"
                    ? "Pilih tipe penanggungjawab"
                    : "Pilih tipe entitas"
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogComponent>

      <DialogComponent
        tableMode
        width="70%"
        dialogOpen={modalReference}
        dialogClose={() => setModalReference(false)}
        title="Referensi"
        closeButton
      >
        <TableReference data={dataProfilOverview} />
      </DialogComponent>
    </>
  );
}

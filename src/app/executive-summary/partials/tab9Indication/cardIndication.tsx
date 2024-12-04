import React, { useEffect, useState } from "react";
import { Button, DialogActions, FormControl, Grid, Stack } from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import AddButton from "@/app/components/buttonAdd";
import TableIndication from "./partials/table";
import FormIndication from "./partials/form";
import useCardIndicationVM from "@/app/executive-summary/partials/tab9Indication/cardIndicationVM";
import { useAuthContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import DialogDelete from "@/app/components/dialogDelete";
import FormPerlakuanRisiko from "@/app/executive-summary/partials/tab9Indication/partials/formPerlakuanRisiko";
import FormRegulation from "@/app/executive-summary/partials/tab9Indication/partials/formRegulation";
import { ExsumIndicationStateValue } from "./cardIndicationModel";
import { TextareaStyled } from "@/components/textarea";

export default function CardIndication({ project }: { project: string }) {
  const { year, rpjmn } = useRKPContext((store) => store);

  const {
    data,
    state,
    setState,
    optionRO,
    dataTable,
    optionRiskType,
    optionStakeholder,
    modalOpen,
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
    listSof,
    listProP,
    stateRegulation,
    setStateRegulation,
    listPerpres,
  } = useCardIndicationVM();

  const { permission } = useAuthContext((state) => state);
  const pathname = usePathname();

  return (
    <>
      <Stack gap={1}>
        <CardItem
          title={`Indikasi Risiko Objek MRPN ${
            year == 0 ? "5 Tahunan" : "Tahun " + year
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
          addButton={
            hasPrivilege(permission, pathname, "add") && (
              <AddButton
                filled
                small
                title="Tambah Indikasi"
                onclick={() => handleModalOpen(0, true, "update")}
              />
            )
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
            <TableIndication data={data} handleModalOpen={handleModalOpen} />
          )}
        </CardItem>
      </Stack>

      <DialogComponent
        width={"80%"}
        dialogOpen={modalOpen.action && modalOpen.type == "update"}
        // dialogClose={() => handleModalOpen(0, false, "")}
        title="Form Indikasi Risiko Objek MRPN 5 Tahunan"
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
        width={"80%"}
        dialogOpen={modalOutput.type != "delete" && modalOutput.action}
        dialogClose={() => handleModalOutputOpen(-1, false, "")}
        title="Tambah Rincian Output"
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
          state={stateValue}
          setState={setStateValue}
          listLocation={listLocation}
          listProP={listProP}
          listStakeholder={optionStakeholder}
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

      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalOpen.action && modalOpen.type == "delete"}
        handleCloseModal={() => handleModalOpen(-1, false, "")}
        handleDelete={() => deleteData()}
      />
    </>
  );
}

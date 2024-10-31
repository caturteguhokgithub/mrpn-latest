import React from "react";
import { Button, DialogActions, Stack } from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import AddButton from "@/app/components/buttonAdd";
import TableIndication from "./partials/table";
import FormIndication from "./partials/form";
import useCardIndicationVM from "@/app/executive-summary/partials/tab9Indication/cardIndicationVM";
import {useAuthContext, useRKPContext} from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import DialogDelete from "@/app/components/dialogDelete";

export default function CardIndication({ project }: { project: string }) {

  const {year, rpjmn} = useRKPContext(store => store)

  const {
    data,
    optionRiskType,
    optionStakeholder,
    optionStrategy,
    optionRO,
    state,
    setState,
    modalOpen,
    updateData,
    handleModalOpen,
    handleModalClose,
    modalOpenDelete,
    setModalOpenDelete,
    handleModalOpenDelete,
    deleteData,
    dataTOWS,
  } = useCardIndicationVM();

  const { permission } = useAuthContext((state) => state);
  const pathname = usePathname();

  return (
    <>
      <Stack gap={1}>
        <CardItem
          title={`Indikasi Risiko Objek MRPN ${year == 0 ? "5 Tahunan" : "Tahun "+year}`}
          infoTooltip={
            <Stack spacing={2}>
              <div>
                <strong>Indikasi Profil Risiko Objek MRPN Lintas Sektor</strong>
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
                </p>
              </div>
            </Stack>
          }
          addButton={
            hasPrivilege(permission, pathname, "add") && (
              <AddButton
                filled
                small
                title="Tambah Indikasi"
                onclick={() => handleModalOpen(0)}
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
            <TableIndication
              data={data}
              handleModalOpen={handleModalOpen}
              handleModalOpenDelete={handleModalOpenDelete}
            />
          )}
        </CardItem>
      </Stack>
      <DialogComponent
        width={"50%"}
        dialogOpen={modalOpen}
        dialogClose={handleModalClose}
        title="Form Indikasi Risiko Objek MRPN 5 Tahunan"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={handleModalClose}>
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
        <FormIndication
          state={state}
          setState={setState}
          optionRiskType={optionRiskType}
          optionStrategy={optionStrategy}
          optionStakeholder={optionStakeholder}
          optionRO={optionRO}
          optionTOWS={dataTOWS}
        />
      </DialogComponent>
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalOpenDelete}
        handleCloseModal={() => setModalOpenDelete(false)}
        handleDelete={() => deleteData()}
      />
    </>
  );
}

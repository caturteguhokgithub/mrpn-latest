"use client";

import ContentPage from "@/components/contents";
import React, { useEffect } from "react";
import TableNotaDinasViewOnly from "./partials/table-nota-dinas-view-only";
import {
  usePenetapanTopicContext,
  useRKPContext,
} from "@/lib/core/hooks/useHooks";
import {
  Button,
  DialogActions,
  FormControl,
  Stack,
  Typography,
} from "@mui/material";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
import { PenetapanObjectDto } from "@/lib/core/context/penetapanTopicContext";
import DialogComponent from "@/components/dialog";
import EmptyState from "@/components/empty";
import { IconEmptyPage } from "@/components/icons";
import Iconify from "@/components/icons/iconify";
import TableStatus from "./partials/table-status";
import useNotaDinasVM from "./notaDinasVM";
import FormNote from "./partials/form-note";

export default function PageApprovalNotaDinasView({ }) {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

  const { year } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState, nota } = usePenetapanTopicContext((state) => state);

  console.log(objectState);

  const {
    useEffectGenerateOption,
    useEffectObjectState,
    stateApproval,
    setStateApproval,
    setModalReject,
    modalReject,
    handleUpdateStatus,
    setModalApproval,
    modalApproval,
  } = usePenetapanObjectVM();

  const { gambar } = useNotaDinasVM();

  useEffect(useEffectGenerateOption, [year]);
  useEffect(useEffectObjectState, [year, objectState]);

  return (
    <ContentPage
      title="Pengesahan Objek MRPN & UPR LS"
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
      withCard
      chooseObject={
        year > 0 && (
          <Stack gap={1} direction="row" alignItems="center">
            <Button
              onClick={() => setModalOpenAdd(true)}
              variant="outlined"
              color="primary"
              startIcon={<Iconify name="mdi:list-status" />}
              sx={{
                borderRadius: 50,
                whiteSpace: "nowrap",
                textTransform: "capitalize",
              }}
            >
              Status Topik
            </Button>
            <FormControl size="small" sx={{ width: "20vw" }}>
              <AutocompleteSelectSingle
                rounded
                value={objectState}
                options={objects}
                getOptionLabel={(opt) => `${opt.code} - ${opt.topik}`}
                handleChange={(val: PenetapanObjectDto | null) =>
                  setObjectState(val ?? undefined)
                }
                placeHolder="Pilih Topik"
              />
            </FormControl>
          </Stack>
        )
      }
    >
      {nota !== undefined ? (
        <TableNotaDinasViewOnly
          notaDinas={nota}
          stateApproval={stateApproval}
          setStateApproval={setStateApproval}
          imageProps={gambar}
          pageApproval
          modalReject={modalReject}
          setModalReject={setModalReject}
          modalApproval={modalApproval}
          setModalApproval={setModalApproval}
        />
      ) : (
        <EmptyState
          icon={<IconEmptyPage />}
          title={
            year == 0
              ? "Tidak ada data yang ditampilkan"
              : "Halaman Topik Kosong"
          }
          description={year == 0 ? null : "Silahkan pilih topik"}
        />
      )}

      <DialogComponent
        tableMode
        dialogOpen={modalOpenAdd}
        dialogClose={() => setModalOpenAdd(false)}
        title="Status Topik"
      >
        <TableStatus />
      </DialogComponent>

      <DialogComponent
        width={480}
        title="Catatan Penolakan"
        dialogOpen={modalReject ?? false}
        dialogClose={() => setModalReject?.(false)}
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button color="error" onClick={() => setModalReject?.(false)}>
              Tidak
            </Button>
            <Button
              color="error"
              variant="contained"
              type="submit"
              onClick={async () => {
                setModalReject?.(false);
                await handleUpdateStatus("rejected", stateApproval?.message);
              }}
            >
              Tolak
            </Button>
          </DialogActions>
        }
      >
        <Stack gap={1}>
          <Typography>
            Apakah Anda yakin ingin <strong>MENOLAK PENGESAHAN</strong>?<br />
            Tuliskan catatan penolakan
          </Typography>

          <FormNote
            state={stateApproval}
            setState={setStateApproval}
            mode="add"
          />
        </Stack>
      </DialogComponent>
      <DialogComponent
        width={360}
        dialogOpen={modalApproval ?? false}
        dialogClose={() => setModalApproval?.(false)}
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button color="error" onClick={() => setModalApproval?.(false)}>
              Tidak
            </Button>
            <Button
              color="success"
              variant="contained"
              type="submit"
              onClick={async () => {
                setModalApproval?.(false);
                await handleUpdateStatus("approved", stateApproval?.message);
                // setIsReview(false);
                // setIsReject(false);
                // setIsApproval(true);
                // showToast("Berhasil mengajukan approval", "success");
              }}
            >
              Terima
            </Button>
          </DialogActions>
        }
      >
        Apakah Anda yakin ingin <strong>MENERIMA PENGESAHAN</strong>?
      </DialogComponent>
    </ContentPage>
  );
}

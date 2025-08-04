"use client";

import ContentPage from "@/components/contents";
import React, { useEffect } from "react";
import TableNotaDinasViewOnly from "./partials/table-nota-dinas-view-only";
import {
  usePenetapanTopicContext,
  useRKPContext,
} from "@/lib/core/hooks/useHooks";
import { Button, FormControl, Stack } from "@mui/material";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
import { PenetapanObjectDto } from "@/lib/core/context/penetapanTopicContext";
import DialogComponent from "@/components/dialog";
import EmptyState from "@/components/empty";
import { IconEmptyPage } from "@/components/icons";
import Iconify from "@/components/icons/iconify";
import TableStatus from "./partials/table-status";
import useNotaDinasVM from "./notaDinasVM";

export default function PageApprovalNotaDinasView({ }) {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

  const { year } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState, nota } =
    usePenetapanTopicContext((state) => state);

  const { useEffectGenerateOption, useEffectObjectState, stateApproval, setStateApproval, } = usePenetapanObjectVM();
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
                handleChange={(val: PenetapanObjectDto) => setObjectState(val)}
                placeHolder={"Pilih Topik"}
              />
            </FormControl>
          </Stack>
        )
      }
    >
      {nota !== undefined ? (
        <TableNotaDinasViewOnly notaDinas={nota} stateApproval={stateApproval} setStateApproval={setStateApproval} imageProps={gambar} pageApproval />
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
    </ContentPage>
  );
}

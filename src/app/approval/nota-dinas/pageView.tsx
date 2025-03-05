"use client";

import ContentPage from "@/app/components/contents";
import React, { useEffect } from "react";
import TableNotaDinasViewOnly from "./partials/table-nota-dinas-view-only";
import {
  usePenetapanTopicContext,
  useRKPContext,
} from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import {
  Box,
  Button,
  DialogActions,
  FormControl,
  Stack,
  TableCell,
  TableRow,
} from "@mui/material";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { MasterListObjectRes } from "@/app/misc/master/masterServiceModel";
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
import { PenetapanObjectDto } from "@/lib/core/context/penetapanTopicContext";
import DialogComponent from "@/components/dialog";
import FormReject from "@/app/approval/nota-dinas/partials/form-reject";
import { IconFA } from "@/components/icons/icon-fa";
import EmptyState from "@/components/empty";
import { IconEmptyPage } from "@/components/icons";
import AddButton from "@/app/components/buttonAdd";
import Iconify from "@/app/components/icons/iconify";
import TableStatus from "./partials/table-status";

export default function PageApprovalNotaDinasView({}) {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

  const { year } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState, nota } =
    usePenetapanTopicContext((state) => state);

  const { useEffectGenerateOption, useEffectObjectState } =
    usePenetapanObjectVM();

  useEffect(useEffectGenerateOption, [year]);

  useEffect(useEffectObjectState, [year, objectState]);

  return (
    <ContentPage
      title="Pengesahan Objek MRPN & UPR Lintas Sektor"
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
        <TableNotaDinasViewOnly notaDinas={nota} />
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

      {/*<DialogComponent*/}
      {/*  width={480}*/}
      {/*  dialogOpen={modalOpenAdd}*/}
      {/*  dialogClose={handleModalClose}*/}
      {/*  title="Tuliskan Alasan Reject"*/}
      {/*  dialogFooter={<DialogActions sx={{p: 2, px: 3}}>*/}
      {/*    <Button onClick={handleModalClose}>Batal</Button>*/}
      {/*    <Button*/}
      {/*      variant="contained"*/}
      {/*      type="submit"*/}
      {/*      color="error"*/}
      {/*      onClick={handleRejectLeft}*/}
      {/*    >*/}
      {/*      Reject*/}
      {/*    </Button>*/}
      {/*  </DialogActions>}*/}
      {/*>*/}
      {/*  <FormReject mode="add"/>*/}
      {/*</DialogComponent>*/}
      {/*<DialogComponent*/}
      {/*  width={480}*/}
      {/*  dialogOpen={modalOpenRejectRight}*/}
      {/*  dialogClose={handleModalClose}*/}
      {/*  title="Tuliskan Alasan Reject"*/}
      {/*  dialogFooter={<DialogActions sx={{p: 2, px: 3}}>*/}
      {/*    <Button onClick={handleModalClose}>Batal</Button>*/}
      {/*    <Button*/}
      {/*      variant="contained"*/}
      {/*      type="submit"*/}
      {/*      color="error"*/}
      {/*      onClick={handleRejectRight}*/}
      {/*    >*/}
      {/*      Reject*/}
      {/*    </Button>*/}
      {/*  </DialogActions>}*/}
      {/*>*/}
      {/*  <FormReject mode="add"/>*/}
      {/*</DialogComponent>*/}

      {/*<TableRow>*/}
      {/*  <TableCell align="center">*/}
      {/*    {buttonLeft && (*/}
      {/*      <Stack direction="row" gap={1} justifyContent="center">*/}
      {/*        <Box>*/}
      {/*          <Button*/}
      {/*            color="error"*/}
      {/*            size="small"*/}
      {/*            variant="outlined"*/}
      {/*            sx={{borderRadius: 24, px: 3}}*/}
      {/*            startIcon={<IconFA name="thumbs-down" size={14}/>}*/}
      {/*            onClick={handleModalOpen}*/}
      {/*          >*/}
      {/*            Reject*/}
      {/*          </Button>*/}
      {/*        </Box>*/}
      {/*        <Box>*/}
      {/*          <Button*/}
      {/*            color="success"*/}
      {/*            size="small"*/}
      {/*            variant="contained"*/}
      {/*            sx={{borderRadius: 24, px: 3}}*/}
      {/*            startIcon={<IconFA name="thumbs-up" size={14}/>}*/}
      {/*            onClick={handleApprovalLeft}*/}
      {/*          >*/}
      {/*            Approve*/}
      {/*          </Button>*/}
      {/*        </Box>*/}
      {/*      </Stack>*/}
      {/*    )}*/}
      {/*  </TableCell>*/}
      {/*  <TableCell align="center">*/}
      {/*    {buttonRight && (*/}
      {/*      <Stack direction="row" gap={1} justifyContent="center">*/}
      {/*        <Box>*/}
      {/*          <Button*/}
      {/*            color="error"*/}
      {/*            size="small"*/}
      {/*            variant="outlined"*/}
      {/*            sx={{borderRadius: 24, px: 3}}*/}
      {/*            startIcon={<IconFA name="thumbs-down" size={14}/>}*/}
      {/*            onClick={handleModalOpenRejectRight}*/}
      {/*          >*/}
      {/*            Reject*/}
      {/*          </Button>*/}
      {/*        </Box>*/}
      {/*        <Box>*/}
      {/*          <Button*/}
      {/*            color="success"*/}
      {/*            size="small"*/}
      {/*            variant="contained"*/}
      {/*            sx={{borderRadius: 24, px: 3}}*/}
      {/*            startIcon={<IconFA name="thumbs-up" size={14}/>}*/}
      {/*            onClick={handleApprovalRight}*/}
      {/*          >*/}
      {/*            Approve*/}
      {/*          </Button>*/}
      {/*        </Box>*/}
      {/*      </Stack>*/}
      {/*    )}*/}
      {/*  </TableCell>*/}
      {/*</TableRow>*/}
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

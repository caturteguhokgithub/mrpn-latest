import React, { useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  FormControl,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import DialogComponent from "@/components/dialog";
import { grey } from "@mui/material/colors";
import useCardLocationVM from "@/app/executive-summary/partials/tab2Profile/cardLocation/cardLocationVM";
import { ExsumLocationUpdateDto } from "@/app/executive-summary/partials/tab2Profile/cardLocation/cardLocationModel";
import dynamic from "next/dynamic";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { AutocompleteSelectMultiple } from "@/components/autocomplete";
import ReactQuill from "react-quill";
import { MiscMasterListProvinsiRes } from "@/app/misc/master/masterServiceModel";
import { useRKPContext } from "@/lib/core/hooks/useHooks";

interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: React.LegacyRef<ReactQuill>;
}

const ReactQuillX = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    function QuillJS({ forwardedRef, ...props }: IWrappedComponent) {
      return <RQ ref={forwardedRef} {...props} />;
    }

    return QuillJS;
  },
  {
    ssr: false,
  }
);

export default function CardLocation({ project }: { project: string }) {
  const {
    modal,
    setModal,
    data,
    request,
    setRequest,
    locationExsum,
    updateData,
    columns,
    setColumns,
    listProvinsi,
    handleChangeLocation,
    handleEdited,
    conditionEditing,
  } = useCardLocationVM();

  const quillRef = React.useRef<ReactQuill>(null);

  const handleChangeQuill = async () => {
    const text = quillRef.current?.value;
    let finalText = "";
    if (text) {
      finalText = text.toString();
    }
    setRequest((prevState) => {
      return {
        ...prevState,
        keterangan: finalText,
      };
    });
  };

  const handleUpdateData = async () => {
    const text = quillRef.current?.value;
    if (text) {
      const req = {
        ...request,
        keterangan: text.toString(),
      };
      updateData(req);
    }
  };

  return (
    <CardItem
      title="Lokasi Proyek"
      setting
      settingEditOnclick={() => {
        if (data.length > 0) {
          const req: ExsumLocationUpdateDto = {
            id: data[0].id,
            exsum_id: data[0].exsum_id,
            lokasi: data[0].provinsi ? data[0].provinsi : [],
            keterangan: data[0].keterangan,
          };
          setRequest(req);
        }
        setModal(true);
      }}
    >
      {data.length == 0 ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={2}
          sx={{
            color: conditionEditing,
          }}
        >
          <Stack gap={3} direction="column" height="100%">
            <Stack gap={1}>
              <Typography fontSize={16} fontWeight={500}>
                Lokasi{" "}
                <Typography component="span" color={grey[500]}>
                  (Provinsi)
                </Typography>
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={0.5}>
                {locationExsum.map((x, index) => (
                  <Chip
                    size="small"
                    label={x.name}
                    key={index}
                    sx={{ color: conditionEditing }}
                  />
                ))}
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Typography fontSize={16} fontWeight={500}>
                Keterangan{" "}
                <Typography component="span" color={grey[500]}>
                  (Area of Interest)
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                fontWeight={600}
                color={conditionEditing}
                component="div"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: data[0].keterangan }}
                ></div>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
      <DialogComponent
        dialogOpen={modal}
        dialogClose={() => setModal(false)}
        title="Ubah Lokasi Proyek"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={() => setModal(false)}>
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                handleUpdateData(), handleEdited();
              }}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={2}>
          {/*<Grid item xs={12}>*/}
          {/*  <FieldLabelInfo title="Lokasi" />*/}
          {/*  <AutocompleteSelectMultiple*/}
          {/*    value={request.lokasi}*/}
          {/*    options={listProvinsi}*/}
          {/*    getOptionLabel={(option) => option.name}*/}
          {/*    handleChange={(e:MiscMasterListProvinsiRes[]) => {*/}
          {/*      handleChangeQuill().then(r =>*/}
          {/*        handleChangeLocation(e)*/}
          {/*      )*/}
          {/*    }}*/}
          {/*    placeHolder={"Pilih Provinsi"}*/}
          {/*    labelSelectAll={"Pilih semua Provinsi"}*/}
          {/*  />*/}
          {/*</Grid>*/}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FieldLabelInfo title="Keterangan" />
              <ReactQuillX
                key={request.keterangan.length}
                theme="snow"
                defaultValue={request.keterangan}
                value={request.keterangan}
                forwardedRef={quillRef}
                onBlur={() => handleChangeQuill()}
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogComponent>
    </CardItem>
  );
}

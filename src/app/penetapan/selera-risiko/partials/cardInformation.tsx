import React, { Fragment } from "react";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import type ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import DialogComponent from "@/app/components/dialog";
import useCardSegmentVM from "@/app/executive-summary/partials/tab1Background/cardSegment/cardSegmentVM";
import {
  Box,
  Button,
  DialogActions,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import { bgColorTh } from "@/app/utils/color";
import { grey } from "@mui/material/colors";
import Iconify from "@/app/components/icons/iconify";
import { IconFA } from "@/app/components/icons/icon-fa";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { styleOrgChart } from "@/app/executive-summary/style";
import DraggableScroll from "@/app/components/cardStakeholder/draggableScroll";
import { SxParams } from "@/app/executive-summary/types";
import FormInformation from "./form";

interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: React.LegacyRef<ReactQuill>;
}

export default function CardInformation({
  activeSetting,
}: {
  activeSetting?: boolean;
}) {
  const {
    data,
    modal,
    setModal,
    updateData,
    deleteData,
    request,
    setRequest,
    modalDelete,
    setModalDelete,
    handleModalDelete,
  } = useCardSegmentVM();

  const ReactQuill = dynamic(
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
  const quillRef = React.useRef<ReactQuill>(null);

  const handleCreateOrUpdateData = async () => {
    const text = quillRef.current?.value;
    if (text) {
      const req = {
        ...request,
        value: text.toString(),
      };
      updateData(req);
    }
  };

  const emptyData = true;

  const rowData = [
    {
      id: 1,
      informasi:
        "Memantapkan Sistem Pertahanan Keamanan Negara dan Mendorong Kemandirian Bangsa melalui Swasembada Pangan, Energi, Air, Ekonomi Syariah, Ekonomi Digital, Ekonomi Hijau, dan Ekonomi Biru",
      jenis: "image",
      url: "/",
    },
    {
      id: 2,
      informasi:
        "Mencetak dan meningkatkan produktivitas lahan pertanian dengan lumbung pangan desa, daerah, dan nasional",
      jenis: "pdf",
      url: "/",
    },
  ];

  const [modalViewImage, setModalViewImage] = React.useState(false);

  const sxParamsFull: SxParams = { variant: "full" };

  return (
    <Fragment>
      <CardItem
        title="Informasi Lain"
        setting={activeSetting}
        settingEditOnclick={() => setModal(true)}
      >
        {!emptyData ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Data Kosong"
            description="Silahkan isi konten halaman ini"
          />
        ) : (
          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table
              sx={{
                minWidth: 650,
                "tbody, thead": {
                  "td, th": {
                    borderRight: `1px solid ${grey[300]} !important`,
                    "&:last-of-type": {
                      borderRight: `0 !important`,
                    },
                  },
                },
              }}
              size="small"
            >
              <TableHead sx={{ bgcolor: bgColorTh }}>
                <TableRow>
                  <TableCell align="center">Informasi</TableCell>
                  <TableCell align="center">Bukti Dukung</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.informasi}</TableCell>
                    <TableCell align="center">
                      {item.jenis == "pdf" ? (
                        <IconButton
                          color="primary"
                          href={item.url}
                          target="_blank"
                        >
                          <Iconify name="mdi:file-pdf" color="red" size={20} />
                        </IconButton>
                      ) : (
                        <IconButton
                          color="primary"
                          onClick={() => setModalViewImage(true)}
                        >
                          <Iconify name="mdi:file-image" size={20} />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardItem>
      <DialogComponent
        dialogOpen={modal}
        dialogClose={() => setModal(false)}
        title="Informasi Lain"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={() => setModal(false)}>
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={handleCreateOrUpdateData}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        {/* <ReactQuill
          key={request.value}
          theme="snow"
          defaultValue={request.value}
          forwardedRef={quillRef}
        /> */}
        <FormInformation />
      </DialogComponent>
      <DialogComponent
        width="100%"
        maxHeight="100vh"
        dialogOpen={modalViewImage}
        dialogClose={() => setModalViewImage(false)}
        sx={{
          ".transform-component-module_wrapper__SPB86": {
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          ".react-transform-component": {
            width: "100%",
          },
          ".MuiDialogContent-root": {
            p: 0,
          },
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10, zIndex: 9999 }}
          onClick={() => setModalViewImage(false)}
        >
          <IconFA name="circle-xmark" color="red" size={32} />
        </IconButton>
        <TransformWrapper
          initialScale={0.5}
          minScale={0.1}
          maxScale={3}
          limitToBounds={true}
          doubleClick={{ disabled: false }}
          wheel={{ disabled: false }}
          panning={{ disabled: false }}
        >
          <TransformComponent>
            <Box sx={styleOrgChart(sxParamsFull)} mt={4}>
              <DraggableScroll
                sx={{
                  display: "flex",
                  gap: 1,
                  paddingBottom: 1,
                  "&::-webkit-scrollbar": {
                    height: "3px",
                  },
                }}
              >
                <Image
                  alt="Instansi Pelaksana"
                  src="https://res.cloudinary.com/caturteguh/image/upload/v1741666619/mrpn/document-872506_1280_sanrsj.jpg"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </DraggableScroll>
            </Box>
          </TransformComponent>
        </TransformWrapper>
      </DialogComponent>
    </Fragment>
  );
}

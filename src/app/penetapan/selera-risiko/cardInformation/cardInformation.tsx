import React, { Fragment, useState } from "react";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import type ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import DialogComponent from "@/components/dialog";
import useCardSegmentVM from "@/app/executive-summary/partials/tab1Background/cardSegment/cardSegmentVM";
import {
  Box,
  Button,
  DialogActions,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import { bgColorTh } from "@/utils/color";
import { blue, grey, red } from "@mui/material/colors";
import Iconify from "@/components/icons/iconify";
import { IconFA } from "@/components/icons/icon-fa";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { styleOrgChart } from "@/app/executive-summary/style";
import DraggableScroll from "@/components/cardStakeholder/draggableScroll";
import { SxParams } from "@/app/executive-summary/types";
import FormInformation from "./form";
import useInformationList from "../hooks/useInformation";
import EmptyDevelopingState from "@/components/empty/developing";
import { isDeveloping } from "@/components/layouts/layout";
import DialogDelete from "@/components/dialogDelete";
import { listsDao } from "../hooks/informationModel";
import Toast from "@/components/snackbar/snackbar";
import usePenetapanObjectVM from "../../objek/pageVM";
import { useToast } from "@/lib/core/context/toastContext";

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
    modalEdit,
    setModalEdit,
    request,
    setRequest,
    modalViewImage,
    setModalViewImage,
    modalOpenDelete,
    setModalDelete,
    createOrUpdateData,
    deleteListData,
  } = useInformationList();

  const { showToast } = useToast();

  const [lihatBD, setLihatBD] = useState("");
  const [deleteID, setDeleteID] = useState(0);

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
    const req = {
      ...request,
    };
    createOrUpdateData(req);
  };

  const handleDeleteListData = async () => {
    const req = {
      id: deleteID,
    };

    deleteListData(req);
  };

  const handleViewBD = async (file: string) => {
    setLihatBD(file);
    setModalViewImage(true);
  };

  const handleBtnDelete = async (id: number) => {
    setDeleteID(id);
    setModalDelete(true);
  };

  const sxParamsFull: SxParams = { variant: "full" };

  // console.log({ listData });

  return (
    <Fragment>
      <CardItem
        title="Informasi Lain"
        // setting={activeSetting}
        // settingEditOnclick={() => setModal(true)}
        addButton={
          <Button
            onClick={() => setModal(true)}
            component="label"
            size="small"
            variant="contained"
            tabIndex={-1}
            startIcon={<Iconify name="mdi:plus-circle" size={16} />}
            sx={{
              paddingInline: 1.5,
              borderRadius: "50px",
              textTransform: "capitalize",
            }}
          >
            Tambah Informasi Lain
          </Button>
        }
      >
        {/* {isDeveloping ? (
          <EmptyDevelopingState />
        ) : ( */}
        <Fragment>
          {data?.lists.length == 0 ? (
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
                    <TableCell align="center" width={200}>
                      Bukti Dukung
                    </TableCell>
                    <TableCell align="center" width={150}>
                      Aksi
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.lists.map((item: listsDao) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.value}</TableCell>
                      <TableCell align="center">
                        {/* {item.jenis == "pdf" ? (
                            <IconButton
                              color="primary"
                              href={item.url}
                              target="_blank"
                            >
                              <Iconify
                                name="mdi:file-pdf"
                                color="red"
                                size={20}
                              />
                            </IconButton>
                          ) : (
                            <IconButton
                              color="primary"
                              onClick={() => setModalViewImage(true)}
                            >
                              <Iconify name="mdi:file-image" size={20} />
                            </IconButton>
                          )} */}
                        {/* <IconButton
                            color="primary"
                            onClick={() => handleViewBD(item.file)}
                          >
                            <Iconify name="mdi:file-image" size={20} />
                          </IconButton> */}

                        {item.file?.toLowerCase().endsWith(".pdf") ? (
                          <IconButton
                            color="primary"
                            href={
                              process.env.NEXT_PUBLIC_BASE_URL_FILES +
                              "bukti_dukung/" +
                              item.file
                            }
                            target="_blank"
                          >
                            <Iconify
                              name="mdi:file-pdf"
                              color="red"
                              size={20}
                            />
                          </IconButton>
                        ) : item.file?.toLowerCase().endsWith(".jpg") ||
                          item.file?.toLowerCase().endsWith(".jpeg") ||
                          item.file?.toLowerCase().endsWith(".png") ||
                          item.file?.toLowerCase().endsWith(".bmp") ||
                          item.file?.toLowerCase().endsWith(".webp") ||
                          item.file?.toLowerCase().endsWith(".gif") ? (
                          <IconButton
                            color="primary"
                            onClick={() => handleViewBD(item.file)}
                          >
                            <Iconify name="mdi:file-image" size={20} />
                          </IconButton>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          bgcolor: grey[50],
                        }}
                      >
                        <Stack direction="row" justifyContent="center">
                          {/* <IconButton onClick={() => setModalEdit(true)}>
                            <Iconify name="mdi:pencil" color={blue[500]} />
                          </IconButton> */}
                          <IconButton onClick={() => handleBtnDelete(item.id)}>
                            <Iconify name="mdi:trash" color={red[500]} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Fragment>
        {/* )} */}
      </CardItem>
      <DialogComponent
        dialogOpen={modal}
        width={600}
        dialogClose={() => setModal(false)}
        title="Tambah Informasi Lain"
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
        <FormInformation state={request} setState={setRequest} />
      </DialogComponent>
      <DialogComponent
        dialogOpen={modalEdit}
        dialogClose={() => setModalEdit(false)}
        title="Ubah Informasi Lain"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={() => setModalEdit(false)}>
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              // onClick={handleCreateOrUpdateData}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormInformation state={request} setState={setRequest} mode="edit" />
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
                  // src="https://res.cloudinary.com/caturteguh/image/upload/v1741666619/mrpn/document-872506_1280_sanrsj.jpg"
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL_FILES +
                    "bukti_dukung/" +
                    lihatBD
                  }
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
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalOpenDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => {
          handleDeleteListData();
          showToast("Data berhasil dihapus", "error");
        }}
      />
    </Fragment>
  );
}

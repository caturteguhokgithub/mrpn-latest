import React from "react";
import { Box, Button, Icon, IconButton, Stack } from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import DialogComponent from "@/components/dialog";
import useCardStakeholderVM from "@/app/executive-summary/partials/tab7Regulation/cardStakeholder/cardStakeholderVM";
import Image from "next/image";
import { IconFA } from "@/components/icons/icon-fa";
import { VisuallyHiddenInput } from "@/utils/constant";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import DraggableScroll from "@/components/cardStakeholder/draggableScroll";
import { styleOrgChart } from "@/app/executive-summary/style";
import { SxParams } from "@/app/executive-summary/types";
import useUrgensiVM from "@/app/penetapan/internal-eksternal/pageVM";

export default function CriticalPathIntEks({ title }: { title?: string }) {
  const {
    setModalOpenStakeholder,
    modalViewImageIntExt,
    setModalViewImageIntExt,
  } = useCardStakeholderVM();

  const { uploadCp, cpMapping } = useUrgensiVM();

  const handleModalOpenStakeholder = () => {
    setModalOpenStakeholder(true);
  };

  const handleStakeholderChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files?.[0];

    if (files) {
      const reader = new FileReader();

      reader.readAsDataURL(files);
      reader.onload = () => {
        const res = reader.result as string;
        uploadCp(res);
      };

      reader.onerror = (error) => {
        console.error("Error: ", error);
      };
    }
  };

  const sxParamsFull: SxParams = { variant: "full" };

  return (
    <CardItem
      title={title}
      setting={false}
      settingEditOnclick={handleModalOpenStakeholder}
      addButton={
        <Box>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            startIcon={<IconFA name="magnifying-glass-plus" size={14} />}
            sx={{ borderRadius: 50, mr: 1 }}
            onClick={() => setModalViewImageIntExt(true)}
          >
            Perbesar Gambar
          </Button>
          <Button
            component="label"
            size="small"
            variant="contained"
            tabIndex={-1}
            startIcon={
              <Icon
                baseClassName="fas"
                className={"fa-upload"}
                sx={{
                  fontSize: "12px !important",
                }}
              />
            }
            sx={{
              paddingInline: 2,
              borderRadius: "50px",
              textTransform: "capitalize",
            }}
          >
            Unggah Gambar
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => handleStakeholderChange(event)}
              multiple
            />
          </Button>
        </Box>
      }
    >
      <Stack width="100%" direction="row" justifyContent="center">
        {cpMapping?.file != "" ? (
          <Box>
            <Image
              alt="MRPN"
              src={process.env.NEXT_PUBLIC_BASE_URL_FILES + cpMapping.file}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "auto",
                height: "300px",
                cursor: "pointer",
              }}
              onClick={() => setModalViewImageIntExt(true)}
            />
          </Box>
        ) : (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Data Kosong"
            description="Silahkan isi konten halaman ini"
          />
        )}
      </Stack>
      <DialogComponent
        width="100%"
        maxHeight="100vh"
        dialogOpen={modalViewImageIntExt}
        dialogClose={() => setModalViewImageIntExt(false)}
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
          onClick={() => setModalViewImageIntExt(false)}
        >
          <IconFA name="circle-xmark" color="red" size={32} />
        </IconButton>
        <TransformWrapper
          centerOnInit
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
                  src={process.env.NEXT_PUBLIC_BASE_URL_FILES + cpMapping.file}
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
    </CardItem>
  );
}

import React, { Fragment } from "react";
import { Box, Button, DialogActions, Tooltip, styled } from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import Image from "next/image";
import { dataTema } from "../../dataTema";
import DialogComponent from "@/components/dialog";
import FormFramework from "./form";

export default function CardFot({ project }: { project: string }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalOpenImg, setModalOpenImg] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalOpenImg(false);
  };

  const handleModalImg = () => {
    setModalOpenImg(true);
  };

  const isEmpty = false;

  return (
    <>
      <CardItem
        title="Penyusunan Strategi"
        setting
        settingEditOnclick={handleModalOpen}
      >
        {isEmpty || project === "4" ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Data Kosong"
            description="Silahkan isi konten halaman ini"
          />
        ) : (
          <>
            {dataTema.map((itemFot, index) => (
              <Fragment key={index}>
                {project === itemFot.temaId && (
                  <Box width="100%" textAlign="center">
                    {itemFot.fot.map((imgFot, index) => (
                      <Tooltip
                        title="Klik untuk perbesar gambar"
                        followCursor
                        key={index}
                      >
                        <Image
                          key={index}
                          alt="Penyusunan Strategi"
                          src={imgFot}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{
                            width: "80%",
                            height: "auto",
                            margin: "0 auto",
                            cursor: "pointer",
                          }}
                          onClick={handleModalImg}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                )}
              </Fragment>
            ))}
            <DialogComponent
              width="80%"
              dialogOpen={modalOpenImg}
              dialogClose={handleModalClose}
            >
              {dataTema.map((itemFot, index) => (
                <Fragment key={index}>
                  {project === itemFot.temaId && (
                    <Box width="100%" textAlign="center">
                      {itemFot.fot.map((imgFot, index) => (
                        <Image
                          key={index}
                          alt="Penyusunan Strategi"
                          src={imgFot}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "auto",
                            margin: "0 auto",
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Fragment>
              ))}
            </DialogComponent>
          </>
        )}
      </CardItem>
      <DialogComponent
        width={320}
        dialogOpen={modalOpen}
        dialogClose={handleModalClose}
        title="Ubah Penyusunan Strategi"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={handleModalClose}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormFramework mode="add" project={project} />
      </DialogComponent>
    </>
  );
}

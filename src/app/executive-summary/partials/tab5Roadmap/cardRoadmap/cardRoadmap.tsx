import React, { useState } from "react";
import {
  Typography,
  Stack,
  Button,
  DialogActions,
  Box,
  Card,
  CardContent,
  alpha,
  IconButton,
} from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import DialogComponent from "@/components/dialog";
import { orange, red } from "@mui/material/colors";
import theme from "@/theme";
import FormRoadmap from "./form-roadmap";
import useCardRoadmapVM from "@/app/executive-summary/partials/tab5Roadmap/cardRoadmap/cardRoadmapVM";
import { ExsumRoadmapDto } from "@/app/executive-summary/partials/tab5Roadmap/cardRoadmap/cardRoadmapModel";
import { IconFA } from "@/app/components/icons/icon-fa";
import { InfoTooltip } from "@/app/components/InfoTooltip";

export default function CardRoadmap() {
  const {
    dataBusiness,
    dataOutput,
    rpjmn,
    request,
    setRequest,
    modal,
    handleOpenModal,
    updateData,
    modalDelete,
    setModalDelete,
    deleteData,
  } = useCardRoadmapVM();

  return (
    <CardItem
      title="Project Roadmap"
      setting
      multiEdit
      settingEditOutputClick={() => handleOpenModal(true, "OUTPUT")}
      settingEditBisnisClick={() => handleOpenModal(true, "BISNIS")}
    >
      <Box width="100%" textAlign="center">
        <BusinessTable data={dataBusiness} setModalDelete={setModalDelete} />
        <OutputTable data={dataOutput} setModalDelete={setModalDelete} />
      </Box>

      <DialogComponent
        width={600}
        dialogOpen={modal.open}
        dialogClose={() => handleOpenModal(false, "")}
        title={modal.title}
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button
              variant="outlined"
              onClick={() => handleOpenModal(false, "")}
            >
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
        {rpjmn && (
          <FormRoadmap
            rpjmn={rpjmn}
            request={request}
            setRequest={setRequest}
          />
        )}
      </DialogComponent>

      <DialogComponent
        width={400}
        dialogOpen={modalDelete.isOpen}
        dialogClose={() => setModalDelete({ isOpen: false, id: 0 })}
        title="Hapus Data"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setModalDelete({ isOpen: false, id: 0 })}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              color="error"
              type="submit"
              onClick={() => deleteData()}
            >
              Hapus
            </Button>
          </DialogActions>
        }
      >
        Anda yakin mau hapus data?
      </DialogComponent>
    </CardItem>
  );
}

const BusinessTable = ({
  data,
  setModalDelete,
}: {
  data: ExsumRoadmapDto[];
  setModalDelete: any;
}) => {
  return (
    <>
      <Box marginBottom={"30px"}>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <Typography
            component="h2"
            fontSize="1em"
            fontWeight={600}
            textAlign="left"
          >
            Proses Bisnis
          </Typography>
          <InfoTooltip
            title="Rangkaian aktivitas atau tugas yang terstruktur dan saling terkait, yang dilakukan oleh organisasi
atau Entitas MRPN untuk menyelesaikan pekerjaan, menghasilkan produk atau layanan tersebut,
dan mencapai sasaran dan tujuan pembangunan nasional, mencakup, tetapi tidak terbatas pada,
perencanaan, pengoperasian, pengelolaan, dan evaluasi kebijakan"
          />
        </Stack>
        <Stack
          direction="row"
          gap={2}
          width="100%"
          mt={1}
          sx={{
            [theme.breakpoints.down("md")]: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            },
            [theme.breakpoints.down("sm")]: {
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 2,
            },
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
            data.map((itemOutput, index) => (
              <Card
                variant="outlined"
                key={index}
                sx={{
                  flex: "0 0 calc(20% - 12px)",
                  borderRadius: "10px",
                }}
              >
                <CardContent
                  sx={{
                    bgcolor:
                      index === 0
                        ? alpha(orange[700], 1)
                        : index === 1
                        ? alpha(orange[700], 0.9)
                        : index === 2
                        ? alpha(orange[700], 0.8)
                        : index === 3
                        ? alpha(orange[700], 0.7)
                        : index === 4
                        ? alpha(orange[700], 0.6)
                        : index === 5
                        ? alpha(orange[700], 0.5)
                        : alpha(orange[700], 0.4),

                    color: "white",
                    borderRadius: "10px 10px 0 0",
                    py: 1,
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    lineHeight={1}
                    textTransform="capitalize"
                    fontWeight={600}
                    fontSize="1.1em"
                  >
                    {itemOutput.year}
                  </Typography>
                  <IconButton
                    onClick={() =>
                      setModalDelete({ isOpen: true, id: itemOutput.id })
                    }
                    sx={{
                      color: "white",
                      bgcolor: red[600],
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 20,
                      height: 20,
                      transition: "all 500ms",
                      "&:hover": {
                        bgcolor: red[900],
                      },
                    }}
                  >
                    <IconFA name="trash-alt" size={10} />
                  </IconButton>
                </CardContent>
                <CardContent>
                  <Typography component="p" textAlign="left">
                    <Typography
                      component="strong"
                      fontWeight={500}
                      textAlign="left"
                    ></Typography>
                    {itemOutput.output}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Box>
    </>
  );
};

const OutputTable = ({
  data,
  setModalDelete,
}: {
  data: ExsumRoadmapDto[];
  setModalDelete: any;
}) => {
  return (
    <>
      <Box marginBottom={"20px"}>
        <Typography
          component="h2"
          fontSize="1em"
          fontWeight={600}
          textAlign="left"
        >
          Expected Output
        </Typography>
        <Stack
          direction="row"
          gap={2}
          width="100%"
          mt={1}
          sx={{
            [theme.breakpoints.down("md")]: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            },
            [theme.breakpoints.down("sm")]: {
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 2,
            },
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
            data.map((itemOutput, index) => (
              <Card
                variant="outlined"
                key={index}
                sx={{
                  flex: "0 0 calc(20% - 12px)",
                  //  borderRadius: "10px 10px 0 0",
                  borderRadius: "10px",
                }}
              >
                <CardContent
                  sx={{
                    bgcolor:
                      index === 0
                        ? alpha(theme.palette.primary.main, 1)
                        : index === 1
                        ? alpha(theme.palette.primary.main, 0.9)
                        : index === 2
                        ? alpha(theme.palette.primary.main, 0.8)
                        : index === 3
                        ? alpha(theme.palette.primary.main, 0.7)
                        : index === 4
                        ? alpha(theme.palette.primary.main, 0.6)
                        : index === 5
                        ? alpha(theme.palette.primary.main, 0.5)
                        : alpha(theme.palette.primary.main, 0.4),
                    color: "white",
                    borderRadius: "10px 10px 0 0",
                    py: 1,
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    lineHeight={1}
                    textTransform="capitalize"
                    fontWeight={600}
                    fontSize="1.1em"
                  >
                    {itemOutput.year}
                  </Typography>
                  <IconButton
                    onClick={() =>
                      setModalDelete({ isOpen: true, id: itemOutput.id })
                    }
                    sx={{
                      color: "white",
                      bgcolor: red[600],
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 20,
                      height: 20,
                      transition: "all 500ms",
                      "&:hover": {
                        bgcolor: red[900],
                      },
                    }}
                  >
                    <IconFA name="trash-alt" size={10} /> 
                  </IconButton>
                </CardContent>
                <CardContent>
                  <>
                    <Typography component="p" textAlign="left">
                      {itemOutput.output}
                    </Typography>
                  </>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Box>
    </>
  );
};

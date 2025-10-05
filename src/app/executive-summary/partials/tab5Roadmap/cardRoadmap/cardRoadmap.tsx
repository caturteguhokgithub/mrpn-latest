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
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Divider,
  Chip,
} from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import DialogComponent from "@/components/dialog";
import { blue, grey, orange, red } from "@mui/material/colors";
import theme from "@/theme";
import FormRoadmap from "./form-roadmap";
import useCardRoadmapVM from "@/app/executive-summary/partials/tab5Roadmap/cardRoadmap/cardRoadmapVM";
import {
  ExsumRoadmapDto,
  ExsumRoadmapResDto,
} from "@/app/executive-summary/partials/tab5Roadmap/cardRoadmap/cardRoadmapModel";
import { IconFA } from "@/components/icons/icon-fa";
import { InfoTooltip } from "@/components/InfoTooltip";
import { useAuthContext } from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import useCardLocationVM from "../../tab2Profile/cardLocation/cardLocationVM";
import AddButton from "@/components/buttonAdd";
import Iconify from "@/components/icons/iconify";

const dataBisnis = {
  header: ["2025", "2026", "2027", "2028", "2029"],
  rows: [
    { year: 2025, value: "Pembangunan Infrastruktur Pertanian" },
    { year: 2026, value: "Pembukaan lahan/Cetak sawah Baru" },
    { year: 2026, value: "Pengembangan SDM pertanian" },
    { year: 2027, value: "Pembukaan lahan/Cetak sawah Baru" },
    { year: 2027, value: "Intensifikasi lahan pertanian" },
    { year: 2027, value: "Implementasi teknologi pertanian" },
    {
      year: 2028,
      value: "Intensifikasi lahan pertanian",
    },
    {
      year: 2028,
      value: "Implementasi teknologi pertanian",
    },
    {
      year: 2028,
      value: "Pengembangan pascapanen/hilirisasi komoditas unggulan",
    },
    {
      year: 2029,
      value: "Pengembangan pascapanen/hilirisasi komoditas unggulan",
    },
    { year: 2029, value: "Peningkatan rantai pasok dan akses pasar" },
  ],
};

interface RowData {
  ids: number[];
  year: number;
  is_inheritance: boolean;
  value: string;
  colspan?: number;
}

export default function CardRoadmap() {
  const {
    year,
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
    // handleEdited,
    // conditionEditing,
  } = useCardRoadmapVM();

  // const { handleEdited, conditionEditing } = useCardLocationVM();

  return (
    <CardItem
      title="Project Roadmap"
      setting
      // setting={year > 0 ? false : true}
      multiEdit
      year={year}
      settingEditOutputClick={() => handleOpenModal(true, "OUTPUT")}
      settingEditBisnisClick={() => handleOpenModal(true, "BISNIS")}
      addButton={
        <Stack direction="row" spacing={1}>
          <AddButton
            noMargin
            filled
            title="Tambah Expected Output"
            color="primary"
            onclick={() => handleOpenModal(true, "OUTPUT")}
          />
          <AddButton
            noMargin
            filled
            title="Tambah Proses Bisnis"
            color="primary"
            onclick={() => handleOpenModal(true, "BISNIS")}
          />
        </Stack>
      }
    >
      <Box width="100%" textAlign="center">
        <BusinessTable
          data={dataBusiness}
          setModalDelete={setModalDelete}
          handleModalEdit={() => handleOpenModal(true, "BISNIS-EDIT")}
        />
        <OutputTable
          data={dataOutput}
          setRequest={setRequest}
          setModalDelete={setModalDelete}
          handleModalEdit={() => handleOpenModal(true, "OUTPUT-EDIT")}
        />
      </Box>

      {rpjmn && (
        <FormRoadmap
          rpjmn={rpjmn}
          request={request}
          setRequest={setRequest}
          fieldTitle={modal.field}
          modal={modal}
          handleOpenModal={handleOpenModal}
          updateData={updateData}
          dataOutput={dataOutput}
        />
      )}

      <DialogComponent
        width={400}
        dialogOpen={modalDelete.isOpen}
        dialogClose={() => setModalDelete({ isOpen: false, id: [] })}
        title="Hapus Data"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setModalDelete({ isOpen: false, id: [] })}
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
  handleModalEdit,
}: {
  data: ExsumRoadmapResDto[];
  setModalDelete: any;
  handleModalEdit?: () => void;
}) => {
  const { permission } = useAuthContext((state) => state);
  let pathname = usePathname();
  const canDelete = hasPrivilege(permission, pathname, "delete");

  const mergeRows = () => {
    const mergedData: RowData[] = [];
    const seen: { [key: string]: boolean } = {};
    data.forEach((d) => {
      const row: RowData = {
        ids: [d.id],
        is_inheritance: d.is_inheritance,
        year: d.year,
        value: d.output,
      };
      if (seen[row.value]) {
        const existingRow = mergedData.find((item) => item.value === row.value);
        if (existingRow) {
          existingRow.ids.push(d.id);
          existingRow.colspan = (existingRow.colspan || 1) + 1;
        }
      } else {
        mergedData.push({ ...row, colspan: 1 });
        seen[row.value] = true;
      }
    });
    return mergedData;
  };
  const mergedRows = mergeRows();

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
            title={
              <>
                Menggambarkan <em>milestone general</em>/tahapan umum kegiatan
                yang ingin dicapai untuk menggambarkan pelaksanaan kegiatan
                secara keseluruhan dari tahun 2025 hingga tahun 2029
              </>
            }
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
            <TableContainer
              sx={{
                maxHeight: "60vh",
                overflowX: "hidden",
                "&::-webkit-scrollbar": {
                  width: "3px",
                },
              }}
            >
              <Table stickyHeader size="small" sx={{ borderCollapse: "unset" }}>
                <TableHead
                  sx={{
                    th: {
                      "&:not(:last-of-type)": {
                        borderRight: 0,
                      },
                    },
                  }}
                >
                  <TableRow>
                    {dataBisnis.header.map((year, index) => (
                      <TableCell
                        key={index}
                        width="20%"
                        align="center"
                        sx={{
                          bgcolor: "#FAE2D0",
                          border: `1px solid ${alpha(grey[600], 0.5)}`,
                          py: 2,
                          fontSize: 18,
                        }}
                      >
                        {year}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mergedRows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {dataBisnis.header.map((year, colIndex) => (
                        <TableCell
                          key={colIndex}
                          colSpan={
                            row.colspan && row.year === parseInt(year)
                              ? row.colspan
                              : 1
                          }
                          sx={{ p: 0, borderColor: alpha(grey[600], 0.4) }}
                        >
                          <Box
                            sx={{
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.1
                              ),
                              color: theme.palette.grey[900],
                              overflow: "inherit",
                              position: "relative",
                              minHeight:
                                row.colspan && row.year === parseInt(year)
                                  ? "58px"
                                  : 0,
                              display: "flex",
                              alignItems: "center",
                              px:
                                row.colspan && row.year === parseInt(year)
                                  ? 2
                                  : 0,
                              py:
                                row.colspan && row.year === parseInt(year)
                                  ? 1
                                  : 0,

                              "&::after": {
                                content:
                                  row.colspan && row.year === parseInt(year)
                                    ? '""'
                                    : "unset",
                                position: "absolute",
                                zIndex: 1,
                                right: -42,
                                top: "50%",
                                transform: "translateY(-50%) rotate(270deg)",
                                // width: 0,
                                // height: 0,
                                borderLeft: "30px solid transparent",
                                borderRight: "30px solid transparent",
                                borderTop: `24px solid ${alpha(
                                  theme.palette.primary.main,
                                  0.1
                                )}`,
                                filter:
                                  "drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.15))",
                              },
                            }}
                          >
                            {row.year === parseInt(year) ? (
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                                width="100%"
                              >
                                <Stack gap={1}>
                                  {canDelete &&
                                    (row.is_inheritance == false ||
                                      row.is_inheritance == undefined) && (
                                      <IconButton
                                        onClick={() =>
                                          setModalDelete({
                                            isOpen: true,
                                            id: row.ids,
                                          })
                                        }
                                        sx={{
                                          p: 0,
                                          color: "white",
                                          bgcolor: red[600],
                                          width: 20,
                                          height: 20,
                                          transition: "all 500ms",
                                          "&:hover": {
                                            bgcolor: red[900],
                                          },
                                        }}
                                      >
                                        <Iconify name="mdi:delete" size={12} />
                                      </IconButton>
                                    )}
                                  {/* <IconButton
                                    onClick={handleModalEdit}
                                    sx={{
                                      color: "white",
                                      bgcolor: blue[600],
                                      width: 20,
                                      height: 20,
                                      transition: "all 500ms",
                                      "&:hover": {
                                        bgcolor: blue[900],
                                      },
                                    }}
                                  >
                                    <IconFA name="pencil" size={10} />
                                  </IconButton> */}
                                </Stack>
                                <Stack gap={1} width="100%">
                                  <Box width="100%">
                                    <Typography
                                      fontSize={15}
                                      component="span"
                                      mr={1}
                                      color={grey[700]}
                                    >
                                      {row.value}
                                    </Typography>
                                    {row.is_inheritance && (
                                      <Chip
                                        label="RPJMN"
                                        size="small"
                                        sx={{ fontSize: 12 }}
                                      />
                                    )}
                                  </Box>
                                  {/* <Divider />
                                  <Typography fontSize={15} component="span">
                                    {"row.value proses bisnis"}
                                  </Typography> */}
                                </Stack>
                              </Stack>
                            ) : (
                              ""
                            )}
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
      </Box>
    </>
  );
};

const OutputTable = ({
  data,
  setModalDelete,
  setRequest,
  handleModalEdit,
}: {
  data: ExsumRoadmapResDto[];
  setModalDelete: any;
  setRequest: React.Dispatch<React.SetStateAction<ExsumRoadmapDto>>;
  handleModalEdit?: () => void;
}) => {
  const { permission } = useAuthContext((state) => state);
  let pathname = usePathname();
  const canDelete = hasPrivilege(permission, pathname, "delete");

  return (
    <>
      <Box marginBottom={"20px"}>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <Typography
            component="h2"
            fontSize="1em"
            fontWeight={600}
            textAlign="left"
          >
            Expected Output
          </Typography>
          <InfoTooltip
            title={
              <>
                Merumuskan <em>output</em> utama bersifat kuantitatif yang akan
                dilakukan setiap tahun.
              </>
            }
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
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {canDelete && (
                      <IconButton
                        onClick={() =>
                          setModalDelete({ isOpen: true, id: [itemOutput.id] })
                        }
                        sx={{
                          p: 0,
                          color: "white",
                          bgcolor: red[600],

                          width: 20,
                          height: 20,
                          transition: "all 500ms",
                          "&:hover": {
                            bgcolor: red[900],
                          },
                        }}
                      >
                        <Iconify name="mdi:delete" size={12} />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => {
                        setRequest((prev) => {
                          return {
                            ...prev,
                            id: itemOutput.id,
                            exsum_id: itemOutput.exsum_id,
                            year: [itemOutput.year],
                            output: itemOutput.output,
                          };
                        });

                        if (handleModalEdit) {
                          handleModalEdit();
                        }
                      }}
                      // onClick={handleModalEdit}
                      sx={{
                        p: 0,
                        color: "white",
                        bgcolor: blue[800],
                        width: 20,
                        height: 20,
                        transition: "all 500ms",
                        "&:hover": {
                          bgcolor: blue[700],
                        },
                      }}
                    >
                      <Iconify name="mdi:pencil" size={12} />
                    </IconButton>
                  </Stack>
                </CardContent>
                <CardContent>
                  <Box
                    fontSize={15}
                    textAlign={"left"}
                    dangerouslySetInnerHTML={{ __html: itemOutput.output }}
                  />
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Box>
    </>
  );
};

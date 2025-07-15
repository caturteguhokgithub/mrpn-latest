import React from "react";
import {
  Grow,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { dataTema } from "../../dataTema";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";

export default function TableProfilOutput({ project }: { project: string }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tablePaginate = dataTema.find((res: any) => {
    return res.temaId === project;
  });

  return (
    <>
      {dataTema.map((itemRow) => (
        <>
          {project === itemRow.temaId && (
            <>
              {itemRow.profilRincianOutput.length < 1 ? (
                <EmptyState
                  dense
                  icon={<IconEmptyData width={100} />}
                  title="Data Kosong"
                  description="Silahkan isi konten halaman ini"
                />
              ) : (
                <>
                  <TableContainer component={Paper} elevation={0}>
                    <Table sx={{ minWidth: 650 }} size="small">
                      <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
                        <TableRow>
                          <TableCell>
                            <Typography variant="body1" fontWeight={600}>
                              Kode KL
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" fontWeight={600}>
                              KL
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" fontWeight={600}>
                              Kode PKKR
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" fontWeight={600}>
                              RO
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" fontWeight={600}>
                              Target
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" fontWeight={600}>
                              Anggaran
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" fontWeight={600}>
                              Sumber Anggaran
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataTema.map((itemRow) => (
                          <>
                            {project === itemRow.temaId && (
                              <>
                                {itemRow.profilRincianOutput
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((detailProfil, index) => (
                                    <TableRow
                                      key={index}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell>
                                        <Typography variant="body1">
                                          {detailProfil.kodeKL === ""
                                            ? "-"
                                            : detailProfil.kodeKL}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body1">
                                          {detailProfil.kl === ""
                                            ? "-"
                                            : detailProfil.kl}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body1">
                                          {detailProfil.kodePKKR === ""
                                            ? "-"
                                            : detailProfil.kodePKKR}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body1">
                                          {detailProfil.rincianOutput.length >=
                                          60 ? (
                                            <Tooltip
                                              title={detailProfil.rincianOutput}
                                              followCursor
                                              TransitionComponent={Grow}
                                            >
                                              <Typography
                                                variant="body1"
                                                aria-owns={
                                                  open
                                                    ? "mouse-over-popover"
                                                    : undefined
                                                }
                                                aria-haspopup="true"
                                                onMouseEnter={handlePopoverOpen}
                                                onMouseLeave={
                                                  handlePopoverClose
                                                }
                                                sx={{ cursor: "pointer" }}
                                              >
                                                {detailProfil.rincianOutput.substring(
                                                  0,
                                                  60
                                                ) + "..."}
                                              </Typography>
                                            </Tooltip>
                                          ) : (
                                            <Typography variant="body1">
                                              {detailProfil.rincianOutput}
                                            </Typography>
                                          )}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body1">
                                          {detailProfil.target === ""
                                            ? "-"
                                            : detailProfil.target}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body1">
                                          {detailProfil.anggaran === ""
                                            ? "-"
                                            : detailProfil.anggaran}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body1">
                                          {detailProfil.sumber === ""
                                            ? "-"
                                            : detailProfil.sumber}
                                        </Typography>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </>
                            )}
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {(tablePaginate?.profilRincianOutput?.length || 0) > 10 ? (
                    <TablePagination
                      component="div"
                      count={tablePaginate?.profilRincianOutput?.length || 0}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  ) : (
                    ""
                  )}
                </>
              )}
            </>
          )}
        </>
      ))}
    </>
  );
}

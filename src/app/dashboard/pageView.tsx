import ContentPage from "@/components/contents";
import React from "react";
import DashboardLayout from "@/components/layouts/layout";
import { Box, Grid, SelectChangeEvent, Stack, Typography } from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyPage } from "@/components/icons";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";
import { blue } from "@mui/material/colors";
import { IconFA } from "../../components/icons/icon-fa";
import CardGroup from "./partials/card-group";
import ChartEntitas from "./partials/chart-entitas";
import ChartPeringkat from "./partials/chart-peringkat";
import ChartRisiko from "./partials/chart-risiko";
import ChartStatus from "./partials/chart-status";
import ChartTarget from "./partials/chart-target";
import DropdownTopik from "./partials/dropdownTopik";
import TableMatriks from "./partials/table-matriks";
import TablePeristiwa from "./partials/table-peristiwa";

export default function PageDashboardView({
  darkMode,
}: {
  darkMode?: boolean;
}) {
  usePermissionChecker();

  const [project, setProject] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [showElement, setShowElement] = React.useState(true);

  const handleClick = () => {
    setShowElement(!showElement);
  };
  const handleChangeProject = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  const handleChangeTopik = (value: any) => {
    setValue(value);
    setShowElement(!showElement);
  };

  const isEmpty = false;

  const blobAnim = (
    <div className="blobs">
      <div className="blob a">a</div>
      <div className="blob b">b</div>
      <div className="blob c">c</div>
      <div className="blob d">d</div>
      <div className="blob e">e</div>
    </div>
  );

  return (
    <DashboardLayout darkMode={darkMode}>
      {/* <DashboardLayout darkTheme={isEmpty ? false : true}> */}
      <ContentPage
        noMarginBotttom
        withCard={isEmpty ? true : false}
        project={project}
        // handleChangeProject={handleChangeProject}
        darkTheme={isEmpty ? false : true}
      >
        {isEmpty ? (
          <EmptyState
            icon={<IconEmptyPage />}
            title="Halaman Dashboard Kosong"
            description="Silahkan isi konten halaman ini"
          />
        ) : (
          <>
            {blobAnim}
            <Box position="absolute" top={-32} right={0} zIndex={5}>
              {showElement ? (
                <Box
                  bgcolor={blue[500]}
                  borderRadius={50}
                  px={3}
                  py={1}
                  onClick={handleClick}
                  sx={{ cursor: "pointer" }}
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography color="white" sx={{ userSelect: "none" }}>
                      Topik:{" "}
                      <Typography component="span" fontWeight={700}>
                        {value === 1
                          ? "Ketahanan Pangan"
                          : value === 2
                          ? "Stunting"
                          : value === 3
                          ? "Kemiskinan"
                          : value === 4
                          ? "Persampahan"
                          : value === 5
                          ? "Pariwisata"
                          : "Transisi Energi"}
                      </Typography>
                    </Typography>
                    <IconFA name="chevron-down" size={14} color="white" />
                  </Stack>
                </Box>
              ) : (
                <DropdownTopik
                  variant="primary"
                  handleChangeProject={handleChangeTopik}
                />
              )}
            </Box>
            <Grid container sx={{ position: "relative", zIndex: 1 }}>
              <Grid item xs={12}>
                <CardGroup darkMode={darkMode} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ChartPeringkat darkMode={darkMode} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ChartStatus darkMode={darkMode} />
              </Grid>
              <Grid item xs={12} md={4}>
                <ChartRisiko darkMode={darkMode} />
              </Grid>
              <Grid item xs={12} md={4}>
                <ChartEntitas darkMode={darkMode} />
              </Grid>
              <Grid item xs={12} md={4}>
                <ChartTarget darkMode={darkMode} />
              </Grid>
              <Grid item xs={12}>
                <TableMatriks darkMode={darkMode} />
              </Grid>
              <Grid item xs={12}>
                <TablePeristiwa darkMode={darkMode} />
              </Grid>
            </Grid>
          </>
        )}
      </ContentPage>
    </DashboardLayout>
  );
}

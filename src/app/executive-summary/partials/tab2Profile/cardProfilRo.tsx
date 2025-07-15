import React from "react";
import { Box, Button, DialogActions, Tab, Tabs } from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import AddButton from "@/components/buttonAdd";
import DialogComponent from "@/components/dialog";
import FormProfilRo from "./form-profil-ro";
import TableProfilOutput from "./table-profil-output";
import { styleTab } from "../../style";
import theme from "@/theme";
import { SxParams } from "../../types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  project?: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, project, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ display: project === "5" ? "none" : "block" }}
    >
      {value === index && (
        <Box
          sx={{
            p: 0,
            mt: 2,
            //   height: "calc(100vh - 344px)",
            //   height: "calc(100vh - 800px)",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "3px",
            },
            [theme.breakpoints.down("sm")]: {
              //    height: "calc(100vh - 366px)",
            },
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

export default function CardProfilRo({ project }: { project: string }) {
  const [modalOpenProfilRo, setModalOpenProfilRo] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleModalOpenProfilRo = () => {
    setModalOpenProfilRo(true);
  };

  const handleModalClose = () => {
    setModalOpenProfilRo(false);
  };

  const isEmpty = false;

  const sxParams: SxParams = { variant: "default" };

  return (
    <CardItem
      title="Profil Rincian Output"
      addButton={
        <AddButton
          filled
          small
          title="Tambah Profil RO"
          onclick={handleModalOpenProfilRo}
        />
      }
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
          <Tabs value={value} onChange={handleChange} sx={styleTab(sxParams)}>
            <Tab label="RPJMN" {...a11yProps(0)} />
            <Tab label="RKP" {...a11yProps(1)} />
            <Tab label="Renja KL" {...a11yProps(2)} />
            <Tab label="DAK" {...a11yProps(3)} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            {isEmpty ? (
              <EmptyState
                dense
                icon={<IconEmptyData width={100} />}
                title="Data Kosong"
                description="Silahkan isi konten halaman ini"
              />
            ) : (
              <>
                <TableProfilOutput project={project} />
              </>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {isEmpty ? (
              <EmptyState
                dense
                icon={<IconEmptyData width={100} />}
                title="Data Kosong"
                description="Silahkan isi konten halaman ini"
              />
            ) : (
              <>
                <TableProfilOutput project={project} />
              </>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {isEmpty ? (
              <EmptyState
                dense
                icon={<IconEmptyData width={100} />}
                title="Data Kosong"
                description="Silahkan isi konten halaman ini"
              />
            ) : (
              <>
                <TableProfilOutput project={project} />
              </>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            {isEmpty ? (
              <EmptyState
                dense
                icon={<IconEmptyData width={100} />}
                title="Data Kosong"
                description="Silahkan isi konten halaman ini"
              />
            ) : (
              <>
                <TableProfilOutput project={project} />
              </>
            )}
          </CustomTabPanel>

          <DialogComponent
            dialogOpen={modalOpenProfilRo}
            dialogClose={handleModalClose}
            title="Tambah Profil RO"
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
            <FormProfilRo mode="add" />
          </DialogComponent>
        </>
      )}
    </CardItem>
  );
}

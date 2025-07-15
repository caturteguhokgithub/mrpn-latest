import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import theme from "@/theme";
import { IconFA } from "@/components/icons/icon-fa";
import { styleTab } from "@/app/executive-summary/style";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardKategori from "./tab1Category/cardKategori";
import CardKemungkinan from "./tab2Possibility/cardKemungkinan";
import CardDampak from "./tab3Impact/cardDampak";
import CardMatriks from "./tab4Matriks/cardMatriks";
import CardSelera from "./tab4Selera/cardSelera";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  project?: string;
}

interface SxParams {
  variant?: string;
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
            height: "calc(100vh - 332px)",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "3px",
            },
            [theme.breakpoints.down("sm")]: {
              height: "calc(100vh - 366px)",
            },
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

export default function TabCriteria({}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const isEmpty = false;
  const sxParams: SxParams = { variant: "default" };

  return (
    <Box width="100%">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} sx={styleTab(sxParams)}>
          <Tab
            label="Kategori Risiko"
            {...a11yProps(0)}
            iconPosition="start"
            icon={<IconFA size={16} name="gauge-high" />}
          />
          <Tab
            label="Kriteria Kemungkinan"
            {...a11yProps(1)}
            iconPosition="start"
            icon={<IconFA size={16} name="maximize" />}
          />
          <Tab
            label="Kriteria Dampak"
            {...a11yProps(2)}
            iconPosition="start"
            icon={<IconFA size={16} name="minimize" />}
          />
          <Tab
            label="Selera Risiko"
            {...a11yProps(3)}
            iconPosition="start"
            icon={<IconFA size={16} name="flask-vial" sx={{ width: 20 }} />}
          />
          {/* <Tab
            label="Matriks Analisis Risiko"
            {...a11yProps(4)}
            iconPosition="start"
            icon={<IconFA size={16} name="arrow-up-right-dots" />}
          /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {isEmpty ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Data Kosong"
            description="Silahkan isi konten halaman ini"
          />
        ) : (
          <CardKategori />
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
          <CardKemungkinan />
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
          <CardDampak />
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
          <CardSelera />
        )}
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={4}>
        {isEmpty ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Data Kosong"
            description="Silahkan isi konten halaman ini"
          />
        ) : (
          <CardMatriks />
        )}
      </CustomTabPanel> */}
    </Box>
  );
}

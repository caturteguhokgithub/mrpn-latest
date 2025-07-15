import React from "react";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import theme from "@/theme";
import { IconFA } from "@/components/icons/icon-fa";
import { styleTab } from "@/app/executive-summary/style";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardRegulation from "../../konteks-strategis/cardRegulasi/cardRegulation";
// import CardStakeholderInternal from "../../konteks-strategis/cardStakeholders/cardStakeholderInternal";
// import CardStakeholderEksternal from "../../konteks-strategis/cardStakeholders/cardStakeholderEksternal";
import CardCritical from "@/app/executive-summary/partials/tab6Critical/cardCritical";
import CardStakeholder from "@/app/executive-summary/partials/tab7Regulation/cardStakeholder/cardStakeholder";

import CardUrgent from "@/app/executive-summary/partials/tab1Background/cardUrgent/cardUrgent";
import CardSegment from "@/app/executive-summary/partials/tab1Background/cardSegment/cardSegment";
import CardSwot from "@/app/executive-summary/partials/tab1Background/cardSwot/cardSwot";
import CardInformation from "../cardInformation/cardInformation";
import CriticalPathIntEks from "./critical-path";
// import CardKategori from "./tab1Category/cardKategori";
// import CardKemungkinan from "./tab2Possibility/cardKemungkinan";
// import CardDampak from "./tab3Impact/cardDampak";
// import CardMatriks from "./tab4Matriks/cardMatriks";

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

export default function TabInternalEksternal({}) {
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
            label="Latar Belakang"
            {...a11yProps(0)}
            iconPosition="start"
            icon={<IconFA size={16} name="pen-to-square" />}
          />
          <Tab
            label="Regulasi"
            {...a11yProps(1)}
            iconPosition="start"
            icon={<IconFA size={16} name="gavel" />}
          />
          <Tab
            label="Stakeholder"
            {...a11yProps(2)}
            iconPosition="start"
            icon={<IconFA size={16} name="building" />}
          />
          <Tab
            // label="Perencanaan Lintasan Kritis"
            label="Critical Path"
            {...a11yProps(3)}
            iconPosition="start"
            icon={<IconFA size={16} name="exclamation-triangle" />}
          />
          <Tab
            label="Informasi Lain"
            {...a11yProps(4)}
            iconPosition="start"
            icon={<IconFA size={16} name="ellipsis" />}
          />
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
          <Stack gap={1}>
            <CardUrgent activeSetting penetapan />
            <CardSegment activeSetting penetapan />
            {/* <CardSwot activeSetting penetapan /> */}
          </Stack>
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
          <Stack gap={1}>
            <CardRegulation penetapan />
          </Stack>
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
          <Stack gap={1}>
            <CardStakeholder title="Stakeholder Mapping" isIntExtPage />
          </Stack>
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
          <CriticalPathIntEks title="Critical Path" />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        {isEmpty ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Data Kosong"
            description="Silahkan isi konten halaman ini"
          />
        ) : (
          <CardInformation activeSetting />
        )}
      </CustomTabPanel>
    </Box>
  );
}

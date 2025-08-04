import React, { Fragment, useEffect } from "react";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import theme from "@/theme";
import { IconFA } from "@/components/icons/icon-fa";
import { styleTab } from "@/app/executive-summary/style";
import CardItem from "@/components/cardTabItem";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import TableShortlist from "./table-short";
import TableLonglistStepper from "./table-long-stepper";
import TableNotaDinas from "./table-nota-dinas";
import { SxParams } from "@/app/executive-summary/types";
import AddButton from "@/components/buttonAdd";
import TableNotaDinasViewOnly from "@/app/approval/nota-dinas/partials/table-nota-dinas-view-only";
import {
  usePenetapanTopicContext,
  useRKPContext,
} from "@/lib/core/hooks/useHooks";
import CollapsibleTableUpr from "./table-upr";
import { dtoUraian } from "../pageModel";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  project?: string;
  gambar?: any;
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
            ".orgchart-container": {
              maxHeight: "calc(100vh - 510px) !important",
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

export default function TabObject({
  setModalUpr,
  useEffectObjectState,
  getRanking,
  updateOrCreateLongList,
  showSave,
  setShowSave,
  stateUpr,
  handleUploadBuktiDukung,
  stateApproval,
  setModalObjek,
  handleModalDeleteObject,
  handleModalEditEntitas,
  handleModalDeleteEntitas,
  refreshBuktiDukungTable,
  gambar,
  modalDelete,
  setModalDelete,
  deleteNodin,
  modalConfirm,
  setModalConfirm,
  isReview,
  // setIsReview,
  modalReject,
  setModalReject,
  isReject,
  // setIsReject,
  modalApproval,
  setModalApproval,
  isApproval,
}: // setIsApproval,
{
  setModalUpr: (value: boolean) => void;
  useEffectObjectState: () => void;
  getRanking: () => Promise<void>;
  updateOrCreateLongList: any;
  showSave: boolean;
  setShowSave: (value: boolean) => void;
  stateUpr: dtoUraian[];
  handleUploadBuktiDukung?: () => void;
  stateApproval: any;
  setModalObjek: (value: boolean) => void;
  handleModalDeleteObject: (id: number) => void;
  handleModalEditEntitas?: () => void;
  handleModalDeleteEntitas: (id: number) => void;
  refreshBuktiDukungTable?: () => void;
  gambar?: any;
  modalDelete?: any;
  setModalDelete?: any;
  deleteNodin?: any;
  // APPROVAL
  modalConfirm?: any;
  setModalConfirm?: any;
  isReview?: any;
  // setIsReview?: any;
  modalReject?: any;
  setModalReject?: any;
  isReject?: any;
  // setIsReject?: any;
  modalApproval?: any;
  setModalApproval?: any;
  isApproval?: any;
  // setIsApproval?: any;
}) {
  const { nota } = usePenetapanTopicContext((store) => store);
  const { rkp, year, rpjmn } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState } = usePenetapanTopicContext(
    (state) => state
  );

  useEffect(useEffectObjectState, [year, objectState]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleRanking = async () => {
    getRanking();
  };

  const handleOpenShortlist = async () => {
    const updateData = await updateOrCreateLongList();
    if (updateData) {
      setValue(1);
    }
  };

  const isEmpty = false;

  const sxParams: SxParams = { variant: "default" };

  const [editNotaDinas, setEditNotaDinas] = React.useState<boolean>(false);

  return (
    <Box width="100%">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} sx={styleTab(sxParams)}>
          <Tab
            // label="Longlist"
            label="Shortlist"
            {...a11yProps(0)}
            iconPosition="start"
            // icon={
            //   <IconFA
            //     size={16}
            //     name="arrow-down-short-wide"
            //     sx={{ width: "auto" }}
            //   />
            // }
            icon={<IconFA size={16} name="arrow-down-wide-short" />}
          />
          <Tab
            // label="Shortlist"
            label="Objek MRPN LS"
            {...a11yProps(1)}
            iconPosition="start"
            // icon={<IconFA size={16} name="arrow-down-wide-short" />}
            icon={<IconFA size={16} name="bullseye" />}
          />
          {/* <Tab
            label="Cascading Objek Terpilih"
            {...a11yProps(2)}
            iconPosition="start"
            icon={<IconFA size={16} name="list-check" />}
          /> */}
          <Tab
            // label="Usulan UPR LS"
            label="UPR LS"
            {...a11yProps(2)}
            iconPosition="start"
            icon={<IconFA size={16} name="scroll" />}
          />
          <Tab
            // label="Pengesahan"
            label="Penetapan"
            {...a11yProps(3)}
            iconPosition="start"
            icon={<IconFA size={16} name="newspaper" sx={{ width: "auto" }} />}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CardItem title="Shortlist">
          {isEmpty ? (
            <EmptyState
              dense
              icon={<IconEmptyData width={100} />}
              title="Data Kosong"
              description="Silahkan isi konten halaman ini"
            />
          ) : (
            <TableLonglistStepper
              handleOpenShortlist={handleOpenShortlist}
              handleRanking={() => handleRanking()}
              stateApproval={stateApproval}
            />
          )}
        </CardItem>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CardItem title="Objek MRPN LS">
          {isEmpty ? (
            <EmptyState
              dense
              icon={<IconEmptyData width={100} />}
              title="Data Kosong"
              description="Silahkan isi konten halaman ini"
            />
          ) : (
            <TableShortlist />
          )}
        </CardItem>
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        <CardItem title="Cascading Objek Terpilih">
          {isEmpty ? (
            <EmptyState
              dense
              icon={<IconEmptyData width={100} />}
              title="Data Kosong"
              description="Silahkan isi konten halaman ini"
            />
          ) : (
            <CascadingPenetapanObjectOrgChart />
          )}
        </CardItem>
      </CustomTabPanel> */}
      <CustomTabPanel value={value} index={2}>
        <CardItem
          title="UPR LS"
          addButton={
            <Stack direction="row" gap={1}>
              {!["approved", "review"].includes(stateApproval?.status) && (
                <AddButton
                  title="Tambah UPR"
                  filled
                  noMargin
                  onclick={() => setModalUpr(true)}
                />
              )}
            </Stack>
          }
        >
          {isEmpty ? (
            <EmptyState
              dense
              icon={<IconEmptyData width={100} />}
              title="Data Kosong"
              description="Silahkan isi konten halaman ini"
            />
          ) : (
            <Fragment>
              <CollapsibleTableUpr
                useEffectObjectState={useEffectObjectState}
                showSave={showSave}
                stateUpr={stateUpr}
                setModalObjek={setModalObjek}
                handleModalDeleteObject={handleModalDeleteObject}
                handleModalEditEntitas={handleModalEditEntitas}
                handleModalDeleteEntitas={handleModalDeleteEntitas}
                stateApproval={stateApproval}
              />
            </Fragment>
          )}
        </CardItem>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <CardItem
          // title="Nota Dinas Objek MRPN & UPR LS"
          title="Penetapan"
          // addButton={
          //   !editNotaDinas && (
          //     <AddButton
          //       title={`Ubah`}
          //       filled
          //       startIcon={<IconFA size={14} name="pencil" />}
          //       onclick={() => setEditNotaDinas(true)}
          //     />
          //   )
          // }
        >
          {/* {isDeveloping ? (
            <EmptyDevelopingState />
          ) : ( */}
          <Fragment>
            {isEmpty ? (
              <EmptyState
                dense
                icon={<IconEmptyData width={100} />}
                title="Data Kosong"
                description="Silahkan isi konten halaman ini"
              />
            ) : editNotaDinas ? (
              <TableNotaDinas edit={editNotaDinas} setEdit={setEditNotaDinas} />
            ) : nota ? (
              <TableNotaDinasViewOnly
                notaDinas={nota}
                stateApproval={stateApproval}
                handleUploadBuktiDukung={handleUploadBuktiDukung}
                refreshBuktiDukungTable={refreshBuktiDukungTable}
                imageProps={gambar}
                modalDelete={modalDelete}
                setModalDelete={setModalDelete}
                deleteNodin={deleteNodin}
                // APPROVAL
                modalConfirm={modalConfirm}
                setModalConfirm={setModalConfirm}
                isReview={isReview}
                // setIsReview={}
                modalReject={modalReject}
                setModalReject={setModalReject}
                isReject={isReject}
                // setIsReject={}
                modalApproval={modalApproval}
                setModalApproval={setModalApproval}
                isApproval={isApproval}
                // setIsApproval={}
              />
            ) : (
              <EmptyState
                dense
                icon={<IconEmptyData width={100} />}
                title="Data Kosong"
                description=""
              />
            )}
          </Fragment>
          {/* )} */}
        </CardItem>
      </CustomTabPanel>
    </Box>
  );
}

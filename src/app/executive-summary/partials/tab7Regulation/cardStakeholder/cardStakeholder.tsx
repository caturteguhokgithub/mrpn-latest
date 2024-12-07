import React from "react";
import {Box, Button, DialogActions, Grid, Icon, Stack, Typography} from "@mui/material";
import EmptyState from "@/app/components/empty";
import {IconEmptyData} from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import FormStakeholder from "./form-stakeholder";
import StakeholderChart from "@/components/cardStakeholder/stakeholder-chart";
import useCardStakeholderVM from "@/app/executive-summary/partials/tab7Regulation/cardStakeholder/cardStakeholderVM";
import AddButton from "@/components/buttonAdd";
import FormListLogo from "@/app/executive-summary/partials/tab7Regulation/cardStakeholder/form-logo";
import {UpdateLogoStakeholderDto} from "@/app/misc/master/masterServiceModel";
import Image from "next/image";
import {IconFA} from "@/components/icons/icon-fa";
import {VisuallyHiddenInput} from "@/utils/constant";
import {useAuthContext} from "@/lib/core/hooks/useHooks";
import {usePathname} from "next/navigation";
import {hasPrivilege} from "@/lib/core/helpers/authHelpers";

export default function CardStakeholder({project}: { project: string }) {
  const {
    data,
    listStakeholder,
    modalOpenStakeholder,
    setModalOpenStakeholder,
    request,
    updateData,
    handleSelectStakeholder,
    handleChangeDescription,
    logoState,
    setLogoState,
    updateLogo,
    modalListLogo,
    setModalListLogo,
    modalLogo,
    setModalLogo
  } = useCardStakeholderVM();

  const handleModalOpenStakeholder = () => {
    setModalOpenStakeholder(true);
  };

  const handleModalClose = () => {
    setModalOpenStakeholder(false);
  };

  const handleModalLogo = (idStakeholder: number) => {
    const stakeholderSelected = listStakeholder.find(x => x.id == idStakeholder)
    const x: UpdateLogoStakeholderDto = {
      id: stakeholderSelected?.id ?? 0,
      value: stakeholderSelected?.value ?? "",
      iconPath: stakeholderSelected?.icon ?? "",
      icon: ""
    }
    console.log(x)
    setLogoState(x)
    setModalLogo(true)
  }

  const handleLogoChange = async (e: any) => {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const res = reader.result as string;
        setLogoState(prevState => {
          return {
            ...prevState,
            icon:res
          }
        })
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };

  const { permission } = useAuthContext((state) => state);
  let pathname = usePathname();

  return (
    <CardItem
      title="Instansi Pelaksana"
      setting
      settingEditOnclick={handleModalOpenStakeholder}
    >
      {data.length == 0 ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100}/>}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <>
          {(hasPrivilege(permission, pathname, "add") || hasPrivilege(permission, pathname, "update")) &&
            <Box>
              <AddButton
                filled
                small
                title="Edit Logo"
                startIcon={<Icon
                  baseClassName="fas"
                  className={"fa-edit"}
                  sx={{
                    fontSize: "16px !important",
                  }}
                />}
                onclick={() => setModalListLogo(true)}
              />
            </Box>
          }
          <StakeholderChart data={data}/>
        </>
      )}

      <DialogComponent
        dialogOpen={modalOpenStakeholder}
        dialogClose={handleModalClose}
        title="Ubah Instansi Pelaksana"
        dialogFooter={
          <DialogActions sx={{p: 2, px: 3}}>
            <Button variant="outlined" onClick={handleModalClose}>
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
        <Grid container spacing={2}>
          {request.values.map((req, index) => (
            <FormStakeholder
              key={index}
              title={req.label}
              listStakeholder={listStakeholder}
              selectedStakeholder={req.stakeholder}
              setSelectedStakeholder={(items: number[]) =>
                handleSelectStakeholder(items, req.type)
              }
            />
          ))}
        </Grid>
      </DialogComponent>

      <DialogComponent
        dialogOpen={modalListLogo}
        dialogClose={() => setModalListLogo(false)}
        title="Ubah Logo"
        dialogFooter={
          <DialogActions sx={{p: 2, px: 3}}>
            <Button
              variant="contained"
              type="submit"
              onClick={() => setModalListLogo(false)}
            >
              Tutup
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={2}>
          <FormListLogo data={data} setModalLogo={handleModalLogo}/>
        </Grid>
      </DialogComponent>

      <DialogComponent
        width={400}
        dialogOpen={modalLogo}
        dialogClose={() => setModalLogo(false)}
        title="Upload Logo"
        dialogFooter={
          <DialogActions sx={{p: 2, px: 3}}>
            <Button variant="outlined" onClick={() => setModalLogo(false)}>
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => updateLogo()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <Stack gap={1} borderBottom={1} paddingBottom={3}>
          <Typography textAlign={"center"}>{logoState?.value ?? "-"}</Typography>
          <Stack justifyContent={"center"} flexDirection={"row"} marginTop={2}>
            <Box border={0.5} borderRadius={3} height={140} width={140} textAlign={"center"} sx={{verticalAlign:"center"}}>
              <Image
                alt={logoState?.value ?? ""}
                src={logoState.icon == "" ? process.env.NEXT_PUBLIC_BASE_URL_FILES +logoState.iconPath : ""}
                width={0}
                height={0}
                style={{width: "auto", height: "120px"}}
              />
            </Box>
          </Stack>
          <Stack justifyContent={"center"} flexDirection={"row"} marginTop={2}>
            <Button
              size="small"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<IconFA name="upload" size={14} />}
              sx={{
                textTransform: "capitalize",
                px: 2,
                height: 36,
              }}
            >
              {logoState?.icon == ""
                ? "Pilih logo"
                : "Pilih ulang"}
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleLogoChange(e)}
              />
            </Button>
          </Stack>
        </Stack>
      </DialogComponent>

    </CardItem>
  );
}

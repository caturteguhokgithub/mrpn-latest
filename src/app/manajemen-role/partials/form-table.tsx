import React, { SetStateAction } from "react";
import {
  FormControl,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { blue, green, grey, orange, red, yellow } from "@mui/material/colors";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import {
  ManagementRoleDto,
  PermissionRoleDto,
  MenuConfigDto,
} from "@/app/manajemen-role/pageModel";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import theme from "@/theme";
import Paper from "@mui/material/Paper";

function getIsChecked(statePermission: number[], id: number) {
  return statePermission.includes(id);
}

function GenerateCheckbox(props: {
  prm: PermissionRoleDto;
  label: string;
  stateRolePermission: number[];
  setStateRolePermission: (value: SetStateAction<number[]>) => void;
}) {
  return (
    <FormControlLabel
      key={props.prm.id}
      // key={`${props.label}-${props.prm.id}`}
      value="start"
      control={
        <Checkbox
          color="success"
          checked={getIsChecked(props.stateRolePermission, props.prm.id)}
          onChange={() => {
            if (getIsChecked(props.stateRolePermission, props.prm.id)) {
              props.setStateRolePermission((prevState) => {
                const prev = [...prevState];
                const getIndex = prev.findIndex((x) => x === props.prm.id);
                if (getIndex > -1) prev.splice(getIndex, 1);
                return prev;
              });
            } else {
              props.setStateRolePermission((prevState) => {
                const prev = [...prevState];
                prev.push(props.prm.id);
                return prev;
              });
            }
          }}
          // sx={{
          //   "&.Mui-checked": {
          //     svg: {
          //       fill:
          //         props.prm.id == 1
          //           ? green[700]
          //           : props.prm.id == 2
          //           ? yellow[700]
          //           : props.prm.id == 3
          //           ? blue[700]
          //           : props.prm.id == 4
          //           ? orange[700]
          //           : red[700],
          //     },
          //   },
          // }}
        />
      }
      label={props.label}
      sx={{
        gap: 1,
        m: 0,
        span: {
          p: 0,
          fontSize: "12px",
        },
      }}
    />
  );
}

export default function FormTable({
  menu,
  roleName,
  setRoleName,
  stateRolePermission,
  setStateRolePermission,
}: {
  menu: MenuConfigDto[];
  roleName: string;
  setRoleName: (value: SetStateAction<string>) => void;
  stateRolePermission: number[];
  setStateRolePermission: any;
}) {
  const getLabel = (str: string) => {
    const splitStr = str.split(".");
    const strFinal =
      splitStr[splitStr.length - 1] == "list"
        ? "read"
        : splitStr[splitStr.length - 1];
    return strFinal.charAt(0).toUpperCase() + strFinal.slice(1);
  };

  const usetheme = useTheme();
  const breakpointDownMd = useMediaQuery(usetheme.breakpoints.down("md"));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Nama Role" />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Nama Role"
            InputLabelProps={{
              shrink: true,
            }}
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </FormControl>
      </Grid>
      {menu.map((mn, indexMn) => (
        <Grid item xs={12} key={indexMn}>
          <Paper
            elevation={mn.submenu.length > 0 ? 2 : 0}
            sx={{
              p: 2,
              borderRadius: "6px",
              border: "1px solid",
              borderColor: grey[300],
            }}
          >
            <Stack gap="10px">
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    fontWeight={700}
                    lineHeight={1}
                    textTransform="capitalize"
                  >
                    {mn.name}
                  </Typography>
                  <Typography variant="caption" color={grey[600]}>
                    Atur izin akses halaman{" "}
                    <Box component="span" textTransform="lowercase">
                      {mn.name}
                    </Box>
                  </Typography>
                </Box>
              </Stack>
              {mn.permission.length > 0 && (
                <Stack gap="10px">
                  <Stack
                    bgcolor={theme.palette.primary.light}
                    direction="row"
                    px="16px"
                    py="8px"
                    borderRadius="4px"
                    gap={2}
                    flexWrap={breakpointDownMd ? "wrap" : "unset"}
                  >
                    {mn.permission.map((prm, indexPrm) => (
                      <GenerateCheckbox
                        key={indexPrm}
                        prm={prm}
                        label={getLabel(prm.name)}
                        stateRolePermission={stateRolePermission}
                        setStateRolePermission={setStateRolePermission}
                      />
                    ))}
                  </Stack>
                </Stack>
              )}
              {mn.submenu.length > 0 &&
                mn.submenu.map((subMenu, indexSubMenu) => (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: "6px",
                      border: "1px solid",
                      borderColor: grey[300],
                    }}
                  >
                    <Stack gap="10px">
                      <Stack
                        direction="row"
                        alignItems="flex-start"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography
                            fontWeight={700}
                            lineHeight={1}
                            textTransform="capitalize"
                          >
                            {subMenu.name}
                          </Typography>
                          <Typography variant="caption" color={grey[600]}>
                            Atur izin akses halaman{" "}
                            <Box component="span" textTransform="lowercase">
                              {subMenu.name}
                            </Box>
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                    {subMenu.permission.length > 0 && (
                      <Stack gap="10px">
                        <Stack
                          bgcolor={theme.palette.primary.light}
                          direction="row"
                          px="16px"
                          py="8px"
                          borderRadius="4px"
                          gap={2}
                          flexWrap={breakpointDownMd ? "wrap" : "unset"}
                        >
                          {subMenu.permission.map((subprm, indexsubPrm) => (
                            <GenerateCheckbox
                              key={indexsubPrm}
                              prm={subprm}
                              label={getLabel(subprm.name)}
                              stateRolePermission={stateRolePermission}
                              setStateRolePermission={setStateRolePermission}
                            />
                          ))}
                        </Stack>
                      </Stack>
                    )}
                  </Paper>
                ))}
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

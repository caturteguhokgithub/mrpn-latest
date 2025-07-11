"use client";

import React from "react";
import {
  Box,
  Chip,
  FormControl,
  Grow,
  MenuItem,
  Paper,
  SelectChangeEvent,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import SelectCustomTheme from "../select";
import DropdownRkp from "@/components/dropdown/dropdownRkp";
import { grey } from "@mui/material/colors";
import { listTriwulan } from "@/app/utils/data";
import DateRangePicker from "@/components/dateRange";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { InfoTooltip } from "../InfoTooltip";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";

export default function ContentPage({
  title,
  children,
  withCard,
  chooseKonteks,
  chooseProject,
  chooseRo,
  chooseObject,
  chipRo,
  chooseProjectPage,
  titleChild,
  breadcrumb,
  noPadding,
  heightTitleBreadcrumb,
  overflowHidden,
  addButton,
  project,
  dowloadAttachmentFile,
  triWulan,
  hasAlert,
  chipKp,
  sxCard,
  dateRangeDropdown,
  noMinusMargin,
  sxHeaderCard,
  heightNoSet,
  selectedTopic,
  identificationInfo,
  tabStep,
  noMarginBotttom,
  tabArrow,
  darkTheme,
  ref,
  infoToolTip,
}: {
  children: React.ReactNode;
  title?: string;
  withCard?: boolean;
  noPadding?: boolean;
  chooseProject?: React.ReactNode;
  chooseProjectPage?: React.ReactNode;
  chooseKonteks?: boolean;
  chooseRo?: boolean;
  chooseObject?: React.ReactNode;
  chipRo?: boolean;
  heightTitleBreadcrumb?: boolean;
  titleChild?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  overflowHidden?: boolean;
  addButton?: React.ReactNode;
  project?: any;
  dowloadAttachmentFile?: React.ReactNode;
  triWulan?: boolean;
  hasAlert?: React.ReactNode;
  chipKp?: boolean;
  sxCard?: React.CSSProperties;
  dateRangeDropdown?: boolean;
  noMinusMargin?: boolean;
  sxHeaderCard?: React.CSSProperties;
  heightNoSet?: boolean;
  selectedTopic?: React.ReactNode | boolean;
  identificationInfo?: React.ReactNode;
  tabStep?: React.ReactNode;
  noMarginBotttom?: boolean;
  tabArrow?: React.ReactNode;
  darkTheme?: boolean;
  ref?: any;
  infoToolTip?: React.ReactNode;
}) {
  const [konteks, setKonteks] = React.useState("");
  const [roDropdown, setRoDropdown] = React.useState("");
  const [triwulanDropdown, setTriwulanDropdown] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const { objectState } = usePenetapanGlobalVM();

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleChangeKonteks = (event: SelectChangeEvent) => {
    setKonteks(event.target.value);
  };
  const handleChangeRo = (event: SelectChangeEvent) => {
    setRoDropdown(event.target.value);
  };
  const handleChangeTriwulan = (event: SelectChangeEvent) => {
    setTriwulanDropdown(event.target.value);
  };

  const konteksLabel =
    "Penguatan Kebijakan Perlindungan Akses Pasar Dalam Negeri";

  const listRo = [
    "Pemantauan tumbuh kembang balita",
    "Peningkatan sanitasi",
    "Peningkatan ketersediaan pangan keluarga 1000 HPK",
  ];

  const labelChipRo = "Peningkatan ketersediaan pangan keluarga 1000 HPK";

  const items: any =
    typeof window !== "undefined"
      ? (() => {
          const selectedRKP = window?.localStorage?.getItem("selectedRKP");
          return selectedRKP ? JSON.parse(selectedRKP) : null;
        })()
      : null;

  const currentDate = new Date();

  const minDate = new Date();
  const maxDate = new Date();

  minDate.setFullYear(currentDate.getFullYear() - 10);
  maxDate.setFullYear(currentDate.getFullYear() + 20);

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 600,
      //  fontSize: theme.typography.pxToRem(20),
      fontSize: "14px !important",
      border: "1px solid #dadde9",
      boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    },
  }));

  return (
    <Box position="relative">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={noMarginBotttom ? 0 : "1.25rem"}
        // mt={flagPathnameTheme ? "-180px" : 0}
        sx={{
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            flexWrap: "wrap",
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
          width="100%"
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "flex-start",
              },
              ...sxHeaderCard,
            }}
          >
            {title && (
              <Stack direction="column">
                {breadcrumb}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  {title && (
                    <Typography
                      component="h2"
                      fontWeight="600"
                      fontSize="1.25rem"
                      textTransform="capitalize"
                    >
                      {title}
                    </Typography>
                  )}
                  {infoToolTip && <InfoTooltip title={infoToolTip} />}
                </Stack>
              </Stack>
            )}
            {titleChild}
            {chipKp && (
              <Chip
                color="primary"
                variant="outlined"
                label={
                  <>
                    <Stack direction="row" alignItems="center">
                      <Stack
                        direction="row"
                        bgcolor={theme.palette.primary.main}
                        px={2}
                        alignItems="center"
                        height="34px"
                        sx={{
                          borderTopLeftRadius: 24,
                          borderBottomLeftRadius: 24,
                        }}
                      >
                        <Typography
                          fontSize={13}
                          color="white"
                          fontWeight={600}
                          lineHeight={1}
                        >
                          KP
                        </Typography>
                      </Stack>
                      <Box
                        sx={{
                          [theme.breakpoints.up("sm")]: {
                            display: "block",
                          },
                          [theme.breakpoints.down("sm")]: {
                            display: "none",
                          },
                        }}
                      >
                        {/* {objectState &&
                        objectState.rkp &&
                        objectState.rkp.value &&
                        objectState.rkp.value.length >= 35 ? ( */}
                        {items && items.value.length >= 35 ? (
                          <Tooltip
                            title={objectState?.rkp.value}
                            followCursor
                            TransitionComponent={Grow}
                          >
                            <Typography
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onMouseEnter={handlePopoverOpen}
                              onMouseLeave={handlePopoverClose}
                              px={1.5}
                              fontSize={13}
                              fontWeight={600}
                            >
                              {/* {objectState?.rkp.code +
                                " - " +
                                objectState?.rkp.value.substring(0, 35) +
                                "..."} */}
                              {items?.code +
                                " - " +
                                items?.value.substring(0, 35) +
                                "..."}
                            </Typography>
                          </Tooltip>
                        ) : (
                          <Typography px={1.5} fontSize={13} fontWeight={600}>
                            {/* {`${objectState?.rkp.code} - ${objectState?.rkp.value}`} */}
                            {`${items?.code} - ${items?.value}`}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </>
                }
                sx={{
                  height: "34px",
                  bgcolor: "white",
                  fontWeight: 600,
                  lineHeight: 1,
                  cursor: "default",

                  ".MuiChip-label": {
                    px: 0,
                  },
                }}
              />
            )}
            {selectedTopic}
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          {tabArrow}
          {chooseProjectPage}
          {dowloadAttachmentFile}
          {chooseProject && <DropdownRkp />}
          {chooseObject && chooseObject}
          {chooseRo && (
            <FormControl size="small">
              <SelectCustomTheme
                rounded
                small
                anchorRight
                value={roDropdown}
                onChange={handleChangeRo}
              >
                <MenuItem value="" disabled>
                  <Typography
                    fontSize={14}
                    fontStyle="italic"
                    color={grey[600]}
                    fontWeight={600}
                  >
                    Pilih rincian output
                  </Typography>
                </MenuItem>
                {listRo.map((roLabel, index) => (
                  <MenuItem key={index} value={roLabel}>
                    {roLabel.length >= 35 ? (
                      <Tooltip
                        title={roLabel}
                        followCursor
                        TransitionComponent={Grow}
                      >
                        <Typography
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onMouseEnter={handlePopoverOpen}
                          onMouseLeave={handlePopoverClose}
                          sx={{ fontSize: 14 }}
                        >
                          {roLabel.substring(0, 35) + "..."}
                        </Typography>
                      </Tooltip>
                    ) : (
                      roLabel
                    )}
                  </MenuItem>
                ))}
              </SelectCustomTheme>
            </FormControl>
          )}
          {chipRo && (
            <Chip
              color="primary"
              variant="outlined"
              label={
                labelChipRo.length >= 40 ? (
                  <>
                    <Stack direction="row" alignItems="center">
                      <Stack
                        direction="row"
                        bgcolor={theme.palette.primary.main}
                        px={2}
                        alignItems="center"
                        height="34px"
                        sx={{
                          borderTopLeftRadius: 24,
                          borderBottomLeftRadius: 24,
                        }}
                      >
                        <Typography
                          fontSize={14}
                          color="white"
                          fontWeight={600}
                          lineHeight={1}
                        >
                          Rincian Output
                        </Typography>
                      </Stack>
                      <Tooltip
                        title={labelChipRo}
                        followCursor
                        TransitionComponent={Grow}
                      >
                        <Typography
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onMouseEnter={handlePopoverOpen}
                          onMouseLeave={handlePopoverClose}
                          px={1.5}
                          fontSize={14}
                          fontWeight={600}
                        >
                          {labelChipRo.substring(0, 40) + "..."}
                        </Typography>
                      </Tooltip>
                    </Stack>
                  </>
                ) : (
                  labelChipRo
                )
              }
              sx={{
                height: "34px",
                bgcolor: "white",
                fontWeight: 600,
                lineHeight: 1,
                cursor: "default",

                ".MuiChip-label": {
                  px: 0,
                },
              }}
            />
          )}
          {chooseKonteks && (
            <FormControl size="small">
              <SelectCustomTheme
                rounded
                small
                anchorRight
                value={konteks}
                onChange={handleChangeKonteks}
              >
                <MenuItem value="" disabled>
                  <Typography
                    fontSize={14}
                    fontStyle="italic"
                    color={grey[600]}
                    fontWeight={600}
                  >
                    Pilih konteks strategis
                  </Typography>
                </MenuItem>
                <MenuItem value="1" defaultChecked>
                  {konteksLabel.length >= 35 ? (
                    <Tooltip
                      title={konteksLabel}
                      followCursor
                      TransitionComponent={Grow}
                    >
                      <Typography
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        sx={{ fontSize: 14 }}
                      >
                        {konteksLabel.substring(0, 35) + "..."}
                      </Typography>
                    </Tooltip>
                  ) : (
                    konteksLabel
                  )}
                </MenuItem>
              </SelectCustomTheme>
            </FormControl>
          )}
          {triWulan && (
            <FormControl size="small">
              <SelectCustomTheme
                rounded
                small
                anchorRight
                value={triwulanDropdown}
                onChange={handleChangeTriwulan}
              >
                <MenuItem value="" disabled>
                  <Typography
                    fontSize={14}
                    fontStyle="italic"
                    color={grey[600]}
                    fontWeight={600}
                  >
                    Pilih periode
                  </Typography>
                </MenuItem>
                {listTriwulan.map((triwulanLabel, index) => (
                  <MenuItem key={index} value={triwulanLabel}>
                    {triwulanLabel.length >= 35 ? (
                      <Tooltip
                        title={triwulanLabel}
                        followCursor
                        TransitionComponent={Grow}
                      >
                        <Typography
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onMouseEnter={handlePopoverOpen}
                          onMouseLeave={handlePopoverClose}
                          sx={{ fontSize: 14 }}
                        >
                          {triwulanLabel.substring(0, 35) + "..."}
                        </Typography>
                      </Tooltip>
                    ) : (
                      triwulanLabel
                    )}
                  </MenuItem>
                ))}
              </SelectCustomTheme>
            </FormControl>
          )}
          {dateRangeDropdown && (
            <DateRangePicker
              small
              placeholder="Pilih periode"
              rounded
              sxInput={{
                backgroundColor: "red",
              }}
            />
          )}
          {addButton && addButton}
          {identificationInfo && identificationInfo}
        </Stack>
      </Stack>
      {hasAlert && hasAlert}
      <Box
        className="mrpn-card-content"
        ref={ref}
        height={
          heightTitleBreadcrumb
            ? "calc(100vh - 258px)"
            : overflowHidden
            ? "calc(100vh - 240px)"
            : heightNoSet
            ? "auto"
            : darkTheme
            ? "calc(100vh - 180px)"
            : "calc(100vh - 240px)"
        }
        overflow={overflowHidden ? "hidden" : "auto"}
        // margin={noMinusMargin ? 0 : -1}
        my={noMinusMargin ? 0 : -1}
        sx={{
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: "3px",
          },
          [theme.breakpoints.down("sm")]: { height: "auto" },
        }}
      >
        {tabStep && tabStep}
        {withCard ? (
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              borderRadius: "1.25rem",
              p: noPadding ? 0 : "1.5rem",
              // m: 1,
              ...sxCard,
            }}
          >
            {children}
          </Paper>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
}

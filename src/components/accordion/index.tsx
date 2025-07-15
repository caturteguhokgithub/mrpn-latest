import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grow,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { IconFA } from "@/components/icons/icon-fa";
import { grey, red } from "@mui/material/colors";
import theme from "@/theme";
import { ListItemDropdownMenu } from "../cardTabItem";

export default function AccordionList({
  id,
  header,
  content,
  defaultExpanded,
  settingEditOnclick,
}: {
  id: string;
  header: React.ReactNode;
  content: React.ReactNode;
  defaultExpanded?: boolean;
  settingEditOnclick?: any;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleButtonFocus = (event: any) => {
    event.stopPropagation();
  };

  const settingButton = (
    <>
      <IconButton
        aria-label="settings"
        onClick={handleClick}
        // onFocus={handleButtonFocus}
        sx={{
          p: "5px",
          bgcolor: theme.palette.primary.dark,
          "&:hover": {
            bgcolor: grey[700],
          },
        }}
      >
        <IconFA size={14} name="ellipsis" color="white" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              "&.MuiPaper-root": {
                mt: "30px",
                left: "auto !important",
                right: 54,
                minWidth: 150,
                borderRadius: 3,
                ".MuiList-root": {
                  py: 0,
                },
              },
              ".MuiMenuItem-root": {
                py: "10px",
                gap: 1,
                "&:last-of-type": {
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                },
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem onClick={settingEditOnclick} onFocus={handleButtonFocus}>
          <ListItemDropdownMenu label="Ubah" />
        </MenuItem>
        <MenuItem
          sx={{
            bgcolor: red[100],
            color: red[700],
            "&:hover": {
              bgcolor: red[200],
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: "0 !important" }}>
            <IconFA size={14} name="trash-alt" color={red[700]} />
          </ListItemIcon>
          <ListItemText>
            <Typography fontSize={14}>Hapus</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );

  const StyledAccordionSummary = styled(AccordionSummary)(() => ({
    pointerEvents: "none", // Disable pointer events on the summary
    "& .MuiAccordionSummary-expandIconWrapper": {
      pointerEvents: "auto", // Re-enable pointer events on the expand icon
    },
    "& .MuiButtonBase-root": {
      pointerEvents: "auto", // Re-enable pointer events on the button
    },
  }));

  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <StyledAccordionSummary
        expandIcon={<IconFA name="chevron-down" size={16} />}
        aria-controls={id}
        id={id}
      >
        {/* <Typography sx={{ flexGrow: 1 }}>Accordion Header</Typography>
    <Button variant="contained" onClick={handleButtonClick}>
     Header Button
    </Button> */}
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography fontWeight={500}>{header}</Typography>
          <Tooltip title={header} followCursor TransitionComponent={Grow}>
            <Typography
              lineHeight={1}
              sx={{
                span: {
                  position: "relative",
                  top: 1,
                },
              }}
            >
              <IconFA name="circle-info" size={17} />
            </Typography>
          </Tooltip>
        </Stack>
        {settingButton}
      </StyledAccordionSummary>
      {/* <AccordionSummary
    expandIcon={<IconFA name="chevron-down" size={16} />}
    aria-controls={id}
    id={id}
   >
    <Stack direction="row" alignItems="center" gap={1}>
     <Typography fontWeight={500}>{header}</Typography>
     <Tooltip title={header} followCursor TransitionComponent={Grow}>
      <Typography
       lineHeight={1}
       sx={{
        span: {
         position: "relative",
         top: 1,
        },
       }}
      >
       <IconFA name="circle-info" size={17} />
      </Typography>
     </Tooltip>
    </Stack>
    {settingButton}
   </AccordionSummary> */}
      <AccordionDetails>{content}</AccordionDetails>
    </Accordion>
  );
}

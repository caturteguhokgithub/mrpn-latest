import React from "react";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  ToggleButton,
  Typography,
  alpha,
} from "@mui/material";
import theme from "@/theme";
import { green, grey, red, yellow } from "@mui/material/colors";
import { IconFA } from "../icons/icon-fa";
import Iconify from "../icons/iconify";

export default function ThemeToggleButton({
  value,
  label,
  variant,
  disabled,
  onClick,
  handleDelete,
  handleEdit,
}: {
  value?: string | any;
  label: string;
  code?: string;
  variant?: string;
  disabled?: boolean;
  onClick?: () => void;
  handleDelete?: () => void;
  handleEdit?: () => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const conditionColor =
    variant === "danger"
      ? `${red[700]} !important`
      : variant === "warning"
      ? `${yellow[800]} !important`
      : variant === "success"
      ? `${green[700]} !important`
      : theme.palette.primary.main;

  const styleToggle = {
    width: "100%",
    minHeight: 160,
    p: 0,
    bgcolor: "white",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    color: alpha(theme.palette.primary.main, 0.8),
    borderRadius: "12px !important",
    // border: `1px solid ${theme.palette.primary.main}`,
    borderLeftColor: `${theme.palette.primary.main} !important`,
    background:
      "linear-gradient(90deg, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.8) 100%),url(https://res.cloudinary.com/caturteguh/image/upload/v1715510168/mrpn/bg-button-theme_cxwxph.jpg)",
    backgroundSize: "200%",
    // backgroundSize: "cover",
    backgroundPosition: "right 66%",
    boxShadow: "1px 16px 13px -15px rgba(0,0,0,0.4);",
    position: "relative",
    "&.Mui-selected": {
      bgcolor: conditionColor,
      border: `1px solid ${conditionColor}`,
      ".MuiBox-root": {
        bgcolor: conditionColor,
      },
    },
    "&.Mui-disabled": {
      borderLeftColor: "#0000001f !important",
      cursor: "not-allowed",
    },
  };

  return (
    <Box position="relative">
      <ToggleButton
        onClick={onClick}
        disabled={disabled}
        value={value}
        aria-label={label}
        sx={styleToggle}
      >
        <Typography
          px={3}
          component="span"
          fontWeight={700}
          fontSize="2em"
          textTransform="capitalize"
          maxWidth={320}
          lineHeight={1.1}
          textAlign="left"
        >
          {label}
        </Typography>
      </ToggleButton>
      <Box position="absolute" top={16} right={16}>
        <IconButton
          aria-label="settings"
          onClick={handleClick}
          sx={{
            p: "5px",
            bgcolor: theme.palette.primary.dark,
            width: 28,
            height: 28,
            border: "0 !important",
            "&:hover": {
              background: "none !important",
              bgcolor: `${grey[700]} !important`,
            },
            span: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <Iconify size={14} name="mdi:dots-horizontal" color="white" />
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
                  minWidth: 80,
                  borderRadius: 3,
                  ".MuiList-root": {
                    py: 0,
                  },
                },
                ".MuiMenuItem-root": {
                  py: 1,
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
          <MenuItem onClick={handleEdit}>
            <ListItemIcon sx={{ minWidth: "0 !important" }}>
              <Iconify size={16} name="mdi:pencil" />
            </ListItemIcon>
            <ListItemText>
              <Typography fontSize={14}>Ubah</Typography>
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleDelete}
            sx={{
              bgcolor: red[100],
              color: red[700],
              "&:hover": {
                bgcolor: red[200],
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: "0 !important" }}>
              <Iconify size={16} name="mdi:delete" color={red[700]} />
            </ListItemIcon>
            <ListItemText>
              <Typography fontSize={14}>Hapus</Typography>
            </ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

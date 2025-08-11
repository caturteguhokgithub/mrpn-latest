import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Grow,
} from "@mui/material";
import { IconFA } from "@/components/icons/icon-fa";
import { grey, red } from "@mui/material/colors";
import theme from "@/theme";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/lib/core/hooks/useHooks";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import { InfoTooltip } from "@/components/InfoTooltip";

export const ListItemDropdownMenu = ({
  label,
  mode,
}: {
  label: string;
  mode?: string;
}) => {
  return (
    <>
      <ListItemIcon sx={{ minWidth: "0 !important" }}>
        <IconFA size={14} name={mode === "add" ? "circle-plus" : "edit"} />
      </ListItemIcon>
      <ListItemText>
        <Typography fontSize={14}>{label}</Typography>
      </ListItemText>
    </>
  );
};

export default function CardItem({
  title,
  children,
  addButton,
  downloadButton,
  setting,
  multiEdit,
  year,
  contentNoPadding,
  settingAddOnclick,
  settingDeleteOnclick,
  settingEditOnclick,
  settingEditOutputClick,
  settingEditBisnisClick,
  settingAddOnclickOnly,
  infoTooltip,
  sxCardContent,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  addButton?: React.ReactNode;
  downloadButton?: React.ReactNode;
  setting?: React.ReactNode;
  multiEdit?: boolean;
  year?: number;
  contentNoPadding?: boolean;
  settingAddOnclick?: () => void;
  settingDeleteOnclick?: () => void;
  settingEditOnclick?: () => void;
  settingEditOutputClick?: () => void;
  settingEditBisnisClick?: () => void;
  settingAddOnclickOnly?: () => void;
  infoTooltip?: React.ReactNode;
  sxCardContent?: React.CSSProperties | any;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { permission } = useAuthContext((state) => state);
  let pathname = usePathname();

  switch (pathname) {
    case "/penetapan/konteks-strategis":
      pathname = "/penetapan/kriteriaRisiko";
      break;
    case "/penetapan/kriteria":
      pathname = "/penetapan/kriteriaRisiko";
      break;
    case "/penetapan/objek":
      pathname = "/penetapan/objectUpr";
      break;
    default:
      break;
  }

  const settingButton = (
    <>
      <IconButton
        aria-label="settings"
        onClick={handleClick}
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
        {multiEdit &&
          (hasPrivilege(permission, pathname, "add") ||
            hasPrivilege(permission, pathname, "update")) ? (
          <>
            <MenuItem onClick={settingEditBisnisClick}>
              <ListItemDropdownMenu label="Tambah Proses Bisnis" />
            </MenuItem>

            {year && year > 0 ? (
              ""
            ) : (
              <MenuItem onClick={settingEditOutputClick}>
                <ListItemDropdownMenu label="Tambah Expected Output" />
              </MenuItem>
            )}
          </>
        ) : settingAddOnclick ? (
          <>
            <MenuItem onClick={settingAddOnclick}>
              <ListItemDropdownMenu mode="add" label="Tambah" />
            </MenuItem>
            <MenuItem onClick={settingEditOnclick}>
              <ListItemDropdownMenu label="Ubah" />
            </MenuItem>
          </>
        ) : settingEditOnclick ? (
          <MenuItem onClick={settingEditOnclick}>
            <ListItemDropdownMenu label="Ubah" />
          </MenuItem>
        ) : settingAddOnclickOnly ? (
          <MenuItem onClick={settingAddOnclickOnly}>
            <ListItemDropdownMenu mode="add" label="Tambah" />
          </MenuItem>
        ) : null}

        {hasPrivilege(permission, pathname, "delete") &&
          settingDeleteOnclick && (
            <MenuItem
              onClick={settingDeleteOnclick}
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
          )}
      </Menu>
    </>
  );

  return (
    <Card
      sx={{
        m: "4px",
        borderRadius: 4,
        ".MuiCardHeader-action": {
          m: 0,
        },
        "ul, ol": {
          pl: 1,
          "& + strong": {
            marginTop: 2,
            display: "block",
          },
        },
        ul: {
          pl: 4,
          li: {
            pl: "5px",
          },
        },
        ol: {
          counterReset: "item",
          li: {
            display: "block",
            marginLeft: "1.7em",
            position: "relative",
            "&:before": {
              content: 'counter(item) ". "',
              counterIncrement: "item",
              display: "inline-block",
              position: "absolute",
              marginLeft: "-1.7em",
            },
          },
        },
        ".MuiTable-root": {
          ul: {
            pl: 2.5,
            li: {
              pl: "2px",
            },
          },
        },
      }}
    >
      {title && (
        <CardHeader
          action={
            <>
              <Stack direction="row" alignItems="center" gap={0.5}>
                {downloadButton}
                {addButton
                  ? hasPrivilege(permission, pathname, "add")
                    ? addButton
                    : null
                  : setting
                    ? hasPrivilege(permission, pathname, "add") ||
                      hasPrivilege(permission, pathname, "update") ||
                      hasPrivilege(permission, pathname, "delete")
                      ? settingButton
                      : null
                    : null}
                {/* {addButton ? addButton : setting ? settingButton : null} */}
                {/* {addButton} */}
                {/* {setting && settingButton} */}
              </Stack>
            </>
          }
          title={
            <Stack direction="row" alignItems="center" gap={0.5}>
              <Typography fontWeight={500}>{title}</Typography>
              {infoTooltip && <InfoTooltip title={infoTooltip} />}
            </Stack>
          }
          sx={{ bgcolor: grey[300] }}
        />
      )}
      <CardContent
        sx={{
          p: contentNoPadding ? "0 !important" : 2,
          pb: contentNoPadding ? 0 : "16px !important",
          ...sxCardContent,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}

import React from "react";
import theme from "@/theme";
import { Typography, ListItemButton, Stack, Box } from "@mui/material";
import Link from "next/link";
import { grey, orange } from "@mui/material/colors";
import { usePathname } from "next/navigation";
import { InfoTooltip } from "../../InfoTooltip";

export const SubmenuItem = ({ label, url, urlLv2, isOpen }: IMenu) => {
  const pathname = usePathname();

  const kpPenetapan = localStorage.getItem("selectedRKP");
  const kpPenetapanObj = kpPenetapan ? JSON.parse(kpPenetapan) : null;

  const isEmptyPenetapanObject =
    kpPenetapanObj === null ||
    Object.keys(kpPenetapanObj).length === 0 ||
    kpPenetapanObj === undefined;

  const disabledMenu =
    isEmptyPenetapanObject && `${label}`.toLowerCase() === "kriteria risiko";

  return (
    <ListItemButton
      sx={{
        pl: 6,
        py: 0,
        cursor: "default",
        "&:hover": { bgcolor: "transparent" },
      }}
    >
      <Link
        href={disabledMenu ? "#" : `/${urlLv2}`}
        passHref
        style={{
          pointerEvents: disabledMenu ? "none" : "auto",
        }}
      >
        <Stack direction="row" alignItems="center" py="5px">
          <Typography
            ml="20px"
            fontSize="13px"
            color={grey[700]}
            className={
              pathname === `/${url}` ||
              pathname === `/${urlLv2}` ||
              pathname === `/${url}/${urlLv2}`
                ? "link-active"
                : ""
            }
            lineHeight={1.2}
            sx={{
              transition: "all 300ms",
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              color: disabledMenu ? grey[500] : grey[700],
              cursor: disabledMenu ? "not-allowed" : "pointer",
              "&.link-active": {
                "& > span": {
                  fontWeight: 500,
                  color: isOpen ? grey[700] : orange[300],
                },
                "&:before": {
                  backgroundColor: isOpen
                    ? theme.palette.primary.main
                    : orange[300],
                  outline: isOpen ? "3px solid" : "none",
                  outlineColor: grey[300],
                },
              },
              "&:before": {
                content: "''",
                width: "7px",
                height: "7px",
                backgroundColor: isOpen ? grey[500] : grey[300],
                display: "block",
                borderRadius: "50%",
                position: "absolute",
                top: "50%",
                left: -20,
                transform: "translateY(-50%)",
                transition: "all 300ms",
              },
              "&:hover": {
                fontWeight: disabledMenu ? 400 : 600,
                "&:before": {
                  backgroundColor: theme.palette.primary.main,
                  outline: "3px solid",
                  outlineColor: grey[300],
                },
              },
            }}
          >
            <Box
              component="span"
              sx={{
                pointerEvents: disabledMenu ? "none" : "auto",
                userSelect: disabledMenu ? "none" : "auto",
                color: isOpen ? grey[700] : grey[300],
              }}
            >
              {label}
            </Box>
            {disabledMenu && <InfoTooltip title="Pilih KP terlebih dahulu" />}
          </Typography>
        </Stack>
      </Link>
    </ListItemButton>
  );
};

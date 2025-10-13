import theme from "@/theme";
import { Tab, alpha } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";
import { SxParams } from "./types";

export const styleTabPanel = (params: SxParams) => {
  return {
    p: params.tabLevel === "1" ? 1 : 0,
    mt: params.tabLevel === "1" ? 0 : params.tabLevel === "2" ? 1 : 2,
    height:
      params.tabLevel === "0"
        ? // ? "calc(100vh - 330px)"
          "calc(100vh - 394px)"
        : params.tabLevel === "1"
        ? "auto"
        : params.tabLevel === "2"
        ? // ? "calc(100vh - 454px)"
          // "calc(100vh - 442px)"
          "calc(100vh - 388px)"
        : params.tabLevel === "3"
        ? "calc(100vh - 452px)"
        : params.tabLevel === "lv-2"
        ? // ? "calc(100vh - 330px)"
          "calc(100vh - 454px)"
        : params.tabLevel === "lv-2-tab-hide"
        ? "calc(100vh - 390px)"
        : // : "calc(100vh - 400px)",
          "calc(100vh - 330px)",
    overflow: "auto",
    ".tab-cascading-diagram": {
      height: "calc(100vh - 352px)",
    },
    "&::-webkit-scrollbar": {
      width: "3px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 366px)",
    },
  };
};

export const styleTab = (params: SxParams) => {
  return {
    ".MuiTabs-flexContainer": {
      gap: 1,
      ".MuiTab-labelIcon": {
        whiteSpace: "nowrap",
      },
      ".MuiTab-iconWrapper": {
        margin: 0,
      },
    },
    ".MuiTabs-scroller": {
      //   [theme.breakpoints.down("md")]: {
      width: "800px",
      overflowX: "auto !important",
      "&::-webkit-scrollbar": {
        height: "4px",
        bgcolor: grey[100],
      },
      "&::-webkit-scrollbar-track": {
        //    boxShadow: "none",
        //    bgcolor: grey[800],
      },
      "&::-webkit-scrollbar-thumb": {
        bgcolor: alpha(grey[400], 0.9),
      },
      //   },
    },
    button: {
      p: 2,
      px: 3,
      mb: params.variant === "outlined" ? 0 : 2,
      gap: 1,
      minHeight: 0,
      bgcolor: params.variant === "outlined" ? grey[200] : grey[300],
      borderRadius: params.variant === "outlined" ? 0 : 2,
      lineHeight: 1,
      borderBottom:
        params.variant === "outlined" ? `2px solid ${grey[400]}` : "none",
      "&.Mui-selected": {
        bgcolor:
          params.variant === "outlined"
            ? alpha(theme.palette.primary.main, 0.1)
            : theme.palette.primary.main,
        color:
          params.variant === "outlined" ? theme.palette.primary.main : "white",
        ...(params.variant === "outlined" && {
          fontWeight: 700,
        }),
      },
    },
  };
};

// export const styleTab = [
//  {
//   ".MuiTabs-flexContainer": {
//    gap: 1,
//    ".MuiTab-labelIcon": {
//     whiteSpace: "nowrap",
//    },
//   },
//   ".MuiTabs-scroller": {
//    //   [theme.breakpoints.down("md")]: {
//    width: "800px",
//    overflowX: "auto !important",
//    "&::-webkit-scrollbar": {
//     height: "4px",
//     bgcolor: grey[100],
//    },
//    "&::-webkit-scrollbar-track": {
//     //    boxShadow: "none",
//     //    bgcolor: grey[800],
//    },
//    "&::-webkit-scrollbar-thumb": {
//     bgcolor: alpha(grey[400], 0.9),
//    },
//    //   },
//   },
//   button: {
//    p: 2,
//    px: 3,
//    mb: 2,
//    gap: 1,
//    minHeight: 0,
//    bgcolor: grey[300],
//    borderRadius: 2,
//    lineHeight: 1,
//    "&.Mui-selected": {
//     bgcolor: theme.palette.primary.main,
//     color: "white",
//    },
//   },
//  },
// ];

export const styleDownload = [
  {
    bgcolor: "white",
    fontWeight: 600,
    lineHeight: 1,
    cursor: "pointer",
    height: 38,
    px: 1,
    borderRadius: "50px",
  },
];

export const styleList = [
  {
    p: 0,
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    li: {
      mt: "0 !important",
      display: "flex !important",
      gap: 1.5,
      "&:before": {
        display: "none",
      },
    },
  },
];

export const styleOrgChart = (params: SxParams) => {
  return {
    ".orgchart-container": {
      maxWidth: params.variant === "full" ? "100%" : "calc(100vw - 188px)",
      maxHeight: params.variant === "full" ? "100%" : "calc(100vh - 616px)",
      overflow: params.variant === "full" ? "hidden" : "auto",
      height: "auto",
      border: 0,
      margin: 0,
      "&::-webkit-scrollbar": {
        height: "16px",
        cursor: "pointer",
      },
      ".orgchart": {
        mt: -3,
        p: 0,
        background: "none",
        ul: {
          justifyContent: "center",
          pl: 0,
          li: {
            mt: 3,
            pl: 0,
            "&:before": {
              borderColor: grey[400],
            },
          },
        },
        ".assistant-node": {
          display: "inline-block",
          margin: 0,
          padding: "3px",
          border: "2px dashed transparent",
          textAlign: "center",
          width: "130px",
          left: "140px",
          top: "30px",
          zIndex: 2,
          position: "absolute",

          ".connector": {
            borderLeft: "rgba(217, 83, 79, 0.8) dashed 2px",
            borderBottom: "rgba(217, 83, 79, 0.8) dashed 2px",
            position: "absolute",
            left: "-75px",
            width: "72px",
            height: "12.5px",
            top: "12.5px",
          },
        },
        ".oc-node": {
          p: 0,
          m: "0 5px",
          minWidth: 300,
          maxWidth: 500,
          "&:before, &:after": {
            bgcolor: grey[400],
            height: 15,
            bottom: -15,
          },
          ".oc-heading, .oc-content": {
            fontSize: 15,
            px: 2,
            py: 0.5,
            width: "auto",
            height: "auto",
          },
          ".oc-heading": {
            bgcolor: theme.palette.primary.main,
          },
          ".oc-content": {
            textTransform: "capitalize",
            border: `1px solid ${theme.palette.primary.main}`,
          },
        },
      },
    },
  };
};

export const styleOrgChart2 = [
  {
    ".orgchart-container": {
      maxWidth: "calc(100vw - 228px)",
      overflow: "hidden",
      height: "auto",
      border: 0,
      "&::-webkit-scrollbar": {
        height: "16px",
        cursor: "pointer",
      },
      ".orgchart": {
        mt: -3,
        p: 0,
        background: "none",
        ul: {
          justifyContent: "center",
          pl: 0,
          li: {
            mt: 3,
            pl: 0,
            "&:before": {
              borderColor: grey[400],
            },
          },
        },
        ".assistant-node": {
          display: "inline-block",
          margin: 0,
          padding: "3px",
          border: "2px dashed transparent",
          textAlign: "center",
          width: "130px",
          left: "140px",
          top: "30px",
          zIndex: 2,
          position: "absolute",

          ".connector": {
            borderLeft: "rgba(217, 83, 79, 0.8) dashed 2px",
            borderBottom: "rgba(217, 83, 79, 0.8) dashed 2px",
            position: "absolute",
            left: "-75px",
            width: "72px",
            height: "12.5px",
            top: "12.5px",
          },
        },
        ".oc-node": {
          p: 0,
          m: "0 5px",
          minWidth: 300,
          maxWidth: 500,
          "&:before, &:after": {
            bgcolor: grey[400],
            height: 15,
            bottom: -15,
          },
          ".oc-heading, .oc-content": {
            fontSize: 15,
            px: 2,
            py: 0.5,
            width: "auto",
            height: "auto",
          },
          ".oc-heading": {
            bgcolor: theme.palette.primary.main,
          },
          ".oc-content": {
            textTransform: "capitalize",
            border: `1px solid ${theme.palette.primary.main}`,
          },
        },
      },
    },
  },
];

export const CustomTab = styled(Tab)<{ isLocked?: boolean }>(
  ({ theme, isLocked }) => ({
    paddingInline: 40,
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey[700],
    overflow: "inherit",
    position: "relative",
    "&.Mui-selected": {
      backgroundColor: isLocked
        ? theme.palette.error.main
        : theme.palette.primary.main,
      color: theme.palette.common.white,
      "&::after": {
        borderTopColor: isLocked
          ? theme.palette.error.main
          : theme.palette.primary.main,
      },
    },
    "&::after": {
      content: '""',
      position: "absolute",
      zIndex: 1,
      right: -32,
      top: "50%",
      transform: "translateY(-50%) rotate(270deg)",
      width: 0,
      height: 0,
      borderLeft: "25px solid transparent",
      borderRight: "25px solid transparent",
      borderTop: `16px solid ${theme.palette.grey[300]}`,
      filter: "drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.15))",
    },
    "&:last-of-type": {
      "&::after": {
        content: "none",
      },
    },
    "&:not(:first-of-type)": {
      paddingLeft: 50,
    },
  })
);

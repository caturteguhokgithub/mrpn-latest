import theme from "@/theme";
import { blue, brown, green, orange } from "@mui/material/colors";

export const logoOrange = "#EA6228";
export const logoBrown = "#CC9933";
export const logoGreen = "#33CC33";
export const logoBlue = "#00CCFF";
export const logoDarkBlue = "#25418c";
export const red = "#EF4444";
export const yellow = "#FDE047";
export const whiteRGB = "rgb(255, 255, 255)";
export const blackRGB = "rgb(0, 0, 0)";
export const bgColorTh = "#E7F2F9";

export const GetColor = (i: number) => {
  const colorArray: string[] = [
    "#522258",
    "#C63C51",
    "#8C3061",
    "#FFD35A",
    "#FFA823",
    "#DC0083",
    "#D95F59",
    "#A67B5B",
    "#ECB176",
    "#FED8B1",
  ];

  return colorArray[i];
};
export const ColorCriticalPath: string[] = [
  "#FFD1DC", // Pastel Pink
  "#B39EB5", // Pastel Purple
  "#FFFFBA", // Pastel Yellow
  "#98FB98", // Pale Green
  "#BAE1FF", // Pastel Blue
  "#C9BAFF", // Pastel Purple
  "#F0E68C", // Pastel Khaki
  "#FFDAB9", // Peach Puff
  "#A3C1AD", // Pastel Mint
  "#CAF0F8",
  "#795548",
  "#ff9800",
  "#ffeb3b",
  "#8bc34a",
  "#009688",
  "#03a9f4",
  "#673ab7",
  "#e91e63",
  "#f44336",
  "#cddc39",
];

export const GetColorCriticalPath = (i: number) => {
  return ColorCriticalPath[i];
};
export const GetColorCriticalPathIndex = (i: string) => {
  const index = ColorCriticalPath.findIndex(x => x == i)
  return index > -1 ? index : 0
};

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
  "#e80037",
  "#886a8a",
  "#ffff20",
  "#10f610",
  "#209eff",
  "#5020ff",
  "#dac71d",
  "#ff891f",
  "#5d8a6c",
  "#3fc9e6",
  "#FFD1DC",
  "#B39EB5",
  "#FFFFBA",
  "#98FB98",
  "#BAE1FF",
  "#C9BAFF",
  "#F0E68C",
  "#FFDAB9",
  "#A3C1AD",
  "#CAF0F8",
];

export const ColorCriticalPathTwoColor: string[] = ["#d7e3f3", "#fef0cd"];

export const ColorCriticalPathDarken: string[] = [
  "#e80037",
  "#886a8a",
  "#ffff20",
  "#10f610",
  "#209eff",
  "#5020ff",
  "#dac71d",
  "#ff891f",
  "#5d8a6c",
  "#3fc9e6",
];

export const GetColorCriticalPath = (i: number) => {
  // return ColorCriticalPath[i];
  return ColorCriticalPathTwoColor[i];
};
export const GetColorCriticalPathIndex = (i: string) => {
  // const index = ColorCriticalPath.findIndex((x) => x == i);
  const index = ColorCriticalPathTwoColor.findIndex((x) => x == i);
  return index > -1 ? index : 0;
};

import { SvgIcon } from "@mui/material";

export const IconKeluar = ({ color }: { color?: string }) => {
 return (
  <SvgIcon>
   <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
   >
    <path
     d="M4.5 12L16 12"
     stroke={color ? color : "white"}
     strokeWidth="2"
     strokeLinecap="round"
    />
    <path
     d="M15 20L17 20C18.6569 20 20 18.6569 20 17L20 7C20 5.34315 18.6569 4 17 4L15 4"
     stroke={color ? color : "white"}
     strokeWidth="2"
     strokeLinecap="round"
     strokeLinejoin="round"
    />
    <path
     d="M8 8L4 12L8 16"
     stroke={color ? color : "white"}
     strokeWidth="2"
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </svg>
  </SvgIcon>
 );
};

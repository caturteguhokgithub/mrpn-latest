// components/DraggableScroll.js

import React, {MutableRefObject, ReactNode, useRef} from "react";
// import styles from "./DraggableScroll.module.css";
import {Box} from "@mui/material";

const DraggableScroll = (
  {
    children,
    sx,
  }: {
    children: React.ReactNode;
    sx?: React.CSSProperties | any;
  }
) => {
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: any) => {
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // The multiplier controls the scroll speed
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        ...sx,
        display: "flex",
        overflow: "auto",
        cursor: "grab",
        "&:active": {
          cursor: "grabbing",
        },
      }}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {children}
    </Box>
  );
};

export default DraggableScroll;

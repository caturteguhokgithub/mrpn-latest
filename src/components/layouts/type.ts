import { CSSProperties } from "react";

export type ILayout = {
  children?: React.ReactNode;
};

// Type for CSS with sub-properties support
export type CSSWithSubProperties = CSSProperties & {
  [key: string]: any;
};

export type IMenu = {
  label?: string | any;
  icon?: React.ReactNode;
  url?: string;
  urlLv2?: string;
  reflect?: boolean;
  isExpanded?: boolean;
  hasChild?: boolean;
  activeUrl?: () => void;
  menuParentActive?: React.ReactNode;
  onclick?: () => void;
  openSubmenu?: boolean;
  setOpenSubmenu?: () => void;
  clickOpenCollapse?: () => void;
  clickOutsideCollapse?: any;
  isOpen?: boolean;
  sx?: CSSWithSubProperties;
};

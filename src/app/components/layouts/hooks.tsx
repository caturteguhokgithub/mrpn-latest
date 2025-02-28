import React from "react";

export const useLayoutVM = () => {
  const [openSubmenu, setOpenSubmenu] = React.useState(false);

  const clickOpenCollapse = () => {
    setOpenSubmenu(!openSubmenu);
  };

  const clickOutsideCollapse = () => {
    setOpenSubmenu(false);
  };

  return {
    openSubmenu,
    setOpenSubmenu,
    clickOpenCollapse,
    clickOutsideCollapse,
  };
};

export default useLayoutVM;

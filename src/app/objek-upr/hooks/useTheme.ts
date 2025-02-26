import React from "react";
import cloneDeep from "lodash/cloneDeep";
import { listAp, listKp } from "../data";

export function useThemes() {
 const [activeTab, setActiveTab] = React.useState("");
 const [searchTab, setSearchTab] = React.useState("");

 const handleAlignment = (
  event: React.MouseEvent<HTMLElement>,
  newTheme: string | null
 ) => {
  setActiveTab(newTheme ? newTheme : "");
 };

 const handleSearchTermUpdate = (searchTermUpdate: any) => {
  setSearchTab(searchTermUpdate.target.value);
 };

 const { listData } = React.useMemo(() => {
  let listData = listKp || [];

  if (searchTab === "") {
   //    console.log("masuk kondisi");
   listData = cloneDeep(listData).splice(0, 10);
  }

  //   console.log("listData", searchTab, activeTab, listData);

  if (searchTab !== "" && listData.length && activeTab !== "") {
   const filteredPosts = listKp.filter((post) => {
    // const titleAndBodyText =
    //  post.kode_kp.replace(/\n/g, " ") + post.nama_kp.replace(/\n/g, " ");
    return post.nama.toLowerCase().includes(searchTab.toLowerCase());
   });

   listData = filteredPosts;
   //    console.log(filteredPosts);
  }

  return {
   listData,
  };
 }, [listKp, activeTab, searchTab]);

 const { listDataAp } = React.useMemo(() => {
  let listDataAp = listAp || [];

  if (searchTab === "") {
   //    console.log("masuk kondisi");
   listDataAp = cloneDeep(listDataAp).splice(0, 10);
  }

  //   console.log("listDataAp", searchTab, activeTab, listDataAp);

  if (searchTab !== "" && listDataAp.length && activeTab !== "") {
   const filteredPosts = listAp.filter((post) => {
    // const titleAndBodyText =
    //  post.kode_kp.replace(/\n/g, " ") + post.nama_kp.replace(/\n/g, " ");
    return post.nama.toLowerCase().includes(searchTab.toLowerCase());
   });

   listDataAp = filteredPosts;
   //    console.log(filteredPosts);
  }

  return {
   listDataAp,
  };
 }, [listAp, activeTab, searchTab]);

 return {
  activeTab,
  listKp,
  handleAlignment,
  listData,
  listDataAp,
  handleSearchTermUpdate,
  searchTab,
 };
}

export default useThemes;

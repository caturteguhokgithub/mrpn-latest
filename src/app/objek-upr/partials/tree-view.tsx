import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";

export default function TreeView(props: any) {
 const ITEMS: TreeViewBaseItem[] = [
  {
   id: "1",
   label: "01 - Transformasi Sosial (AP)",
   children: [
    {
     id: "2",
     label: "01.01 - Peningkatan Kesehatan dan Gizi Masyarakat (PP)",
     children: [
      {
       id: "21",
       label: "01.02.01 - Budaya Antikorupsi",
      },
      { id: "22", label: "01.02.02 - Digitalisasi Pelayanan Publik" },
      { id: "23", label: "01.02.02 - Digitalisasi Sektor Ekonomi" },
      { id: "24", label: "01.02.02 - Diplomasi Kedaulatan" },
      {
       id: "25",
       label:
        "01.02.02 - Ekstensifikasi dan intensifikasi sumber-sumber pembiayaan inovatif dan berkelanjutan",
      },
      {
       id: "26",
       label:
        "01.02.02 - Ekstensifikasi dan Intensifikasi Penerimaan Perpajakan",
      },
     ],
    },
    {
     id: "3",
     label: "01.02 - FEW Nexus Ibu Kota Nusantara (PP)",
     children: [
      { id: "6", label: "01.02.01 - Hilirisasi Industri Nikel" },
      {
       id: "7",
       label: "01.02.01 - Hilirisasi Komoditas Pertanian Strategis/Unggulan",
      },
      { id: "8", label: "01.02.01 - Integrasi dan Digitalisasi Logistik" },
     ],
    },
    {
     id: "4",
     label: "01.03 - Investasi pelayanan kesehatan primer (PP)",
    },
    {
     id: "5",
     label:
      "01.04 - Kawasan Sentra Produksi Pangan (KSPP) Kalimantan Tengah (PP)",
    },
   ],
  },
  {
   id: "11",
   label: "02 - Peningkatan Utilisasi (AP)",
   children: [
    {
     id: "12",
     label: "01.01 - Peningkatan Kesehatan dan Gizi Masyarakat (PP)",
     children: [
      {
       id: "121",
       label: "01.02.01 - Budaya Antikorupsi",
      },
      { id: "122", label: "01.02.02 - Digitalisasi Pelayanan Publik" },
      { id: "123", label: "01.02.02 - Digitalisasi Sektor Ekonomi" },
      { id: "124", label: "01.02.02 - Diplomasi Kedaulatan" },
      {
       id: "125",
       label:
        "01.02.02 - Ekstensifikasi dan intensifikasi sumber-sumber pembiayaan inovatif dan berkelanjutan",
      },
      {
       id: "126",
       label:
        "01.02.02 - Ekstensifikasi dan Intensifikasi Penerimaan Perpajakan",
      },
     ],
    },
    {
     id: "13",
     label: "01.02 - FEW Nexus Ibu Kota Nusantara (PP)",
     children: [
      { id: "136", label: "01.02.01 - Hilirisasi Industri Nikel" },
      {
       id: "137",
       label: "01.02.01 - Hilirisasi Komoditas Pertanian Strategis/Unggulan",
      },
      { id: "138", label: "01.02.01 - Integrasi dan Digitalisasi Logistik" },
     ],
    },
    {
     id: "14",
     label: "01.03 - Investasi pelayanan kesehatan primer (PP)",
    },
    {
     id: "15",
     label:
      "01.04 - Kawasan Sentra Produksi Pangan (KSPP) Kalimantan Tengah (PP)",
    },
   ],
  },
 ];

 //  const CustomTreeItem = styled(TreeItem)({
 //   [`& .${treeItemClasses.iconContainer}`]: {
 //    "& .close": {
 //     opacity: 0.3,
 //    },
 //   },
 //  });

 function CloseSquare(props: SvgIconProps) {
  return (
   <SvgIcon
    className="close"
    fontSize="inherit"
    style={{ width: 14, height: 14 }}
    {...props}
   >
    {/* tslint:disable-next-line: max-line-length */}
    <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
   </SvgIcon>
  );
 }

 return (
  <>
   <RichTreeView
    multiSelect
    aria-label="customized"
    defaultExpandedItems={["1"]}
    slots={{
     expandIcon: AddBoxIcon,
     collapseIcon: IndeterminateCheckBoxIcon,
     endIcon: CloseSquare,
     //  item: CustomTreeItem,
    }}
    // sx={{ overflowX: "hidden", minHeight: 270, flexGrow: 1, maxWidth: 300 }}
    items={ITEMS}
   />
  </>
 );
}

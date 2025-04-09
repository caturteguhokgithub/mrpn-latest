import React, { Fragment, useEffect } from "react";
import {
  Button,
  DialogActions,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
} from "@mui/material";
import theme from "@/theme";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import useCardRegulasi from "@/app/penetapan/konteks-strategis/cardRegulasi/vm";
import EmptyDevelopingState from "@/app/components/empty/developing";
import { isDeveloping } from "@/app/components/layouts/layout";

import useCardRegulationVM from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationVM";
import TablePeraturan from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/table-peraturan";

export default function CardRegulation({
  penetapan
}: {
  penetapan?: boolean;
}) {
  const { data } = useCardRegulasi();

  const {
    deleteData,
  } = useCardRegulationVM();

  return (
    <>
      <CardItem title="Daftar Regulasi, Kebijakan, Peraturan, Prosedur Terkait">
        {penetapan ? (
          <Fragment>
            {data.length == 0 ? (
              <EmptyState
                dense
                icon={<IconEmptyData width={100} />}
                title="Data Kosong"
                description="Silahkan isi konten halaman ini"
              />
            ) : (
              <TablePeraturan data={data} deleteData={deleteData} />
            )}
          </Fragment>
        ) : (
          <EmptyDevelopingState />
          // <Fragment>
          //   {data.length == 0 ? (
          //     <EmptyState
          //       dense
          //       icon={<IconEmptyData width={100} />}
          //       title="Data Kosong"
          //       description="Silahkan isi konten halaman ini"
          //     />
          //   ) : (
          //     <TableContainer
          //       component={Paper}
          //       elevation={0}
          //       variant="outlined"
          //     >
          //       <Table size="small">
          //         <TableHead
          //           sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
          //         >
          //           <TableRow>
          //             <TableCell>
          //               Regulasi, Kebijakan, Peraturan, dan Prosedur Terkait
          //             </TableCell>
          //             <TableCell>Keterangan</TableCell>
          //           </TableRow>
          //         </TableHead>
          //         <TableBody>
          //           {data.map((row) => (
          //             <TableRow
          //               key={row.id}
          //               sx={{
          //                 "&:last-child td, &:last-child th": { border: 0 },
          //               }}
          //             >
          //               <TableCell>{row.title}</TableCell>
          //               <TableCell>{row.value}</TableCell>
          //             </TableRow>
          //           ))}
          //         </TableBody>
          //       </Table>
          //     </TableContainer>
          //   )}
          // </Fragment>
        )}
      </CardItem>
    </>
  );
}

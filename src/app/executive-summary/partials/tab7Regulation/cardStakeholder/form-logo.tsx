import {Box, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {
  ExsumStakeholderResDto
} from "@/app/executive-summary/partials/tab7Regulation/cardStakeholder/cardStakeholderModel";
import Image from "next/image";
import React from "react";
import ActionColumn from "@/components/actions/action";

export default function FormListLogo(
  {
    data,
    setModalLogo
  }: {
    data: ExsumStakeholderResDto[];
    setModalLogo: any
  }
){
  return <Table>
    <TableHead>
      <TableRow>
        <TableCell>
          KL/ Lembaga
        </TableCell>
        <TableCell>
          Logo
        </TableCell>
        <TableCell>

        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map(d => d.stakeholder.map(x =>
        <TableRow>
          <TableCell>
            {x.value}
          </TableCell>
          <TableCell>
            <Box position="relative" zIndex={1}>
              <Image
                alt={x.value}
                src={
                  process.env.NEXT_PUBLIC_BASE_URL_FILES +
                  x.icon
                }
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "auto", height: "120px" }}
              />
            </Box>
          </TableCell>
          <TableCell>
            <ActionColumn
              editClick={() => setModalLogo(x.id)}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
}
import React, { Fragment } from "react";
import {
  alpha,
  Chip,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { ExsumRelatedDto } from "@/app/executive-summary/partials/tab2Profile/cardRelated/cardRelatedModel";
import DialogDelete from "@/app/components/dialogDelete";
import ActionColumn from "@/app/components/actions/action";
import {useAuthContext} from "@/lib/core/hooks/useHooks";
import {usePathname} from "next/navigation";
import {hasPrivilege} from "@/lib/core/helpers/authHelpers";

export default function TableTagging({
  project,
  data,
  handleDelete,
}: {
  project: string;
  data: ExsumRelatedDto[];
  handleDelete: any;
}) {

  const { permission } = useAuthContext((state) => state);
  let pathname = usePathname();

  const [modalDelete, setModalDelete] = React.useState(false);

  const handleModalDelete = () => {
    setModalDelete(true);
  };

  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
          <TableRow>
            {hasPrivilege(permission, pathname, "delete") &&
              <TableCell sx={{ width: 100 }}>Aksi</TableCell>
            }
            <TableCell sx={{ width: 200 }}>Kebijakan</TableCell>
            <TableCell>Keterangan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((x, index) => (
            <>
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                  {hasPrivilege(permission, pathname, "delete") &&
                    <TableCell sx={{ textAlign: "center" }}>
                        <ActionColumn center deleteClick={handleModalDelete} />
                    </TableCell>
                  }
                <TableCell>
                  {x.kebijakan.map((y, index2) => (
                    <Chip
                      key={index2}
                      size="small"
                      label={y.src_kebijakan?.name}
                    />
                  ))}
                </TableCell>
                <TableCell>{x.value}</TableCell>
              </TableRow>
              <DialogDelete
                title="Hapus Data"
                handleOpenModal={modalDelete}
                handleDelete={() => handleDelete(x.id)}
                handleCloseModal={() => setModalDelete(false)}
              />
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

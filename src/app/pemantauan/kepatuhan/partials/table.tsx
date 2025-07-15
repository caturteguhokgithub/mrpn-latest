import React from "react";
import {
  Checkbox,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "@/theme";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";

interface Data {
  name: string;
  option1: string;
  option2: string;
}

const createData = (name: string, option1: string, option2: string): Data => {
  return { name, option1, option2 };
};

const rows: Data[] = [
  createData("Row 1", "option1", "option2"),
  createData("Row 2", "option1", "option2"),
  createData("Row 3", "option1", "option2"),
];

export default function TableAdd({ mode }: { mode?: string }) {
  const [selectedValue, setSelectedValue] = React.useState<{
    [key: string]: string;
  }>({});

  const handleChange = (row: string, value: string) => {
    setSelectedValue({ ...selectedValue, [row]: value });
  };

  return (
    <>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
          <TableRow>
            <TableCell width="60px">No.</TableCell>
            <TableCell width="24%">K/L</TableCell>
            <TableCell>Mengumpulkan Tepat Waktu</TableCell>
            <TableCell>Mengumpulkan Tidak Tepat Waktu</TableCell>
            <TableCell>Tidak Mengumpulkan</TableCell>
            <TableCell>Total UPR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mode === "add" ? (
            <TableRow>
              <TableCell colSpan={7}>
                <EmptyState
                  icon={<IconEmptyData />}
                  title="Data Kosong"
                  description="Silahkan isi konten tabel ini"
                />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>K/L {i + 1}</TableCell>
                  <TableCell align="center">
                    <Radio
                      checked={selectedValue[row.name] === "option1"}
                      onChange={() => handleChange(row.name, "option1")}
                      value="option1"
                      name={`${row.name}-option1`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Radio
                      checked={selectedValue[row.name] === "option2"}
                      onChange={() => handleChange(row.name, "option2")}
                      value="option2"
                      name={`${row.name}-option2`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Radio
                      checked={selectedValue[row.name] === "option3"}
                      onChange={() => handleChange(row.name, "option3")}
                      value="option3"
                      name={`${row.name}-option3`}
                    />
                  </TableCell>
                  <TableCell align="center">{i + 15}</TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
}

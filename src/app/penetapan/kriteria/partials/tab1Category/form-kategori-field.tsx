import React, { Fragment } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { dataKriteriaRisiko } from "./data";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import TextareaComponent, { TextareaStyled } from "@/app/components/textarea";
import CardItem from "@/app/components/cardTabItem";
import Iconify from "@/app/components/icons/iconify";

export default function FormKategoriField({ mode }: { mode?: string }) {
  return (
    <Stack gap={1}>
      {dataKriteriaRisiko.map((item) => (
        <Box
          sx={{
            ".MuiPaper-root": {
              minWidth: "0 !important",
            },
          }}
        >
          <CardItem
            title={item.category}
            addButton={
              <Button
                color="primary"
                variant="contained"
                size="small"
                sx={{
                  borderRadius: 50,
                }}
              >
                Tambah {item.category}
              </Button>
            }
          >
            <FormControl fullWidth>
              <Stack direction="row" gap={1}>
                <TextareaComponent
                  placeholder={`Sub Kategori Risiko`}
                  row={2}
                  width="100%"
                />
                <TextareaComponent
                  placeholder={`Uraian`}
                  row={2}
                  width="100%"
                />
                <Stack alignItems="center" justifyContent="center">
                  <IconButton color="error">
                    <Iconify name="mdi:delete" />
                  </IconButton>
                </Stack>
              </Stack>
            </FormControl>
          </CardItem>
        </Box>
      ))}
    </Stack>
  );
}

import React, { Fragment } from "react";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import AddButton from "@/app/components/buttonAdd";
import TextareaComponent from "@/app/components/textarea";
import { IconFA } from "@/app/components/icons/icon-fa";
import { red } from "@mui/material/colors";

const ItemDampak = ({
  children,
  number,
}: {
  children: React.ReactNode;
  number: number;
}) => {
  return (
    <FormControl fullWidth sx={{ position: "relative" }}>
      {children}
      <Box
        position="absolute"
        top="8px"
        right="8px"
        bgcolor="black"
        color="white"
        borderRadius="50%"
        width="20px"
        height="20px"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        fontSize={12}
      >
        {number}
      </Box>
    </FormControl>
  );
};

export default function FormDampak({ mode }: { mode?: string }) {
  const [items, setItem] = React.useState([{ id: 1 }]);

  const add = () => {
    let arr = [...items];
    if (arr.length >= 10) {
      return;
    } else {
      arr.push({ id: Math.floor(Math.random() * 1000) });
    }
    const newItem = arr;
    setItem(newItem);
  };

  const minus = (nowId: any) => {
    let arr = [...items];
    let newArr = arr.filter((val) => {
      if (nowId === val.id) {
        return false;
      } else {
        return true;
      }
    });
    setItem(newArr);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Area" titleField />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Area"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight={600}>Dampak</Typography>
          <Box>
            <AddButton title="Tambah Dampak" small noMargin onclick={add} />
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack gap={2}>
          {/* ITEM DAMPAK */}
          {items.map((tags: any, key: any) => (
            <Paper
              key={`${tags.id}`}
              variant="outlined"
              elevation={0}
              sx={{ p: 2, minWidth: "0 !important" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Stack justifyContent="space-between" direction="row">
                      <Typography fontWeight={600}>
                        Dampak #{key + 1}
                      </Typography>
                      {key > 0 && (
                        <AddButton
                          errorColor
                          title="Hapus"
                          noMargin
                          onclick={() => minus(tags.id)}
                        />
                      )}
                    </Stack>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextareaComponent row={2} label="" placeholder="Dampak" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ItemDampak number={1}>
                    <TextareaComponent
                      row={2}
                      label=""
                      placeholder="Tidak Signifikan"
                    />
                  </ItemDampak>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ItemDampak number={2}>
                    <TextareaComponent row={2} label="" placeholder="Minor" />
                  </ItemDampak>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ItemDampak number={3}>
                    <TextareaComponent row={2} label="" placeholder="Moderat" />
                  </ItemDampak>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ItemDampak number={4}>
                    <TextareaComponent
                      row={2}
                      label=""
                      placeholder="Signifikan"
                    />
                  </ItemDampak>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ItemDampak number={5}>
                    <TextareaComponent
                      row={2}
                      label=""
                      placeholder="Sangat Signifikan"
                    />
                  </ItemDampak>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

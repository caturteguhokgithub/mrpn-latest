import React, { Fragment } from "react";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import AddButton from "@/components/buttonAdd";
import { IconFA } from "@/components/icons/icon-fa";
import { listEntity } from "@/app/executive-summary/data";

type Option = (typeof listEntity)[number];

const ItemKP = () => {
  return (
    <Grid item xs={11}>
      <FormControl fullWidth>
        <TextField
          variant="outlined"
          size="small"
          placeholder={`Parent Menu`}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default function FormTable({ mode }: { mode?: string }) {
  const [roDropdown, setRoDropdown] = React.useState("");
  const [itemMenu, setItemMenu] = React.useState([{ id: 1 }]);
  const [itemSubMenu, setItemSubMenu] = React.useState([{ id: 1 }]);
  const [columns, setColumns] = React.useState<Option[]>([]);
  const [selectAll, setSelectAll] = React.useState<boolean>(false);

  const addSub = () => {
    let arr = [...itemSubMenu];
    if (arr.length >= 10) {
      return;
    } else {
      arr.push({ id: Math.floor(Math.random() * 1000) });
    }
    const newItem = arr;
    setItemSubMenu(newItem);
  };

  const minusSub = (nowId: any) => {
    let arr = [...itemSubMenu];
    let newArr = arr.filter((val) => {
      if (nowId === val.id) {
        return false;
      } else {
        return true;
      }
    });
    setItemSubMenu(newArr);
  };

  const addMenu = () => {
    let arr = [...itemMenu];
    if (arr.length >= 10) {
      return;
    } else {
      arr.push({ id: Math.floor(Math.random() * 1000) });
    }
    const newItem = arr;
    setItemMenu(newItem);
  };

  const minusMenu = (nowId: any) => {
    let arr = [...itemMenu];
    let newArr = arr.filter((val) => {
      if (nowId === val.id) {
        return false;
      } else {
        return true;
      }
    });
    setItemMenu(newArr);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} gap={2} display="flex" flexDirection="column">
          {itemMenu.map((tags: any) => (
            <Paper
              variant="outlined"
              sx={{ p: 2, minWidth: "0 !important", position: "relative" }}
              key={`${tags.id}`}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FieldLabelInfo
                    titleSection
                    title="Parent Menu"
                    information="Parent Menu"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder={`Parent Menu`}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FieldLabelInfo
                    titleSection
                    title="Sub-menu"
                    information="Sub-menu"
                  />
                </Grid>
                {itemSubMenu.map((tags: any) => (
                  <Fragment key={`${tags.id}`}>
                    <ItemKP />
                    <Grid item lg={1}>
                      <FormControl sx={{ mt: 0.5 }}>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => minusSub(tags.id)}
                        >
                          <IconFA size={18} name="trash-can" />
                        </IconButton>
                      </FormControl>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
              <FormControl sx={{ mt: 2 }}>
                <AddButton title="Tambah Sub-menu" noMargin onclick={addSub} />
              </FormControl>
              <Box position="absolute" top={8} right={8}>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => minusMenu(tags.id)}
                >
                  <IconFA size={18} name="trash-can" />
                </IconButton>
              </Box>
            </Paper>
          ))}
          <FormControl>
            <AddButton title="Tambah Menu" filled noMargin onclick={addMenu} />
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

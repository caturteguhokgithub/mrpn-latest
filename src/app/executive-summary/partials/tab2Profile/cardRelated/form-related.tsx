import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  SxAutocompleteTextField,
  SxAutocomplete,
} from "@/components/dropdown/dropdownRkp";
import { grey } from "@mui/material/colors";
import { paramVariantDefault } from "@/app/utils/constant";
import { MiscMasterListKebijakanRes } from "@/app/misc/master/masterServiceModel";
import {
  ExsumRelatedInitState,
  ExsumRelatedDto,
} from "@/app/executive-summary/partials/tab2Profile/cardRelated/cardRelatedModel";
import type ReactQuill from "react-quill";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

const FCLItem = ({ keyIndex, item }: { keyIndex: any; item: string }) => {
  return (
    <FormControlLabel
      key={keyIndex}
      control={<Checkbox name={item} sx={{ py: 0 }} />}
      label={
        <Stack direction="row" alignItems="flex-start" gap={1}>
          <Typography color={grey[600]}>{keyIndex + 1}.</Typography> {item}
        </Stack>
      }
      sx={{ alignItems: "flex-start" }}
    />
  );
};

const MultiCheckbox = ({
  title,
  children,
  maxHeight,
}: {
  title: string;
  children: React.ReactNode;
  maxHeight?: number;
}) => {
  return (
    <Card variant="outlined">
      <CardContent sx={{ pb: "16px !important" }}>
        <FormControl
          component="fieldset"
          variant="standard"
          sx={{ gap: 2, width: "100%" }}
        >
          <FormLabel component="legend">{title}</FormLabel>
          <FormGroup
            sx={{
              mt: 2,
              gap: 1,
              overflowY: "auto",
              flexWrap: "nowrap",
              maxHeight: maxHeight ? maxHeight : 150,
              "&::-webkit-scrollbar": {
                width: "3px",
              },
              ".MuiCheckbox-root": {
                p: "2px 10px",
              },
            }}
          >
            {children}
          </FormGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: React.LegacyRef<ReactQuill>;
}

export default function FormRelated({
  mode,
  options,
  state,
  setState,
}: {
  mode?: string;
  options: MiscMasterListKebijakanRes[];
  state: ExsumRelatedInitState;
  setState: (params: any) => void;
}) {
  const [data, setData] = useState([
    {
      id: 1,
      parent: false,
      indeterminate: false,
      open: false,
      children: [
        { id: 1.1, checked: false },
        { id: 1.2, checked: false },
      ],
    },
    {
      id: 2,
      parent: false,
      indeterminate: false,
      open: false,
      children: [
        { id: 2.1, checked: false },
        { id: 2.2, checked: false },
      ],
    },
  ]);
  const handleParentCheckboxChange = (parentId: any) => {
    const newData = data.map((item) => {
      if (item.id === parentId) {
        const newParentState = !item.parent;
        return {
          ...item,
          parent: newParentState,
          indeterminate: false,
          children: item.children.map((child) => ({
            ...child,
            checked: newParentState,
          })),
        };
      }
      return item;
    });
    setData(newData);
  };

  const handleChildCheckboxChange = (parentId: any, childId: any) => {
    const newData = data.map((item) => {
      if (item.id === parentId) {
        const newChildren = item.children.map((child) => {
          if (child.id === childId) {
            return { ...child, checked: !child.checked };
          }
          return child;
        });
        const allChecked = newChildren.every((child) => child.checked);
        const noneChecked = newChildren.every((child) => !child.checked);
        return {
          ...item,
          parent: allChecked,
          indeterminate: !allChecked && !noneChecked,
          children: newChildren,
        };
      }
      return item;
    });
    setData(newData);
  };

  const handleExpandClick = (parentId: any) => {
    const newData = data.map((item: any) => {
      if (item.id === parentId) {
        return { ...item, open: !item.open };
      }
      return item;
    });
    setData(newData);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Kebijakan"
              titleField
              information="Garis-garis besar arah, maksud dan tujuan, serta sasaran dan strategi Entitas MRPN dalam
mendesain, mengimplementasikan, mengevaluasi, serta meningkatkan dan mengembangkan
MRPN"
            />
            {mode === "add" || mode === "edit" ? (
              <Autocomplete
                key={state.options.length}
                size="small"
                multiple
                disableCloseOnSelect
                options={options}
                getOptionLabel={(option: MiscMasterListKebijakanRes) =>
                  option.name
                }
                value={state.options}
                onChange={(event, value) =>
                  setState((prev: ExsumRelatedInitState) => {
                    return {
                      ...prev,
                      options: value ?? [],
                    };
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Pilih kebijakan"
                    sx={SxAutocompleteTextField(paramVariantDefault)}
                  />
                )}
                renderTags={(
                  value: MiscMasterListKebijakanRes[],
                  getTagProps
                ) => {
                  return value.map(
                    (option: MiscMasterListKebijakanRes, index: number) => {
                      const { key, ...restProps } = getTagProps({ index });
                      return (
                        <Chip
                          key={option.id}
                          size="small"
                          label={option.name}
                          {...restProps}
                        />
                      );
                    }
                  );
                }}
                sx={{
                  ...SxAutocomplete,
                  ".MuiInputBase-root": {
                    borderRadius: 1,
                  },
                }}
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
          <Stack
            // gap={2}
            sx={{
              ".MuiPaper-root": {
                minWidth: "0 !important",
              },
            }}
          >
            {state.options.map(
              (option: MiscMasterListKebijakanRes, index: number) =>
                option.list.length > 0 && (
                  <Box key={index} mt={2}>
                    <MultiCheckbox title={option.name} maxHeight={200}>
                      {option.list.map((item, index2) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={item?.isCheck}
                              onChange={(event) =>
                                setState((prev: ExsumRelatedInitState) => {
                                  const newVal = { ...prev };
                                  newVal.options[index].list[index2].isCheck =
                                    event.target.checked;
                                  return newVal;
                                })
                              }
                              name={item.value}
                              sx={{ py: 0 }}
                            />
                          }
                          label={

                            <Stack
                              direction="row"
                              alignItems="flex-start"
                              gap={1}
                            >
                              <Typography color={grey[600]}>
                                {index2 + 1}.
                              </Typography>{" "}
                              <Stack direction={"column"} gap={0}>
                                <>
                                  {item.value}
                                </>
                                <List
                                  sx={{ ml: 2, listStyleType: "disc", py:0 }}
                                >
                                  {item.child.map((child) => (
                                    <ListItem
                                      sx={{
                                        py:0,
                                        display: "list-item",
                                        px: 1,
                                      }}
                                    >
                                      <Typography color={grey[700]}>
                                        {child.value}
                                      </Typography>{" "}
                                    </ListItem>
                                  ))}
                                </List>
                              </Stack>
                            </Stack>
                          }
                          sx={{ alignItems: "flex-start" }}
                        />
                      ))}
                    </MultiCheckbox>
                  </Box>
                )
            )}

            {/*<Stack flexDirection="column" mt={2} gap={1}>*/}
            {/*  {state.options.map(*/}
            {/*    (option: MiscMasterListKebijakanRes, index: number) =>*/}
            {/*      option.list.length > 0 && (*/}
            {/*        <Box key={index}>*/}
            {/*          <Box p={2} bgcolor={grey[200]} fontWeight={600}>*/}
            {/*            {option.name}*/}
            {/*          </Box>*/}
            {/*          <TableContainer*/}
            {/*            component={Paper}*/}
            {/*            elevation={0}*/}
            {/*            variant="outlined"*/}
            {/*          >*/}
            {/*            <Table size="small">*/}
            {/*              <TableBody*/}
            {/*                sx={{*/}
            {/*                  td: {*/}
            {/*                    px: 1,*/}
            {/*                  },*/}
            {/*                }}*/}
            {/*              >*/}
            {/*                {data.map((item) => (*/}
            {/*                  <React.Fragment key={item.id}>*/}
            {/*                    <TableRow>*/}
            {/*                      <TableCell sx={{ width: 10 }}>*/}
            {/*                        <IconButton*/}
            {/*                          aria-label="expand row"*/}
            {/*                          size="small"*/}
            {/*                          onClick={() => handleExpandClick(item.id)}*/}
            {/*                        >*/}
            {/*                          {item.open ? (*/}
            {/*                            <KeyboardArrowUp />*/}
            {/*                          ) : (*/}
            {/*                            <KeyboardArrowDown />*/}
            {/*                          )}*/}
            {/*                        </IconButton>*/}
            {/*                      </TableCell>*/}
            {/*                      <TableCell>*/}
            {/*                        <Checkbox*/}
            {/*                          sx={{ p: 0 }}*/}
            {/*                          checked={item.parent}*/}
            {/*                          indeterminate={item.indeterminate}*/}
            {/*                          onChange={() =>*/}
            {/*                            handleParentCheckboxChange(item.id)*/}
            {/*                          }*/}
            {/*                        />*/}
            {/*                      </TableCell>*/}
            {/*                    </TableRow>*/}
            {/*                    <TableRow>*/}
            {/*                      <TableCell*/}
            {/*                        style={{ paddingBottom: 0, paddingTop: 0 }}*/}
            {/*                        colSpan={6}*/}
            {/*                      >*/}
            {/*                        <Collapse*/}
            {/*                          in={item.open}*/}
            {/*                          timeout="auto"*/}
            {/*                          unmountOnExit*/}
            {/*                        >*/}
            {/*                          <List*/}
            {/*                            sx={{ ml: 4, listStyleType: "disc" }}*/}
            {/*                          >*/}
            {/*                            {item.children.map((child: any) => (*/}
            {/*                              <ListItem*/}
            {/*                                sx={{*/}
            {/*                                  display: "list-item",*/}
            {/*                                  px: 1,*/}
            {/*                                }}*/}
            {/*                              >*/}
            {/*                                /!* <Checkbox*/}
            {/*                            checked={child.checked}*/}
            {/*                            onChange={() =>*/}
            {/*                              handleChildCheckboxChange(*/}
            {/*                                item.id,*/}
            {/*                                child.id*/}
            {/*                              )*/}
            {/*                            }*/}
            {/*                          /> *!/*/}
            {/*                                Lorem ipsum dolor sit amet*/}
            {/*                                consectetur adipisicing elit.*/}
            {/*                                Explicabo amet labore expedita odio*/}
            {/*                                odit doloremque consectetur*/}
            {/*                                exercitationem omnis quasi! Quasi*/}
            {/*                                nam harum amet, doloremque assumenda*/}
            {/*                                placeat obcaecati mollitia molestiae*/}
            {/*                                porro. {child.id}*/}
            {/*                              </ListItem>*/}
            {/*                            ))}*/}
            {/*                          </List>*/}
            {/*                        </Collapse>*/}
            {/*                      </TableCell>*/}
            {/*                    </TableRow>*/}
            {/*                  </React.Fragment>*/}
            {/*                ))}*/}
            {/*              </TableBody>*/}
            {/*            </Table>*/}
            {/*          </TableContainer>*/}
            {/*        </Box>*/}
            {/*      )*/}
            {/*  )}*/}
            {/*</Stack>*/}
          </Stack>
        </Grid>
        {/* <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Keterangan" />
            {mode === "add" ? (
              <Stack
                gap={2}
                sx={{
                  ".MuiPaper-root": {
                    minWidth: "0 !important",
                  },
                }}
              >
                <TextareaStyled
                  value={state.value}
                  minRows={3}
                  onChange={(e) => {
                    setState((prev: ExsumRelatedInitState) => {
                      return {
                        ...prev,
                        value: e.target.value,
                      };
                    });
                  }}
                />

                {state.options.map(
                  (option: MiscMasterListKebijakanRes, index: number) =>
                    option.list.length > 0 && (
                      <Box key={index}>
                        <MultiCheckbox title={option.name} maxHeight={200}>
                          {option.list.map((item, index2) => (
                            <Fragment key={index2}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={item?.isCheck}
                                    onChange={(event) =>
                                      setState(
                                        (prev: ExsumRelatedInitState) => {
                                          const newVal = { ...prev };
                                          newVal.options[index].list[
                                            index2
                                          ].isCheck = event.target.checked;
                                          return newVal;
                                        }
                                      )
                                    }
                                    name={item.value}
                                    sx={{ py: 0 }}
                                  />
                                }
                                label={
                                  <Stack
                                    direction="row"
                                    alignItems="flex-start"
                                    gap={1}
                                  >
                                    <Typography color={grey[600]}>
                                      {index2 + 1}.
                                    </Typography>{" "}
                                    {item.value}
                                  </Stack>
                                }
                                sx={{ alignItems: "flex-start" }}
                              />
                            </Fragment>
                          ))}
                        </MultiCheckbox>
                      </Box>
                    )
                )}
              </Stack>
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid> */}
      </Grid>
    </>
  );
}

import {
  ManagementRoleDto,
  ManagementRoleReqDto,
} from "@/app/manajemen-role/pageModel";
import {
  FormControl,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import React, { SetStateAction, useEffect } from "react";
import {
  AutocompleteSelectMultiple,
  AutocompleteSelectSingle,
} from "@/components/autocomplete";
import {
  ManagementUserDataDto,
  ManagementUserStateDto,
  OptionKP,
} from "@/app/manajemen-user/pageModel";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { ProjectDefaultDto } from "@/lib/core/context/rkpContext";

export default function FormUser({
  mode,
  roleData,
  request,
  setRequest,
  optionKP,
}: {
  mode: string;
  roleData: ManagementRoleDto[];
  request: ManagementUserStateDto;
  setRequest: (value: SetStateAction<ManagementUserStateDto>) => void;
  optionKP: OptionKP[];
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Tipe User" />
          {mode != "view" ? (
            <AutocompleteSelectSingle
              key={request.id}
              value={request.type}
              options={["BAPPENAS", "NON BAPPENAS"]}
              getOptionLabel={(opt) => opt}
              handleChange={(e: string) =>
                setRequest((prevState) => {
                  return {
                    ...prevState,
                    type: e,
                  };
                })
              }
              placeHolder={"Pilih tipe user"}
            />
          ) : (
            <Typography>{request.type}</Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          {request.type == "BAPPENAS" || mode == "view" ? null : (
            <>
              <FieldLabelInfo title="Password" />
              <TextField
                variant="outlined"
                size="small"
                placeholder="Password"
                InputLabelProps={{
                  shrink: true,
                }}
                value={request.password}
                onChange={(e) =>
                  setRequest((prevState) => {
                    return {
                      ...prevState,
                      password: e.target.value,
                    };
                  })
                }
              />
            </>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Nama User" />
          {mode != "view" ? (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Nama User"
              InputLabelProps={{
                shrink: true,
              }}
              value={request.name}
              onChange={(e) =>
                setRequest((prevState) => {
                  return {
                    ...prevState,
                    name: e.target.value,
                  };
                })
              }
            />
          ) : (
            <Typography>{request.name}</Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Email" />
          {mode != "view" ? (
            <TextField
              error={false}
              variant="outlined"
              size="small"
              placeholder="Email"
              // helperText="Email sudah digunakan, coba email lain"
              InputLabelProps={{
                shrink: true,
              }}
              value={request.email}
              onChange={(e) =>
                setRequest((prevState) => {
                  return {
                    ...prevState,
                    email: e.target.value,
                  };
                })
              }
            />
          ) : (
            <Typography>{request.email}</Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Role User" />
          {mode != "view" ? (
            <AutocompleteSelectSingle
              key={request.id}
              value={request.role_id}
              options={roleData}
              getOptionLabel={(opt) => opt.name}
              handleChange={(e: ManagementRoleDto) =>
                setRequest((prevState) => {
                  return {
                    ...prevState,
                    role_id: e,
                  };
                })
              }
              placeHolder={"Pilih Role User"}
            />
          ) : (
            <Typography>{request.role_id?.name ?? "-"}</Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Allowed KP" />
          {mode != "view" ? (
            <AutocompleteSelectMultiple
              value={request.options}
              options={optionKP}
              getOptionLabel={(opt) =>
                `${opt.code} ${opt.value} (${opt.tahun})`
              }
              handleChange={(e: OptionKP[]) =>
                setRequest((prevState) => {
                  return {
                    ...prevState,
                    options: e,
                  };
                })
              }
              placeHolder={"Select KP"}
              labelSelectAll={"Select all KP"}
              labelSelectAllSearchResult={"Select all search results KP"}
            />
          ) : request.options.length > 0 ? (
            <List>
              {request.options.map((x) => (
                <ListItem
                  sx={{
                    display: "list-item",
                    listStyleType: "square",
                    padding: 0,
                    marginLeft: 2,
                    marginTop: 0,
                  }}
                >
                  <Typography>{`${x.code} ${x.value} (${x.tahun})`}</Typography>
                </ListItem>
              ))}
            </List>
          ) : (
            "-"
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
}

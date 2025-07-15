import React, {useEffect, useState} from "react";
import {DateRange, RangeKeyDict} from "react-date-range";
import {Box, InputAdornment, Popover, Stack, TextField} from "@mui/material";
import moment from "moment";
import {IconFA} from "../icons/icon-fa";
import {grey} from "@mui/material/colors";
import dayjs from "dayjs";

export interface DateRangeState {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string | undefined;
}

export interface DateRangeStateToString {
  startDate: string;
  endDate: string;
}

export function convertDateToString(data: DateRangeState[]): DateRangeStateToString {

  const startDate = dayjs(data[0].startDate).format('YYYY-MM-DD')
  const endDate = dayjs(data[0].endDate).format('YYYY-MM-DD')

  return {
    startDate: startDate,
    endDate: endDate
  }
}

export function convertStringToDate(start:string, end:string): DateRangeState[] {

  const startDate = dayjs(start).toDate()
  const endDate = dayjs(end).toDate()

  return [
    {
      startDate: startDate,
      endDate: endDate,
      key: "selection"
    }
  ]
}

const DateRangePicker = (
  {
    small,
    placeholder,
    rounded,
    sxInput,
    initState,
    handleChangeState
  }: {
    small?: boolean;
    placeholder?: string;
    rounded?: boolean;
    sxInput?: React.CSSProperties;
    initState?: DateRangeState[];
    handleChangeState?: any
  }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const curState = initState ?? [
    {
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    },
  ]
  const [state, setState] = useState<DateRangeState[]>(curState);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    const {selection} = ranges;
    setState([
      {
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: selection.key,
      },
    ]);
  };

  const handleClear = () => {
    setState([
      {
        startDate: undefined,
        endDate: undefined,
        key: "selection",
      },
    ]);
  };

  const areDatesDefined = state[0].startDate && state[0].endDate;

  useEffect(() => {
    if (handleChangeState !== undefined) handleChangeState(state);
  }, [state]);

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <DateRange
          editableDateInputs={true}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={state}
          months={2}
          direction="horizontal"
        />
      </Popover>
      <Box position="relative">
        <TextField
          size="small"
          onClick={handleClick}
          placeholder={placeholder}
          value={
            areDatesDefined
              ? `${
                state[0].startDate
                  ? moment.utc(state[0].startDate).utcOffset(7).format("D MMM YYYY")
                  : ""
              } - ${
                state[0].endDate
                  ? moment.utc(state[0].endDate).utcOffset(7).format("D MMM YYYY")
                  : ""
              }`
              : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  cursor: "pointer",
                  width: "36px",
                  height: "40px",
                  maxHeight: "40px",
                  px: 1,
                }}
              />
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            width: "100%",
            minWidth: 280,
            zoom: small ? 0.9 : 1,
            ".MuiInputBase-root": {
              ...sxInput,
              pl: 0.5,
              pr: 0,
              borderRadius: rounded ? 10 : 1,
              bgcolor: "white",
              "input::-webkit-input-placeholder": {
                color: grey[600],
                opacity: 1,
                fontStyle: "italic",
              },
            },
          }}
        />
        {areDatesDefined && (
          <Stack
            alignItems="center"
            justifyContent="center"
            width={36}
            height={40}
            position="absolute"
            top={0}
            right={0}
            sx={{cursor: "pointer", pr: 2}}
          >
            <IconFA name="xmark" size={20} onclick={handleClear}/>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default DateRangePicker;

import React, { Fragment } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Chip,
  CircularProgress,
  Grow,
  Stack,
  Typography,
} from "@mui/material";
import { green, grey, orange } from "@mui/material/colors";
import TooltipCP from "./tooltip";
import Iconify from "@/components/icons/iconify";
import { bgColorTh } from "@/utils/color";
import {
  BlockCell,
  ChildRow,
  HtmlTooltip,
  ParentBlock,
  ParentRow,
  StyledPaper,
  StyledTable,
} from "../style";
import { months } from "../data";
import {
  ChildData,
  DataCPType,
  DataRoKunci,
  MonthData,
} from "../cardCriticalModel";
import {
  FormatCurrency,
  FormatCurrencyID,
  formatNumberID,
} from "@/lib/utils/currency";
import { NumericFormat } from "react-number-format";

// Helper function to group consecutive months
const groupConsecutiveMonths = (months: any) => {
  const groups: any = [];
  let currentGroup: any = null;

  months.forEach((value: any, index: any) => {
    // Check if month has data (id is not empty string)
    const hasData = value && value.id !== "";

    if (hasData) {
      if (currentGroup === null) {
        currentGroup = { start: index, count: 1 };
      } else {
        currentGroup.count++;
      }
    } else {
      if (currentGroup !== null) {
        groups.push(currentGroup);
        currentGroup = null;
      }
    }
  });

  if (currentGroup !== null) {
    groups.push(currentGroup);
  }

  return groups;
};

export default function ProjectTable({
  year,
  dataCP,
  dataROKunci,
  isLoading,
}: {
  year: number;
  dataCP: DataCPType[];
  dataROKunci: DataRoKunci;
  isLoading?: boolean;
}) {
  const renderMonthCells = (
    monthsData: (MonthData | null)[],
    color: string,
    childData: ChildData
  ) => {
    const monthGroups = groupConsecutiveMonths(monthsData);
    let currentMonth = 0;
    const cells = [];

    // Get all non-null months for this child
    const allMonths = monthsData.filter(
      (month) => month && month.id !== ""
    ) as MonthData[];

    // Handle empty months before first group
    if (monthGroups.length > 0 && monthGroups[0].start > 0) {
      cells.push(
        <TableCell key={`empty-start`} colSpan={monthGroups[0].start} />
      );
      currentMonth = monthGroups[0].start;
    } else if (monthGroups.length === 0) {
      // No groups at all - empty row
      return <TableCell key="empty-all" colSpan={12} />;
    }

    // Process each group
    monthGroups.forEach((group: any, groupIndex: any) => {
      // Get the months data for this group
      const groupMonths = monthsData
        .slice(group.start, group.start + group.count)
        .filter((month) => month && month.id !== "") as MonthData[];

      // const total = groupMonths.reduce((sum, month) => {
      //   const target =
      //     typeof month.target === "string"
      //       ? parseFloat(month.target)
      //       : month.target || 0;
      //   return sum + target;
      // }, 0);

      // const cleanNumber = (value: string | number): number => {
      //   if (typeof value === "number") return value;
      //   // Remove any non-numeric characters except decimal point
      //   const cleaned = value.replace(/[^\d.-]/g, "");
      //   return parseFloat(cleaned) || 0;
      // };

      const cleanNumber = (value: string | number): number => {
        return typeof value === "number" ? value : parseFloat(value) || 0;
      };

      const total = groupMonths.reduce(
        (sum, month) => sum + cleanNumber(month.target),
        0
      );

      console.log("Total for group:", total);

      // Add the block cell
      cells.push(
        <BlockCell
          key={`block-${groupIndex}`}
          color={color}
          colSpan={group.count}
        >
          <HtmlTooltip
            title={<TooltipCP data={{ months: groupMonths, childData }} />}
            // title={<TooltipCP data={{ months: allMonths, childData }} />}
            followCursor
            TransitionComponent={Grow}
            placement="bottom-start"
          >
            <Box component="div">
              <Typography
                fontSize={12}
                color="black"
                position="absolute"
                top="50%"
                left="50%"
                sx={{ transform: "translate(-50%, -50%)" }}
              >
                <NumericFormat
                  value={total}
                  decimalScale={2}
                  decimalSeparator=","
                  thousandSeparator="."
                  displayType="text"
                  renderText={(value) => <b>{value}</b>}
                />
              </Typography>
            </Box>
          </HtmlTooltip>
        </BlockCell>
      );
      currentMonth = group.start + group.count;

      // Check if we need empty cells after this group
      const nextGroup = monthGroups[groupIndex + 1];
      if (nextGroup) {
        const emptyCount = nextGroup.start - currentMonth;
        if (emptyCount > 0) {
          cells.push(
            <TableCell key={`empty-${groupIndex}`} colSpan={emptyCount} />
          );
          currentMonth += emptyCount;
        }
      }
    });

    // Handle empty months after last group
    if (currentMonth < 12 && monthGroups.length > 0) {
      cells.push(<TableCell key="empty-end" colSpan={12 - currentMonth} />);
    }

    return cells;
  };

  const renderYearCells = (
    parentData: any // Use parent data instead of child months
  ) => {
    const years = [2025, 2026, 2027, 2028, 2029];
    const cells: any = [];

    // Convert startYear and endYear to numbers
    const startYear = parseInt(parentData.startYear);
    const endYear = parseInt(parentData.endYear);

    // Calculate the duration in years (inclusive of both start and end year)
    const duration = endYear - startYear + 1;

    // Find the index of the start year in our years array
    const startIndex = years.indexOf(startYear);

    // Add empty cells for years before the start year
    for (let i = 0; i < startIndex; i++) {
      cells.push(<TableCell key={`empty-before-${i}`} colSpan={1} />);
    }

    // Add the main block cell spanning the duration
    if (startIndex >= 0 && duration > 0) {
      cells.push(
        <BlockCell
          key={`year-block`}
          color={parentData.color} // Use parent color
          colSpan={duration}
        >
          <HtmlTooltip
            title={<TooltipCP isParent data={parentData} year={0} />}
            followCursor
            TransitionComponent={Grow}
            placement="bottom-start"
          >
            <ParentBlock color={parentData.color} />
          </HtmlTooltip>
        </BlockCell>
      );
    }

    // Add empty cells for years after the end year
    const remainingCells = 5 - (startIndex + duration);
    for (let i = 0; i < remainingCells; i++) {
      cells.push(<TableCell key={`empty-after-${i}`} colSpan={1} />);
    }

    return cells;
  };

  return (
    <Fragment>
      <StyledPaper>
        <StyledTable stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  bgcolor: bgColorTh,
                  borderRight: `1px solid ${grey[300]}`,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  RO/Project Kunci
                  <HtmlTooltip
                    title={
                      <Box
                        bgcolor="white"
                        color={grey[800]}
                        p={"10px 16px"}
                        width={520}
                        boxShadow="rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;"
                        sx={{
                          "strong, span": {
                            fontSize: 13,
                            lineHeight: 1.2,
                          },
                        }}
                      >
                        <Typography>RO Kunci</Typography>
                        <Box component="ul" pl={3}>
                          {dataROKunci.roKunci.map((parent) => (
                            <Box component="li" lineHeight={1.3} my={1}>
                              <Typography
                                key={parent.id}
                                fontSize={14}
                                component="span"
                                color={
                                  parent.is_selected ? grey[800] : grey[600]
                                }
                                fontWeight={parent.is_selected ? 500 : 400}
                              >
                                {parent.code} - {parent.value}
                              </Typography>
                              {parent.is_selected ? (
                                <Iconify
                                  size={16}
                                  name="mdi:check-bold"
                                  color={green[300]}
                                  sx={{
                                    position: "relative",
                                    top: 3,
                                    marginLeft: 4,
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    }
                    followCursor
                    TransitionComponent={Grow}
                    placement="bottom-start"
                  >
                    <Chip
                      size="small"
                      variant="filled"
                      color="default"
                      label={
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          fontSize={12}
                        >
                          {isLoading ? (
                            <CircularProgress size={14} color="inherit" />
                          ) : (
                            <>
                              <Iconify name="mdi:key-variant" size={14} />
                              <Typography fontWeight={600} component="span">
                                {dataROKunci.summary.is_selected}
                              </Typography>{" "}
                              /{" "}
                              <Typography component="span" fontSize={13}>
                                {dataROKunci.summary.total}
                              </Typography>
                            </>
                          )}
                        </Stack>
                      }
                      sx={{ px: 1, cursor: "default" }}
                    />
                  </HtmlTooltip>
                </Stack>
              </TableCell>
              {year === 0
                ? [2025, 2026, 2027, 2028, 2029].map((year) => (
                    <TableCell
                      key={year}
                      align="center"
                      sx={{
                        bgcolor: bgColorTh,
                        textTransform: "uppercase",
                      }}
                    >
                      {year}
                    </TableCell>
                  ))
                : months.map((month) => (
                    <TableCell
                      key={month}
                      align="center"
                      sx={{
                        bgcolor: bgColorTh,
                        textTransform: "uppercase",
                      }}
                    >
                      {month}
                    </TableCell>
                  ))}
              {year > 0 && (
                <TableCell
                  sx={{
                    bgcolor: bgColorTh,
                    borderLeft: `1px solid ${grey[300]}`,
                  }}
                >
                  Total Target
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataCP.map((parent) => (
              <React.Fragment key={parent.id}>
                {/* Parent Row */}
                <ParentRow color={year > 0 ? "#f5f5f5" : "transparent"}>
                  <TableCell
                    component="th"
                    scope="row"
                    width={year > 0 ? "40%" : "50%"}
                    sx={{ py: 1 }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      gap={2}
                    >
                      <Stack direction="row" alignItems="center" gap={1}>
                        {year > 0 && (
                          <Box width={40} flex={0} lineHeight={1}>
                            <Iconify name="mdi:send" size={16} />
                          </Box>
                        )}
                        <Stack gap={0.5}>
                          <Stack direction="row" alignItems="center" gap={1}>
                            <Box>
                              <Chip
                                size="small"
                                color="default"
                                label={
                                  <>
                                    <Typography
                                      component="span"
                                      color={grey[500]}
                                      fontSize={14}
                                    >
                                      {parent.type_ro === "NON_RO"
                                        ? "NON-RO"
                                        : "RO"}{" "}
                                    </Typography>
                                    {parent.type_ro !== "NON_RO" && (
                                      <Typography
                                        component="span"
                                        fontSize={14}
                                        color={grey[700]}
                                      >
                                        {parent.code_ro}
                                      </Typography>
                                    )}
                                  </>
                                }
                                sx={{
                                  px: 0.5,
                                }}
                              />
                            </Box>
                            {parent.type_ro !== "NON_RO" && (
                              <Box>
                                <Chip
                                  size="small"
                                  color="default"
                                  label={
                                    <>
                                      <Typography
                                        component="span"
                                        color={grey[500]}
                                        fontSize={14}
                                      >
                                        PKKR{" "}
                                      </Typography>
                                      <Typography
                                        component="span"
                                        fontSize={14}
                                        color={grey[700]}
                                      >
                                        {parent.code_pkkr}
                                      </Typography>
                                    </>
                                  }
                                  sx={{
                                    px: 0.5,
                                  }}
                                />
                              </Box>
                            )}
                          </Stack>
                          <HtmlTooltip
                            title={
                              <TooltipCP isParent data={parent} year={year} />
                            }
                            followCursor
                            TransitionComponent={Grow}
                            placement="bottom-start"
                          >
                            <Typography
                              fontWeight={600}
                              sx={{
                                cursor: "pointer",
                                color: parent.intervention
                                  ? orange[600]
                                  : "inherit",
                              }}
                            >
                              {parent.intervention && (
                                <Iconify name="mdi:key-variant" size={14} />
                              )}{" "}
                              {parent.ro}
                            </Typography>
                          </HtmlTooltip>
                        </Stack>
                      </Stack>
                      <Chip
                        label={parent.category}
                        size="small"
                        sx={{
                          fontWeight: 500,
                          fontSize: 12,
                          px: 0.5,
                          lineHeight: 1.2,
                          textTransform: "uppercase",
                          color: "white",
                          bgcolor:
                            parent.kategori_proyek_id === 1
                              ? "#C63C51"
                              : parent.kategori_proyek_id === 2
                              ? "#8C3061"
                              : parent.kategori_proyek_id === 3
                              ? "#FFD35A"
                              : parent.kategori_proyek_id === 3
                              ? "#FFA823"
                              : "#DC0083",
                        }}
                      />
                    </Stack>
                  </TableCell>
                  {year === 0 ? (
                    renderYearCells(parent)
                  ) : (
                    <Fragment>
                      <BlockCell colSpan={13} color={grey[700]}>
                        {/* <HtmlTooltip
                          title={
                            <TooltipCP isParent data={parent} year={year} />
                          }
                          followCursor
                          TransitionComponent={Grow}
                          placement="bottom-start"
                        >
                          <Box
                            color={year > 0 ? "transparent" : parent.color}
                          />
                        </HtmlTooltip>
                        <Typography
                          fontSize={14}
                          color="white"
                          position="absolute"
                          top="50%"
                          left="50%"
                          sx={{ transform: "translate(-50%, -54%)" }}
                        >
                          Total Target: <strong>undefined</strong>
                        </Typography> */}
                      </BlockCell>
                    </Fragment>
                  )}
                </ParentRow>

                {year > 0 && (
                  <React.Fragment>
                    {/* Child Rows */}
                    {/* {parent.children.map((child) => ( */}
                    {[...parent.children]
                      .sort((a, b) => {
                        // Find first month index for child a
                        const aFirstMonth = a.months.findIndex(
                          (month) => month && month.id !== ""
                        );
                        // Find first month index for child b
                        const bFirstMonth = b.months.findIndex(
                          (month) => month && month.id !== ""
                        );
                        // Compare the first month indices
                        return aFirstMonth - bFirstMonth;
                      })
                      .map((child) => (
                        <ChildRow key={`${parent.id}-${child.id}`}>
                          <TableCell
                            sx={{
                              py: 1,
                              borderRight: `1px solid ${grey[300]}`,
                            }}
                          >
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                                ml={2}
                              >
                                <Box width={40} flex={0} lineHeight={1}>
                                  <Iconify
                                    name="mdi:brightness-1"
                                    size={8}
                                    color={grey[500]}
                                  />
                                </Box>
                                <Box component="p">{child.kegiatan}</Box>
                              </Stack>
                              {/* <Chip
                            label={
                              <Stack
                                display="inline-flex"
                                direction="row"
                                alignItems="center"
                                gap={0.5}
                              >
                                Target
                                <Typography
                                  component="span"
                                  fontWeight={600}
                                  fontSize={12}
                                >
                                  {child.target} {child.satuan}
                                </Typography>
                              </Stack>
                            }
                            size="small"
                            variant="outlined"
                            sx={{
                              px: 0.2,
                              bgcolor: `${grey[200]} !important`,
                              lineHeight: 1.2,
                            }}
                          /> */}
                            </Stack>
                          </TableCell>
                          {renderMonthCells(child.months, child.color, child)}
                          {year > 0 && (
                            <TableCell
                              sx={{
                                borderLeft: `1px solid ${grey[300]}`,
                                py: 1,
                                // bgcolor: grey[200],
                                fontWeight: 600,
                              }}
                            >
                              <NumericFormat
                                value={child.total_kegiatan}
                                decimalScale={2}
                                decimalSeparator=","
                                thousandSeparator="."
                                displayType="text"
                                renderText={(value) => <b>{value}</b>}
                              />{" "}
                              {/* {formatNumberID(child.total_kegiatan)}{" "} */}
                              {child.satuan}
                            </TableCell>
                          )}
                        </ChildRow>
                      ))}
                  </React.Fragment>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </StyledTable>
      </StyledPaper>
      {year > 0 && (
        <Stack gap={1} mt={2}>
          <Typography color={grey[700]} fontSize={14}>
            Keterangan warna
          </Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <Box
              px={4}
              py={1}
              bgcolor={"#d7e3f3"}
              fontSize={12}
              color={grey[700]}
              borderRadius={2}
              border="2px solid #d1d6ea"
            >
              Aktivitas tidak saling berkaitan
            </Box>
            <Box
              px={4}
              py={1}
              bgcolor={"#fef0cd"}
              fontSize={12}
              color={grey[700]}
              borderRadius={2}
              border="2px solid #f4e5a8"
            >
              Aktivitas saling berkaitan
            </Box>
          </Stack>
        </Stack>
      )}
    </Fragment>
  );
}

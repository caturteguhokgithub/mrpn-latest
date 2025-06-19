import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Chip, Grow, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import TooltipCP from "./tooltip";
import Iconify from "@/app/components/icons/iconify";
import { bgColorTh } from "@/app/utils/color";
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
import { ChildData, DataCPType, MonthData } from "../cardCriticalModel";

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
}: {
  year: number;
  dataCP: DataCPType[];
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
            <Box component="div" />
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
    <StyledPaper>
      <StyledTable stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                bgcolor: bgColorTh,
              }}
            >
              RO/Project Kunci
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
                  sx={{ py: 1, fontWeight: 700 }}
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
                      {parent.ro}
                    </Stack>
                    <Chip
                      label={parent.category}
                      size="small"
                      color="primary"
                      sx={{
                        fontWeight: 500,
                        fontSize: 12,
                        px: 0.5,
                        lineHeight: 1.2,
                        textTransform: "uppercase",
                      }}
                    />
                  </Stack>
                </TableCell>
                {year === 0 ? (
                  renderYearCells(parent) // Pass parent data for year view
                ) : (
                  <BlockCell colSpan={12}>
                    <HtmlTooltip
                      title={<TooltipCP isParent data={parent} year={year} />}
                      followCursor
                      TransitionComponent={Grow}
                      placement="bottom-start"
                    >
                      <ParentBlock color={year > 0 ? "black" : parent.color} />
                    </HtmlTooltip>
                  </BlockCell>
                )}
              </ParentRow>

              {year > 0 && (
                <React.Fragment>
                  {/* Child Rows */}
                  {parent.children.map((child) => (
                    <ChildRow key={`${parent.id}-${child.id}`}>
                      <TableCell sx={{ py: 1 }}>
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
                            <Box component="p" maxWidth="80%">
                              {child.kegiatan}
                            </Box>
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
                    </ChildRow>
                  ))}
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </StyledTable>
    </StyledPaper>
  );
}

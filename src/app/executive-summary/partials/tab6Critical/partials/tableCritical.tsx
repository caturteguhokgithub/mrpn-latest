import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Chip, Grow, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import TooltipCP, { ChildData, MonthData } from "./tooltip";
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
import { dataCPrkp, months } from "../data";

// Helper function to group consecutive months
const groupConsecutiveMonths = (months: any) => {
  const groups: any = [];
  let currentGroup: any = null;

  months.forEach((value: any, index: any) => {
    if (value && value.name) {
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

export default function ProjectTable() {
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
      (month): month is MonthData => month !== null
    );

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
      // const groupMonths = monthsData
      //   .slice(group.start, group.start + group.count)
      //   .filter((month): month is MonthData => month !== null);

      // Add the block cell
      cells.push(
        <BlockCell
          key={`block-${groupIndex}`}
          color={color}
          colSpan={group.count}
        >
          <HtmlTooltip
            // title={<TooltipCP data={{ months: groupMonths, childData }} />}
            title={<TooltipCP data={{ months: allMonths, childData }} />}
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

  return (
    <StyledPaper>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                bgcolor: bgColorTh,
              }}
            >
              RO/Project Kunci
            </TableCell>
            {months.map((month) => (
              <TableCell
                key={month}
                align="center"
                sx={{
                  bgcolor: bgColorTh,
                }}
              >
                {month}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataCPrkp.map((parent) => (
            <React.Fragment key={parent.id}>
              {/* Parent Row */}
              <ParentRow>
                <TableCell
                  component="th"
                  scope="row"
                  width="40%"
                  sx={{ py: 1, fontWeight: 700 }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                  >
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Box width={40} flex={0} lineHeight={1}>
                        <Iconify name="mdi:send" size={16} />
                      </Box>
                      {parent.ro}
                    </Stack>
                    <Chip
                      label={parent.category}
                      size="small"
                      color="primary"
                      sx={{
                        px: 0.5,
                        lineHeight: 1.2,
                        textTransform: "uppercase",
                      }}
                    />
                  </Stack>
                </TableCell>
                <BlockCell color="black" colSpan={12}>
                  <HtmlTooltip
                    title={<TooltipCP isParent data={parent} />}
                    followCursor
                    TransitionComponent={Grow}
                    placement="bottom-start"
                  >
                    <ParentBlock />
                  </HtmlTooltip>
                </BlockCell>
              </ParentRow>

              {/* Child Rows */}
              {parent.children.map((child) => (
                <ChildRow key={`${parent.id}-${child.id}`}>
                  <TableCell sx={{ py: 1 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" alignItems="center" gap={1} ml={2}>
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
                      <Chip
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
                      />
                    </Stack>
                  </TableCell>
                  {renderMonthCells(child.months, child.color, child)}
                </ChildRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </StyledTable>
    </StyledPaper>
  );
}

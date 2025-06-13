import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledPaper = styled(Paper)({
  width: '100%',
  overflowX: 'auto',
});

const StyledTable = styled(Table)({
  minWidth: 650,
  borderCollapse: 'separate',
  borderSpacing: '0 4px',
});

const BlockCell = styled(TableCell)(({ theme, color }) => ({
  backgroundColor: color,
  color: 'white',
  padding: '4px 8px',
  borderLeft: '1px solid white',
  borderRight: '1px solid white',
  textAlign: 'center',
  '&:first-of-type': {
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    borderLeft: 'none',
  },
  '&:last-of-type': {
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
    borderRight: 'none',
  },
}));

const ParentRow = styled(TableRow)({
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
});

export default function ProjectTable() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <StyledPaper>
      <StyledTable aria-label="project table">
        <TableHead>
          <TableRow>
            <TableCell>RO/Project Kunci</TableCell>
            {months.map((month) => (
              <TableCell key={month} align="center">{month}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Parent Row */}
          <ParentRow>
            <TableCell component="th" scope="row">
              Menjaga Persatuan dan Kesatuan NKRI bagi Aparatur
            </TableCell>
            {months.map((month) => (
              <TableCell key={month}></TableCell>
            ))}
          </ParentRow>

          {/* Child Row 1 - Testing */}
          <TableRow>
            <TableCell>Testing</TableCell>
            {/* Jan-Apr block (4 months) */}
            {months.slice(0, 4).map((month, index) => (
              <BlockCell 
                key={month} 
                color="black"
                colSpan={index === 0 ? 4 : undefined}
              >
                {index === 0 && 'X'}
              </BlockCell>
            ))}
            {/* Mei-Jun empty */}
            <TableCell colSpan={2}></TableCell>
            {/* Jul-Aug block (2 months) */}
            {months.slice(6, 8).map((month, index) => (
              <BlockCell 
                key={month} 
                color="black"
                colSpan={index === 0 ? 2 : undefined}
              >
                {index === 0 && 'X'}
              </BlockCell>
            ))}
            {/* Sep-Dec empty */}
            <TableCell colSpan={4}></TableCell>
          </TableRow>

          {/* Child Row 2 - Testing 2 */}
          <TableRow>
            <TableCell>Testing 2</TableCell>
            {/* Jan-May empty */}
            <TableCell colSpan={5}></TableCell>
            {/* Jun-Aug block (3 months) */}
            {months.slice(5, 8).map((month, index) => (
              <BlockCell 
                key={month} 
                color="red"
                colSpan={index === 0 ? 3 : undefined}
              >
                {index === 0 && 'X'}
              </BlockCell>
            ))}
            {/* Sep-Dec empty */}
            <TableCell colSpan={4}></TableCell>
          </TableRow>

          {/* Parent Row */}
          <ParentRow>
            <TableCell component="th" scope="row">
              PROYEK BUMN
            </TableCell>
            {months.map((month) => (
              <TableCell key={month}></TableCell>
            ))}
          </ParentRow>
        </TableBody>
      </StyledTable>
    </StyledPaper>
  );
}